import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  Wrapper,
  Card,
  ColoredInput,
  P,
  H1,
  H2,
  Button,
  Touch,
} from '../partials/_components';
import {RF, RW, RH} from '../lib/_sizes';
import AppColors from '../lib/_colors';
import {userLogin, storeData} from '../partials/_api';

export default class Login extends React.Component {
  state = {
    ID: 'testphcaffiliate',
    pass: '123',
    isLoading: false,
  };

  loginApp = () => {
    const {ID, pass} = this.state;
    if (ID == '' || pass == '') {
      return;
    }
    this.setState({isLoading: true});
    userLogin(ID, pass)
      .then(res => {
        if (res == false) {
          alert(res);
        }
        res = res.data;
        if (res.length > 0) {
          res = res[1];
          if (res.status == true) {
            storeData(res.msg)
              .then(e => {
                this.setState({isLoading: false});
                this.props.navigation.navigate('DrawerNavigator');
              })
              .catch(err => {
                this.setState({isLoading: false});
                console.warn(err);
              });
          }
        }
      })
      .catch(err => {
        this.setState({isLoading: false});
        console.warn(err);
      });
  };

  render() {
    const {ID, pass, isLoading} = this.state;

    return (
      <Wrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <H1 style={styles.header}>LOGIN</H1>
          <Card>
            <View style={styles.form}>
              <Image
                source={require('../../assets/img/AgentLogoDark.png')}
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  height: RH(15),
                  marginBottom: RH(0),
                }}
                resizeMode="contain"
              />
              {/*<P style={styles.label}>Dealer ID</P>*/}
              <ColoredInput
                placeholder="Dealer ID"
                onChangeText={ID => this.setState({ID})}
                value={ID}
                style={styles.input}
                type="next"
              />

              {/*<P style={styles.label}>Password</P>*/}
              <ColoredInput
                placeholder="Password"
                secure={true}
                onChangeText={pass => this.setState({pass})}
                value={pass}
                style={styles.input}
                type="done"
              />
            </View>

            {isLoading ? (
              <ActivityIndicator
                size="large"
                color={AppColors.cobalt}
                style={{
                  marginTop: RH(1),
                  marginBottom: RH(5),
                }}
              />
            ) : (
              <Button
                text="SIGN IN"
                style={styles.btn}
                onPress={() => this.loginApp()}
              />
            )}
          </Card>

          {/*
          <Touch style={styles.touch}>
            <H2 style={styles.text1}>Dont have a dealer account?</H2>
          </Touch>

          <Touch style={styles.touch2}>
            <H1 style={styles.text2}>Sign Up now.</H1>
          </Touch>
          */}
        </ScrollView>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: RH(8),
    marginBottom: RH(2),
    fontSize: RF(23),
    color: AppColors.cobalt,
  },
  form: {
    padding: RW(8),
  },
  label: {
    marginTop: RH(2),
    fontSize: RF(14),
    color: AppColors.brownishGrey,
  },
  btn: {
    width: RW(70),
    alignSelf: 'center',
    marginTop: RH(1),
    marginBottom: RH(5),
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
