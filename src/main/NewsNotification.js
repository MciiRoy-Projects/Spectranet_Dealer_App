import React from 'react';
import {View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {Header, WrapperMain, Loading, PageTitle} from '../partials/_components';
import AppColors from '../lib/_colors';
import {RF, RW, RH} from '../lib/_sizes';
import {ListItem} from '../main/NewsComponent/_list';
import {connect} from 'react-redux';
import {getNews, updateState} from '../actions';
import {List} from '../main/PurchaseForDMthComponents/_list';

class NewsNotification extends React.Component {
  loadData = () => {
    this.props.getNews();
    this.props.updateState('refreshing', false);
  };

  componentDidMount() {
    this.loadData();
  }

  onRefresh = () => {
    this.props.updateState('refreshing', true);
    this.loadData();
  };

  render() {
    const {navigation} = this.props;
    return (
      <WrapperMain>
        <View>
          <Header
            openDrawer={() => navigation.openDrawer()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <PageTitle title={'News & Notifications'} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.props.store.refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          <View style={styles.paneTwo}>
            {this.props.store.News.length > 0 ? (
              this.props.store.News.map((el, key) => (
                <ListItem
                  date={el.timestamp}
                  key={key}
                  title={el.item}
                  goto={() => navigation.navigate('NewsNotificationView', el)}
                />
              ))
            ) : (
              <List title="No news" />
            )}
          </View>
        </ScrollView>

        {this.props.store.isLoadingBg ? <Loading /> : null}
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
  getNews,
  updateState,
})(NewsNotification);

const styles = StyleSheet.create({
  paneOne: {
    padding: RW(6),
    height: RH(40),
  },
  paneTwo: {
    marginTop: RH(1),
    marginHorizontal: RW(3),
    paddingVertical: RH(2),
  },
  grid: {
    paddingVertical: RH(3),
    justifyContent: 'space-between',
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 0.5,
  },
  one: {
    fontSize: RF(12),
    color: AppColors.greyishBrown,
    paddingRight: RW(10),
    opacity: 0.7,
  },
  two: {
    fontSize: RF(18),
    color: AppColors.cobalt,
    paddingRight: RW(5),
  },
  icon: {
    marginLeft: RW(5),
    height: RH(2.5),
    width: RH(2.5),
  },
});
