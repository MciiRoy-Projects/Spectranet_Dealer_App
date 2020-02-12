import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  AppState,
} from 'react-native';
import Pie from 'react-native-pie';
import {Header, WrapperMain, Loading} from '../partials/_components';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';
import Chart from './TargetComponent/_chart';
import Chart2 from './TargetComponent/_chart2';
import {targetHistory, updateState} from '../actions';
import {connect} from 'react-redux';
import format from 'format-number';
import {Touch} from '../partials/_components';

class Target extends React.Component {
  constructor(props) {
    super(props);
    this.props.updateState('isLoadingBg', true);
    this.amountSold = null;
    this.dealertargetValue = null;
    this.mtd = null;
    this.valueArr = [];
    this.text = '';
    this.target_text = '';
    this.target_text = '';
    this.state = {
      popup: false,
      target_text: null,
      topup_text: null,
      click: false,
    };
  }

  init() {
    this.props.targetHistory();
  }

  componentDidMount() {
    this.init();
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.store.mtdetopupsold &&
      props.store.dealertarget &&
      props.store.mtd
    ) {
      let balance = 1000000 - props.store.mtdetopupsold;
      let targetbal = props.store.dealertarget - props.store.mtd;

      let text1 = `Your total E-top up purchased for the month is ${format({
        prefix: '₦',
      })(props.store.mtdetopupsold)}, purchase a minimum ${format({
        prefix: '₦',
      })(balance)} more to meet your target.`;

      let text2 = `Your total activation is now ${props.store.mtd}, please activate ${targetbal} more devices to meet your Target for the Month.`;
      if (state.click === false) {
        return {popup: true, topup_text: text1, target_text: text2};
      } else {
        return {popup: false};
      }
    }
    return {popup: false};
  }

  render() {
    const {navigation} = this.props;

    return (
      <WrapperMain>
        <View>
          <Header
            openDrawer={() => navigation.openDrawer()}
            openProfile={() => navigation.navigate('Profile')}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.paneTwoOne}>
            <Chart />
          </View>

          <View style={{marginVertical: RH(2)}}>
            <Chart2 />
          </View>
        </ScrollView>

        {this.props.store.isLoadingBg ? <Loading /> : null}

        {this.state.popup ? (
          <View style={styles.popup}>
            <View style={styles.options}>
              <Text style={styles.text}>{this.state.topup_text}</Text>
              <Text style={styles.text}>{this.state.target_text}</Text>
            </View>
            <Touch
              style={styles.closeBtn}
              onPress={() => this.setState({click: true})}>
              <Image
                source={AppIcons.closeform}
                resizeMode="contain"
                style={{
                  height: RH(8),
                  width: RW(15),
                }}
              />
            </Touch>
          </View>
        ) : null}
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
  targetHistory,
  updateState,
})(Target);

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
    borderRadius: RH(2),
    marginHorizontal: RW(6),
    flex: 1,
  },
  paneTwoOne: {
    marginTop: RH(1),
    paddingTop: RH(4),
    paddingHorizontal: RW(6),
    marginHorizontal: RW(6),
    alignItems: 'center',
    flex: 1,
  },
  textOneOne: {
    color: AppColors.pumpkin,
    fontSize: RF(15),
    marginBottom: RH(2),
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
    marginTop: RH(2),
  },
  two2: {
    fontSize: RF(18),
    color: AppColors.cobalt,
    paddingRight: RW(5),
    marginBottom: RH(1.5),
  },
  icon: {
    marginLeft: RW(5),
    height: RH(2.5),
    width: RH(2.5),
  },
  grid: {
    paddingVertical: RH(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#d8d8d850',
    borderTopWidth: 1,
    marginBottom: 2,
  },
  textOne: {
    fontSize: RF(16),
  },
  textTwo: {
    fontSize: RF(16),
    color: AppColors.scarlet2,
    textAlign: 'right',
  },
  gauge: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: AppColors.white,
    fontSize: 24,
    fontFamily: 'Montserrat-Regular',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
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
  options: {
    height: '50%',
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: RH(1),
    padding: RW(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    width: '80%',
    padding: RH(2),
    borderRadius: RH(1),
    marginTop: RH(1),
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    marginTop: RH(5),
    textAlign: 'center',
  },
});
