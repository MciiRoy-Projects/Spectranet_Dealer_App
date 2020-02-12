import React from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {
  Header,
  WrapperMain,
  PageTitle
} from '../partials/_components';

import {RF, RW, RH} from '../lib/_sizes';

import { List } from '../main/forms/_list';



export default class Scoreboard extends React.Component {
  
  render() {
    const {navigation} = this.props;
    return (
      <WrapperMain style={{paddingHorizontal: RW(6)}}>
        <View>
          <Header
              openDrawer={() => navigation.openDrawer()}
              openProfile={() => navigation.navigate('Profile')}
            />
          <PageTitle title={"Request Forms"} />
        </View>

        <View style={styles.paneTwo}>
          <ScrollView showsVerticalScrollIndicator={false}>            
            <List title="Customer Complaint Form" goto={() => navigation.navigate("CustomerComplaintForm")} />
            <List title={"Dealer Complaint Form"} goto={() => navigation.navigate("DealerComplaintForm")}/>
            <List title="Stock Purchase Form" goto={() => navigation.navigate("StockPurchaseForm")}/>
            <List title="Enterprise Sales Lead Form" goto={() => navigation.navigate("SalesLeadForm")}/> 
			      <List title="Feedback Form" goto={() => navigation.navigate("DealerFeedbackForm")}/>             
          </ScrollView>
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
    marginHorizontal: RW(3),
    paddingVertical: RH(2),
    borderRadius: RH(2),
  },
});
