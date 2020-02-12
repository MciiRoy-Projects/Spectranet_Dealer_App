import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {Touch, H2} from './_components';
import {RH, RF, RW} from '../lib/_sizes';
import {clearAll} from './_api';

import { 
  logout
 } from '../actions';
import {connect} from 'react-redux';

const List = [
  {name: 'Account Summary', icon: AppIcons.home, nav: 'Home'},
  {name: 'Scoreboard', icon: AppIcons.scoreboard, nav: 'Scoreboard'},
  {name: 'My Target', icon: AppIcons.orders, nav: 'Target'},
  {name: 'Promos', icon: AppIcons.promo, nav: 'Promo'},
  {name: 'Incentives', icon: AppIcons.incentives, nav: 'IncentiveView'},
  {name: 'Request Forms', icon: AppIcons.forms, nav: 'Request'},
  {name: 'Key Contact Information', icon: AppIcons.contact, nav: 'Contact'},
  {name: 'News and Notifications',icon: AppIcons.news,nav: 'NewsNotification'},
  {name: 'Profile Settings', icon: AppIcons.profile, nav: 'Profile'},
];

const Drawer = props => {
  
  return (
    <View style={styles.wrapper}>

      <View style={styles.closeWrp}>
        <Touch
            style={{alignSelf:'flex-end'}}
            onPress={() => props.navigation.closeDrawer()}>
            <Image
              style={[styles.icon,styles.closeIcon]}
              source={AppIcons.closeicon}
              resizeMode="contain"
            />
        </Touch>
      </View>
      
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

      <View style={{alignSelf: 'flex-start',width:'100%'}}>
          <Touch
            style={styles.grid}
            onPress={() => {
              props.logout();
              removeUserDetails()
              .then(() => {
                props.navigation.navigate('UserNavigator');
              })
            }}>
            <Image
              style={styles.icon}
              source={AppIcons.logout}
              resizeMode="contain"
            />
            <H2 style={[styles.two, {color:'#F86296'}]}>Logout</H2>
          </Touch>

          <H2
            style={{
              marginTop: RH(2),
              marginRight: RW(5), 
              alignSelf:'flex-end',             
              color: '#F86296',
              opacity: 0.8,
              fontSize: RF(12),
            }}>
            Version 1.5.0
        </H2>
      </View>

      
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
      store: state.store
  }
};

export default connect(mapStateToProps, { 
  logout
 })(Drawer);

async function removeUserDetails(){
   await clearAll();
}



const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: AppColors.white,
    flex: 1,
    justifyContent: 'center',
    paddingBottom: RH(2),
  },
  closeWrp:{
    alignSelf: 'flex-start', 
    width:'100%',
    paddingTop:RH(1),
    paddingBottom:RH(3),
    paddingRight:RH(2)
  },
  grid: {
    paddingVertical: RH(2.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  two: {
    marginLeft: RW(4),
    fontSize: RF(16),
    color: '#0057A5',
  },
  icon: {
    marginLeft: RW(7),
    height: RH(2.5),
    width: RH(2.5),
  },
  closeIcon:{
      height: RH(2.5),
      width: RH(2.5),
  }
});
