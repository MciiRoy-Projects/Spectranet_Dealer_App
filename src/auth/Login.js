import React from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
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

export default class Login extends React.Component {
  state = {
    ID: '',
    pass: '',
  };
  render() {
    const {ID, pass} = this.state;
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

            <Button text="SIGN IN" style={styles.btn} />
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
