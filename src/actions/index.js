import {
    UPDATESTATE,
    LOGOUT
} from './types';
import moment from 'moment';

import {
    //dealerStock,
    dealerPerformance,
    dealerBalance,
    //dealerStockPurchase,
    dealerAvailableStock,
    dealerEtopupPurchased,
    dealerPurchasedStock,
    getData,
    idCheck,
    monthlyPerformance,
    mtdsolddevice,
    keyContact,
    getPromos,
    notificationHistory,
    mtddealertransactions,
    mtdetopupsold
  } from '../partials/_api';

export const token =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYyMjJhOTI4OGNlMjA5OTgwODU1ZGU5ZDFiNTU2Y2VkZmM4NmU2MjdkODNmYTcwZGEyNGVhY2EzZDVkYzBkM2M2N2JmNGIyMDI1MmE3NmZmIn0.eyJhdWQiOiIxIiwianRpIjoiZjIyMmE5Mjg4Y2UyMDk5ODA4NTVkZTlkMWI1NTZjZWRmYzg2ZTYyN2Q4M2ZhNzBkYTI0ZWFjYTNkNWRjMGQzYzY3YmY0YjIwMjUyYTc2ZmYiLCJpYXQiOjE1NjgwMTkzNTQsIm5iZiI6MTU2ODAxOTM1NCwiZXhwIjoxNTk5NjQxNzU0LCJzdWIiOiIxNiIsInNjb3BlcyI6W119.SmmksnPrg46UKeWIRBIuJT9xVbNM__ZML2f8k4qo4yeXtiCrmtjt9EAcGIn_joJWvdWTg7ty6BmcqpUasx1KdkewG5Wf73OT1BW36VW-mrrFRN8TbVDDx3Uk7RAYofFQxupWdvKEZWBCOGzVogIBqnNMG4kdUNj2S_Y8ocYcUCyXgdR-Pea5ofMubqgjIGQMvNq1oDxEbbIVraffuTLEw1NI7kzyvwpchs-EKAdSxiJo3N9rbCpj6nOTfOXLElKx2yWXezRRbDSUY0p4RA-AjW6lfCV6KAQu2u-5TprzyxguZwnTLIGAPG_7_czhfpGwh-LUzw5mQ9MpeWw25H2nnCMKg0nNYEdgKBWcA15O0bHIlx9a6RhVLjFp_DGIhvD9SXyNkG_tuX-iaj1VbOMA-HmPJ0qIJ8vN7QKTBAeSq9A-jdw3Bphq9GJtftGUkSaXmN27Zo_MGbk-Bt3ylgavFJfgQ4hPv-kcNVN9vuWIxtiCZ398LiKqYD6jVfCDcQak7NiIvFiGZl4raU1IWJJ00_CFs9-IiY25OAYmy88bzUMjOjdWoU1n2SP85EKoIzA_1IagPMbrwc6XMWMbOfU_2eoZvYaWSxxvhHwJRoBln3Vo840wQm159Wz8-7KSbFEm2L8rvz1od_1UiqrmOvgFWnQcoYWUsdcmkEqFBfYgQ_k';

export const endPoint = 'https://scm.spectranet.com.ng/api';

