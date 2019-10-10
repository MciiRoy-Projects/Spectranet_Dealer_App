import React from 'react';
import {View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {
  Header,
  WrapperMain,
  H1,
  H2,
  Title,
  Card,
  Touch,
} from '../partials/_components';
import AppColors from '../lib/_colors';
import {RF, RW, RH} from '../lib/_sizes';
import {
  dealerStock,
  dealerPerformance,
  dealerBalance,
  dealerStockPurchase,
  storeData,
  getData,
  idCheck,
} from '../partials/_api';
import moment from 'moment';
import {Chart} from '../partials/_charts';

const data = [
  {item: 'Available Stock', num: 0, data: [], code: 'available_stock'},
  {item: 'MTD Activations', num: 0, data: [], code: 'mtd_activations'},
  {item: 'E-Top Up', num: 0, data: [], code: 'e_top_up'},
  {item: 'MTD Stock Purchase', num: 0, data: [], code: 'mtd_stock_purchase'},
];

export default class Home extends React.Component {
  state = {
    data: data,
    today: new Date(),
    refreshing: false,
  };
  init() {
    getData('userDetails').then(res => {
      if (res) {
        res = JSON.parse(res);
        let userId = idCheck(res, 'userId');
        this.loadStock(userId);
        this.loadPerformance(userId);
        this.loadETopUp(userId);
        this.loadDealerStockPurchase(userId);
      }
    });
  }

  loadStock = userId => {
    dealerStock(userId)
      .then(res => {
        const {data} = this.state;
        res = res.data;
        if (res.success == true) {
          res = res.data;
          storeData(data[0].code, res);

          let mifi = res.mifi;
          let cpe = res.cpe;

          if (mifi == null) mifi = 0;
          if (cpe == null) cpe = 0;

          data[0].num = parseInt(mifi) + parseInt(cpe);
          data[0].data = res;
          this.setState({
            data,
            refreshing: false,
          });
        }
      })
      .catch(err => console.log(err));
  };

  loadPerformance = userId => {
    dealerPerformance(userId)
      .then(res => {
        const {data} = this.state;
        res = res.data;
        if (res.success == true) {
          res = res.data;
          storeData(data[1].code, res);
          let last3month = res.last3month;
          data[1].num = parseInt(last3month);
          data[1].data = res;
          this.setState({
            data,
          });
        }
      })
      .catch(err => console.log(err));
  };

  loadETopUp = userId => {
    dealerBalance(userId)
      .then(res => {
        const {data} = this.state;
        res = res.data;
        if (res.success == true) {
          res = res.data;
          storeData(data[2].code, res);
          let amount = res.amount;
          data[2].num = parseInt(amount);
          data[2].data = res;
          this.setState({
            data,
          });
        }
      })
      .catch(err => console.log(err));
  };

  loadDealerStockPurchase = userId => {
    dealerStockPurchase(userId)
      .then(res => {
        const {data} = this.state;
        res = res.data;
        if (res.success == true) {
          res = res.data;
          storeData(data[3].code, res);
          //console.warn(res);
          /*let amount = res.amount;
          data[2].num = parseInt(amount);
          data[2].data = res;
          this.setState({
            data,
          });*/
        }
      })
      .catch(err => console.log(err));
  };

  onRefresh = () => {
    this.setState({refreshing: true});
    this.init();
  };

  componentDidMount() {
    this.init();
  }

  render() {
    const {navigation} = this.props;
    const {data, today, refreshing} = this.state;
    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <Header
            openDrawer={() => navigation.openDrawer()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <Title>Account Summary</Title>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          <Card style={styles.paneOne}>
            <Chart />
            <H1 style={styles.label}>
              Sales History ({moment(today).format('YYYY')})
            </H1>
          </Card>

          <ScrollView>
            <View style={styles.paneTwo}>
              <H1 style={styles.textOne}>Transactions</H1>

              {data.map((el, i) => (
                <Touch
                  key={i}
                  style={styles.grid}
                  onPress={() => navigation.navigate('ScoreboardView', el)}>
                  <H2 style={styles.one}>{el.item}</H2>
                  {isNaN(el.num) || el.num == 0 ? (
                    <H1 style={styles.two}>0</H1>
                  ) : (
                    <H1 style={styles.two}>{el.num}</H1>
                  )}
                </Touch>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      </WrapperMain>
    );
  }
}

const styles = StyleSheet.create({
  paneOne: {
    padding: RW(6),
    height: RH(42),
    alignItems: 'center',
    justifyContent: 'flex-end',

    marginHorizontal: RW(5),
  },
  paneTwo: {
    marginTop: RH(1.5),
    minHeight: RH(36),
    backgroundColor: '#fff',
    paddingVertical: RH(2),
    borderTopLeftRadius: RH(5),
    borderTopRightRadius: RH(5),
  },
  label: {
    fontSize: RF(14),
    marginTop: RH(2),
  },
  textOne: {
    color: AppColors.pumpkin,
    fontSize: RF(15),
    paddingHorizontal: RW(12),
    marginBottom: RH(2),
  },
  grid: {
    paddingVertical: RH(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#d8d8d820',
    paddingHorizontal: RW(12),
    marginBottom: 2,
  },
  one: {
    fontSize: RF(16),
  },
  two: {
    fontSize: RF(18),
    color: AppColors.cobalt,
    textAlign: 'right',
  },
});
