import React from 'react';
import {View, ImageBackground, Text, Image, TouchableOpacity} from 'react-native';
import AppColors from '../../lib/_colors';
import AppIcons from '../../partials/_icons';
import {connect} from 'react-redux';
import {RF, RW, RH} from '../../lib/_sizes';

const Chart = props => {
    return (
        <View style={styles.chartViewWrp}>
            <View style={styles.chartArea}>
                <View style={styles.barWrp}>
                    <Text>{props.store.availableAce.count}</Text>
                    {
                        props.store.availableAce.count === 0  ?
                        <View style={[styles.bar, {
                            height:RF(1)
                        }]}> 
                         <Image 
                            style={styles.barImage} 
                            source={require('../../../assets/img/bar1.png')}/>
                        </View>
                        : 
                        <View style={[styles.bar, {
                            height:RF(props.store.availableAce.count * 5)
                        }]}>
                            <Image 
                            style={styles.barImage} 
                            source={require('../../../assets/img/bar1.png')}/>
                        </View>
                    }    
                </View>

                <View style={styles.barWrp}>
                    <Text>{props.store.availableBlaze.count}</Text>
                    {
                        props.store.availableBlaze.count === 0  ?
                        <View style={[styles.bar, {
                            height:RF(1)
                        }]}> 
                         <Image 
                            style={styles.barImage} 
                            source={require('../../../assets/img/bar2.png')}/>
                        </View>
                        : 
                        <View style={[styles.bar, {
                            height:RF(props.store.availableBlaze.count * 5)
                        }]}>
                            <Image 
                            style={styles.barImage} 
                            source={require('../../../assets/img/bar2.png')}/>
                        </View>
                    }           
                </View>

                <View style={styles.barWrp}>
                    <Text>{props.store.availableEvo.count}</Text>
                    {
                        props.store.availableEvo.count === 0  ?
                        <View style={[styles.bar, {
                            height:RF(1)
                        }]}> 
                         <Image 
                            style={styles.barImage} 
                            source={require('../../../assets/img/bar3.png')}/>
                        </View>
                        : 
                        <View style={[styles.bar, {
                            height:RF(props.store.availableEvo.count * 5)
                        }]}>
                            <Image 
                            style={styles.barImage} 
                            source={require('../../../assets/img/bar3.png')}/>
                        </View>
                    }
                </View>

                <View style={styles.barWrp}>
                    <Text>{props.store.availableFreedom.count}</Text>
                    {
                        props.store.availableFreedom.count === 0  ?
                        <View style={[styles.bar, {
                            height:RF(1)
                        }]}> 
                        <Image 
                            style={styles.barImage} 
                            source={require('../../../assets/img/bar4.png')}/>
                        </View>
                        : 
                        <View style={[styles.bar, {
                            height:RF(props.store.availableFreedom.count * 5)
                        }]}>
                            <Image 
                            style={styles.barImage} 
                            source={require('../../../assets/img/bar4.png')}/>
                        </View>
                    } 
                </View>

                <View style={styles.barWrp}>
                    <Text>{props.store.availablePebble.count}</Text>
                    {
                        props.store.availablePebble.count === 0  ?
                        <View style={[styles.bar, {
                            height:RF(1)
                        }]}> 
                        <Image 
                            style={styles.barImage} 
                            source={require('../../../assets/img/bar5.png')}/>
                        </View>
                        : 
                        <View style={[styles.bar, {
                            height:RF(props.store.availablePebble.count * 5)
                        }]}>
                            <Image 
                            style={styles.barImage} 
                            source={require('../../../assets/img/bar5.png')}/>
                        </View>
                    }
                </View>
            </View>
            <View style={{alignItems:'center',paddingVertical:5}}>
                <Text style={styles.chartLegend}>Available Stock</Text>
            </View>
        </View>
                    
    );
  };

  const mapStateToProps = (state) => {
    return {
        store: state.store
    }
  };
  
  export default connect(mapStateToProps, null)(Chart);



const styles = {
    barImage:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'100%'
    },
    barWrp:{
        width:RW(10),
        flexDirection:'column',
        alignSelf:'flex-end',
        alignItems:'center'
    },
    bar:{
        width:'100%',
        maxHeight:RH(25),
        textAlign:'center',
        position:'relative'
    },
    chartViewWrp:{
        backgroundColor:AppColors.white,
        minHeight:RH(35),
        flex:1,
        borderRadius:RW(2),
        justifyContent:'flex-end',
        paddingVertical:7
    },
    chartArea:{
        justifyContent:'space-around',
        flexDirection:'row',
        marginBottom:10
    },
    top:{
        alignItems:"center", 
        borderLeftColor:"#F15F79",
        borderLeftWidth:2,
        //paddingVertical:15,
        paddingHorizontal:15,
        //marginTop:15,
        flexDirection:'row',
        justifyContent:'space-between',
        //position:'absolute',
        height:'100%',
        width:'100%',
        //top:0,
        //left:0,
        //right:0,
        //zIndex:9999,
        shadowColor:'rgba(0, 0, 0, 0.1)',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.8,
        shadowRadius:2,
        elevation:1,
        backgroundColor:'#1B5AAC',
        borderTopWidth:1,
        borderTopColor:'rgba(255,255,255,0.3)',
        borderBottomWidth:1,
        borderBottomColor:'rgba(255,255,255,0.3)'
    },   
    text:{
        color: AppColors.white,
        fontFamily:'Montserrat-Regular'
    },
    palletOne:{
        position:'relative',
        height:50,
        width:'100%',
        marginVertical:10
    },
    chartLegend:{
        color: '#1455A9',
        fontFamily:'Montserrat-Regular'
    }
};