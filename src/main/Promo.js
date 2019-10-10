import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  Header,
  WrapperMain,
  H1,
  H2,
  Title,
  Touch,
} from '../partials/_components';

import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';
import {getPromos, Snack} from '../partials/_api';
import moment from 'moment';

export default class Promo extends React.Component {
  state = {
    list: [],
    isLoading: true,
  };

  loadData = () => {
    getPromos()
      .then(res => {
        res = res.data;
        if (res.status) {
          this.setState({list: res.msg});
          this.setState({isLoading: false});
          Snack('Updated . . .');
          return;
        }
        Snack(res.msg);
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const {navigation} = this.props;
    const {list, isLoading} = this.state;
    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <Header
            openDrawer={() => navigation.openDrawer()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <Title> Current Promos</Title>
        </View>

        <View style={styles.paneTwo}>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={AppColors.cobalt}
              style={{marginTop: RH(30)}}
            />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {list.map((el, key) => (
                <Touch
                  style={styles.grid}
                  key={key}
                  onPress={() => navigation.navigate('PromoView', el)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: RW(50),
                    }}>
                    <View style={styles.imageHolder}>
                      <Image
                        source={{uri: el.img}}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    </View>
                    <View>
                      <H2 style={styles.textOne}>{el.title}</H2>
                      <H1 style={styles.textTwo}>
                        {moment(el.startdate).format('MMMM DD, YYYY')}
                      </H1>
                    </View>
                  </View>
                  <Image
                    source={AppIcons.li}
                    style={{width: RF(15), height: RF(15)}}
                    resizeMode="contain"
                  />
                </Touch>
              ))}
            </ScrollView>
          )}
        </View>
      </WrapperMain>
    );
  }
}

const styles = StyleSheet.create({
  imageHolder: {
    backgroundColor: '#dfdfdf',
    width: RW(25),
    height: RH(10),
    marginRight: RW(5),
    borderRadius: RH(1),
  },
  image: {
    flex: 1,
    width: '100%',
  },
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
  textOne: {
    fontSize: RF(18),
    color: AppColors.brownishGrey,
  },
  textTwo: {
    fontSize: RF(13),
    color: AppColors.brownishGrey,
    opacity: 0.6,
    marginTop: RH(0.5),
  },
  grid: {
    paddingVertical: RH(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 0.5,
  },
});
