import React from 'react';
import {View, Text, StatusBar} from 'react-native';

export default class Login extends React.Component {
  render() {
    return (
      <View>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Text>Login</Text>
      </View>
    );
  }
}
