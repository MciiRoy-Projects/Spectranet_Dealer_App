import React from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {
  Header,
  WrapperMain,
  H1,
  H2,
  Title,
  Card,
  Touch,
  LiImage,
  Ico,
} from '../partials/_components';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';

const List = [
  {name: 'Customer Complaints Form', nav: 'RequestForm'},
  {name: 'Dealer Complaints Form', nav: 'RequestForm'},
  {name: 'Stock Purchase Form', nav: 'RequestForm'},
  {name: 'Sales Lead Form', nav: 'RequestForm'},
  {name: 'Customer Reactivation Form', nav: 'RequestForm'},
];

export default class Request extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <Header
            openDrawer={() => navigation.openDrawer()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <Title> Request Form</Title>
        </View>

        <View style={styles.paneTwo}>
          <ScrollView>
            {List.map((el, key) => (
              <Touch
                style={styles.grid}
                onPress={() => navigation.navigate(el.nav, el.name)}
                key={key}>
                <H2 style={styles.two}>{el.name}</H2>
                <Ico>&#xf105;</Ico>
              </Touch>
            ))}
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
    backgroundColor: '#fff',
    paddingVertical: RH(4),
    paddingHorizontal: RW(6),
    borderTopLeftRadius: RH(5),
    borderTopRightRadius: RH(5),
    flex: 1,
  },
  grid: {
    paddingVertical: RH(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 0.5,
  },
  two: {
    marginLeft: RW(2),
    fontSize: RF(18),
    color: AppColors.greyishBrown,
  },
  icon: {
    marginLeft: RW(5),
    height: RH(2.5),
    width: RH(2.5),
  },
});
