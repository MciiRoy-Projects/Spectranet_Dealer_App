import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
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
} from '../partials/_api';

const data = [
  {item: 'Available Stock', num: 0, data: []},
  {item: 'MTD Activations', num: 0, data: []},
  {item: 'E-Top Up', num: 0, data: []},
  {item: 'MTD Stock Purchase', num: 0, data: []},
];

export default class Home extends React.Component {
  state = {
    data: data,
  };

  loadStock = () => {
    dealerStock()
      .then(res => {
        const {data} = this.state;
        res = res.data;
        if (res.success == true) {
          res = res.data;
          let mifi = res.mifi;
          let cpe = res.cpe;

          if (mifi == null) mifi = 0;
          if (cpe == null) cpe = 0;

          data[0].num = parseInt(mifi) + parseInt(cpe);
          data[0].data = res;
          this.setState({
            data,
          });
        }
      })
      .catch(err => console.log(err));
  };

  loadPerformance = () => {
    dealerPerformance()
      .then(res => {
        const {data} = this.state;
        res = res.data;
        if (res.success == true) {
          res = res.data;
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

  loadETopUp = () => {
    dealerBalance()
      .then(res => {
        const {data} = this.state;
        res = res.data;
        if (res.success == true) {
          res = res.data;
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

  loadDealerStockPurchase = () => {
    dealerStockPurchase()
      .then(res => {
        const {data} = this.state;
        res = res.data;
        if (res.success == true) {
          res = res.data;
          console.warn(res);
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

  componentDidMount() {
    this.loadStock();
    this.loadPerformance();
    this.loadETopUp();
    this.loadDealerStockPurchase();
  }

  render() {
    const {navigation} = this.props;
    const {data} = this.state;
    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <Header
            openDrawer={() => navigation.openDrawer()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <Title>Account Summary</Title>
          <Card style={styles.paneOne}>
            <H2 />
          </Card>
        </View>
        <ScrollView>
          <View style={styles.paneTwo}>
            <H1 style={styles.textOne}>Transactions</H1>

            {data.map((el, i) => (
              <Touch
                key={i}
                style={styles.grid}
                onPress={() => navigation.navigate('ScoreboardView', el)}>
                <H2 style={styles.one}>{el.item}</H2>
                <H1 style={styles.two}>{el.num}</H1>
              </Touch>
            ))}
          </View>
        </ScrollView>
      </WrapperMain>
    );
  }
}

const styles = StyleSheet.create({
  paneOne: {
    padding: RW(6),
    height: RH(42),
  },
  paneTwo: {
    marginTop: RH(1.5),
    minHeight: RH(36),
    backgroundColor: '#fff',
    paddingVertical: RH(2),
    borderTopLeftRadius: RH(5),
    borderTopRightRadius: RH(5),
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
