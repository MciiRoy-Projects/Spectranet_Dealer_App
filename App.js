import * as React from 'react';
import {StatusBar, Animated, Easing} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Onboard from './src/auth/Onboard';
import Login from './src/auth/Login';
import Home from './src/main/Home';
import Scoreboard from './src/main/Scoreboard';
import ScoreboardView from './src/main/ScoreboardView';

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
    //transitionConfig,
  },
);

const MainStack = createStackNavigator(
  {
    Home,
    Scoreboard,
    ScoreboardView,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const DrawerNavigator = createDrawerNavigator({
  MainStack,
});

const AppNavigator = createSwitchNavigator(
  {
    //Onboard,
    //UserNavigator,
    DrawerNavigator,
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