export const homeactions = () => {
    return (dispatch) => {
        getData('userDetails')
            .then(res => {
                if (res) {
                    res = JSON.parse(res);
                    let userId = idCheck(res, 'userId');
                    dealerAvailableStock(userId)
                        .then(res => {
                            res = res.data;
                            if (typeof res.data !== 'undefined' && res.data.length) {
                                let data = res.data;
                                
                                let total = 0;                

                                for(var i =0; i < data.length; i++){
                                    total = data[i].count + total;
                                }
                                
                                dispatch({
                                    type: UPDATESTATE,
                                    payload: { name:"availableStock", value: total }
                                });

                                dispatch({
                                    type: UPDATESTATE,
                                    payload: { name: "availableStockdata", value: data }
                                });
                            
                                data.map((el, i) => {
                                    if (el.devicetype === "ACE") {
                                        dispatch({
                                            type: UPDATESTATE,
                                            payload: { name: "availableAce", value: { devicetype: 'ACE', count: el.count } }
                                        });
                                    }
                                
                                    if (el.devicetype === "BLAZE") {
                                        dispatch({
                                            type: UPDATESTATE,
                                            payload: { name: "availableBlaze", value: { devicetype: 'BLAZE', count: el.count } }
                                        });
                                    }

                                    if (el.devicetype === "EVO") {
                                        dispatch({
                                            type: UPDATESTATE,
                                            payload: { name: "availableEvo", value: { devicetype: 'EVO', count: el.count } }
                                        });
                                    }

                                    if (el.devicetype === "FREEDOM") {
                                        dispatch({
                                            type: UPDATESTATE,
                                            payload: { name: "availableFreedom", value: { devicetype: 'FREEDOM', count: el.count } }
                                        });
                                    }

                                    if (el.devicetype === "PEBBLE") {
                                        dispatch({
                                            type: UPDATESTATE,
                                            payload: { name: "availablePebble", value: { devicetype: 'PEBBLE', count: el.count } }
                                        });
                                    }

                                })
                            
                            }
                        })
                        .then(() => dealerEtopupPurchased(userId)
                            .then(res => {
                                res = res.data; 
                                if(typeof res.data !== 'undefined' && res.data.length)  {
                                    
                                    let data = res.data;                        
                                    let amount = data[0].amount;
                                    
                                    if(amount != null){
                                        dispatch({
                                            type: UPDATESTATE,
                                            payload: { name:"etopuppurchased", value: amount }
                                        });
                                    }
                                
                                }
                            }))
                        .then(() => dealerBalance(userId)
                            .then(res => {
                                res = res.data; 
                                let total = null;
                                if(typeof res.data !== 'undefined')  {
                                    
                                    let data = res.data;
                                    
                                    total = data.amount;
                                            
                                    if(total){                                                 
                                        dispatch({                                
                                            type: UPDATESTATE,
                                            payload: { name:"etopupavaiable", value: parseInt(total) }
                                        });                            
                                    }                        
                                }
                            }))
                        .then(() => dealerPurchasedStock(userId)
                            .then(res => {
                                res = res.data;  
                    
                                if(typeof res.data !== 'undefined' && res.data.length)  {
                                    
                                    let data = res.data;

                                    let total = 0; 

                                    for(var i =0; i < data.length; i++){
                                        total = data[i].count + total;
                                    }
                                    
                                    dispatch({
                                        type: UPDATESTATE,
                                        payload: { name:"devicepurchased", value: total }
                                    });
                                    
                                }
                            }))
                        .then(() => dealerPerformance(userId)
                            .then(res => {
                                res = res.data;
                                if (typeof res.data !== 'undefined') {
                                    let data = res.data;

                                    let total = data.mtd;                                                                 

                                    if(total !== null){   

                                        dispatch({
                                            type: UPDATESTATE,
                                            payload: { name:"mtd", value: parseInt(total) }
                                        });
                                    }
                                }
                            }))
                        .then(() => {                    
                            dispatch({
                                type: UPDATESTATE,
                                payload: { name:"isLoadingBg", value: false }
                            })
                        })
                }
            }).catch(e => console.log(e))
    }
}

export const availablestocks = () => {
    
    return (dispatch) => {
        getData('userDetails').then(res => {
            if(res){
                res = JSON.parse(res);
                let userId = idCheck(res, 'userId');
                dealerAvailableStock(userId)
                .then(res => {
                    res = res.data; 
                    if(typeof res.data !== 'undefined' && res.data.length)  {
                        let data = res.data;

                        dispatch({
                            type: UPDATESTATE,
                            payload: { name:"availableStockdata", value: data }
                        });
                        
                        data.map((el,i) => {
                            if(el.devicetype === "ACE"){
                                dispatch({
                                    type: UPDATESTATE,
                                    payload: { name:"availableAce", value: { devicetype:'ACE', count: el.count} }
                                });
                            }
                            
                            if(el.devicetype === "BLAZE"){
                                dispatch({
                                    type: UPDATESTATE,
                                    payload: { name:"availableBlaze", value: { devicetype:'BLAZE', count: el.count} }
                                });
                            }

                            if(el.devicetype === "EVO"){
                                dispatch({
                                    type: UPDATESTATE,
                                    payload: { name:"availableEvo", value: { devicetype:'EVO', count: el.count} }
                                });
                            }

                            if(el.devicetype === "FREEDOM"){
                                dispatch({
                                    type: UPDATESTATE,
                                    payload: { name:"availableFreedom", value: { devicetype:'FREEDOM', count: el.count} }
                                });
                            }

                            if(el.devicetype === "PEBBLE"){
                                dispatch({
                                    type: UPDATESTATE,
                                    payload: { name:"availablePebble", value: { devicetype:'PEBBLE', count: el.count} }
                                });
                            }

                        })                        
                        
                    }
                    
                }).then(() =>{
                
                    dealerBalance(userId)
                    .then(res => {
                        res = res.data; 
                        let total = null;
                        if(typeof res.data !== 'undefined')  {
                            
                            let data = res.data;
                            
                            total = data.amount;

                            if(total){                                                 
                                dispatch({                                
                                    type: UPDATESTATE,
                                    payload: { name:"etopupavaiable", value: parseInt(total) }
                                });                            
                            }                        
                        } 
                        
                    })
                
                }).then(() => {
                    
                    dispatch({
                        type: UPDATESTATE,
                        payload: { name:"isLoadingBg", value: false }
                    });
                    
                }).catch(e => console.log(e))
            }
        });
    }
};

