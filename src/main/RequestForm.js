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
import {getData, idCheck} from '../partials/_api';

export default class RequestForm extends React.Component {
  state = {
    name: '',
    userId: '',
    subject: '',
    message: '',
  };

  init() {
    getData('userDetails').then(res => {
      if (res) {
        res = JSON.parse(res);
        let userId = idCheck(res, 'userId');
        let email = idCheck(res, 'email');
        let name = `${idCheck(res, 'firstName')}`;
        this.setState({userId, email, name});
      }
    });
  }

  submit = () => {
    const {userId, email, name, subject, message} = this.state;
    const fd = `userId=${userId}&email=${email}&name=${name}&subject=${subject}&message=${message}`;
  };

  componentDidMount() {
    this.init();
  }

  render() {
    const {navigation} = this.props;
    const {userId, subject, name, message} = this.state;
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
            <TextInput
              value={userId}
              style={styles.input2}
              placeholder="Customer User ID"
              editable={false}
            />
            <TextInput
              value={name}
              style={styles.input2}
              placeholder="Customer Name"
              editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Customer Subject"
              value={subject}
              onChangeText={subject => this.setState({subject})}
            />
            <TextInput
              style={styles.textbox}
              value={message}
              placeholder="Description"
              onChangeText={message => this.setState({message})}
              multiline={true}
              numberOfLines={5}
            />

            <Button text="SUBMIT" style={styles.btn} onPress={this.submit} />
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
  input2: {
    fontSize: RF(17),
    paddingVertical: RH(2),
    marginVertical: RH(0.7),
    borderBottomColor: AppColors.veryLightPink,
    borderBottomWidth: RH(0.3),
    opacity: 0.8,
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
