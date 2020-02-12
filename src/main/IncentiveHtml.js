import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WrapperMain, HeaderBack, Title, H2} from '../partials/_components';
import {RF, RW, RH} from '../lib/_sizes';
import WebView from 'react-native-webview';
import {connect} from 'react-redux';

class IncentiveHtml extends React.Component {
  render() {
    const {navigation} = this.props;
    const link = this.props.store.link;
    const url = `https://scm.spectranet.com.ng/${link}`;
    console.log(link)
    return (
      
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <HeaderBack
            goBack={() => navigation.goBack()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <Title> Incentives</Title>
        </View>
        <View style={styles.webview}>
          <WebView source={{uri: url}} style={{flex: 1}}></WebView>          
        </View>
      </WrapperMain>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      store: state.store
  }
};

export default connect(mapStateToProps, {})(IncentiveHtml);

const styles = StyleSheet.create({
  webview: {
    paddingHorizontal: RW(5),
    paddingTop: RH(1),
    flex: 1,
  },
});