export const salesAndPurchases = () => {
    return (dispatch) => {
        getData('userDetails').then(res => {
            if (res) {
                res = JSON.parse(res);
                let userId = idCheck(res, 'userId');
                dealerAvailableStock(userId)
                .then(res => {
                    
                    res = res.data;  
                    if(typeof res.data !== 'undefined' && res.data.length)  {
                        
                        let data = res.data;

                        let total = 0;                

                        for(var i =0; i < data.length; i++){
                            total = data[i].count + total;
                        }

                        dispatch({
                            type: UPDATESTATE,
                            payload: { name:"availableStock", value: total }
                        });
                       
                    }               
                  })
                  .then(() =>
                        dealerPerformance(userId)
                        .then(res => {               
                            res = res.data; 
                            if(typeof res.data !== 'undefined')  {
                                
                                let data = res.data;

                                let total = data.mtd;
                                

                                if(total !== null){   

                                    dispatch({
                                        type: UPDATESTATE,
                                        payload: { name:"mtd", value: parseInt(total) }
                                    });
                                }
                       
                        }               
                    }))
                    .then(() =>
                    dealerEtopupPurchased(userId)
                    .then(res => {                                
                    res = res.data; 
                    if(typeof res.data !== 'undefined' && res.data.length)  {
                        
                        let data = res.data;                        
                        let amount = data[0].amount;
                        
                        if(amount != null){
                            dispatch({
                                type: UPDATESTATE,
                                payload: { name:"etopuppurchased", value: amount }
                            });
                        }
                       
                    }               
                  }))
                  .then(() =>

                    dealerPurchasedStock(userId)
                    .then(res => {                    
                        res = res.data;  
                        
                        if(typeof res.data !== 'undefined' && res.data.length)  {
                            
                            let data = res.data;

                            let total = 0; 

                            for(var i =0; i < data.length; i++){
                                total = data[i].count + total;
                            }

                            dispatch({
                                type: UPDATESTATE,
                                payload: { name:"devicepurchased", value: total }
                            });
                            
                        } 
                    })
                )
                  .then(() => {
                    
                        dispatch({                                
                            type: UPDATESTATE,
                            payload: { name:"isLoadingBg", value: false }
                        })
                    
                  }).catch(e => console.log(e))
            }
        });
    }
}


