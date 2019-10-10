import * as React from 'react';
import {StatusBar, Animated, Easing} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Splash from './src/auth/Splash';
import Onboard from './src/auth/Onboard';
import Login from './src/auth/Login';
import Home from './src/main/Home';
import Scoreboard from './src/main/Scoreboard';
import ScoreboardView from './src/main/ScoreboardView';
import Request from './src/main/Request';
import RequestForm from './src/main/RequestForm';
import NewsNotification from './src/main/NewsNotification';
import NewsNotificationView from './src/main/NewsNotificationView';
import Contact from './src/main/Contact';
import Promo from './src/main/Promo';
import PromoView from './src/main/PromoView';
import Profile from './src/main/Profile';

import {Drawer} from './src/partials/_drawers';

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

const MainStack = createStackNavigator(
  {
    Home,
    Profile,
    Promo,
    PromoView,
    Scoreboard,
    ScoreboardView,
    Request,
    RequestForm,
    NewsNotification,
    NewsNotificationView,
    Contact,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const DrawerNavigator = createDrawerNavigator(
  {
    MainStack,
  },
  {
    drawerWidth: '75%',
    contentComponent: Drawer,
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Splash,
    Onboard,
    UserNavigator,
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
