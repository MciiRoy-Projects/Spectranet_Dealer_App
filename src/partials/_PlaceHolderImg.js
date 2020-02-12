import React from 'react';
import {View, Image} from 'react-native';
import {connect} from 'react-redux';
import {RF, RH, RW} from '../lib/_sizes';
import AppIcons from './_icons';


class PlaceHolderImg extends React.Component {
    
    render() {
      return (
        <View style={{
          height: RH(5),
          width: RH(5),
          borderRadius: RH(2.5),
          position:'relative',
          alignItems:'center',
          justifyContent:'center'
        }}>
                <Image
                  style={{
                    height: RH(4),
                    width: RH(4),
                    borderRadius: RH(2.5),
                    backgroundColor: '#cfcfcf',
                  }}
                  source={this.props.store.avatar}
                  resizeMode="cover"
                />
                <Image
                  source={AppIcons.ellipse11}
                  resizeMode="cover"
                  style={{
                    width: '100%', 
                    height: '100%', 
                    borderRadius: RH(2.5), 
                    position:'absolute'
                  }}
                />
              </View> 
      );
    }
  }
  
  const mapStateToProps = (state) => {
    return {
        store: state.store
    }
  };
  
  export default connect(mapStateToProps, {})(PlaceHolderImg);