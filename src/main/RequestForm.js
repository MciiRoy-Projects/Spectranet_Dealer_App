import React from 'react';
import {View, StyleSheet, ScrollView, TextInput} from 'react-native';
import {
  Header,
  WrapperMain,
  H1,
  Button,
  HeaderBack,
} from '../partials/_components';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';

export default class RequestForm extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <HeaderBack
            goBack={() => navigation.goBack()}
            openProfile={() => navigation.navigate('Profile')}
          />
        </View>

        <View style={styles.paneTwo}>
          <H1 style={styles.textOne}>{navigation.state.params}</H1>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput style={styles.input} placeholder="Customer User ID" />
            <TextInput style={styles.input} placeholder="Customer Name" />
            <TextInput style={styles.input} placeholder="Customer Subject" />
            <TextInput
              style={styles.textbox}
              placeholder="Description"
              multiline={true}
              numberOfLines={5}
            />

            <Button text="SUBMIT" style={styles.btn} />
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
  textOne: {
    color: AppColors.pumpkin,
    fontSize: RF(15),
    marginBottom: RH(2),
  },
  input: {
    fontSize: RF(17),
    paddingVertical: RH(2),
    marginVertical: RH(0.7),
    borderBottomColor: AppColors.veryLightPink,
    borderBottomWidth: RH(0.3),
  },
  textbox: {
    fontSize: RF(18),
    paddingVertical: RH(2),
    marginBottom: RH(1),
    borderBottomColor: AppColors.veryLightPink,
    borderBottomWidth: RH(0.3),
    height: RH(15),
  },
  btn: {
    width: RW(70),
    alignSelf: 'center',
    marginTop: RH(2),
    marginBottom: RH(5),
  },
});
