import * as React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {RF, RH, RW} from '../lib/_sizes';
import AppColors from '../lib/_colors';
import AppIcons from './_icons';
import {tsStringKeyword} from '@babel/types';
import {connect} from 'react-redux';
import PlaceHolderImg from './_PlaceHolderImg';

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
  : (boldFont = 'Montserrat-Regular');

Platform.OS == 'ios'
  ? (RegFont = 'Product Sans')
  : (RegFont = 'Montserrat-Regular');

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
    <Text style={[{fontFamily: RegFont, fontWeight: fontWeight}, props.style]}>
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
        {borderRadius: RH(2), width: '100%', padding: RH(1)},
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
        backgroundColor: AppColors.fadeBlue,
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
          backgroundColor: AppColors.fadeBlue,
          paddingHorizontal: RW(6),
        },
        props.style,
      ]}>
      <StatusBar backgroundColor={AppColors.fadeBlue} barStyle="dark-content" />
      {Platform.OS == 'ios' ? <SafeAreaView /> : null}
      {props.children}
    </View>
  );
};

export const CustomText = props => {
  return (
    <Text style={[props.style, {fontFamily: 'Montserrat-Regular'}]}>
      {props.text}
    </Text>
  );
};

export const AvailabelStockWrapperMain = props => {
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: AppColors.duskBlue40,
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
    <View style={{position: 'relative'}}>
      <TextInput
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={AppColors.offWhite}
        secureTextEntry={props.secure}
        autoCapitalize="none"
        onChangeText={props.onChangeText}
        returnKeyType={props.type}
        style={[
          {
            borderColor: AppColors.white,
            borderWidth: 1,
            fontSize: RF(18),
            color: AppColors.white,
            paddingVertical: RH(2),
            paddingLeft: 20,
            fontFamily: RegFont,
          },
          props.style,
        ]}
      />
      <Text
        style={{
          position: 'absolute',
          top: -10,
          left: 10,
          paddingHorizontal: 10,
          backgroundColor: AppColors.fadeBlue,
          color: AppColors.white,
          fontFamily: RegFont,
          fontSize: RF(18),
        }}>
        {props.label}
      </Text>
    </View>
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
      <View>
        <Image
          source={AppIcons.headerlogo}
          resizeMode="contain"
          style={{
            height: RH(25),
            width: RW(32),
          }}
        />
      </View>
      <Touch onPress={props.openProfile}>
        <PlaceHolderImg />
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
          style={{width: RF(20), height: RF(20)}}
          resizeMode="contain"
        />
      </Touch>
      <View>
        <Image
          source={AppIcons.headerlogo}
          resizeMode="contain"
          style={{
            height: RH(25),
            width: RW(32),
          }}
        />
      </View>
      <Touch onPress={props.openProfile}>
        <PlaceHolderImg />
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
      style={[
        {
          color: AppColors.white,
          fontSize: RF(32),
        },
        props.style,
      ]}>
      {props.children}
    </H1>
  );
};

export const PageTitle = props => {
  return (
    <View style={{paddingHorizontal: RW(2), paddingTop: RH(2)}}>
      <Title style={props.style}>{props.title}</Title>
    </View>
  );
};

export const Loading = props => {
  return (
    <View
      style={{
        height: RH(7),
        width: RW(100),
        backgroundColor: '#000',
        position: 'absolute',
        bottom: 0,
        left: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: RW(2),
      }}>
      <Text style={{color: '#fff'}}>Connecting</Text>

      <ActivityIndicator size="small" color="#fff" />
    </View>
  );
};

class PlaceholderIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //profilePicture:'https://upload.wikimedia.org/wikipedia/commons/8/82/Linwood_Pendleton_Profile_Photograph.jpg',
      profilePicture: AppIcons.placeholder,
    };
  }

  render() {
    const {profilePicture} = this.state;
    console.log(this.props.store);
    return (
      <View
        style={{
          height: RH(5),
          width: RH(5),
          borderRadius: RH(2.5),
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
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
        <Image
          source={AppIcons.ellipse11}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: RH(2.5),
            position: 'absolute',
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    store: state.store,
  };
};

export default connect(mapStateToProps, {})(PlaceholderIcon);

export const LiImage = props => {
  return (
    <Touch style={styles.grid} onPress={props.onPress}>
      {props.num + 1 === 1 ? (
        <Image
          style={{height: RH(5), width: RH(5)}}
          source={AppIcons.available_stock}
          resizeMode="contain"
        />
      ) : null}

      {props.num + 1 === 2 ? (
        <Image
          style={{height: RH(5), width: RH(5)}}
          source={AppIcons.activation_icon}
          resizeMode="contain"
        />
      ) : null}
      {props.num + 1 === 3 ? (
        <Image
          style={{height: RH(5), width: RH(5)}}
          source={AppIcons.etopup}
          resizeMode="contain"
        />
      ) : null}
      {props.num + 1 === 4 ? (
        <Image
          style={{height: RH(5), width: RH(5)}}
          source={AppIcons.stock_purchase}
          resizeMode="contain"
        />
      ) : null}

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
          style={{width: RF(15), height: RF(15), marginRight: 15}}
          resizeMode="contain"
        />
      </View>
    </Touch>
  );
};

export const Popup = props => {
  return (
    <View style={styles.popup}>
      <View style={styles.notifyPane}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    paddingVertical: RH(2.5),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ffdbdb',
    borderBottomWidth: 0.5,
  },
  two: {
    marginLeft: RW(5),
    fontSize: RF(18),
    color: AppColors.greyishBrown,
  },
  popup: {
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: RW(100),
    height: RH(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifyPane: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: RH(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
