import React from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {
  Header,
  WrapperMain,
  H1,
  H2,
  Title,
  Card,
  Touch,
  LiImage,
} from '../partials/_components';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';

export default class Scoreboard extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <Header
            openDrawer={() => navigation.openDrawer()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <Title> Scoreboard</Title>
        </View>

        <View style={styles.paneTwo}>
          <ScrollView>
            <LiImage
              icon={AppIcons.mtdSales}
              text="MTD Stock Purchase"
              onPress={() =>
                navigation.navigate('ScoreboardView', 'MTD Stock Purchase')
              }
            />

            <LiImage
              icon={AppIcons.mtdSales}
              text="Available Stock"
              onPress={() =>
                navigation.navigate('ScoreboardView', 'Available Stock')
              }
            />
            <LiImage
              icon={AppIcons.mtdSales}
              text="MTD Activations"
              onPress={() =>
                navigation.navigate('ScoreboardView', 'MTD Activations')
              }
            />
            <LiImage
              icon={AppIcons.incentives}
              text="Data Inventive"
              onPress={() =>
                navigation.navigate('ScoreboardView', 'Data Inventive')
              }
            />
          </ScrollView>
        </View>
      </WrapperMain>
    );
  }
}

const styles = StyleSheet.create({
  paneOne: {
    padding: RW(6),
    height: RH(40),
  },
  paneTwo: {
    marginTop: RH(1),
    backgroundColor: '#fff',
    paddingVertical: RH(4),
    paddingHorizontal: RW(6),
    borderTopLeftRadius: RH(5),
    borderTopRightRadius: RH(5),
    flex: 1,
  },
});
