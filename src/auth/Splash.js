import React from 'react';
import {View, StyleSheet, StatusBar, Image, ImageBackground} from 'react-native';
import AppColors from '../lib/_colors';
import {getData} from '../partials/_api';
import SplashImage from '../../assets/img/Team.png';
import {RH, RW} from '../lib/_sizes';

export default class Splash extends React.Component {
  checker = () => {
    getData('userDetails')
      .then(res => {
        if (res !== false) {
          this.props.navigation.navigate('DrawerNavigator');
        } else {
          this.props.navigation.navigate('UserNavigator');
        }
      })
      .catch(err => console.log('- - -'));
  };

  componentDidMount = () => {
    setTimeout(() => this.checker(), 1000);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        
        <ImageBackground
          source={SplashImage}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: RH(5),
            backgroundColor: '#1455A9',
            width:RW(100)
        }}>
            <StatusBar
          backgroundColor={AppColors.fadeBlue}
          barStyle="dark-content"
        />
            <Image 
              resizeMode="contain"
              style={{height:RH(65), width:RW(75)}}
              source={require('../../assets/img/AgentLogoDark.png')}/>
          </ImageBackground>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrap: {
    width: '100%',
    height: '85%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
