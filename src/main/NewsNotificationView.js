import React from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {
  HeaderBack,
  WrapperMain,
  P,
  H2,
  Title,
  Ico,
} from '../partials/_components';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';
import moment from 'moment';

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
              <H2 style={styles.header}>Evo Mifi</H2>
              <P style={styles.one}>
                {moment(new Date()).format('MMMM DD, YYYY')}
              </P>
            </View>

            <View style={{marginTop: RH(1)}}>
              <H2 style={styles.two}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </H2>
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
  },

  header: {
    fontSize: RF(23),
    color: AppColors.cobalt,
  },
  two: {
    marginLeft: RW(2),
    fontSize: RF(18),
    lineHeight: RF(25),
    color: AppColors.greyishBrown,
  },
});
