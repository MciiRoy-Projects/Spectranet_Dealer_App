import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Image
} from 'react-native';
import {
  WrapperMain,
  H1,
  HeaderBack,
  Loading,
  PageTitle,
  Touch,
  H2
} from '../../partials/_components';
import AppColors from '../../lib/_colors';
import AppIcons from '../../partials/_icons';
import {RF, RW, RH} from '../../lib/_sizes';
import {
  getData,
  idCheck,
  requestForm,
  keyContact,
  Snack,
} from '../../partials/_api';
import {updateState} from '../../actions';
import {connect} from 'react-redux';
import {FormMessage} from './_partials';
const subjects = ['FREEDOM MIFI', 'EVO MIFI', 'Blaze CPE', 'Car Mifi', 'ACE', 'VirtualIMEI', 'Others'];

let RegFont = '';
Platform.OS == 'ios'
  ? (RegFont = 'Product Sans')
  : (RegFont = 'Product Sans Regular');

Platform.OS == 'ios' ? (fontWeight = 'bold') : (fontWeight = 'normal');

class StockPurchaseForm extends React.Component {
  constructor(props) {
    super(props);
    this.props.updateState("isLoadingBg",true);
    this.props.updateState('skuqty','');
    this.props.updateState('skulabel','* Choose SKU'); 
  }


  init() {
    getData('userDetails').then(res => {
      if (res) {
        res = JSON.parse(res);
        let userId = idCheck(res, 'userId');
        let email = idCheck(res, 'email');
        let name = `${idCheck(res, 'firstName')}`;        
        this.getTsm(userId);
        this.props.updateState('userId',userId);
        this.props.updateState('email',email);
        this.props.updateState('name',name);
        this.props.updateState('isLoadingBg', false);
      }
    });
  }

  getTsm = userId => {
    keyContact(userId)
      .then(res => {
        res = res.data;
        //console.warn(res);
        if (res.success == true) {
          this.props.updateState('tsm', res.data.tsmname);
          this.props.updateState('tsmemail', res.data.tsmemail);
          this.props.updateState('superdealeremail', res.data.sdemail);
          this.props.updateState('superdealername', res.data.sdname);
          this.props.updateState('isLoadingBg', false);
        }
      })
      .catch(() => Snack('Connection Error. Please try again later'))
      .then(() => this.props.updateState('isLoading', false));;
  };

  submit(){
    if (
      this.props.store.userId == '' ||
      this.props.store.name == '' ||
      this.props.store.skulabel == '' ||
      this.props.store.skulabel == '* Choose SKU' ||
      this.props.store.skuqty == '' ||
      this.props.store.type == ''
    ) {
      Snack('Fields with * are required');
      return;
    }

    this.props.updateState('isLoading', true);
    const fd = `userId=${this.props.store.userId}&email=${this.props.store.email}&name=${this.props.store.name}&subject=${this.props.store.stockPurchaseFormSub}&type=${"Stock Purchase Form"}&quantity=${this.props.store.skuqty}&product=${this.props.store.skulabel}&tsm=${this.props.store.tsm}&tsmemail=${this.props.store.tsmemail}`;
    
    requestForm(fd)
      .then(res => {
        if (res.data.status == true) {
          this.props.updateState('isPopupFormSent',true);
          this.props.updateState('isLoading',false);
        }
      })
      .catch(err => Snack('Connection Error. Please try again later'))
      .then(() => this.props.updateState('isLoading', false));
  };

  componentDidMount() {
    this.init();
  }

  onIdChange(text){
    this.props.updateState('customerId',text)
  }

  onMsgChange(text){
    this.props.updateState('message',text)
  }

  onSkuQtyChange(text){
    this.props.updateState('skuqty',text)
  }

