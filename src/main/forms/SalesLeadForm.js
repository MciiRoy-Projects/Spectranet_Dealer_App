import React from 'react';
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
  Touch,
  H2,
  PageTitle,
  Loading
} from '../../partials/_components';
import AppColors from '../../lib/_colors';
import AppIcons from '../../partials/_icons';
import {RF, RW, RH} from '../../lib/_sizes';
import {getData, idCheck, Snack, requestForm} from '../../partials/_api';
const subjects = ['Customers WTTH', 'Customers FTTH'];
import {FormMessage} from './_partials';

let RegFont = '';
Platform.OS == 'ios'
  ? (RegFont = 'Product Sans')
  : (RegFont = 'Product Sans Regular');

Platform.OS == 'ios' ? (fontWeight = 'bold') : (fontWeight = 'normal');

import {updateState} from '../../actions';
import {connect} from 'react-redux';

class SalesLeadForm extends React.Component {
  constructor(props) {
    super(props);
    this.props.updateState("isLoadingBg",true);
    this.props.updateState('message','');
    this.props.updateState('phonenumber','');
    this.props.updateState('address','');
    this.props.updateState('subject','* Choose Subject'); 
  }
  
  init() {
    const {navigation} = this.props;
    getData('userDetails').then(res => {
      if (res) {
        res = JSON.parse(res);
        let userId = idCheck(res, 'userId');
        let email = idCheck(res, 'email');
        let name = `${idCheck(res, 'firstName')}`;
        this.props.updateState('userId',userId);
        this.props.updateState('email',email);
        this.props.updateState('name',name);
        this.props.updateState('isLoadingBg', false);
      }
    });
  }

  submit = () => {
    if (
      this.props.store.userId == '' ||
      this.props.store.email == '' ||
      this.props.store.name == '' ||
      this.props.store.phonenumber == '' ||
      this.props.store.address == '' ||
      this.props.store.subject == '* Choose Subject' ||
      this.props.store.message == ''
    ) {
      Snack('Fields with * are required');
      return;
    }
    
    this.props.updateState('isLoading', true);
    
    const fd = `userId=${this.props.store.userId}&address=${this.props.store.address}&phone=${this.props.store.phonenumber}&email=${this.props.store.email}&name=${this.props.store.name}&subject=${this.props.store.subject}&message=${this.props.store.message}&type=${"Sales Lead Form"}`;
    
    requestForm(fd)
      .then(res => {
        if (res.data.status == true) {
          this.props.updateState('isLoading',false);
          this.props.updateState('isPopupFormSent',true);
        }
      })
      .catch(err => Snack('Connection Error. Please try again later'))
      .then(() => this.props.updateState('isLoading', false));
  };

  onMsgChange(text){
    this.props.updateState('message',text)
  }

  onPhoneChange(text){
    this.props.updateState('phonenumber',text)
  }

  onAddressChange(text){
    this.props.updateState('address',text)
  }

  componentDidMount() {
    this.init();
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
          <PageTitle title={"Enterprise Sales Lead Form"} style={styles.text} />  
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
              value={this.props.store.phonenumber}
              style={styles.input2}
              placeholder="* Contact Number"
              placeholderTextColor = "#ABABAB"
              keyboardType={"numeric"}
              onChangeText={this.onPhoneChange.bind(this)}
            />

            <TextInput
              value={this.props.store.address}
              style={styles.input2}
              placeholder="* Address"
              placeholderTextColor = "#ABABAB"
              onChangeText={this.onAddressChange.bind(this)}
            />

            <Touch
              style={styles.input}
              onPress={() => this.props.updateState('isPopup', true)}>
              {this.props.store.subject !== '* Choose Subject' ? (
                <H2 style={styles.text1}>{this.props.store.subject}</H2>
              ) : (
                <H2 style={styles.text2}>{this.props.store.subject}</H2>
              )}
            </Touch>

            <TextInput
              style={styles.textbox}
              value={this.props.store.message}
              placeholder="* Description"
              placeholderTextColor = "#ABABAB"
              multiline={true}
              numberOfLines={5}
              onChangeText={this.onMsgChange.bind(this)}
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
                      this.props.updateState('subject', el);
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

        {this.props.store.isPopupFormSent ? (
            <FormMessage 
                action={() => {
                  this.props.navigation.goBack(); 
                  this.props.updateState('isPopupFormSent', false)} 
                } 
                imageSource={AppIcons.closeform}
                text={"Incentives can be gotten from Enterprise Leads"} 
            />) : null
        }

        

        {this.props.store.isLoadingBg ? <Loading /> : null}

      </WrapperMain>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      store: state.store
  }
};

export default connect(mapStateToProps, {updateState})(SalesLeadForm);

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
    fontFamily:'Montserrat-Regular',
    paddingVertical: RH(2),
    marginBottom: RH(1),
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 0.8,
    height: RH(15),
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
  btnWrp: {
    flex:1,
    alignItems: "center",
    justifyContent:'center',
    marginVertical:RH(5)
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