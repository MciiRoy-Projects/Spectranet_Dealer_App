import React from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {
  HeaderBack,
  WrapperMain,
  H1,
  H2,
  PageTitle
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
        <View>
          <HeaderBack
            goBack={() => navigation.goBack()}
            openProfile={() => navigation.navigate('Profile')}
          />          
        </View>

        <PageTitle title={data.title} style={styles.title}/>
          
        <H1 style={[styles.textDate]}>
          {moment(data.startdate).format('MMM DD, YYYY')} -{' '}
          {moment(data.enddate).format('MMM DD, YYYY')}
        </H1>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.paneTwo}>
            <View style={styles.imageHolder}>
              <Image
                source={{uri: data.img}}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <H2 style={{marginBottom:20,color:AppColors.white,fontSize:RF(14)}}>Product Description</H2>
            <H2 style={styles.textOne}>{data.content}</H2>
          </View>
        </ScrollView>  

      </WrapperMain>
    );
  }
}

const styles = StyleSheet.create({
  imageHolder: {
    width: '100%',
    height: RH(30),
    borderRadius: RH(1),
    marginBottom: RH(5),
    backgroundColor: AppColors.white,
    borderRadius: RW(5),
    alignItems:'center',
    justifyContent:'center',
    overflow:'hidden'
  },
  image: {
    flex:1,
    width: '100%',
  },
  paneOne: {
    padding: RW(6),
    height: RH(40),
  },
  paneTwo: {
    marginTop: RH(1),
    flex: 1,
    marginTop: RH(1),
    marginHorizontal: RW(3),
    paddingVertical: RH(2),
  },
  title: {
    fontSize: RF(20),
    color: AppColors.white,
  },
  textOne: {
    fontSize: RF(18),
    color: AppColors.white,
  },
  textDate: {
    fontSize: RF(13),
    color: AppColors.white,
    opacity: 0.8,
    paddingHorizontal: RW(2)
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
