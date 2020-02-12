import React from 'react';
import {View, Text, Image} from 'react-native';
import {CustomText} from '../../partials/_components';
import {connect} from 'react-redux';
import {updateState} from '../../actions'
import AppColors from '../../lib/_colors';
import {RF, RW, RH} from '../../lib/_sizes';
import format from "format-number";

const Chart2 = props => {
    

    return (
        <View sty={{position:'relative'}}>
            <CustomText style={{
                color: AppColors.white,
                marginBottom:RH(2), 
                fontSize:RF(24),
                alignSelf:'center'
            }} 
                text={'E-Topup Primary vs Target'} />
            <View style={styles.chartViewWrp}>
                <View style={styles.chartArea}>
                    <View style={styles.barWrp}> 
                        <Text style={{marginBottom:5}}>
                            {format({ prefix: '₦' })(1000000)}
                        </Text>                       
                        <View style={[styles.bar, {
                            height:RF(15 * 15)
                        }]}>
                            <Image 
                            style={styles.barImage} 
                            source={require('../../../assets/img/bar2.png')}/>
                        </View>                        
                        <Text style={styles.label}>Target {"\n"}</Text> 
                    </View>

                    <View style={styles.barWrp}>
                        <Text style={{marginBottom:5}}>
                            {format({ prefix: '₦' })(props.store.mtdetopupsold)}
                        </Text>  
                        <View style={[styles.bar, {
                            height:RF((props.store.mtdetopupsold * 0.000015) * 15)
                        }]}>
                            <Image 
                            style={styles.barImage} 
                            source={require('../../../assets/img/bar1.png')}/>
                        </View>
                    <Text style={styles.label}>Primary {"\n"}Billing</Text>          
                    </View>

                </View>
            </View>

            


        </View>


                    
    );
  };

  const mapStateToProps = (state) => {
    return {
        store: state.store
    }
  };
  
  export default connect(mapStateToProps, {updateState})(Chart2);



const styles = {
    barImage:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'100%'
    },
    barWrp:{
        width:RW(25),
        flexDirection:'column',
        alignSelf:'flex-end',
        alignItems:'center',
        position:'relative',
        paddingBottom:RH(6)
    },
    bar:{
        width:'100%',
        maxHeight:RH(35),
        textAlign:'center',
        position:'relative'
    },
    chartViewWrp:{
        backgroundColor:AppColors.white,
        minHeight:RH(45),
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
        paddingHorizontal:15,
        flexDirection:'row',
        justifyContent:'space-between',
        height:'100%',
        width:'100%',
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
    },
    label:{
        position:'absolute',
        bottom:0,
        left:0,
        width:'100%',
        textAlign:'center'
    }
    
};