import React from 'react';
import {View, Text} from 'react-native';
import AppColors from '../../lib/_colors';
import AppIcons from '../../partials/_icons';


export const List = props => {

    return (
        <View>
            <View style={styles.palletOne}>
                
                        <View style={ styles.top }>
                            <View>
                                <Text style={styles.text}>{props.title}</Text>
                            </View>
                            <View>                                
                                <Text style={styles.text}>{props.data}</Text>                               
                            </View>                        
                        </View>                       
                
                    
                    </View>
        
        </View>
                    
    );
  };





const styles = {
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
    }
};