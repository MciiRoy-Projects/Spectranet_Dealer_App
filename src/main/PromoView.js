import React from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {
  HeaderBack,
  WrapperMain,
  H1,
  H2,
  Title,
  Touch,
} from '../partials/_components';

import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';
import {getPromos, Snack} from '../partials/_api';
import moment from 'moment';

export default class PromoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params,
    };
  }

  render() {
    const {navigation} = this.props;
    const {data} = this.state;
    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <HeaderBack
            goBack={() => navigation.goBack()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <H1 style={styles.title}>{data.title}</H1>
          <H1 style={[styles.textDate]}>
            {moment(data.startdate).format('MMM DD, YYYY')} -{' '}
            {moment(data.enddate).format('MMM DD, YYYY')}
          </H1>
        </View>

        <View style={styles.paneTwo}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.imageHolder}>
              <Image
                source={{uri: data.img}}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <H2 style={styles.textOne}>{data.content}</H2>
          </ScrollView>
        </View>
      </WrapperMain>
    );
  }
}

const styles = StyleSheet.create({
  imageHolder: {
    width: '100%',
    height: RH(30),
    marginRight: RW(5),
    borderRadius: RH(1),
    marginBottom: RH(5),
  },
  image: {
    flex: 1,
    width: '100%',
  },
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
  title: {
    paddingRight: RW(15),
    fontSize: RF(22),
    color: AppColors.cobalt,
  },
  textOne: {
    fontSize: RF(18),
    color: AppColors.brownishGrey,
  },
  textDate: {
    fontSize: RF(13),
    color: AppColors.brownishGrey,
    opacity: 0.8,
  },
  grid: {
    paddingVertical: RH(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 0.5,
  },
});
