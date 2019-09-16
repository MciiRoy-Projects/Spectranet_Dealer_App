import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {Touch, H2} from './_components';
import {RH, RF, RW} from '../lib/_sizes';

const List = [
  {name: 'Account Summary', icon: AppIcons.home, nav: 'Home'},
  {name: 'Scoreboard', icon: AppIcons.scoreboard, nav: 'Scoreboard'},
  {name: 'Request Forms', icon: AppIcons.orders, nav: 'Request'},
  {name: 'Key Contact Information', icon: AppIcons.news, nav: 'Home'},
  {name: 'Promos', icon: AppIcons.promo, nav: 'Home'},
  {name: 'News and Announcement', icon: AppIcons.news, nav: 'NewsNotification'},
  {name: 'Profile Settings', icon: AppIcons.profile, nav: 'Home'},
];

export const Drawer = props => {
  return (
    <View style={styles.wrapper}>
      {List.map((el, key) => (
        <Touch
          style={styles.grid}
          onPress={() => props.navigation.navigate(el.nav)}
          key={key}>
          <Image style={styles.icon} source={el.icon} resizeMode="contain" />
          <H2 style={styles.two}>{el.name}</H2>
        </Touch>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: AppColors.cobalt,
    flex: 1,
    paddingTop: RH(15),
  },
  grid: {
    paddingVertical: RH(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  two: {
    marginLeft: RW(2),
    fontSize: RF(18),
    color: '#fff',
  },
  icon: {
    marginLeft: RW(5),
    height: RH(2.5),
    width: RH(2.5),
  },
});
