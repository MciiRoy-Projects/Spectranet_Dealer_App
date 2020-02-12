import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Pie from 'react-native-pie';
import {connect} from 'react-redux';
import AppColors from '../../lib/_colors';
import {CustomText} from '../../partials/_components';
import {RH, RF} from '../../lib/_sizes';

const Chart = props => {
  return (
    <View style={{alignItems: 'center'}}>
      <CustomText
        style={{
          color: AppColors.white,
          marginBottom: RH(2),
          fontSize: RF(24),
        }}
        text={'Activation vs Target'}
      />
      <View style={styles.container}>
        <Pie
          radius={100}
          innerRadius={60}
          sections={[
            {
              percentage: props.store.mtddevicesold,
              color: '#C84E89',
            },
          ]}
          backgroundColor="#ddd"
        />
        <View style={styles.gauge}>
          <CustomText
            style={styles.gaugeText}
            text={`${props.store.mtddevicesold}%`}
          />
        </View>
      </View>
      <View style={{marginTop: RH(2), flexDirection: 'row'}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{height: 15, width: 15, backgroundColor: '#C84E89'}}></View>
          <CustomText
            text={`Activation(${props.store.mtd})`}
            style={{color: AppColors.white, marginLeft: 5}}
          />
        </View>
        <View style={{flexDirection: 'row', marginLeft: 15}}>
          <View style={{height: 15, width: 15, backgroundColor: '#ddd'}}></View>
          <CustomText
            text={`Target(${props.store.dealertarget})`}
            style={{color: AppColors.white, marginLeft: 5}}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    store: state.store,
  };
};

export default connect(mapStateToProps, {})(Chart);

const styles = StyleSheet.create({
  gauge: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: AppColors.white,
    fontSize: 24,
    fontFamily: 'Montserrat-Regular',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
