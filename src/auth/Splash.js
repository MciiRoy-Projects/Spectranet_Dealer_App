import React from 'react';
import {View, StyleSheet, StatusBar, Image} from 'react-native';
import AppColors from '../lib/_colors';
import {getData} from '../partials/_api';

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
      <View style={styles.container}>
        <StatusBar
          backgroundColor={AppColors.paleGrey}
          barStyle="dark-content"
        />
        <View style={styles.wrap}>
          <Image
            source={require('../../assets/img/AgentLogoDark.png')}
            style={{width: '100%'}}
            resizeMode="contain"
          />
        </View>
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
