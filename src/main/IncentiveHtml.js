import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {WrapperMain, HeaderBack, Title, H2} from '../partials/_components';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';
import WebView from 'react-native-webview';

const thisMonth = new Date().getMonth();
const lastMonth = thisMonth - 1;
const monthArr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export default class IncentiveHtml extends React.Component {
  render() {
    const {navigation} = this.props;
    const link = navigation.state.params.link;
    const url = `https://scm.spectranet.com.ng/${link}`;
    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <HeaderBack
            goBack={() => navigation.goBack()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <Title> Incentives</Title>
        </View>
        <View style={styles.webview}>
          <WebView source={{uri: url}} style={{flex: 1}}></WebView>
          <H2 style={{padding: RW(2), color: 'red'}}>
            Incentives earned on activations {monthArr[lastMonth]} would be
            available after 10th of {monthArr[thisMonth]} (to be updated 11th)
            and Incentive script to be updated every end of quarter by 20th
          </H2>
        </View>
      </WrapperMain>
    );
  }
}

const styles = StyleSheet.create({
  webview: {
    paddingHorizontal: RW(5),
    paddingTop: RH(1),
    flex: 1,
  },
});
