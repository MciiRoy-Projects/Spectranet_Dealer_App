import React from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {
  Header,
  WrapperMain,
  H1,
  H2,
  P,
  Title,
  Card,
  Touch,
  LiImage,
  Ico,
} from '../partials/_components';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';
import moment from 'moment';
import {
  keyContact,
  getData,
  idCheck,
  dealerPerformance,
  Snack,
} from '../partials/_api';

export default class Target extends React.Component {
  state = {
    dealer: {'Dealer Target': '-'},
    recharge: {'Dealer Target': '-'},
    available: {'Dealer Target': '-'},
    isLoading: true,
  };

  loadKeyContactData = userId => {
    keyContact(userId)
      .then(res => {
        res = res.data;
        if (res.success == true) {
          console.warn(res.data);
          this.setState({
            dealer: res.data,
          });
        }
      })
      .catch(err => Snack('Connection Error. Please try again later.'))
      .then(() => this.setState({isLoading: false}));
  };

  loadPerformance = userId => {
    dealerPerformance(userId)
      .then(res => {
        const {data} = this.state;
        res = res.data;
        if (res.success == true) {
          res = res.data;
          console.warn(res);
        }
      })
      .catch(err => console.log(err));
  };

  init() {
    getData('userDetails').then(res => {
      if (res) {
        res = JSON.parse(res);
        let userId = idCheck(res, 'userId');
        this.loadKeyContactData(userId);
        //this.loadPerformance(userId);
      }
    });
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const {navigation} = this.props;
    const {isLoading, dealer, recharge, available} = this.state;
    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <Header
            openDrawer={() => navigation.openDrawer()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <Title> Targets (for the month)</Title>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color={AppColors.cobalt} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.paneTwo}>
              <H1 style={styles.textOne}>Activations</H1>
              <H1 style={styles.two}>{dealer['Dealer Target']}</H1>
            </View>

            <View style={styles.paneTwo}>
              <H1 style={styles.textOne}>Recharges</H1>
              <H1 style={styles.two}>{recharge['Dealer Target']}</H1>
            </View>

            <View style={styles.paneTwo}>
              <H1 style={styles.textOne}>Available Stock (Device Wise)</H1>
              <H1 style={styles.two}>{available['Dealer Target']}</H1>
            </View>
          </ScrollView>
        )}
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
    borderRadius: RH(2),
    flex: 1,
  },
  textOne: {
    color: AppColors.pumpkin,
    fontSize: RF(15),
    marginBottom: RH(2),
  },
  grid: {
    paddingVertical: RH(3),
    justifyContent: 'space-between',
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 0.5,
  },
  one: {
    fontSize: RF(12),
    color: AppColors.greyishBrown,
    paddingRight: RW(10),
    opacity: 0.7,
  },
  two: {
    fontSize: RF(18),
    color: AppColors.cobalt,
    paddingRight: RW(5),
  },
  icon: {
    marginLeft: RW(5),
    height: RH(2.5),
    width: RH(2.5),
  },
});
