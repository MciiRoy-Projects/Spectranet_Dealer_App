import React from 'react';
import {View} from 'react-native';
import {Header, Wrapper, H2, Title} from '../partials/_components';

export default class Home extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <WrapperMain>
        <Header
          openDrawer={() => navigation.openDrawer()}
          openProfile={navigation.navigate('Profile')}
        />
        <Title>Account Summary</Title>
      </WrapperMain>
    );
  }
}
