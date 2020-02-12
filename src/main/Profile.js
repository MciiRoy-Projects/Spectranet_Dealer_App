import React from 'react';
import {
  View, 
  StyleSheet, 
  ScrollView, 
  Image,
  TouchableOpacity
} from 'react-native';
import {
  HeaderBackNoPic,
  WrapperMain,
  H2
} from '../partials/_components';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';
import {getData, idCheck, setAvatar, getAvatar} from '../partials/_api';
import {updateState} from '../actions';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

class Profile extends React.Component {

  constructor(props){
    super(props);
  } 
  
  
  init() {
    getData('userDetails').then(res => {
      if (res) {
        res = JSON.parse(res);
        let userId = idCheck(res, 'userId');
        let email = idCheck(res, 'email');
        let name = `${idCheck(res, 'firstName')} ${idCheck(res, 'lastName')}`;
          this.props.updateState("userId", userId);
          this.props.updateState("email", email);
          this.props.updateState("name", name);
      }
    });
  }

  chooseImage = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
          console.log(response);
          const source = { uri: response.uri };
          
          setAvatar('avatar',response);
          // this.props.updateState("filePath", response);
          // this.props.updateState("fileData", response.data);
          // this.props.updateState("fileUri", response.uri);
          this.props.updateState("avatar", source);  
          
        
        
      }
    });
  }

  // removeAvatar = async () =>{
  //   await AsyncStorage.removeItem('Avatar');
  // }

  // storeAvatar = async (source) =>{
  //   await AsyncStorage.setItem("Avatar", JSON.stringify(source));
  // }

  
    

  componentDidMount() {
    this.init();
 
  }

  render() {
    const {navigation} = this.props;
    return (
      <WrapperMain>
        <View>
          <HeaderBackNoPic goBack={() => navigation.goBack()} />
        </View>

        
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.paneTwo}>

            {             
              
              <TouchableOpacity onPress={this.chooseImage}>
              <View style={styles.imgHolder}>
                <Image
                  source={this.props.store.avatar}
                  resizeMode="cover"
                  style={{width: '90%', height: '90%', borderRadius: RH(20)}}
                />
                <Image
                  source={AppIcons.ellipse}
                  resizeMode="cover"
                  style={{
                    width: '100%', 
                    height: '100%', 
                    borderRadius: RH(20), 
                    position:'absolute'
                  }}
                />
              </View>
            </TouchableOpacity>
            }
            
          

            <View style={styles.div}>
              <H2 style={styles.label}>Name</H2>
              <H2 style={styles.text}>{this.props.store.name}</H2>
            </View>

            <View style={styles.div}>
              <H2 style={styles.label}>Dealer ID</H2>
              <H2 style={styles.text}>{this.props.store.userId}</H2>
            </View>

            <View style={styles.div}>
              <H2 style={styles.label}>Email</H2>
              <H2 style={styles.text}>{this.props.store.email}</H2>
            </View>
            </View>
          </ScrollView>
        
      </WrapperMain>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      store: state.store
  }
};

export default connect(mapStateToProps, {updateState})(Profile);

const styles = StyleSheet.create({
  paneTwo: {
    marginTop: RH(1),
    alignItems: 'center',
    flex:1,
    marginHorizontal: RW(3),
    paddingVertical: RH(2),
    paddingHorizontal:RW(1)
  },
  imgHolder: {
    alignSelf: 'center',
    height: RH(25),
    width: RH(25),
    borderRadius: RH(25),
    backgroundColor: '#efefef',
    marginVertical: RH(3),
    position:'relative',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#1455A9'
  },
  two: {
    marginLeft: RW(2),
    fontSize: RF(18),
    color: AppColors.greyishBrown,
  },
  icon: {
    marginLeft: RW(5),
    height: RH(2.5),
    width: RH(2.5),
  },
  div: {
    width: RW(90),
    borderBottomColor: AppColors.offWhite,
    borderBottomWidth: 1,
    paddingBottom: RH(1),
    marginTop: RH(5),
    alignItems:'center'
  },
  label: {
    textAlign: 'center',
    fontSize: RF(15),
    marginBottom: RH(0.5),
    color: AppColors.white,
    width:'100%',
    alignSelf:'flex-start'
  },
  text: {
    textAlign: 'center',
    fontSize: RF(18),
    color: AppColors.white,
    width:'100%',
    alignSelf:'flex-start'
  },
});
