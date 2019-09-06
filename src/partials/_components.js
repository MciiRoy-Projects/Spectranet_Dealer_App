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
import {LinearGradient} from 'expo';
import {RF, RH, RW} from './_sizes.js';
import AppColors from './_colors';
import AppIcons from './_icons';

export const Wrapper = props => {
  return (
    <View
      style={styles.wrappers}
      keyboardVerticalOffset={RF(2)}
      behavior="padding">
      {props.children}
    </View>
  );
};

export const WrapperNoPad = props => {
  return (
    <View
      style={[styles.wrappers2, props.defaultStyle]}
      keyboardVerticalOffset={RF(2)}
      behavior="padding">
      {props.children}
    </View>
  );
};

export const SwipeCard = props => {
  return (
    <View style={styles.swipeCardContainer}>
      <ImageBackground
        style={{height: RH(55), width: '120%'}}
        source={slides.url}
        resizeMode="cover">
        <View style={{flex: 1, backgroundColor: AppColors.duskBlue40}} />
      </ImageBackground>

      <View
        style={{
          height: RH(40),
          alignItems: 'center',
          paddingTop: RH(2),
          paddingVertical: RH(1),
          paddingHorizontal: RW(10),
        }}>
        <Text style={styles.swipeText}>{props.slides.header}</Text>

        <Text style={styles.swipeContent}>{props.slides.content}</Text>
      </View>
    </View>
  );
};

