import React from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {
  Header,
  WrapperMain,
  H1,
  H2,
  Title,
  Card,
  Touch,
  LiImage,
  HeaderBack,
} from '../partials/_components';

import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';

export default class IncentiveView extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <HeaderBack
            goBack={() => navigation.goBack()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <Title> Scoreboard</Title>
        </View>

        <View style={styles.paneTwo}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <LiImage
              icon={AppIcons.mtdSales}
              text="Dealer"
              onPress={() => navigation.navigate('IncentiveHtml', 'Dealer')}
            />

            <LiImage
              icon={AppIcons.mtdSales}
              text="Franchise"
              onPress={() => navigation.navigate('IncentiveHtml', 'Franchise')}
            />

            <LiImage
              icon={AppIcons.mtdSales}
              text="Super Dealer"
              onPress={() =>
                navigation.navigate('IncentiveHtml', 'Super Dealer')
              }
            />
          </ScrollView>
        </View>
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
    marginTop: RH(1),
    backgroundColor: '#fff',
    paddingVertical: RH(4),
    paddingHorizontal: RW(6),
    borderTopLeftRadius: RH(5),
    borderTopRightRadius: RH(5),
    flex: 1,
  },
});
