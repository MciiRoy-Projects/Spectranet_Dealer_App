import React from 'react';
import {View, StyleSheet, ScrollView } from 'react-native';
import {
  Header,
  WrapperMain,
  H1,
  P,
  Touch,
  PageTitle,
  Loading
} from '../partials/_components';
import AppColors from '../lib/_colors';
import {RF, RW, RH} from '../lib/_sizes';
import {keyContactInformation} from '../actions';
import {Linking} from 'react-native';
import {connect} from 'react-redux';

class Contact extends React.Component {
  

  init() {
    this.props.keyContactInformation();
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
          <PageTitle title={"Key Contact Information"} style={{fontSize: RF(27)}} />
        </View>

        <View style={styles.paneTwo}>
          
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.grid}>
                <P style={styles.one}>Dealer Code</P>
                <H1 style={styles.two}>
                  {this.props.store.dealerContact[0].dealercode == null || this.props.store.dealerContact[0].dealercode == ""
                    ? '-' 
                    : this.props.store.dealerContact[0].dealercode}
                </H1>
              </View>              

              <View style={styles.grid}>
                <P style={styles.one}>Category</P>
                <H1 style={styles.two}>
                  {this.props.store.dealerContact[0].category == null || this.props.store.dealerContact[0].category == ""
                    ? '-' 
                    : this.props.store.dealerContact[0].category}
                </H1>
              </View>              

              <View style={styles.grid}>
                <P style={styles.one}>Territory Sales Manager Name</P>
                <H1 style={styles.two}>
                  {this.props.store.dealerContact[0].tsmname == null || this.props.store.dealerContact[0].tsmname == "" 
                    ? '-' 
                    : this.props.store.dealerContact[0].tsmname}
                </H1>
              </View>

              <View style={styles.grid}>
                <P style={styles.one}>Territory Sales Manager Phone</P>
                <Touch onPress={() => Linking.openURL(`tel:${this.props.store.dealerContact[0].tsmphone}`)}>
                  <H1 style={styles.two}>
                    {this.props.store.dealerContact[0].tsmphone == null || this.props.store.dealerContact[0].tsmphone == ""
                      ? '-' 
                      : this.props.store.dealerContact[0].tsmphone}
                  </H1>
                </Touch>                
              </View>

              <View style={styles.grid}>
                <P style={styles.one}>Territory Sales Manager Email</P>
                <H1 style={styles.two}>
                  {this.props.store.dealerContact[0].tsmemail == null || this.props.store.dealerContact[0].tsmemail == ""
                    ? '-' 
                    : this.props.store.dealerContact[0].tsmemail}
                </H1>
              </View>
              

              <View style={styles.grid}>
                <P style={styles.one}>Regional Sales Manager Name</P>
                <H1 style={styles.two}>
                  {this.props.store.dealerContact[0].rsmname == null || this.props.store.dealerContact[0].rsename == ""
                    ? '-' 
                    : this.props.store.dealerContact[0].rsmname}
                </H1>
              </View>

              <View style={styles.grid}>
                <P style={styles.one}>Regional Sales Manager Email</P>
                <H1 style={styles.two}>
                  {this.props.store.dealerContact[0].rsmemail == null || this.props.store.dealerContact[0].rsmemail == ""
                    ? '-' 
                    : this.props.store.dealerContact[0].rsmemail}
                </H1>
              </View>

              <View style={styles.grid}>
                <P style={styles.one}>Regional Sales Manager Phone</P>
                <Touch onPress={() => Linking.openURL(`tel:${this.props.store.dealerContact[0].rsmphone}`)}>
                  <H1 style={styles.two}>
                    {this.props.store.dealerContact[0].rsmphone == null || this.props.store.dealerContact[0].rsmphone == ""
                      ? '-' 
                      : this.props.store.dealerContact[0].rsmphone}
                  </H1>
                </Touch>
              </View>

              <View style={styles.grid}>
                <P style={styles.one}>Channel Partner Executive Name</P>
                <H1 style={styles.two}>
                  {this.props.store.dealerContact[0].cpename == null || this.props.store.dealerContact[0].cpename == ""
                    ? '-' 
                    : this.props.store.dealerContact[0].cpename}
                </H1>
              </View>

