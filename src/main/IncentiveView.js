import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  Header,
  WrapperMain,
  PageTitle,
  H2
} from '../partials/_components';
import {ListItem} from './IncentivesComponent/_list';
import {RW, RH} from '../lib/_sizes';
import {webviewLinks} from '../actions';
import {connect} from 'react-redux';
import AppColors from '../lib/_colors';
const thisMonth = new Date().getMonth();
const lastMonth = thisMonth - 1;
const monthArr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

class IncentiveView extends React.Component {

  init() {
    this.props.webviewLinks();
  }
  
  componentDidMount() {
    this.init();
  }

  render() {
    const {navigation} = this.props;
    return (
      <WrapperMain>
        <View>
          <Header
            openDrawer={() => navigation.openDrawer()}
            openProfile={() => navigation.navigate('Profile')}
          />          
        </View>

        <PageTitle title={"Incentives"}/>

        <View style={styles.paneTwo}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ListItem title="My Incentive" goto={() => {
              navigation.navigate('IncentiveHtml')
            }}/>  
            <H2 style={{padding: RW(2), color: AppColors.white}}>
              Incentives earned on activations {monthArr[lastMonth]} would be
              available after 10th of {monthArr[thisMonth]} (to be updated 11th)
              and Incentive script to be updated every end of quarter by 20th
            </H2>          
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
  webviewLinks
 })(IncentiveView);

const styles = StyleSheet.create({
  paneOne: {
    padding: RW(6),
    height: RH(40),
  },
  paneTwo: {
    marginTop: RH(1),
    marginHorizontal: RW(3),
    paddingVertical: RH(2),
  },
});
