import React from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {
  Header,
  WrapperMain,
  H1,
  P,
  Title,
  Touch,
} from '../partials/_components';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';
import moment from 'moment';
import {keyContact} from '../partials/_api';

export default class Contact extends React.Component {
  state = {
    el: {},
    isLoading: true,
  };

  loadData = () => {
    keyContact()
      .then(res => {
        res = res.data;
        if (res.success == true)
          this.setState({
            el: res.data,
          });
      })
      .then(() => this.setState({isLoading: false}));
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const {navigation} = this.props;
    const {el, isLoading} = this.state;
    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <Header
            openDrawer={() => navigation.openDrawer()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <Title> Key Contact Information</Title>
        </View>

        <View style={styles.paneTwo}>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={AppColors.cobalt}
              style={{marginTop: RH(10)}}
            />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.grid}>
                <P style={styles.one}>Dealer Code</P>
                <H1 style={styles.two}>{el.dealercode}</H1>
              </View>

              <View style={styles.grid}>
                <P style={styles.one}>Dealer Name</P>
                <H1 style={styles.two}>{el.dealername}</H1>
              </View>

              <View style={styles.grid}>
                <P style={styles.one}>Category</P>
                <H1 style={styles.two}>{el.category}</H1>
              </View>

              <View style={styles.grid}>
                <P style={styles.one}>tsmname</P>
                <H1 style={styles.two}>{el.tsmname}</H1>
              </View>

              <View style={styles.grid}>
                <P style={styles.one}>tsmemail</P>
                <H1 style={styles.two}>{el.tsmemail}</H1>
              </View>

              <View style={styles.grid}>
                <P style={styles.one}>tsmphone</P>
                <H1 style={styles.two}>{el.tsmphone}</H1>
              </View>
            </ScrollView>
          )}
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
