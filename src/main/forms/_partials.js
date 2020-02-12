import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';
import {RF, RW, RH} from '../../lib/_sizes';
import {Touch} from '../../partials/_components';
import {check} from '../../partials/_icons';

export const FormMessage = props => {
    
    return (
        <View style={styles.popup}>
            <View style={styles.options}>
                <Image source={check} />
                <Text style={styles.text}>Form submited {"\n"} successfully!</Text>
                <Text style={styles.text}>{props.text}</Text>
            </View>
            <Touch
                style={styles.closeBtn}
                onPress={props.action}
            >
                <Image 
                  source={props.imageSource}
                  resizeMode="contain"
                  style={{
                    height: RH(8), 
                    width: RW(15),          
                    }}
                />
            </Touch>
        </View>
    );
  };

  const styles = StyleSheet.create({
    popup: {
      backgroundColor: 'rgba(0, 0, 0, 0.78)',
      position: 'absolute',
      top: 0,
      left: 0,
      width: RW(100),
      height: RH(100),
      justifyContent: 'center',
      alignItems: 'center'
    },
    options: {
      height: '50%',
      width: '80%',
      backgroundColor: '#FFFFFF',
      borderRadius: RH(1),
      padding: RW(5),
      alignItems:'center',
      justifyContent:'center'
    },
    closeBtn: {
      width: '80%',
      padding: RH(2),
      borderRadius: RH(1),
      marginTop: RH(1),
      alignItems: 'center',
    },
    text:{
        fontFamily:'Montserrat-Regular',
        marginTop: RH(5),
        textAlign:'center'
      },
  });