import React from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {
  HeaderBack,
  WrapperMain,
  PageTitle
} from '../partials/_components';
import {connect} from 'react-redux';
import {RF, RW, RH} from '../lib/_sizes';

import { List } from '../main/PurchaseForDMthComponents/_list';



class PurchaseForDMth extends React.Component {
  

  render() {
    const {navigation} = this.props;
    return (
      <WrapperMain style={{paddingHorizontal: RW(6)}}>
        <View>
          <HeaderBack
            goBack={() => navigation.goBack()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <PageTitle title={"SKU Wise Stock Purchase"} />
        </View>

        <View style={styles.paneTwo}>
          <ScrollView showsVerticalScrollIndicator={false}>            
            <List title="Total Stock Purchased" value={this.props.store.devicepurchased}/>                       
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
 })(PurchaseForDMth);

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
  },
});
