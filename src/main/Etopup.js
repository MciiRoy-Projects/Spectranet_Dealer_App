import React from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator, Text} from 'react-native';
import {
    WrapperMain,
    HeaderBack,
    PageTitle,
    Loading
} from '../partials/_components';
import AppColors from '../lib/_colors';
import {connect} from 'react-redux';
import {RF, RW, RH} from '../lib/_sizes';
import { 
    getTransactionHistory,
    updateState
} from '../actions';
import TransactionHst from './Etopup/_transactionhistory';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Etopup extends React.Component {

    constructor(props) {
        super(props);
        this.props.updateState("isLoadingBg",true)
    }

    init() {
        this.props.getTransactionHistory(this.props.store.chosenDateFrom,this.props.store.chosenDateTo);
      }

    componentDidMount() {
        this.init();
    }

    toggleActiveTab(){
        if(this.props.store.activetab !== true){
            this.props.updateState('activetab',!this.props.store.activetab);
            this.props.updateState('inactivetab',!this.props.store.inactivetab);
        }
    }

    toggleInActiveTab(){
        if(this.props.store.inactivetab === false){
            this.props.updateState('activetab',!this.props.store.activetab);
            this.props.updateState('inactivetab',!this.props.store.inactivetab);
        }
    }

    render() {
        const {navigation} = this.props;
        return (
            <WrapperMain style={{paddingHorizontal:0}}>
                <View style={{paddingHorizontal:RW(6)}}>
                    <HeaderBack
                        goBack={() => navigation.goBack()}
                        openProfile={() => navigation.navigate('Profile')}
                    />
                </View>
                <PageTitle title={"E-Top Up"} style={{paddingHorizontal:RW(6), marginBottom:RH(6)}}/>
                
                    <View style={{backgroundColor:AppColors.white,flex:1}}>
                        <View style={styles.switchWrp}>
                            <View style={ this.props.store.activetab ?
                                [styles.switch,{backgroundColor:'#fe6215',width:'45%'}] :
                                [styles.switch,{width:'45%'}] 
                            }>
                                
                                <TouchableOpacity style={styles.switchBtn} onPress={this.toggleActiveTab.bind(this) }>
                                    <Text style={ this.props.store.activetab ?
                                        [styles.txt,{color: AppColors.white}] :
                                        [styles.txt]
                                    }>Transaction History</Text>
                                </TouchableOpacity>
                                
                            </View>

                            <View style={ this.props.store.inactivetab ?
                                [styles.switch,{backgroundColor:'#fe6215'}] :
                                [styles.switch,] 
                            }>
                                <TouchableOpacity style={styles.switchBtn} onPress={this.toggleInActiveTab.bind(this)}>
                                    <Text style={ this.props.store.inactivetab ?
                                        [styles.txt,{color: AppColors.white}] :
                                        [styles.txt] }
                                    >3 Previous Month Sales</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>

                            <View style={{width:'100%'}}>
                                
                                    <View style={styles.paneTwo}>
                                        <ScrollView                            
                                            horizontal={true}
                                            pagingEnabled={true}
                                            showsHorizontalScrollIndicator={false}                            
                                        >
                                            <TransactionHst />
                                        </ScrollView>
                                    </View>
                            </View>
                        </ScrollView>
                    </View>
                
                    {this.props.store.isLoadingBg ? (
                        <Loading />
                    ) : null}
            </WrapperMain>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        store: state.store
    }
  };
  
  export default connect(mapStateToProps, { 
    getTransactionHistory,
    updateState
})(Etopup);


const styles = StyleSheet.create({
    
    paneTwo: {
      flex:1,
      width:'100%',
    },
    table: {
        backgroundColor: AppColors.white,
        width:RW(100)
    },
    header: {
        flexDirection: "row",
        backgroundColor: '#1455A9',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:RH(2)
      },
    
      headers: {
        width:'20%'
      },      
      col:{
        width:'20%',
        paddingVertical:RH(2)
      },
      headTxt: {
        color: AppColors.white,
        fontSize: RF(13),
        textAlign: "center",
        fontFamily:'Montserrat-Regular'
      },
      rows: {
        flexDirection: "row",
        backgroundColor:'#F5F5F5',
        flex:1,
        marginVertical:RH(1)
      },
      tableTxt: {
        textAlign: "center",
        fontSize: RF(13),
        color: AppColors.white,
        fontFamily:'Montserrat-Regular'
      },
      switchWrp:{
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        width:RW(100),
        marginBottom:RH(2)
      },
      switch:{
        width:'55%',
        borderColor:'#fe6215',
        borderWidth:1,
        alignItems:'center',
        backgroundColor:AppColors.white
      },
      switchBtn:{
        width:'100%',
        paddingVertical:RH(3),
        paddingHorizontal:15
      },
      txt:{
        color: '#808080',
        fontFamily:'Montserrat-Regular',
        fontSize:RF(12)
      }
});