  render() {
    const {navigation} = this.props;
    
    return (
      <WrapperMain>
        <View>
          <HeaderBack
            goBack={() => navigation.goBack()}
            openProfile={() => {
              navigation.navigate('Profile');
            }}
          />
          <PageTitle title={"Stock Purchase Form"} style={styles.text} />          
        </View>
          
        
        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
          <View style={styles.paneTwo}>
            <H1 style={styles.textOne}>{navigation.state.params}</H1>
            
            <TextInput
              value={this.props.store.userId}
              style={styles.input2}
              placeholder="Dealer User ID"
              placeholderTextColor = "#ABABAB"
              editable={false}
            />

            <TextInput
              value={this.props.store.name}
              style={styles.input2}
              placeholder="Dealer Name"
              placeholderTextColor = "#ABABAB"
              editable={false}
            />

            <TextInput
              style={styles.input}
              placeholder="*Subject"
              placeholderTextColor = "#ABABAB"
              value={this.props.store.stockPurchaseFormSub}              
              editable={false}
            />

            <Touch
              style={styles.input}
              onPress={() => this.props.updateState('isPopup', true)}>
              {this.props.store.skulabel !== '* Choose SKU' ? (
                <H2 style={styles.text1}>{this.props.store.skulabel}</H2>
              ) : (
                <H2 style={styles.text2}>{this.props.store.skulabel}</H2>
              )}
            </Touch>

            <TextInput
              style={styles.input}
              placeholder="* Qty"
              placeholderTextColor = "#ABABAB"s              
              keyboardType="numeric"
              value={this.props.store.skuqty}
              onChangeText={this.onSkuQtyChange.bind(this)}
            />
            
          </View>
          {this.props.store.isLoading ? (
            <ActivityIndicator style={{marginTop: RH(1)}} size="large" color={AppColors.white} />
          ) : (
            <View style={styles.btnWrp}>                    
              <TouchableOpacity
                onPress={this.submit.bind(this)}
                style={styles.btn}
              >
                <Image style={styles.btnBg} 
                  source={require('../../../assets/img/submit.png')} />                            
              </TouchableOpacity>

            </View>
          )}
        </ScrollView>
        

          {this.props.store.isPopup ? (
            <View style={styles.popup}>
              <View style={styles.options}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {subjects.map((el, key) => (
                    <Touch
                      key={key}
                      style={styles.optionItems}
                      onPress={() =>{
                        this.props.updateState('skulabel', el);
                        this.props.updateState('isPopup', false); 
                      }
                      }>
                      <H2 style={{fontSize: RF(16)}}>{el}</H2>
                    </Touch>
                  ))}
                </ScrollView>
              </View>
              <Touch
                style={styles.closeBtn}
                onPress={() => this.props.updateState('isPopup', false)}>
                <Image 
                  source={AppIcons.closeform} 
                  resizeMode="contain"
                  style={{
                    height: RH(8), 
                    width: RW(15),          
                    }}
                />
              </Touch>
            </View>
          ) : null}
        
        {this.props.store.isLoadingBg ? <Loading /> : null}

        {this.props.store.isPopupFormSent ? (
          <FormMessage 
              action={() => {
                this.props.navigation.goBack(); 
                this.props.updateState('isPopupFormSent', false)} } 
              imageSource={AppIcons.closeform}       
          />) : null
        }
      </WrapperMain>
    );
  }
}



const mapStateToProps = (state) => {
  return {
      store: state.store
  }
};

export default connect(mapStateToProps, {updateState})(StockPurchaseForm);

const styles = StyleSheet.create({
  paneOne: {
    padding: RW(6),
    height: RH(40),
  },
  paneTwo: {
    marginTop: RH(1),
    backgroundColor: '#fff',
    paddingVertical: RH(4),
    paddingHorizontal: RW(6),
    borderRadius: RH(5),
    flex: 1,
    paddingBottom: RH(2),
  },
  textOne: {
    color: AppColors.pumpkin,
    fontSize: RF(15),
    marginBottom: RH(2),
  },
  input: {
    fontSize: RF(17),
    fontFamily: 'Montserrat-Regular',
    paddingVertical: RH(2),
    marginVertical: RH(0.7),
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 0.8,
    color:'#ABABAB'
  },
  input2: {
    fontSize: RF(17),
    fontFamily:'Montserrat-Regular',
    paddingVertical: RH(2),
    marginVertical: RH(0.7),
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 0.8,
    opacity: 0.8,
    color:'#ABABAB'
  },
  textbox: {
    fontSize: RF(17),
    fontFamily: 'Montserrat-Regular',
    paddingVertical: RH(2),
    marginBottom: RH(1),
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 0.8,
    height: RH(15),
    color:'#ABABAB'
  },
  btnWrp: {
    flex:1,
    alignItems: "center",
    justifyContent:'center',
    marginVertical:RH(5)
  },
  btn:{
    width:'50%',
    height:50,                         
    position:'relative',
    borderRadius:RH(15)
  },
  text:{
    color: AppColors.white,
    fontFamily:'Montserrat-Regular',
    marginBottom: RH(5),
    paddingVertical:RH(1),
    fontSize:RF(18)
  },
  text1:{
    color:'#ABABAB'
  },
  text2:{
    color:'#ABABAB'
  },
  btnBg:{
    width:'100%',
    height:'100%',
    borderRadius:RH(15)
  },
  popup: {
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: RW(100),
    height: RH(100),
    justifyContent: 'center',
    alignItems: 'center'
  },
  options: {
    height: '50%',
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: RH(1),
    padding: RW(5),
  },
  optionItems: {
    paddingVertical: RH(2),
    borderBottomColor: AppColors.veryLightPink,
    borderBottomWidth: RH(0.3),
    fontSize: RF(17),
    fontFamily: 'Montserrat-Regular'
  },
  closeBtn: {
    width: '80%',
    padding: RH(2),
    borderRadius: RH(1),
    marginTop: RH(1),
    alignItems: 'center',
  },
});
