import React from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {
  HeaderBackNoPic,
  WrapperMain,
  H2,
  HeaderBack,
} from '../partials/_components';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';
import {getData, idCheck} from '../partials/_api';

export default class Profile extends React.Component {
  state = {
    name: 'Name',
    userId: 'Dealer ID',
    email: 'Email',
  };
  init() {
    getData('userDetails').then(res => {
      if (res) {
        res = JSON.parse(res);
        let userId = idCheck(res, 'userId');
        let email = idCheck(res, 'email');
        let name = `${idCheck(res, 'firstName')} ${idCheck(res, 'lastName')}`;
        this.setState({userId, email, name});
      }
    });
  }

  componentDidMount() {
    this.init();
  }

  render() {
    const {navigation} = this.props;
    const {name, userId, email} = this.state;
    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <HeaderBackNoPic goBack={() => navigation.goBack()} />
        </View>

        <View style={styles.paneTwo}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.imgHolder}>
              <Image
                source={AppIcons.placeholder}
                resizeMode="cover"
                style={{width: '100%', height: '100%', borderRadius: RH(20)}}
              />
            </View>

            <View style={styles.div}>
              <H2 style={styles.label}>Name</H2>
              <H2 style={styles.text}>{name}</H2>
            </View>

            <View style={styles.div}>
              <H2 style={styles.label}>Dealer ID</H2>
              <H2 style={styles.text}>{userId}</H2>
            </View>

            <View style={styles.div}>
              <H2 style={styles.label}>Email</H2>
              <H2 style={styles.text}>{email}</H2>
            </View>
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
    alignItems: 'center',
    flex: 1,
  },
  imgHolder: {
    alignSelf: 'center',
    height: RH(20),
    width: RH(20),
    borderRadius: RH(20),
    backgroundColor: '#efefef',
    marginVertical: RH(3),
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
  div: {
    width: RW(90),
    borderBottomColor: '#00000010',
    borderBottomWidth: 1,
    paddingBottom: RH(1),
    marginTop: RH(5),
  },
  label: {
    textAlign: 'center',
    opacity: 0.4,
    fontSize: RF(15),
    marginBottom: RH(0.5),
  },
  text: {
    textAlign: 'center',
    fontSize: RF(18),
  },
});
