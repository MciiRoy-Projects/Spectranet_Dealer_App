import React from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {
  Header,
  WrapperMain,
  H1,
  H2,
  P,
  Title,
  Card,
  Touch,
  LiImage,
  Ico,
} from '../partials/_components';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';
import moment from 'moment';
import {notificationHistory, Snack} from '../partials/_api';

export default class NewsNotification extends React.Component {
  state = {
    List: [],
    isLoading: true,
  };

  loadData = () => {
    notificationHistory()
      .then(res => {
        Snack('Updated . . .');
        var List = [];
        let notifications = res.data.notifications;
        notifications.forEach(el => {
          List.push({
            item: notifications[0].headings.en,
            timestamp: moment(notifications[0].completed_at * 1000).format(
              'MMMM DD, YYYY',
            ),
            content: notifications[0].contents.en,
          });
        });
        this.setState({List});
      })
      .catch(err => {
        Snack('Connection Error. Please try again');
        this.props.navigation.goBack();
      })
      .then(() => this.setState({isLoading: false}));
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const {navigation} = this.props;
    const {List, isLoading} = this.state;
    return (
      <WrapperMain>
        <View style={{paddingHorizontal: RW(6)}}>
          <Header
            openDrawer={() => navigation.openDrawer()}
            openProfile={() => navigation.navigate('Profile')}
          />
          <Title> News & Notifications</Title>
        </View>

        <View style={styles.paneTwo}>
          {isLoading ? (
            <ActivityIndicator size="large" color={AppColors.cobalt} />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {List.map((el, key) => (
                <Touch
                  style={styles.grid}
                  onPress={() =>
                    navigation.navigate('NewsNotificationView', el)
                  }
                  key={key}>
                  <P style={styles.one}>
                    {moment(el.timestamp).format('MMMM DD, YYYY')}
                  </P>
                  <H1 style={styles.two}>{el.item}</H1>
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
