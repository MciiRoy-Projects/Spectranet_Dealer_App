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

/*export const H1 = props => {
  return (
    <Text style={[{fontFamily: 'AvenirLTStd-Heavy'}, props.style]}>
      {props.children}
    </Text>
  );
};*/

export const H1 = props => {
  return (
    <Text style={[{fontFamily: 'Product Sans Bold'}, props.style]}>
      {props.children}
    </Text>
  );
};

export const H2 = props => {
  return (
    <Text style={[{fontFamily: 'Product Sans Regular'}, props.style]}>
      {props.children}
    </Text>
  );
};

export const P = props => {
  return (
    <Text style={[{fontFamily: 'Product Sans Regular'}, props.style]}>
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

export const Header = props => {
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

export const Title = props => {
  return (
    <H1
      style={{
        color: AppColors.blue,
        fontSize: RF(28),
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
    let imgPicture = profilePicture;
    imgPicture == ''
      ? (imgPicture =
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSgjwZnhSrPqOgR9kN17cZx3fsFxWKsbdtoerHMPRXLPcPgJxFt')
      : null;

    return (
      <Image
        style={{
          height: RH(5),
          width: RH(5),
          borderRadius: RH(2.5),
          backgroundColor: '#cfcfcf',
        }}
        source={imgPicture}
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
      <H2 style={styles.two}>{props.text}</H2>
    </Touch>
  );
};

const styles = StyleSheet.create({
  grid: {
    paddingVertical: RH(2),
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
