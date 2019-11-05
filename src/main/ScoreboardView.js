import React from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {HeaderBack, WrapperMain, Title, H2, H1} from '../partials/_components';
import AppColors from '../lib/_colors';
import {RF, RW, RH} from '../lib/_sizes';
import numeral from 'numeral';
import {
  Snack,
  getData,
  storeData,
  dealerStock,
  dealerPerformance,
  dealerBalance,
  dealerStockPurchase,
  dealerAvailableStock,
  idCheck,
} from '../partials/_api';
import {Chart} from '../partials/_charts';

export default class ScoreboardView extends React.Component {
  state = {
    title: '',
    data: [],
    isLoading: true,
    code: this.props.navigation.state.params.code,
  };

  init = async () => {
    let obj = this.props.navigation.state.params;
    this.setState({
      title: obj.item,
    });

    var userDetails = await getData('userDetails');
    let userId = '';
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
      userId = idCheck(userDetails, 'userId');
    }

    getData(obj.code)
      .then(res => {
        if (res) {
          this.loadData(obj.code);
          //return;
        }

        Snack('Updating Data . . .');

        if (obj.code == 'dealerAvailableStockData') {
          this.loadAvailableStock(obj.code, userId);
        }

        if (obj.code == 'available_stock') {
          this.loadStock(obj.code, userId);
        }

        if (obj.code == 'mtd_activations') {
          this.loadPerformance(obj.code, userId);
        }

        if (obj.code == 'e_top_up') {
          this.loadETopUp(obj.code, userId);
        }

        if (obj.code == 'mtd_stock_purchase') {
          this.loadDealerStockPurchase(obj.code, userId);
        }
      })
      .catch(err => console.log(err));
  };

  loadAvailableStock = (code, userId) => {
    dealerAvailableStock(userId)
      .then(res => {
        res = res.data;
        if (res.success == true) {
          storeData(code, res);
          this.setState({data: res.data, isLoading: false});
        }
      })
      .catch(err => console.warn(err))
      .then(() => Snack('Data Updated . . .'));
  };

  loadStock = (code, userId) => {
    dealerStock(userId)
      .then(res => {
        res = res.data;
        if (res.success == true) {
          res = res.data;
          storeData(code, res).then(res => {
            if (res == true) {
              this.loadData(code);
            }
          });
        }
      })
      .catch(err => console.log(err))
      .then(() => Snack('Data Updated . . .'));
  };

  loadPerformance = (code, userId) => {
    dealerPerformance(userId)
      .then(res => {
        res = res.data;
        if (res.success == true) {
          res = res.data;
          storeData(code, res).then(res => {
            if (res == true) {
              this.loadData(code);
            }
          });
        }
      })
      .catch(err => console.log(err))
      .then(() => Snack('Data Updated . . .'));
  };

  loadETopUp = (code, userId) => {
    dealerBalance(userId)
      .then(res => {
        res = res.data;
        if (res.success == true) {
          res = res.data;
          storeData(code, res).then(res => {
            if (res == true) {
              this.loadData(code);
            }
          });
        }
      })
      .catch(err => console.log(err))
      .then(() => Snack('Data Updated . . .'));
  };

  loadDealerStockPurchase = (code, userId) => {
    dealerStockPurchase(userId)
      .then(res => {
        res = res.data;
        if (res.success == true) {
          res = res.data;
          storeData(code, res).then(res => {
            if (res == true) {
            }
          });
        }
      })
      .catch(err => console.log(err))
      .then(() => Snack('Data Updated . . .'));
  };

  loadData = code => {
    let data = [];
    getData(code)
      .then(obj => {
        if (!obj) {
          return;
        }
        obj = JSON.parse(obj);

        if (code == 'available_stock') {
          data.push({item: 'mifi', num: obj.mifi});
          data.push({item: 'cpe', num: obj.cpe});
        }

        if (code == 'mtd_activations') {
          data.push({item: 'Last 3 Months', num: obj.last3month});
          data.push({item: 'mtd', num: obj.mtd});
          data.push({item: 'ftd', num: obj.ftd});
        }

        if (code == 'e_top_up') {
          data.push({item: 'amount', num: obj.amount});
        }

        if (code == 'mtd_stock_purchase') {
          data.push({item: 'MTD Device', num: obj.mtddevice});
        }

        this.setState({data, isLoading: false});
      })
      .catch(err => Snack(err));
  };

  componentDidMount() {
    this.init();
  }

  render() {
    const {navigation} = this.props;
    const {title, data, isLoading, code} = this.state;

    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <HeaderBack
            goBack={() => navigation.goBack()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <Title> {title}</Title>
        </View>

        <View style={styles.paneTwo}>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={AppColors.cobalt}
              style={{marginTop: RH(30)}}
            />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {code == 'dealerAvailableStockData' && data.length > 0 ? (
                <Chart chartData={data} />
              ) : (
                <LoopTable data={data} />
              )}
            </ScrollView>
          )}
        </View>
      </WrapperMain>
    );
  }
}

const LoadDealerStockPurchase = () => {
  return (
    <View>
      <Text>loadDealerStockPurchase</Text>
    </View>
  );
};

const LoopTable = props => {
  return props.data.map((el, i) => (
    <View key={props.i} style={styles.grid}>
      <H2 style={styles.one}>{el.item.toUpperCase()}</H2>
      {isNaN(el.num) || el.num == null ? (
        <H1 style={styles.two}> 0 </H1>
      ) : (
        <H1 style={styles.two}>{numeral(el.num).format(0, 0)}</H1>
      )}
    </View>
  ));
};
const styles = StyleSheet.create({
  paneOne: {
    padding: RW(6),
    height: RH(40),
  },
  paneTwo: {
    marginTop: RH(1),
    backgroundColor: '#fff',
    paddingVertical: RH(4),

    borderTopLeftRadius: RH(5),
    borderTopRightRadius: RH(5),
    flex: 1,
  },
  grid: {
    paddingVertical: RH(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#d8d8d820',
    paddingHorizontal: RW(6),
    marginBottom: 2,
  },
  one: {
    fontSize: RF(18),
  },
  two: {
    fontSize: RF(18),
    color: AppColors.scarlet2,
    textAlign: 'right',
  },
});
