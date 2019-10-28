import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  Header,
  WrapperMain,
  H1,
  Button,
  HeaderBack,
  H2,
} from '../partials/_components';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';
import {
  getData,
  idCheck,
  requestForm,
  keyContact,
  Snack,
} from '../partials/_api';

let RegFont = '';
Platform.OS == 'ios'
  ? (RegFont = 'Product Sans')
  : (RegFont = 'Product Sans Regular');

Platform.OS == 'ios' ? (fontWeight = 'bold') : (fontWeight = 'normal');

export default class RequestFormTwo extends React.Component {
  state = {
    name: '',
    userId: '',
    type: '',
    product: '',
    quantity: '',
    tsm: '',
    subject: '',
    message: '',
    isLoadingBg: true,
    isLoading: false,
  };

  init() {
    getData('userDetails').then(res => {
      if (res) {
        res = JSON.parse(res);
        let userId = idCheck(res, 'userId');
        let email = idCheck(res, 'email');
        let name = `${idCheck(res, 'firstName')}`;
        this.setState({
          userId,
          email,
          name,
          type: this.props.navigation.state.params,
        });
        this.getTsm(userId);
      }
    });
  }

  getTsm = userId => {
    keyContact(userId)
      .then(res => {
        res = res.data;
        if (res.success == true) {
          this.setState({
            tsm: res.data.tsmname,
          });
          this.setState({isLoadingBg: false});
        }
      })
      .catch(() => Snack('Connection Error. Please try again later'));
  };

  submit = () => {
    const {
      userId,
      email,
      name,
      subject,
      type,
      message,
      product,
      quantity,
      tsm,
    } = this.state;

    if (
      userId == '' ||
      email == '' ||
      name == '' ||
      subject == '' ||
      message == '' ||
      type == ''
    ) {
      Snack('Fields with * are required');
      return;
    }

    this.setState({isLoading: true});
    const fd = `userId=${userId}&email=${email}&name=${name}&subject=${subject}&message=${message}&type=${type}&quantity=${quantity}&product=${product}&tsm=${tsm}`;
    requestForm(fd)
      .then(res => {
        if (res.data.status == true) {
          Snack(res.data.response);
          this.props.navigation.goBack();
        }
      })
      .catch(err => Snack('Connection Error. Please try again later'))
      .then(() => this.setState({isLoading: false}));
  };

  componentDidMount() {
    this.init();
  }

  render() {
    const {navigation} = this.props;
    const {
      userId,
      subject,
      name,
      message,
      product,
      quantity,
      tsm,
      isLoadingBg,
      isLoading,
    } = this.state;
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
              placeholder="Dealer User ID"
              editable={false}
            />
            <TextInput
              value={name}
              style={styles.input2}
              placeholder="Dealer Name"
              editable={false}
            />
            <TextInput
              value={tsm}
              style={styles.input2}
              placeholder="tsm"
              editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Product"
              value={product}
              onChangeText={product => this.setState({product})}
            />
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              placeholder="Quantity"
              value={quantity}
              onChangeText={quantity => this.setState({quantity})}
            />
            <TextInput
              style={styles.input}
              placeholder="Subject"
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

            {isLoading ? (
              <ActivityIndicator size="large" color={AppColors.cobalt} />
            ) : (
              <Button
                text="SUBMIT"
                style={styles.btn}
                onPress={() => this.submit()}
              />
            )}
          </ScrollView>
        </View>

        {isLoadingBg ? (
          <View
            style={{
              height: RH(100),
              width: RW(100),
              backgroundColor: '#00000095',
              position: 'absolute',
              top: 0,
              left: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: AppColors.cobalt,
                marginBottom: RH(5),
                padding: RH(2),
                width: RW(80),
              }}>
              <H2
                style={{
                  fontSize: RF(20),
                  color: '#fff',
                  textAlign: 'center',
                  marginBottom: RH(4),
                }}>
                Fetching {'\n'}Territory Relationship{'\n'}Manager Details
              </H2>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          </View>
        ) : null}
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
    fontFamily: RegFont,
    paddingVertical: RH(2),
    marginVertical: RH(0.7),
    borderBottomColor: AppColors.veryLightPink,
    borderBottomWidth: RH(0.3),
  },
  input2: {
    fontSize: RF(17),
    fontFamily: RegFont,
    paddingVertical: RH(2),
    marginVertical: RH(0.7),
    borderBottomColor: AppColors.veryLightPink,
    borderBottomWidth: RH(0.3),
    opacity: 0.8,
  },
  textbox: {
    fontSize: RF(18),
    fontFamily: RegFont,
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
