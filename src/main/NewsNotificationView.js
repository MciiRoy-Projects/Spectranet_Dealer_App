import React from 'react';
import {View, StyleSheet, ScrollView, Image, Text} from 'react-native';
import {
  HeaderBack,
  WrapperMain,
  P,
  H2,
  PageTitle,
} from '../partials/_components';
import AppColors from '../lib/_colors';
import {RF, RW, RH} from '../lib/_sizes';

export default class NewsNotificationView extends React.Component {
  render() {
    const {navigation} = this.props;
    const data = navigation.state.params;
    let stringData = JSON.stringify(data.content);
    var json = JSON.parse(stringData);
    let body = json.replace(/(\\r)*\\n/g, '\n');
    return (
      <WrapperMain>
        <View>
          <HeaderBack
            goBack={() => navigation.goBack()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <PageTitle title={'News & Notifications'} />

          <Text style={styles.text}>{data.item}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.paneTwo}>
            <View style={{marginTop: RH(1)}}>
              <H2 style={styles.two}>
                <Text>{body}</Text>
              </H2>
            </View>
          </View>
        </ScrollView>
      </WrapperMain>
    );
  }
}

const styles = StyleSheet.create({
  paneOne: {
    padding: RW(6),
    height: RH(40),
  },
  paneTwo: {
    marginTop: RH(3),
    backgroundColor: '#fff',
    paddingHorizontal: RW(6),
    borderRadius: RH(2),
    flex: 1,
    //marginHorizontal: RW(3),
    paddingVertical: RH(2),
  },
  grid: {
    paddingVertical: RH(2.3),
  },

  one: {
    fontSize: RF(12),
    color: AppColors.greyishBrown,
    paddingRight: RW(10),
    opacity: 0.7,
  },

  header: {
    fontSize: RF(22),
    color: AppColors.cobalt,
    paddingRight: RW(5),
  },
  two: {
    fontSize: RF(18),
    lineHeight: RF(25),
    color: AppColors.greyishBrown,
  },
  text: {
    color: AppColors.white,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: RW(2),
    marginTop: RH(2),
  },
});
