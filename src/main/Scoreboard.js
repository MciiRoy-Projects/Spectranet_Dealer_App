import React from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {Header, WrapperMain, PageTitle} from '../partials/_components';

import {RW, RH} from '../lib/_sizes';
import {List} from '../main/ScoreboardComponents/_list';

const data = [
  {
    item: 'Available Stock',
    num: 0,
    data: [],
    code: 'dealerAvailableStockData',
  },
  {
    item: 'Activation Data/Sales Data',
    num: 0,
    data: [],
    code: 'activations',
  },
  {item: 'E-Top Up', num: 0, data: [], code: 'e_top_up'},
  {
    item: 'Stock purchase for the month',
    num: 0,
    data: [],
    code: 'mtd_stock_purchase',
  },
];

export default class Scoreboard extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <WrapperMain style={{paddingHorizontal: RW(6)}}>
        <View>
          <Header
            openDrawer={() => navigation.openDrawer()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <PageTitle title={'Scoreboard'} />
        </View>

        <View style={styles.paneTwo}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <List
              title="Available Stock"
              goto={() => navigation.navigate('ScoreboardView')}
            />
            <List
              title={'Activation & Sales Data'}
              goto={() => navigation.navigate('Activation')}
            />
            <List title="E-Top Up" goto={() => navigation.navigate('Etopup')} />
            <List
              title="Stock Purchase For The Month"
              goto={() => navigation.navigate('PurchaseForDMth')}
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
    marginHorizontal: RW(3),
    paddingVertical: RH(2),
    borderRadius: RH(2),
  },
});
