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
} from '../partials/_components';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';

const data = [
  {item: 'MTD Stock Purchase', num: 1234},
  {item: 'Available Stock', num: 234},
  {item: 'MTD Activations', num: 1423},
  {item: 'Data Incentives', num: 14},
];

export default class Scoreboard extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <Header
            openDrawer={() => navigation.openDrawer()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <Title> Scoreboard</Title>
        </View>

        <View style={styles.paneTwo}>
          <ScrollView>
            <LiImage icon={AppIcons.mtdSales} text="Stock Purchase" />
            <LiImage icon={AppIcons.mtdSales} text="Activations" />
            <LiImage icon={AppIcons.incentives} text="Inventive" />
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
