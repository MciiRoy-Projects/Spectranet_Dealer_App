import React from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator, Text} from 'react-native';
import {
  HeaderBack,
  WrapperMain,
  PageTitle
} from '../partials/_components';
import Chart from '../main/ActivationComponents/_chart';
import {List} from '../main/ActivationComponents/_list';
import AppColors from '../lib/_colors';
import {RF, RW, RH} from '../lib/_sizes';

import { 
  monthwiseperformance,
  updateState
 } from '../actions';
import {connect} from 'react-redux';

class Activation extends React.Component {
  constructor(props) {
    super(props);
    this.props.monthwiseperformance();
  }


  render() {
    const {navigation} = this.props;
    
    return (
      <WrapperMain>
        <View>          
          <HeaderBack
              goBack={() => navigation.goBack()}
              openProfile={() => {
                navigation.navigate('Profile');               
              }}
            />
          <PageTitle title={"Activation & Sales Data"} />
        </View>

        <View style={styles.paneTwo}>
          <ScrollView showsVerticalScrollIndicator={false}>            
            <Chart />
            <View style={{marginVertical:RH(5)}}>
              <View>
                <Text style={styles.textStyle}>SKU MTD Sales For The Month</Text>
              </View>
              <View>
                {/*<List title={this.props.store.device1.title} data={this.props.store.device1.count}/>
                <List title={this.props.store.device2.title} data={this.props.store.device2.count}/>
                <List title={this.props.store.device3.title} data={this.props.store.device3.count}/>
                <List title={this.props.store.device4.title} data={this.props.store.device4.count}/>
                <List title={this.props.store.device5.title} data={this.props.store.device5.count}/>
                */}
                { this.props.store.device.length ? 
                  this.props.store.device.map((el,i) => {
                    return <List key={i} title={el.devicetype} data={el.count}/>
                  }):
                  <List title={"No device was sold for this month"} />
                }
                
              </View>
            </View>
          </ScrollView>
        </View>
        
        
      </WrapperMain>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      store: state.store
  }
};

export default connect(mapStateToProps, { 
  monthwiseperformance,
  updateState
 })(Activation);

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
    marginBottom: RH(15)
  },
  textStyle:{
    fontFamily:'Montserrat-Regular',
    color: AppColors.white
  }
});