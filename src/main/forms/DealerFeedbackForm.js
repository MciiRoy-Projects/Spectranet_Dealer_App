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
import {
  PageTitle,
  WrapperMain,
  H1,
  HeaderBack,
  Loading
} from '../../partials/_components';
import AppColors from '../../lib/_colors';
import AppIcons from '../../partials/_icons';
import {RF, RW, RH} from '../../lib/_sizes';
import {getData, idCheck, requestForm, Snack} from '../../partials/_api';
import {updateState} from '../../actions';
import {connect} from 'react-redux';
import {FormMessage} from './_partials';

let RegFont = '';
Platform.OS == 'ios'
  ? (RegFont = 'Product Sans')
  : (RegFont = 'Product Sans Regular');

Platform.OS == 'ios' ? (fontWeight = 'bold') : (fontWeight = 'normal');

class DealerFeedbackForm extends React.Component {
  constructor(props) {
    super(props);
    this.props.updateState("isLoadingBg",true);
    this.props.updateState('plainSubject','');
    this.props.updateState('message',''); 
  }

  init() {
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
      this.props.store.plainSubject == '' ||
      this.props.store.message == '' ||
      this.props.store.type == ''
    ) {
      Snack('Fields with * are required');
      return;
    }

    this.props.updateState('isLoading', true);
    const fd = `userId=${this.props.store.userId}&email=${this.props.store.email}&name=${this.props.store.name}&subject=${this.props.store.subject}&message=${this.props.store.message}&type=${"Feedback Form"}`;
    requestForm(fd)
      .then(res => {
        if (res.data.status == true) {
          this.props.updateState('isPopupFormSent',true)
        }
      })
      .catch(err => Snack('Connection Error. Please try again later'))
      .then(() => this.props.updateState('isLoading', false));
  };

  componentDidMount() {
    this.init();
  }

  onMsgChange(text){
    this.props.updateState('message',text)
  }

  onSubjectChange(text){
    this.props.updateState('plainSubject',text)
  }

  render() {
    const {navigation} = this.props;
    return (
      <WrapperMain>
        <View>
          <HeaderBack
            goBack={() => {
              navigation.goBack();
              this.props.updateState('plainSubject','');
              this.props.updateState('message','');
            }}
            openProfile={() => navigation.navigate('Profile')}
          />
          <PageTitle title={"Feedback Form"} style={styles.text} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.paneTwo}>
          <H1 style={styles.textOne}>{navigation.state.params}</H1>
          
            <TextInput
              value={this.props.store.userId}
              style={styles.input2}
              placeholder="Dealer ID"
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
              placeholder="* Subject"
              placeholderTextColor = "#ABABAB"
              value={this.props.store.plainSubject}
              onChangeText={this.onSubjectChange.bind(this)}
            />
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
          {this.props.store.isPopupFormSent ? (
            <FormMessage 
                action={() => {
                  this.props.navigation.goBack(); 
                  this.props.updateState('isPopupFormSent', false)
                }} 
                imageSource={AppIcons.closeform}       
            />) : null
          }   

          {this.props.store.isLoadingBg ? <Loading />: null}    
      </WrapperMain>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      store: state.store
  }
};

export default connect(mapStateToProps, {updateState})(DealerFeedbackForm);

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
    fontFamily: 'Montserrat-Regular',
    paddingVertical: RH(2),
    marginVertical: RH(0.7),
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 0.8,
    color:'#ABABAB'
  },
  input2: {
    fontSize: RF(17),
    fontFamily: 'Montserrat-Regular',
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
  text:{
    color: AppColors.white,
    fontFamily:'Montserrat-Regular',
    marginBottom: RH(5),
    paddingVertical:RH(1),
    fontSize:RF(18)
  },
});