export const monthwiseperformance = () => {

    return (dispatch) => {
        getData('userDetails').then(res => {
            if(res){
                res = JSON.parse(res);
                let userId = idCheck(res, 'userId');
                monthlyPerformance(userId)
                .then(res => {
                    res = res.data; 
                    
                    if(typeof res.data !== 'undefined' && res.data.length)  {
                        let data = res.data;
                        
                        data.map((el,i) => {
                            if(i === 0){
                                dispatch({
                                    type: UPDATESTATE,
                                    payload: { name:"month5", value: { title:el.monthname, count: el.count} }
                                });
                            }
                            
                            if(i === 1){
                                dispatch({
                                    type: UPDATESTATE,
                                    payload: { name:"month4", value: { title:el.monthname, count: el.count} }
                                });
                            }

                            if(i === 2){
                                dispatch({
                                    type: UPDATESTATE,
                                    payload: { name:"month3", value: { title:el.monthname, count: el.count} }
                                });
                            }

                            if(i === 3){
                                                             
                                dispatch({
                                    type: UPDATESTATE,
                                    payload: { name:"month2", value: { title:el.monthname, count: el.count} }
                                });
                            }

                            if(i === 4){
                                dispatch({
                                    type: UPDATESTATE,
                                    payload: { name:"month1", value: { title:el.monthname, count: el.count} }
                                });
                            }

                        })                        

                    }
                }).then(() => {                    
                    mtdsolddevice(userId)
                    .then(res => {
                        res = res.data; 
                        
                        if(typeof res.data !== 'undefined' && res.data.length){                          
                            
                            let data = res.data;

                            dispatch({
                                type: UPDATESTATE,
                                payload: { name:"device", value: data }
                            });
                            
                            /*data.forEach((el,i) => {                            
                            
                                if(i === 0){                                
                                    dispatch({
                                        type: UPDATESTATE,
                                        payload: { name:"device1", value: { title:el.devicetype, count: el.count} }
                                    });
                                }
                                
                                if(i === 1){                                
                                    dispatch({
                                        type: UPDATESTATE,
                                        payload: { name:"device2", value: { title:el.devicetype, count: el.count} }
                                    });
                                }

                                if(i === 2){                                
                                    dispatch({
                                        type: UPDATESTATE,
                                        payload: { name:"device3", value: { title:el.devicetype, count: el.count} }
                                    });
                                }

                                if(i === 3){                                
                                    dispatch({
                                        type: UPDATESTATE,
                                        payload: { name:"device4", value: { title:el.devicetype, count: el.count} }
                                    });
                                }

                                if(i === 4){                                
                                    dispatch({
                                        type: UPDATESTATE,
                                        payload: { name:"device5", value: { title:el.devicetype, count: el.count} }
                                    });
                                }

                            }) */
                        } 
                    }).catch(e => console.log(e))
                }).catch(e => console.log(e))
            }
        });
    }
};

export const keyContactInformation = () => {    

    return (dispatch) => {

        getData('userDetails').then(res => {
            if (res) {
              res = JSON.parse(res);
              let userId = idCheck(res, 'userId');
              keyContact(userId)
                .then(res => {
                    res = res.data;
                    if (res.success == true && (typeof res.data.category !== 'undefined')){
                        if(res.data.category !== null){
                            dispatch({
                                type: UPDATESTATE,
                                payload: { name:"dealerContact", value: [res.data] }
                            });
                        }
                    }
                })                
                .then(() =>{
                    dispatch({
                        type: UPDATESTATE,
                        payload: { name:"isLoadingBg", value: false }
                    });
                }).catch(e => console.log(e));
            }
    })
}}

export const promoData = () => {    

    return (dispatch) => {
        getPromos()
        .then(res => {
            res = res.data;
            if (res.status) {
                dispatch({
                    type: UPDATESTATE,
                    payload: { name:"list", value: res.msg }
                });
            }
        })
        .then(() => {
            dispatch({
                type: UPDATESTATE,
                payload: { name:"isLoadingBg", value: false }
            });
        }).catch(e => console.log(e))
    }
}

export const getNews = () => {    

    return (dispatch) => {
        getData('userDetails').then(res => {
            if (res) {
                res = JSON.parse(res);
                let userId = idCheck(res, 'userId');
            
                notificationHistory(userId)
                    .then(res => {                         
                        var List = [];                        
                        let notifications = res.data.msg;
                        //let notifications = res.data.notifications;
                        
                        if (notifications.length > 0) {
                            notifications.forEach(el => {
                                List.push({
                                    item: el.title,
                                    timestamp: moment(el.created).format(
                                        'MMMM DD, YYYY',
                                    ),
                                    content: el.message,
                                });
                                // List.push({
                                //     item: el.headings.en,
                                //     timestamp: moment(el.completed_at * 1000).format(
                                //       'MMMM DD, YYYY',
                                //     ),
                                //     content: el.contents.en,
                                //   });
                            });
                            return List;
                        }
                        return List;
                    })
                    .then((res) => {  
                        dispatch({
                            type: UPDATESTATE,
                            payload: { name:"News", value: res }
                        });
                    })     
                    .then(() => {
                        dispatch({
                            type: UPDATESTATE,
                            payload: { name:"isLoadingBg", value: false }
                        });
                    }).catch(e => console.log(e));
                }
        })
    }
}

