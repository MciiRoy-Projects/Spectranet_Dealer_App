import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {Touch, H2} from './_components';
import {RH, RF, RW} from '../lib/_sizes';
import {clearAll} from './_api';

const List = [
  {name: 'Account Summary', icon: AppIcons.home, nav: 'Home'},
  {name: 'Scoreboard', icon: AppIcons.scoreboard, nav: 'Scoreboard'},
  {name: 'Request Forms', icon: AppIcons.orders, nav: 'Request'},
  {name: 'Key Contact Information', icon: AppIcons.news, nav: 'Contact'},
  {name: 'Promos', icon: AppIcons.promo, nav: 'Promo'},
  {name: 'News and Announcement', icon: AppIcons.news, nav: 'NewsNotification'},
  {name: 'Profile Settings', icon: AppIcons.profile, nav: 'Profile'},
];

export const Drawer = props => {
  return (
    <View style={styles.wrapper}>
      <View style={{flex: 1}}>
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

      <Touch
        style={styles.grid}
        onPress={() => {
          clearAll();
          props.navigation.navigate('UserNavigator');
        }}>
        <Image
          style={styles.icon}
          source={AppIcons.logout}
          resizeMode="contain"
        />
        <H2 style={styles.two}>Logout</H2>
      </Touch>

      <H2
        style={{
          marginTop: RH(2),
          marginRight: RW(5),
          alignSelf: 'flex-end',
          color: '#fff',
          opacity: 0.5,
          fontSize: RF(12),
        }}>
        Version 1.0.0
      </H2>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: AppColors.cobalt,
    flex: 1,
    paddingTop: RH(5),
    justifyContent: 'flex-end',
    paddingBottom: RH(2),
  },
  grid: {
    paddingVertical: RH(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  two: {
    marginLeft: RW(4),
    fontSize: RF(16),
    color: '#fff',
  },
  icon: {
    marginLeft: RW(7),
    height: RH(2.5),
    width: RH(2.5),
  },
});
