import React from 'react';
import {View, ImageBackground, Text, Image, TouchableOpacity} from 'react-native';
import AppColors from '../../lib/_colors';
import AppIcons from '../../partials/_icons';
import { RH, RW } from '../../lib/_sizes';


export const List = props => {

    return (
        <TouchableOpacity onPress={props.goto}>
            <View style={styles.palletOne}>                
                <View style={ styles.top }>
                    <View>
                        <Text style={styles.text}>{props.title}</Text>
                    </View>
                    <View>                                
                        <Image source={AppIcons.li} style={{height:RH(2),width:RW(2)}}/>                                
                    </View>                        
                </View>
            </View>        
        </TouchableOpacity>             
    );
  };





const styles = {
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
    }
};