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
  ScrollView,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {RF, RH, RW} from '../lib/_sizes';
import AppColors from '../lib/_colors';
import AppIcons from './_icons';

let boldFont = '';
let RegFont = '';
let fontWeight = '';

/*export const H1 = props => {
  return (
    <Text style={[{fontFamily: 'AvenirLTStd-Heavy'}, props.style]}>
      {props.children}
    </Text>
  );
};*/
Platform.OS == 'ios'
  ? (boldFont = 'Product Sans')
  : (boldFont = 'Product Sans Bold');

Platform.OS == 'ios'
  ? (RegFont = 'Product Sans')
  : (RegFont = 'Product Sans Regular');

Platform.OS == 'ios' ? (fontWeight = 'bold') : (fontWeight = 'normal');

export const Ico = props => {
  return (
    <Text
      style={[
        {fontFamily: 'Font Awesome 5 Free', fontSize: RF(20)},
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};

export const H1 = props => {
  return (
    <Text style={[{fontFamily: boldFont, fontWeight: fontWeight}, props.style]}>
      {props.children}
    </Text>
  );
};

export const H2 = props => {
  return (
    <Text
      style={[{fontFamily: RegFont}, props.style]}
      numberOfLines={props.numberOfLines}>
      {props.children}
    </Text>
  );
};

export const P = props => {
  return (
    <Text style={[{fontFamily: RegFont}, props.style]}>{props.children}</Text>
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

export const WrapperMain = props => {
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: AppColors.paleGrey,
        },
        props.style,
      ]}>
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
      value={props.value}
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
          paddingVertical: RH(2),
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

export const Header = props => {
  return (
    <View
      style={{
        marginVertical: RH(1),
        height: RH(6),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Touch onPress={props.openDrawer}>
        <Image
          style={{height: RH(3.5), width: RH(3.5)}}
          source={AppIcons.menu}
          resizeMode="contain"
        />
      </Touch>
      <Touch onPress={props.openProfile}>
        <PlaceholderIcon />
      </Touch>
    </View>
  );
};

export const HeaderBack = props => {
  return (
    <View
      style={{
        marginVertical: RH(2),
        height: RH(6),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Touch onPress={props.goBack}>
        <Image
          source={AppIcons.back}
          style={{width: RF(27), height: RF(27)}}
          resizeMode="contain"
        />
      </Touch>
      <Touch onPress={props.openProfile}>
        <PlaceholderIcon />
      </Touch>
    </View>
  );
};

export const HeaderBackNoPic = props => {
  return (
    <View
      style={{
        marginVertical: RH(1),
        height: RH(6),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Touch onPress={props.goBack}>
        <Image
          source={AppIcons.back}
          style={{width: RF(27), height: RF(27)}}
          resizeMode="contain"
        />
      </Touch>
    </View>
  );
};

export const Title = props => {
  return (
    <H1
      style={{
        color: AppColors.blue,
        fontSize: RF(23),
        marginVertical: RH(1),
        marginBottom: RH(2),
      }}>
      {props.children}
    </H1>
  );
};

export class PlaceholderIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //profilePicture:'https://upload.wikimedia.org/wikipedia/commons/8/82/Linwood_Pendleton_Profile_Photograph.jpg',
      profilePicture: AppIcons.placeholder,
    };
  }

  defaultAvatar = async () => {
    try {
      var userInfo = await AsyncStorage.getItem('userInformation');
      userInfo = JSON.parse(userInfo);
      this.setState({profilePicture: userInfo.userData.photo_url});
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.defaultAvatar();
  }

  render() {
    const {profilePicture} = this.state;
    return (
      <Image
        style={{
          height: RH(4),
          width: RH(4),
          borderRadius: RH(2.5),
          backgroundColor: '#cfcfcf',
        }}
        source={profilePicture}
        resizeMode="cover"
      />
    );
  }
}

export const LiImage = props => {
  return (
    <Touch style={styles.grid} onPress={props.onPress}>
      <Image
        style={{height: RH(5), width: RH(5)}}
        source={props.icon}
        resizeMode="contain"
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <H2 style={styles.two}>{props.text}</H2>
        <Image
          source={AppIcons.li}
          style={{width: RF(15), height: RF(15)}}
          resizeMode="contain"
        />
      </View>
    </Touch>
  );
};

const styles = StyleSheet.create({
  grid: {
    paddingVertical: RH(2.5),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 0.5,
  },
  two: {
    marginLeft: RW(5),
    fontSize: RF(20),
    color: AppColors.greyishBrown,
  },
});
