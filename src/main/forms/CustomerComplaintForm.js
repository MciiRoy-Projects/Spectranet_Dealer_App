import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Platform,
  Image,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import {
  WrapperMain,
  H1,
  HeaderBack,
  Touch,
  H2,
  PageTitle,
  Loading
} from '../../partials/_components';
import {FormMessage} from './_partials';
import AppColors from '../../lib/_colors';
import AppIcons from '../../partials/_icons';
import {updateState} from '../../actions'
import {RF, RW, RH} from '../../lib/_sizes';
import {getData, idCheck, Snack, requestForm} from '../../partials/_api';

const subjects = [
  'Recharge Redirect Page',
  'Slow Internet Speed',
  'Connected But Not Browsing',
  'Device Not Working',
  "Can't Recharge - RCV",
  'Complaint Not Receiving Bill',
  'Complaint On Payment',
  'Complaint On Refund',
  'Not Receiving Registration Validation E-Mail',
  'Balance/Billed or Unbilled Bandwidth Query',
  'Network Coverage Area',
  'Payment Options',
  'Service Suspension/ Reactivation',
  'Bill/Usage Details Request',
  'Change In Customer Details',
  'Service Activation',
  'Duplicate Bill Request',
  'Itemized - Printed Bill',
  'Others',
];

let RegFont = '';
Platform.OS == 'ios'
  ? (RegFont = 'Product Sans')
  : (RegFont = 'Product Sans Regular');

Platform.OS == 'ios' ? (fontWeight = 'bold') : (fontWeight = 'normal');

class CustomerComplaintForm extends React.Component {
  constructor(props) {
    super(props);
    this.props.updateState("isLoadingBg",true);
    this.props.updateState('message','');
    this.props.updateState('subject','* Choose Subject'); 
    this.props.updateState('customerId',''); 
  }

  init() {
    const {navigation} = this.props;

    getData('userDetails')
    .then(res => {
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

  submit(){
    if (
      this.props.store.userId == '' ||
      this.props.store.email == '' ||
      this.props.store.name == '' ||
      this.props.store.subject == '* Choose Subject' ||
      this.props.store.message == '' ||
      this.props.store.customerId == ''
    ) {
      
      Snack('Fields with * are required');
      return;
    }
    this.props.updateState('isLoading',true);
    
    const fd = `userId=${this.props.store.userId}&email=${this.props.store.email}&name=${this.props.store.name}&subject=${this.props.store.subject}&message=${this.props.store.message}&type=${"Customer Complaint Form"}&customerId=${this.props.store.customerId}&customerName=${this.props.store.customerName}`;
    requestForm(fd)
      .then(res => {
        if (res.data.status == true) {
          this.props.updateState('isPopupFormSent',true);
          this.props.updateState('isLoading',false);
        }
      })
      .catch(err => Snack('Connection Error. Please try again later'))
      .then(() => this.props.updateState('isLoading',false));
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
            <PageTitle title={"Customer Complaint Form"} style={styles.text} /> 
          
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.paneTwo}>
            <H1 style={styles.textOne}>{navigation.state.params}</H1>
            
              <TextInput
                value={this.props.store.name}
                style={styles.input2}
                placeholder="Dealer Name"
                placeholderTextColor = "#ABABAB"
                editable={false}
              />

              <TextInput
                style={styles.input}
                placeholder="* Customer ID"
                placeholderTextColor = "#ABABAB"
                value={this.props.store.customerId}
                onChangeText={this.onIdChange.bind(this)}
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
                onChangeText={this.onMsgChange.bind(this)}
                multiline={true}
                numberOfLines={5}
              />

              


            </View>
            {this.props.store.isLoading ? (
                <ActivityIndicator style={{marginTop: RH(1)}} size="large" color={AppColors.cobalt} />
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
                      }}>
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

          {
            this.props.store.isPopupFormSent ? (
            <FormMessage 
                action={() => {
                  this.props.navigation.goBack(); 
                  this.props.updateState('isPopupFormSent', false)
                }} 
                imageSource={AppIcons.closeform}       
            />
            ) : null
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

export default connect(mapStateToProps, {updateState})(CustomerComplaintForm);

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
  },
  textOne: {
    color: AppColors.pumpkin,
    fontSize: RF(15),
    marginBottom: RH(2),
  },
  input: {
    fontSize: RF(17),
    fontFamily: "Montserrat-Regular",
    paddingVertical: RH(2),
    marginVertical: RH(0.7),
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 0.8,
    color:'#ABABAB'
  },
  text1: {
    fontSize: RF(17),
    fontFamily: "Montserrat-Regular",
  },
  text2: {
    opacity: 0.3,
    fontSize: RF(17),
    fontFamily: "Montserrat-Regular",
  },
  text:{
    color: AppColors.white,
    fontFamily:'Montserrat-Regular',
    marginBottom: RH(5),
    paddingVertical:RH(1),
    fontSize:RF(18)
  },
  input2: {
    fontSize: RF(17),
    fontFamily: "Montserrat-Regular",
    paddingVertical: RH(2),
    marginVertical: RH(0.7),
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 0.8,
    opacity: 0.8,
    color:'#ABABAB'
  },
  textbox: {
    fontSize: RF(17),
    fontFamily: "Montserrat-Regular",
    paddingVertical: RH(2),
    marginBottom: RH(1),
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 0.5,
    height: RH(15),
    color:'#ABABAB'
  },
  btnWrp: {
    flex:1,
    alignItems: "center",
    justifyContent:'center',
    marginTop:RH(5)
  },
  btn:{
    width:'50%',
    height:50,                         
    position:'relative',
    borderRadius:RH(15)
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
    fontFamily: 'Montserrat-Regular',
  },
  closeBtn: {
    width: '80%',
    padding: RH(2),
    borderRadius: RH(1),
    marginTop: RH(1),
    alignItems: 'center',
  },
});
