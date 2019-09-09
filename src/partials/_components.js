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
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';

import {RF, RH, RW} from '../lib/_sizes';
import AppColors from '../lib/_colors';
import AppIcons from './_icons';

export const H1 = props => {
  return (
    <Text style={[{fontFamily: 'AvenirLTStd-Heavy'}, props.style]}>
      {props.children}
    </Text>
  );
};

export const H2 = props => {
  return (
    <Text style={[{fontFamily: 'AvenirLTStd-Roman'}, props.style]}>
      {props.children}
    </Text>
  );
};

export const P = props => {
  return (
    <Text style={[{fontFamily: 'AvenirLTStd-Roman'}, props.style]}>
      {props.children}
    </Text>
  );
};

export const Touch = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={props.style}
      activeOpacity={0.8}>
      {props.children}
    </TouchableOpacity>
  );
};

export const Card = props => {
  return (
    <View
      style={[
        {borderRadius: RH(2), backgroundColor: '#fff', padding: RH(1)},
        props.style,
      ]}>
      {props.children}
    </View>
  );
};

export const Wrapper = props => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.paleGrey,
        paddingHorizontal: RW(6),
      }}>
      <StatusBar backgroundColor={AppColors.paleGrey} barStyle="dark-content" />
      {Platform.OS == 'ios' ? <SafeAreaView /> : null}
      {props.children}
    </View>
  );
};

export const ColoredInput = props => {
  let check = props.value;
  return (
    <TextInput
      placeholder={props.placeholder}
      secureTextEntry={props.secure}
      autoCapitalize="none"
      onChangeText={props.onChangeText}
      returnKeyType={props.type}
      style={[
        {
          borderBottomColor: AppColors.orangeYellow,
          borderBottomWidth: RH(0.7),
          fontFamily: 'AvenirLTStd-Roman',
          fontSize: RF(18),
          color: AppColors.cobalt,
        },
        props.style,
      ]}
    />
  );
};

export const Button = props => {
  return (
    <Touch
      onPress={props.onPress}
      style={[
        {
          backgroundColor: AppColors.cobalt,
          padding: RH(2),
          borderRadius: RH(1),
          alignItems: 'center',
        },
        props.style,
      ]}>
      <H1 style={{color: '#fff', fontSize: RF(16)}}>{props.text}</H1>
    </Touch>
  );
};
