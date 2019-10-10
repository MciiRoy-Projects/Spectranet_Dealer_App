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
  {item: 'Available Stock', num: 0, data: [], code: 'available_stock'},
  {item: 'MTD Activations', num: 0, data: [], code: 'mtd_activations'},
  {item: 'E-Top Up', num: 0, data: [], code: 'e_top_up'},
  {item: 'MTD Stock Purchase', num: 0, data: [], code: 'mtd_stock_purchase'},
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
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((el, i) => (
              <LiImage
                key={i}
                icon={AppIcons.mtdSales}
                text={el.item}
                onPress={() => navigation.navigate('ScoreboardView', el)}
              />
            ))}
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
