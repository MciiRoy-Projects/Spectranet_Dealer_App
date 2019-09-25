import React from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {HeaderBack, WrapperMain, Title, H2, H1} from '../partials/_components';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';

const data = [
  {item: 'MTD Stock Purchase', num: 1234},
  {item: 'Available Stock', num: 234},
  {item: 'MTD Activations', num: 1423},
  {item: 'Data Incentives', num: 14},
];

export default class ScoreboardView extends React.Component {
  render() {
    const {navigation} = this.props;
    const title = navigation.state.params;
    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <HeaderBack
            goBack={() => navigation.goBack()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <Title> {title}</Title>
        </View>

        <View style={styles.paneTwo}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((el, i) => (
              <View key={i} style={styles.grid}>
                <H2 style={styles.one}>{el.item}</H2>
                <H1 style={styles.two}>{el.num}</H1>
              </View>
            ))}
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

    borderTopLeftRadius: RH(5),
    borderTopRightRadius: RH(5),
    flex: 1,
  },
  grid: {
    paddingVertical: RH(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#d8d8d820',
    paddingHorizontal: RW(6),
    marginBottom: 2,
  },
  one: {
    fontSize: RF(18),
  },
  two: {
    fontSize: RF(18),
    color: AppColors.scarlet2,
    textAlign: 'right',
  },
});