export const webviewLinks = () => {    

    return (dispatch) => {
        getData('userDetails').then(res => {
            if (res) {
                res = JSON.parse(res);
                let userId = idCheck(res, 'userId');
                userId = userId.substring(0, 3);
                if (
                    userId == 'LGX' ||
                    userId == 'ABX' ||
                    userId == 'IBX' ||
                    userId == 'PHX'
                ){                    
                    dispatch({
                        type: UPDATESTATE,
                        payload: { name:"link", value: 'franchiseincentive' }
                    });
                } else if (
                    userId == 'LGD' ||
                    userId == 'ABD' ||
                    userId == 'IBD' ||
                    userId == 'PHD'
                ){
                    dispatch({
                        type: UPDATESTATE,
                        payload: { name:"link", value: 'superdealerincentive' }
                    });
                }else {                    
                    dispatch({
                        type: UPDATESTATE,
                        payload: { name:"link", value: 'dealerincentive' }
                    });
                }
            }
        });
        
    }
}

export const getTransactionHistory = (from,to) => {
    return (dispatch) => {
        getData('userDetails').then(res => {
            if (res) {
                res = JSON.parse(res);
                let userId = idCheck(res, 'userId');
                mtddealertransactions(userId,from,to).then(
                    res => {
                        res = res.data;
                        if (res.data.length && (typeof res.data !== 'undefined')){
                            dispatch({
                                type: UPDATESTATE,
                                payload: { name:"trxHst", value: res.data }
                            });
                        
                        }
                        else{
                            dispatch({
                                type: UPDATESTATE,
                                payload: { name:"trxHst", value: [] }
                            });
                        }
                    }
                ).then(() => {
                    dispatch({
                        type: UPDATESTATE,
                        payload: { name:"isLoadingBg", value: false }
                    });
                }).catch(e => console.log(e))
            }
        })
    }
}

export const targetHistory = () => {
    return (dispatch) => {
        getData('userDetails').then(res => {
            if (res) {
                res = JSON.parse(res);
                let userId = idCheck(res, 'userId');
                mtdsolddevice(userId).then(
                    res => {
                        res = res.data;                        
                        if(res.success == true){
                            if (res.data.length && (typeof res.data !== 'undefined')){

                                let data = res.data;
                                let total = 0;
                                for(var i =0; i < data.length; i++){
                                    total = data[i].count + total;
                                }
                                return total;
                            }
                            else {
                                let total = 0;
                                return total;
                            }
                        }
                    }
                ).then(total => {
                    keyContact(userId)
                    .then(res => {
                        res = res.data;
                        if (res.success == true && (typeof res.data.category !== 'undefined')){
                            if(res.data.category !== null){
                                let target = parseInt(res.data.dealertarget);
                                let percent = (total / target) * 100;
                                
                                dispatch({
                                    type: UPDATESTATE,
                                    payload: { name:"mtddevicesold", value: Math.round(percent) }
                                });
                                dispatch({
                                    type: UPDATESTATE,
                                    payload: { name:"dealertarget", value: target }
                                });
                                dispatch({
                                    type: UPDATESTATE,
                                    payload: { name:"mtd", value: total }
                                });
                            }
                        }
                    })
                    .then(() =>{
                        mtdetopupsold(userId)
                        .then(res => {
                            res = res.data;
                            if(res.success == true){
                                if (res.data.length && (typeof res.data !== 'undefined')){
    
                                    let data = res.data[0];
                                    
                                    dispatch({
                                        type: UPDATESTATE,
                                        payload: { name:"mtdetopupsold", value: data.amount }
                                    });
                                    
                                }
                            }
                        })
                    })
                    .then(() => {
                        dispatch({
                            type: UPDATESTATE,
                            payload: { name:"isLoadingBg", value: false }
                        });
                    }).catch(e => console.log(e))
                }).catch(e => console.log(e))
            }
        })
    }
}


export const updateState = (name, value) => {
    return (dispatch) => {
        dispatch({
            type: UPDATESTATE,
            payload: { name:name, value: value }
        });
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT,
            payload: false
        });
    } 
}