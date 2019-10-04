import React from 'react';
import {View, Text, StyleSheet, ImageBackground, StatusBar} from 'react-native';
import Swiper from 'react-native-swiper';
import {H1, H2, P, Touch} from '../partials/_components';
import {RF, RH, RW} from '../lib/_sizes';
import AppColors from '../lib/_colors';
import {getData} from '../partials/_api';

const header1 = 'Instant\nCommunication';
const header2 = 'Inventory\nManagement';
const header3 = 'Build a Team with\nFreelance Agents';

export default class Onboard extends React.Component {
  continue = () => {
    this.props.navigation.navigate('UserNavigator');
  };

  checker = () => {
    getData()
      .then(res => {
        if (res !== false) {
          this.props.navigation.navigate('DrawerNavigator');
        }
      })
      .catch(err => {});
  };

  componentDidMount = () => {
    setTimeout(() => this.checker(), 5);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          hidden={false}
          translucent={true}
          backgroundColor={AppColors.duskBlue40}
        />

        <Swiper
          style={styles.wrapper}
          dot={
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,.2)',
                width: RH(2),
                height: RH(2),
                borderRadius: RH(2),
                marginHorizontal: 4,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: AppColors.orange,
                width: RH(2.5),
                height: RH(2.5),
                borderRadius: RH(3),
                marginHorizontal: 4,
              }}
            />
          }>
          <View style={styles.slide}>
            <ImageBackground
              source={require('../../assets/img/slide1.png')}
              style={styles.image}
              resizeMode="cover">
              <View style={styles.overlay} />
            </ImageBackground>
            <View style={styles.pane2}>
              <H2 style={styles.text1}>{header1}</H2>
              <P style={styles.text2}>
                Enables dealers to make instant communication with the
                Spectranet sales and marketing team from the comfort of their
                mobile phones.
              </P>
            </View>

            <Touch style={styles.sideBtn} onPress={this.continue}>
              <H1 style={styles.btnText}>SKIP</H1>
            </Touch>
          </View>

          <View style={styles.slide}>
            <ImageBackground
              source={require('../../assets/img/slide2.png')}
              style={styles.image}
              resizeMode="cover">
              <View style={styles.overlay} />
            </ImageBackground>
            <View style={styles.pane2}>
              <H2 style={styles.text1}>{header2}</H2>
              <P style={styles.text2}>
                Know your inventory and make prompt requests to the store for
                more in the quest to customer satisfaction.
              </P>
            </View>

            <Touch style={styles.sideBtn} onPress={this.continue}>
              <H1 style={styles.btnText}>SKIP</H1>
            </Touch>
          </View>

          <View style={styles.slide}>
            <ImageBackground
              source={require('../../assets/img/slide3.png')}
              style={styles.image}
              resizeMode="cover">
              <View style={styles.overlay} />
            </ImageBackground>
            <View style={styles.pane2}>
              <H2 style={styles.text1}>{header3}</H2>
              <P style={styles.text2}>
                Create additional revenue generating stream, and make more
                profit as you expand your team selling Spectranet Devices
              </P>
            </View>

            <Touch style={styles.sideBtn} onPress={this.continue}>
              <H1 style={styles.btnText}>NEXT</H1>
            </Touch>
          </View>
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    alignItems: 'center',
  },
  text1: {
    color: '#000',
    fontSize: RF(26),
    textAlign: 'center',
    color: AppColors.cobalt,
    marginVertical: RH(2),
  },
  text2: {
    color: 'red',
    fontSize: RF(17),
    lineHeight: RF(22),
    textAlign: 'center',
    color: AppColors.greyishBrown,
  },
  image: {
    width: '100%',
    height: RH(55),
  },
  overlay: {
    flex: 1,
    backgroundColor: AppColors.duskBlue40,
  },
  pane2: {
    padding: RW(8),
  },
  sideBtn: {
    position: 'absolute',
    bottom: RH(1.8),
    right: RW(8),
    padding: RH(1),
  },
  btnText: {
    color: AppColors.cobalt,
    fontSize: RF(17),
  },
});
