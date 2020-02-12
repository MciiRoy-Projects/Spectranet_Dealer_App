import * as React from 'react';
import {StatusBar, Animated, Easing, Platform} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import OneSignal from 'react-native-onesignal';
import codePush from 'react-native-code-push';

//Redux
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './src/reducers';

import Splash from './src/auth/Splash';
import Onboard from './src/auth/Onboard';
import Login from './src/auth/Login';
import Home from './src/main/Home';
import Scoreboard from './src/main/Scoreboard';
import ScoreboardView from './src/main/ScoreboardView';
import Target from './src/main/Target';
import IncentiveView from './src/main/IncentiveView';
import IncentiveHtml from './src/main/IncentiveHtml';
import NewsNotification from './src/main/NewsNotification';
import NewsNotificationView from './src/main/NewsNotificationView';
import Contact from './src/main/Contact';
import Promo from './src/main/Promo';
import PromoView from './src/main/PromoView';
import Profile from './src/main/Profile';
import Activation from './src/main/Activation';
import PurchaseForDMth from './src/main/PurchaseForDMth';
import Etopup from './src/main/Etopup';

/*---Forms ---*/
import Request from './src/main/Request';
import CustomerComplaintForm from './src/main/forms/CustomerComplaintForm';
import DealerComplaintForm from './src/main/forms/DealerComplaintForm';
import StockPurchaseForm from './src/main/forms/StockPurchaseForm';
import SalesLeadForm from './src/main/forms/SalesLeadForm';
import DealerFeedbackForm from './src/main/forms/DealerFeedbackForm';

import Drawer from './src/partials/_drawers';

import {getData, idCheck, storePlayerID} from './src/partials/_api';
import axios from 'axios';

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
    Scoreboard,
    Target,
    Profile,
    Promo,
    Request,
    IncentiveView,
    PromoView,
    ScoreboardView,
    Activation,
    PurchaseForDMth,
    Etopup,
    IncentiveHtml,
    NewsNotification,
    NewsNotificationView,
    Contact,
    CustomerComplaintForm,
    DealerComplaintForm,
    StockPurchaseForm,
    SalesLeadForm,
    DealerFeedbackForm,
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
  constructor(properties) {
    super(properties);
    OneSignal.init('72ed7f65-ab57-45df-98bd-175ab2abd461');

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.inFocusDisplaying(0);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('openResult: ', openResult);
    const {navigation} = this.props;
    navigation.navigate('NewsNotification');
  }

  onIds(device) {
    getData('userDetails')
      .then(res => {
        let data = null;
        if (res) {
          res = JSON.parse(res);
          let userId = idCheck(res, 'userId');
          const data = `userid=${userId}&playerid=${device.userId}&os=${Platform.OS}&osversion=${Platform.Version}`;
          return data;
        }
        return data;
      })
      .then(res => {
        if (res) {
          storePlayerID(res)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }
      });
  }

  componentDidMount = () => {
    codePush.sync({
      //updateDialog: true,
      installMode: codePush.InstallMode.ON_NEXT_RESUME,
    });
  };

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
};

export default codePush(codePushOptions)(App);