              <View style={styles.grid}>
                <P style={styles.one}>Channel Partner Executive Email</P>
                <H1 style={styles.two}>
                  {this.props.store.dealerContact[0].cpeemail == null || this.props.store.dealerContact[0].cpeemail == ""
                    ? '-' 
                    : this.props.store.dealerContact[0].cpeemail}
                </H1>
              </View>

              <View style={styles.grid}>
                <P style={styles.one}>Channel Partner Executive Phone</P>
                <Touch onPress={() => Linking.openURL(`tel:${this.props.store.dealerContact[0].cpephone}`)}>
                  <H1 style={styles.two}>
                    {this.props.store.dealerContact[0].cpephone == null || this.props.store.dealerContact[0].cpephone == ""
                      ? '-' 
                      : this.props.store.dealerContact[0].cpephone}
                  </H1>
                </Touch>
              </View>

              <View style={styles.grid}>
                <P style={styles.one}>Regional Sales Executive Name</P>
                <H1 style={styles.two}>
                  {this.props.store.dealerContact[0].rsename == null || this.props.store.dealerContact[0].rsename == ""
                    ? '-' 
                    : this.props.store.dealerContact[0].rsename}
                </H1>
              </View>

              <View style={styles.grid}>
                <P style={styles.one}>Regional Sales Executive Email</P>
                <H1 style={styles.two}>
                  {this.props.store.dealerContact[0].rseemail == null || this.props.store.dealerContact[0].rseemail == ""
                    ? '-' 
                    : this.props.store.dealerContact[0].rseemail}
                </H1>
              </View>

              <View style={styles.grid}>
                <P style={styles.one}>Regional Sales Executive Phone</P>
                <Touch onPress={() => Linking.openURL(`tel:${this.props.store.dealerContact[0].rsephone}`)}>
                  <H1 style={styles.two}>
                    {this.props.store.dealerContact[0].rsephone == null || this.props.store.dealerContact[0].rsephone == ""
                      ? '-' 
                      : this.props.store.dealerContact[0].rsephone}
                  </H1>
                </Touch>
              </View>

              <View style={styles.grid}>
                <P style={styles.one}>Super Dealer Name</P>
                <H1 style={styles.two}>
                  {this.props.store.dealerContact[0].sdname == null || this.props.store.dealerContact[0].sdname == ""
                    ? '-'
                    : this.props.store.dealerContact[0].sdname}
                </H1>
              </View>

              <View style={styles.grid}>
                <P style={styles.one}>Super Dealer Email</P>
                <H1 style={styles.two}>
                  {this.props.store.dealerContact[0].sdemail == null || this.props.store.dealerContact[0].sdemail == ""
                    ? '-'
                    : this.props.store.dealerContact[0].sdemail}
                </H1>
              </View>

            </ScrollView>          
        </View>
        {this.props.store.isLoadingBg ? (
          <Loading />
        ) : null}
      </WrapperMain>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      store: state.store
  }
};

export default connect(mapStateToProps, {keyContactInformation})(Contact);

const styles = StyleSheet.create({
  paneOne: {
    padding: RW(6),
    height: RH(40),
  },
  paneTwo: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    flex: 1,
    marginTop: RH(1),
    marginHorizontal: RW(2),
    paddingVertical: RH(2),
    paddingHorizontal:RW(5),
    borderRadius: RH(2),
    marginBottom: RH(5),
  },
  grid: {
    paddingVertical: RH(3),
    justifyContent: 'space-between',
    borderBottomColor: '#C84E89',
    borderBottomWidth: 0.5,
  },
  one: {
    fontSize: RF(12),
    color: AppColors.white,
    paddingRight: RW(10),
  },
  two: {
    fontSize: RF(18),
    color: AppColors.white,
    paddingRight: RW(5),
  },
  icon: {
    marginLeft: RW(5),
    height: RH(2.5),
    width: RH(2.5),
  },
});
