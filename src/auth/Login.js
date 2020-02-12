import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Text,
  Button,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Wrapper,
  Card,
  ColoredInput,
  H1,
} from '../partials/_components';
import {RF, RW, RH} from '../lib/_sizes';
import AppColors from '../lib/_colors';
import {userLogin, storeData, Snack, clearAll, getData} from '../partials/_api';
import BgImage from '../../assets/img/RIBBONS.png';

export default class Login extends React.Component {
  state = {
    //ID: 'LGX007-Kemasho',
    //pass: 'LGX007-Kemasho',
    ID: '',
    pass: '',
    isLoading: false,
  };

  loginApp = () => {
    this.KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide');
    const {ID, pass} = this.state;
    if (ID == '' || pass == '') {
      
      Snack('Fields marked * are required');
      return;
    }
    this.setState({isLoading: true});
    userLogin(ID, pass)
      .then(res => {
        let userDetails = [];
        res = res.data;
        this.setState({isLoading: false});

        if (res.length == 4) {
          res.forEach((el, i) => {
            if (el.name == 'userDetails') {
              userDetails = el.msg;
            }
          });
          if (userDetails.length > 0) {
            if (userDetails == 'Wrong Username or Password') {
              clearAll();
              Snack(userDetails);
              return;
            }
            storeData('userDetails', userDetails)
              .then(e => {
                this.props.navigation.navigate('DrawerNavigator');
              })
              .catch(err => {
                this.setState({isLoading: false});
                console.log(err);
              });
          } else {
            Snack('Oops! Please try again');
          }
        } else {
          this.setState({isLoading: false});
          Snack('Oops! Please try again');
        }
      })
      .catch(err => {
        this.setState({isLoading: false});
        Snack('Oops! Please try again');
      });
  };

  render() {
    const {ID, pass, isLoading} = this.state;

    return (
      <Wrapper>
        <ImageBackground
          source={BgImage}
          resizeMode="contain"
          style={{
            flex: 1,            
            backgroundColor: '#1455A9',
            height:RH(100),  
                  
        }}>
          <StatusBar
            backgroundColor={AppColors.fadeBlue}
            barStyle="dark-content"
          />
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
              <View style={{
                flex:1,
                alignItems:'center',
                justifyContent:'center',
                paddingVertical: RH(15)
                
              }}>
               
            
          <Image
                source={require('../../assets/img/AgentLogoDark.png')}
                style={{
                  width: '100%',
                  height: RH(15),
                  marginBottom: RH(0),
                }}
                resizeMode="contain"
          />
          <H1 style={styles.header}>LOGIN</H1>
          <Card>
            <View style={styles.form}>
              <ColoredInput
                placeholder="CRM User ID"
                onChangeText={ID => this.setState({ID})}
                value={ID}
                style={styles.input}
                type="next"
                label="Dealer ID"
              />
              
              <ColoredInput
                placeholder="CRM Password"                
                secure={true}
                onChangeText={pass => this.setState({pass})}
                value={pass}
                style={styles.input}
                type="done"
                label="Password"
              />

              {isLoading ? (
                  <ActivityIndicator
                    size="large"
                    color={AppColors.white}
                    style={{
                      marginTop: RH(1),
                      marginBottom: RH(5),
                    }}
                  />
                ) : (

                  <View style={styles.btnWrp}>
                      
                        <TouchableOpacity
                          onPress={() => this.loginApp()}
                          style={styles.btn}
                        >
                          <Image 
                            style={styles.btnBg} 
                            source={require('../../assets/img/btnBg.png')}
                            resizeMode="cover"
                             />                            
                        </TouchableOpacity>
                  </View>
            )}


            </View>
          </Card>

        </View>
            </ScrollView>
        </ImageBackground>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginVertical: RH(5),
    fontSize: RF(23),
    fontFamily:'Montserrat-Regular',
    color: AppColors.white,
  },
  form: {
    paddingHorizontal: RW(8),
  },
  label: {
    marginTop: RH(2),
    fontSize: RF(14),
    color: AppColors.brownishGrey,
  },
  btnWrp: {
    flex:1,
    alignItems: "center",
    justifyContent:'center',
    marginVertical:RH(5)
  },
  btn:{
    width:'70%',
    height:50,                         
    position:'relative',
    borderRadius:RH(15)
  },
  btnBg:{
    width:'100%',
    height:'100%',
    borderRadius:RH(15)
  },
  touch: {
    alignSelf: 'center',
  },
  touch2: {
    marginTop: RH(1),
    alignSelf: 'center',
  },
  text1: {
    fontSize: RF(18),
    color: AppColors.blueyGrey,
  },
  text2: {
    fontSize: RF(18),
    color: AppColors.cobalt,
  },
  input: {
    marginBottom: RH(3),
  },
});