export const AppButton = props => {
  const {onPress, title, myStyles} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
      onPress={onPress}>
      <LinearGradient
        style={[styles.buttonBg, myStyles]}
        colors={[AppColors.niceBlue, AppColors.darkPeriwinkle]}
        start={[0, 1]}
        end={[1, 0]}>
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const AppButtonIcon = props => {
  const {onPress, title, icon, color, textColor} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[_iconBtn.overlayBtn, {backgroundColor: color}]}
      onPress={onPress}>
      <Text style={[_iconBtn.icon, {color: textColor}]}>{icon}</Text>

      <Text style={[_iconBtn.text, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export const AppInput = props => {
  const {
    placeholder,
    isSecure,
    lines,
    onChangeText,
    onSubmitEditing,
    refValue,
    returnKeyType,
    maxLength,
    keyboardType,
    editable,
    value,
    style,
  } = props;

  var thePlaceholder = placeholder;

  if (thePlaceholder.slice(0, 1) == '*') {
    thePlaceholder = placeholder.substring(2, placeholder.length);
  }

  return (
    <View>
      <Text
        style={{
          fontFamily: 'aHeavy',
          fontSize: RF(15),
          color: AppColors.normalText,
          opacity: 0.3,
        }}>
        {placeholder}
      </Text>

      <TextInput
        editable={editable}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={thePlaceholder}
        placeholderTextColor={AppColors.brownishGreyLight}
        style={[styles.inputStyle, style]}
        secureTextEntry={isSecure}
        numberOfLines={lines}
        onSubmitEditing={onSubmitEditing}
        autoCapitalize="none"
        maxLength={maxLength}
        value={value}
        ref={refValue}
      />
    </View>
  );
};

export const AppInputColored = props => {
  const {
    placeholder,
    isSecure,
    lines,
    onChangeText,
    onSubmitEditing,
    refValue,
    returnKeyType,
    style,
  } = props;

  return (
    <View style={style}>
      <Text
        style={{
          fontFamily: 'aHeavy',
          fontSize: RF(15),
          color: AppColors.normalText,
          opacity: 0.3,
        }}>
        {placeholder}
      </Text>

      <TextInput
        returnKeyType={returnKeyType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={AppColors.brownishGreyLight}
        style={[styles.inputStyle, {marginBottom: RH(0)}]}
        secureTextEntry={isSecure}
        autoCapitalize="none"
        numberOfLines={lines}
        onSubmitEditing={onSubmitEditing}
        ref={refValue}
      />
    </View>
  );
};

export const Grid = props => {
  const {gridStyle} = props;
  return <View style={[styles.grids, gridStyle]}>{this.props.children}</View>;
};

export const Row = props => {
  const {rowStyle} = props;
  return <View style={[styles.rows, rowStyle]}>{this.props.children}</View>;
};

export const OverlayAlert = props => {
  const {msg, btnStatus, onPress} = props;
  return (
    <View style={_overlayAlert.wrapper}>
      <View style={_overlayAlert.content}>
        <Text style={_overlayAlert.msg}>{msg}</Text>

        {btnStatus ? (
          <TouchableOpacity style={_overlayAlert.btn} onPress={onPress}>
            <Text style={_overlayAlert.btnText}>OK</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export const OverlayView = props => {
  return <View style={_overlayAlert.wrapper}>{props.children}</View>;
};

export class Circlebtn extends React.Component {
  render() {
    const {color1, color2, size, icon, onPress, style} = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          style={[
            _circleBtn.buttonBg,
            {height: size, width: size, borderRadius: size},
            style,
          ]}
          colors={[color1, color2]}
          start={[0, 1]}
          end={[1, 0]}>
          <Text style={_circleBtn.theIcons}>
            {String.fromCharCode(parseInt(icon, 16))}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

export class IconButton extends React.Component {
  render() {
    const {title, icon, text, onPress} = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={_iconBtnThing.wrapper}
        onPress={onPress}>
        <LinearGradient
          style={_iconBtnThing.buttonBg}
          colors={[AppColors.niceBlue, AppColors.darkPeriwinkle]}
          start={[0, 1]}
          end={[1, 0]}>
          <Text style={_iconBtnThing.texts}>{title}</Text>

          <Text style={_iconBtnThing.icons}>
            {String.fromCharCode(parseInt(icon, 16))}
          </Text>
        </LinearGradient>

        <Text
          style={{
            fontFamily: 'aLight',
            fontSize: RF(22),
            color: AppColors.normalText,
            marginLeft: RW(3),
          }}
          numberOfLines={1}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

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
      //console.log(err);
    }
  };

  componentDidMount() {
    this.defaultAvatar();
  }

  render() {
    const {profilePicture} = this.state;
    let imgPicture = profilePicture;
    if (imgPicture == '' || imgPicture == null) {
      imgPicture =
        'https://nellions.co.ke/wp-content/uploads/2018/06/male-placeholder-image.jpeg';
    }

    return (
      <Image
        style={{height: RH(5), borderRadius: RH(2.5)}}
        source={{uri: imgPicture}}
        resizeMode="cover"
      />
    );
  }
}

export class MenuIcon extends React.Component {
  render() {
    return (
      <Image
        style={{height: RH(3.5), width: RH(3.5)}}
        source={require('../../assets/icons/menu.png')}
        resizeMode="contain"
      />
    );
  }
}

export class Dropdown extends React.Component {
  onClosed = () => {
    const {controller} = this.props;
    controller.closeModal();
  };

  onChoose = value => {
    const {title, controller} = this.props;
    controller.chooseModal(value, title);
  };

  render() {
    const {list, title} = this.props;

    return (
      <TouchableOpacity
        style={_dd.containter}
        onPress={this.onClosed}
        activeOpacity={0.5}>
        <View style={_dd.wrapper}>
          <Text style={_dd.txtOne}>{title}</Text>

          <ScrollView>
            {list.map((item, key) => (
              <TouchableOpacity
                style={_dd.listWrap}
                key={key}
                onPress={() => this.onChoose(item)}>
                <Text style={_dd.listTxt}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    );
  }
}

const _ppchange = StyleSheet.create({
  headerWrapper: {
    fontSize: RF(20),

    fontFamily: 'nBold',

    marginVertical: RH(3),

    paddingTop: RH(5),

    color: AppColors.orange,
  },

  container: {
    position: 'absolute',

    backgroundColor: '#fff',

    top: 0,

    left: 0,

    width: '100%',

    height: '110%',

    paddingHorizontal: RW(8),
  },

  input: {},
});

const _dd = StyleSheet.create({
  containter: {
    width: '100%',
    height: '110%',
    backgroundColor: '#0008',
    position: 'absolute',
    top: 0,
    let: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  wrapper: {
    backgroundColor: '#fff',
    width: RW(93),
    padding: RW(3.5),
    top: RH(30),
    maxHeight: RH(45),
    position: 'absolute',
    borderRadius: 10,
  },

  listWrap: {
    paddingVertical: RH(2),
    borderTopWidth: 0.5,
    borderTopColor: '#5552',
  },

  txtOne: {
    fontFamily: 'aHeavy',
    color: AppColors.greyishBrown,
    fontSize: RF(24),
    marginBottom: RH(2),
  },

  listTxt: {
    fontFamily: 'nReg',
    color: AppColors.greyishBrown,
    fontSize: RF(22),
  },
});

const _iconBtnThing = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: RH(2),
    alignItems: 'center',
  },

  buttonBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '55%',
    paddingVertical: RH(1.5),
    borderRadius: RH(50),
  },

  texts: {
    fontFamily: 'Reg',
    color: '#fff',
    fontSize: RF(20),
  },

  icons: {
    marginLeft: RW(4),
    fontFamily: 'Ic',
    color: '#fff',
    fontSize: RF(25),
  },
});

const _circleBtn = StyleSheet.create({
  buttonBg: {
    borderRadius: RH(9),
    alignItems: 'center',
    justifyContent: 'center',
  },

  theIcons: {
    color: '#fff',
    fontFamily: 'Fa',
    fontSize: RF(30),
  },
});

const _cardStyle = StyleSheet.create({
  cardOneWraper: {
    width: RW(38),
    marginLeft: RW(8),
    marginBottom: RH(6),
  },

  cardTwoWraper: {
    width: '100%',
    height: RH(20),
    marginLeft: RW(8),
    marginBottom: RH(5),
  },

  imageOne: {
    width: '100%',
    height: RH(20),
    backgroundColor: '#efefef',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  txtOne: {
    marginTop: RH(1),
    fontFamily: 'nReg',
    fontSize: RF(22),
    color: AppColors.greyishBrown,
  },

  txtTwo: {
    fontFamily: 'aRoman',
    fontSize: RF(18),
    color: AppColors.blue,
  },

  txtThree: {
    fontFamily: 'Fa',
    color: AppColors.blue,
    fontSize: RF(25),
  },
});

const _iconBtn = StyleSheet.create({
  overlayBtn: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RH(2),
    flexDirection: 'row',
    marginBottom: RH(1),
  },

  icon: {
    fontFamily: 'Fa',
    fontSize: RF(22),
    paddingRight: RW(2),
  },

  text: {
    fontFamily: 'Reg',
    fontSize: RF(22),
  },
});

const _overlayAlert = StyleSheet.create({
  wrapper: {
    width: RW(100),
    height: RH(105),
    backgroundColor: '#0009',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },

  content: {
    width: RW(90),
    borderRadius: 10,
    paddingVertical: RH(3),
    paddingHorizontal: RW(5),
    backgroundColor: AppColors.blue,
    alignItems: 'center',
  },

  msg: {
    fontFamily: 'Reg',
    fontSize: RF(22),
    color: '#fff',
    marginBottom: RH(2),
    textAlign: 'center',
    lineHeight: RH(4),
  },

  btn: {
    backgroundColor: '#fff',
    padding: RH(2),
    width: RW(30),
    borderRadius: 10,
    alignItems: 'center',
  },

  btnText: {
    color: AppColors.blue,
    fontFamily: 'Semi',
    fontSize: RF(20),
  },
});

const styles = StyleSheet.create({
  swipeCardContainer: {
    flex: 1,
  },

  swipeText: {
    marginTop: RH(3),
    fontSize: RF(35),
    textAlign: 'center',
    fontFamily: 'Semi',
    color: AppColors.cobalt,
  },

  swipeContent: {
    marginTop: RH(2),
    fontSize: RF(22),
    textAlign: 'center',
    lineHeight: RH(4),
    fontFamily: 'aLight',
    color: AppColors.greyishBrown,
  },

  wrappers: {
    backgroundColor: '#fff',
    borderRadius: RH(2),
    padding: RW(7),
    paddingHorizontal: RW(10),
    marginBottom: RH(0.5),
  },

  wrappers2: {
    backgroundColor: '#fff',
    borderRadius: RH(2),
  },

  button: {
    width: RW(80),
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: RH(1.7),
    borderRadius: 5,
    shadowColor: 'rgba(94, 154, 250, 0.5)',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
  },

  buttonBg: {
    height: RH(8),
    width: RW(80),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    shadowColor: 'rgba(94, 154, 250, 0.5)',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
  },

  buttonText: {
    fontSize: RF(24),
    fontFamily: 'Semi',
    color: '#fff',
  },

  inputStyle: {
    fontSize: RF(24),
    fontFamily: 'aBook',
    borderBottomColor: AppColors.skyBlue,
    borderBottomWidth: RH(0.1),
    paddingVertical: RH(1),
    marginBottom: RH(4),
  },

  grids: {
    width: '100%',
    flexDirection: 'row',
  },

  rows: {
    justifyContent: 'center',
  },
});
