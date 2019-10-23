import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {WrapperMain, HeaderBack, Title} from '../partials/_components';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';
import WebView from 'react-native-webview';

export default class IncentiveHtml extends React.Component {
  render() {
    const {navigation} = this.props;
    const pageTitle = navigation.state.params;
    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <HeaderBack
            goBack={() => navigation.goBack()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <Title> {pageTitle}</Title>
        </View>
        <View style={styles.webview}>
          <WebView></WebView>
        </View>
      </WrapperMain>
    );
  }
}

const styles = StyleSheet.create({
  webview: {
    paddingHorizontal: RW(8),
    paddingTop: RH(1),
    flex: 1,
  },
});
