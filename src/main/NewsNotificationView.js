import React from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {
  HeaderBack,
  WrapperMain,
  H1,
  H2,
  Title,
  Ico,
} from '../partials/_components';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';

export default class NewsNotificationView extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <HeaderBack
            goBack={() => navigation.goBack()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <Title> News & Notification</Title>
        </View>

        <View style={styles.paneTwo}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.grid}>
              <Image
                source={{
                  uri: 'https://images1.jiji.ng/28104136_evo_620x326.jpg',
                }}
                style={styles.img}
                resizeMode="cover"
              />
              <H2 style={styles.header}>Evo Mifi</H2>
            </View>

            <View style={styles.grid}>
              <H2 style={styles.two}>Sub Total</H2>
              <H2 style={styles.three}>N20,000</H2>
            </View>

            <View style={styles.gridTwo}>
              <H2 style={styles.two}>Shipping</H2>
              <H2 style={styles.three}>Free Shipping</H2>
            </View>

            <View style={styles.grid}>
              <H1 style={styles.two}>Total</H1>
              <H1 style={styles.three}>N20,000</H1>
            </View>

            <View style={styles.gridThree}>
              <Ico style={styles.feedbackIcon}>&#xf058;</Ico>
              <H2 style={styles.feedback}>Order was made successfully</H2>
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
    flex: 1,
  },
  grid: {
    paddingVertical: RH(2.3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gridTwo: {
    paddingVertical: RH(2.3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 0.5,
  },
  gridThree: {
    paddingVertical: RH(2.3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RH(4),
  },
  img: {
    height: RH(15),
    width: RH(15),
  },
  header: {
    fontSize: RF(30),
  },
  two: {
    marginLeft: RW(2),
    fontSize: RF(18),
    color: AppColors.greyishBrown,
  },
  three: {
    marginLeft: RW(2),
    fontSize: RF(18),
    color: AppColors.cobalt,
  },
  feedback: {
    color: AppColors.appleGreen,
    fontSize: RF(19),
  },
  feedbackIcon: {
    color: AppColors.appleGreen,
    fontSize: RF(30),
    marginRight: RW(1),
  },
});
