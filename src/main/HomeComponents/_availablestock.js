import React from 'react';
import {View, ImageBackground, Text, Image} from 'react-native';
import { connect } from 'react-redux';
import AppColors from '../../lib/_colors';
import {RF, RW, RH} from '../../lib/_sizes';
import Icons from '../../partials/_icons';
import { H1 } from '../../partials/_components';
import { Col, Row, Grid } from 'react-native-easy-grid';
import format from "format-number";

const AvailableStocks = props => {

    return (
        <View style={[styles.MainWrapper],{marginTop: 35}}>
            <H1 style={{color: AppColors.white, marginBottom:10}}>Available</H1>
            <View style={styles.trxWrapper}>
                <View style={styles.trxboxwrp}>
                    <View style={styles.palletOne}>
                        <View style={ styles.top }>
                            <View>
                                <Text style={styles.text}>Available ETOP-UP</Text>
                            </View>
                            <View>
                                <Text style={styles.text}>
                                {format({ prefix: '₦' })(props.store.etopupavaiable)}
                                </Text>
                            </View>                        
                        </View>                       
                    </View>
                    <Grid style={styles.grid}>
                        <Row style={styles.row}>
                            
                                    <Col style={styles.col}> 
                                        <Box                                             
                                            text={props.store.availableAce.count} 
                                            backgroundColor={Icons.yellowsquare } 
                                        />
                                        <Name text="ACE" />
                                    </Col>
                                    
                             
                            
                                    <Col style={styles.col}> 
                                        <Box                                      
                                            text={props.store.availableBlaze.count} 
                                            backgroundColor={Icons.deepgreensquare } 
                                        /> 
                                        <Name text="BLAZE" />
                                    </Col>
                             
                            
                                    <Col style={styles.col}> 
                                        <Box                                             
                                            text={props.store.availableEvo.count} 
                                            backgroundColor={Icons.redsquare } 
                                        /> 
                                        <Name text="EVO" />
                                    </Col>
                                    
                                                       

                        </Row>
                        <Row style={styles.row}>
                            
                                    <Col style={styles.col}> 
                                        <Box                                             
                                            text={props.store.availableFreedom.count} 
                                            backgroundColor={Icons.revbluesquare } 
                                        /> 
                                        <Name text="FREEDOM" />
                                    </Col>
                                  
                               
                                    <Col style={styles.col}> 
                                        <Box                                            
                                            text={props.store.availablePebble.count} 
                                            backgroundColor={Icons.orangesquare } 
                                        /> 
                                        <Name text="PEBBLE" />
                                    </Col>
                               
                        </Row>
                    </Grid>
                    
                
                    
                </View>
                
            </View>
        </View>
    );
  };

export const Box = props => {
    return(
        <ImageBackground 
            source={props.backgroundColor}
            resizeMode="cover"
            style={styles.box}
        >
            <Text style={{color: AppColors.white}}>{props.text}</Text>
        </ImageBackground>
    )
}

export const Name = props => {
    return(
        
        <Text style={{
            color: AppColors.white,
            fontSize: 12, 
            textAlign:'center'
            }}
        >{props.text}</Text>
        
    )
}

const mapStateToProps = (state) => {
    return {
        store: state.store
    }
};



export default connect(mapStateToProps, null)(AvailableStocks);

const styles = {
    trxWrapper: {
        flex: 1,
        backgroundColor: AppColors.fadewhite,
        minHeight: RH(30),
        //justifyContent: "center",
        //alignItems:"center"
    },
    trxboxwrp:{
        //flexDirection:'row',
        //justifyContent:"space-between",
        width:'100%',
        height:'100%',
        paddingVertical:0
    },
    box:{
        height:60,
        width:60,
        justifyContent:"center",
        alignItems:"center"
    },
    grid:{
        height:'100%',
        width:'100%',
        marginTop:20
    },
    row:{
        justifyContent:'flex-start',
        alignItems:'center',
        white:'100%',
        marginBottom:15
    },
    col:{
        width:'33.33%',
        alignItems:'center'
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
    bg:{
        width:'100%',
        height:'100%'
    },
    gridline:{
        borderColor:'#fff',
        borderWidth: 1
    },
    text:{
        color: AppColors.white,
        fontFamily:'Montserrat-Regular'
    },
    palletOne:{
        position:'relative',
        height:50,
        width:'100%',
    }
};