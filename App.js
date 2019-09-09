import * as React from 'react';
import {StatusBar, Animated, Easing} from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Onboard from './src/auth/Onboard';
import Login from './src/auth/Login';

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.elastic(0.8)),
      timing: Animated.timing,
      useNativeDriver: true,
    },

    screenInterpolator: sceneProps => {
      const {layout, position, scene} = sceneProps;
      const thisSceneIndex = scene.index;
      const width = layout.initWidth;
      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      });
      return {transform: [{translateX}]};
    },
  };
};

const UserNavigator = createStackNavigator(
  {
    Login,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    transitionConfig,
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Onboard,
    UserNavigator,
  },
  {
    transitionConfig,
  },
);

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

export default App;
