import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  WrapperMain,
  Loading,
  PageTitle,
  Popup,
} from '../partials/_components';
import AppColors from '../lib/_colors';
import {RF, RW, RH} from '../lib/_sizes';
import Transactions from '../main/HomeComponents/_transactions';
import AvailableStocks from '../main/HomeComponents/_availablestock';
import {getAvatar} from '../partials/_api';
import {information} from '../lib/_text';

import {
  //availablestocks,
  //salesAndPurchases,
  homeactions,
  updateState,
} from '../actions';
import {connect} from 'react-redux';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props.updateState('isLoadingBg', true);
  }

  getData = async () => {
    //await this.props.salesAndPurchases();
    //await this.props.availablestocks();
    await this.props.homeactions();
  };

  init() {
    this.props.updateState('refreshing', false);
    this.getData();
    getAvatar('avatar')
      .then(res => {
        let imgsource = {uri: JSON.parse(res).uri};
        this.props.updateState('avatar', imgsource);
      })
      .catch(e => console.log(e));
  }

  hideInfo = () => {
    this.props.updateState('showInfo', false);
  };

  onRefresh = () => {
    this.props.updateState('refreshing', true);
    this.props.updateState('isLoadingBg', true);
    this.init();
  };

  componentDidMount() {
    this.init();
  }

  renderInformation() {
    return (
      <Popup>
        <View>
          <Text
            style={{
              fontSize: RF(22),
              fontWeight: 'bold',
              color: AppColors.lighBlack,
            }}>
            {information.paragraph1}
          </Text>
          <Text style={{color: AppColors.lighBlack, textAlign: 'justify'}}>
            {information.paragraph2}
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              this.props.updateState('infopopup', false);
            }}
            style={{
              backgroundColor: AppColors.niceBlue,
              borderColor: AppColors.niceBlue,
              borderWidth: 1,
              marginTop: 15,
              paddingHorizontal: RW(5),
              paddingVertical: RW(2.5),
              borderRadius: RW(2.5),
              alignItems: 'center',
            }}>
            <Text style={{color: '#FFFFFF', fontSize: RF(18)}}>OK</Text>
          </TouchableOpacity>
        </View>
      </Popup>
    );
  }

  render() {
    const {navigation} = this.props;
    return (
      <WrapperMain>
        <View>
          <Header
            openDrawer={() => navigation.openDrawer()}
            openProfile={() => navigation.navigate('Profile')}
            imgsrc={this.props.store.avatar}
          />
        </View>

        <PageTitle title={'Account Summary'} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.props.store.refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          <View style={styles.paneTwo}>
            <Transactions />
            <AvailableStocks data={this.props.store.stockdata} />
          </View>
        </ScrollView>

        {this.props.store.isLoadingBg ? <Loading /> : null}
        {this.props.store.infopopup ? this.renderInformation() : null}
      </WrapperMain>
    );
  }
}

const mapStateToProps = state => {
  return {
    store: state.store,
  };
};

export default connect(mapStateToProps, {
  //availablestocks,
  //salesAndPurchases,
  homeactions,
  updateState,
})(Home);

const styles = StyleSheet.create({
  paneOne: {
    padding: RW(6),
    height: RH(42),
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: RW(5),
  },
  paneTwo: {
    marginTop: RH(1),
    marginHorizontal: RW(3),
    paddingVertical: RH(2),
    borderRadius: RH(2),
  },
  label: {
    fontSize: RF(14),
    marginTop: RH(2),
  },
  textOne: {
    color: AppColors.pumpkin,
    fontSize: RF(15),
    paddingHorizontal: RW(8),
    marginBottom: RH(2),
  },
  grid: {
    paddingVertical: RH(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#d8d8d820',
    paddingHorizontal: RW(8),
    marginBottom: 2,
  },
  one: {
    fontSize: RF(16),
  },
  two: {
    fontSize: RF(18),
    color: AppColors.cobalt,
    textAlign: 'right',
  },
  blackscreen: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#0003',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    backgroundColor: '#fff',
    marginHorizontal: RW(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RH(2),
    padding: RW(10),
  },
  btn: {
    backgroundColor: AppColors.cobalt,
    padding: RH(2),
    paddingHorizontal: RW(10),
    borderRadius: RH(1),
  },
  textWrap: {
    color: AppColors.cobalt,
    paddingBottom: RH(2),
    textAlign: 'center',
    fontSize: RF(16),
    lineHeight: RF(25),
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
});
