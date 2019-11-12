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
  mtddealertransactions,
  dealermonthwiseperformance,
  idCheck,
} from '../partials/_api';
import {Chart} from '../partials/_charts';
import moment from 'moment';
import {ChartTwo} from '../partials/_charts2';

export default class ScoreboardView extends React.Component {
  state = {
    title: '',
    data: [],
    chartData: [],
    etopData: [],
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
        Snack('Updating Data . . .');

        if (obj.code == 'dealerAvailableStockData') {
          this.loadAvailableStock(obj.code, userId);
        }

        if (obj.code == 'available_stock') {
          this.loadStock(obj.code, userId);
        }

        if (obj.code == 'activations') {
          this.loadActivations(obj.code, userId);
        }

        if (obj.code == 'e_top_up') {
          this.loadETopUp(obj.code, userId);
        }

        if (obj.code == 'mtd_stock_purchase') {
          this.loadDealerStockPurchase(obj.code, userId);
        }

        if (res) {
          this.loadData(obj.code);
          //return;
        }
      })
      .catch(err => console.log(err));
  };

  loadAvailableStock = (code, userId) => {
    dealerAvailableStock(userId)
      .then(res => {
        let data = [];
        res = res.data;
        if (res.success == true) {
          storeData(code, res);
          if (res.data.length > 0) {
            res.data.forEach(el => {
              data.push({item: el.devicetype, num: el.count});
            });
          }
          this.setState({
            data,
            chartData: res.data,
            isLoading: false,
          });
        }
        Snack('Data Updated . . .');
      })
      .catch(err => {
        this.props.navigation.goBack();
        Snack('Connection Error !');
      });
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
      .catch(err => {
        this.props.navigation.goBack();
        Snack('Connection Error !');
      });
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
      .catch(err => {
        this.props.navigation.goBack();
        Snack('Connection Error !');
      });
  };

  loadActivations = (code, userId) => {
    dealermonthwiseperformance(userId).then(res => {
      let data = [];
      if (res.data.success == true) {
        res.data.data.forEach(el => {
          data.push({item: el.monthname, num: el.count});
        });
        this.setState({
          data,
          chartData: res.data.data,
          isLoading: false,
        });
      }
    });
  };

  loadETopUp = (code, userId) => {
    dealerBalance(userId)
      .then(res => {
        let data = [];
        res = res.data;
        if (res.success == true) {
          res = res.data;
          data.push({item: res.dealername, num: res.amount});
          this.setState(
            {
              data,
              isLoading: false,
            },
            () => {
              this.loadMtddealertransactions(userId);
            },
          );
          storeData(code, res);
        }
      })
      .catch(err => {
        Snack('Connection Error !');
      });
  };

  loadMtddealertransactions = userId => {
    mtddealertransactions(userId)
      .then(res => {
        if (res.data.success == true) {
          this.setState({etopData: res.data.data});
        }
      })
      .catch(err => console.warn(err));
  };

  loadDealerStockPurchase = (code, userId) => {
    var data = [];
    dealerStockPurchase(userId)
      .then(res => {
        res = res.data;
        if (res.success == true) {
          storeData(code, res);
          data.push({item: res.data.dealername, num: res.data.mtddevice});
          this.setState({
            data,
            isLoading: false,
          });
        }
        Snack('Data Updated');
      })
      .catch(err => {
        this.props.navigation.goBack();
        Snack('Connection Error !');
      });
  };

  componentDidMount() {
    this.init();
  }

  render() {
    const {navigation} = this.props;
    const {title, data, isLoading, chartData, etopData, code} = this.state;

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
              {code == 'dealerAvailableStockData' && chartData.length > 0 ? (
                <View style={{alignItems: 'center'}}>
                  <Chart chartData={chartData} />
                  <H2 style={{marginBottom: RH(2)}}>Available Stock</H2>
                </View>
              ) : null}

              {code == 'activations' && chartData.length > 0 ? (
                <View style={{alignItems: 'center'}}>
                  <ChartTwo chartData={chartData} />
                  <H2 style={{marginBottom: RH(2)}}>
                    Activations for Last 5 Months
                  </H2>
                </View>
              ) : null}

              <LoopTable data={data} />

              {code == 'e_top_up' ? <ELoopTable data={etopData} /> : null}
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
    <View key={i} style={styles.grid}>
      <H2 style={styles.one}>{el.item.toUpperCase()}</H2>
      {isNaN(el.num) || el.num == null ? (
        <H1 style={styles.two}> 0 </H1>
      ) : (
        <H1 style={styles.two}>{numeral(el.num).format(0, 0)}</H1>
      )}
    </View>
  ));
};

const ELoopTable = props => {
  return props.data.map((el, i) => (
    <View style={styles.table} key={i}>
      <H2 style={styles.text}>
        Date: {moment(el.transactiondate).format('MMMM DD, YYYY')}
      </H2>
      <H2 style={styles.text}>Dealer: {el.dealername}</H2>
      <H2 style={styles.text}>
        Amount: {numeral(el.transactionamount).format('0,0')}
      </H2>
      <H2 style={styles.text}>
        Balance Before Transaction:{' '}
        {numeral(el.balancebeforetrasaction).format('0,0')}
      </H2>
      <H2 style={styles.text}>
        Balance After Transaction:{' '}
        {numeral(el.balanceaftertrasaction).format('0,0')}
      </H2>
      <H2 style={styles.text}>Transfer Type: {el.transfertype}</H2>
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
  table: {
    borderTopWidth: 1,
    borderTopColor: '#dfdfdf',
    paddingHorizontal: RW(6),
    paddingVertical: RH(1.5),
  },
  text: {
    color: AppColors.scarlet2,
    fontSize: RF(15),
    opacity: 0.8,
  },
});
