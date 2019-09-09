import * as React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
} from 'react-native';

import {RF, RH, RW} from './_sizes.js';
import AppColors from './_colors';
import AppIcons from './_icons';

export const H2 = props => {
  return (
    <Text style={[{fontFamily: 'AvenirLTStd-Heavy'}, props.style]}>
      {props.children}
    </Text>
  );
};

export const P = props => {
  return (
    <Text style={[{fontFamily: 'AvenirLTStd-Book'}, props.style]}>
      {props.children}
    </Text>
  );
};
