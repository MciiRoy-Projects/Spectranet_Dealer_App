import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AppColors from '../../lib/_colors';
import {connect} from 'react-redux';
import {RF, RW, RH} from '../../lib/_sizes';
import moment from 'moment';
import format from 'format-number';
import {ListItem} from './_list';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {updateState, getTransactionHistory} from '../../actions';
import {Button} from 'native-base';
import FontAwesome, {
  Icons,
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome';

class TransactionHst extends React.Component {
  renderRows() {
    let data = this.props.store.trxHst;

    if (data.length) {
      return data.map((el, i) => {
        return (
          <View key={i}>
            <View style={styles.rows}>
              <View style={styles.col}>
                <Text style={styles.tableTxt}>
                  {moment(el.transactiondate).format('DD-MM-YYYY')}
                </Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.tableTxt}>
                  {format({prefix: '₦'})(el.transactionamount)}
                </Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.tableTxt}>
                  {format({prefix: '₦'})(el.balancebeforetrasaction)}
                </Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.tableTxt}>{el.transfertype}</Text>
              </View>

              <View style={styles.col}>
                <Text style={styles.tableTxt}>
                  {format({prefix: '₦'})(el.balanceaftertrasaction)}
                </Text>
              </View>
            </View>
          </View>
        );
      });
    } else {
      return (
        <View style={styles.rows}>
          <Text
            style={[
              styles.tableTxt,
              {paddingVertical: RH(2), paddingHorizontal: RW(2)},
            ]}>
            No data Found
          </Text>
        </View>
      );
    }
  }

  handlePickerFrom = datetime => {
    this.props.updateState(
      'chosenDateFrom',
      moment(datetime).format('YYYY-MM-DD'),
    );
    this.props.updateState('isVisibleFrom', !this.props.store.isVisibleFrom);
  };

  showPickerFrom = () => {
    this.props.updateState('isVisibleFrom', true);
  };

  hidePickerFrom = () => {
    this.props.updateState('isVisibleFrom', false);
  };

  ///Above handels From date
  handlePickerTo = datetime => {
    this.props.updateState(
      'chosenDateTo',
      moment(datetime).format('YYYY-MM-DD'),
    );
    this.props.updateState('isVisibleTo', !this.props.store.isVisibleTo);
  };

  showPickerTo = () => {
    this.props.updateState('isVisibleTo', true);
  };

  hidePickerTo = () => {
    this.props.updateState('isVisibleTo', false);
  };

  handleSubmit() {
    this.props.updateState('isLoadingBg', true);
    this.props.getTransactionHistory(
      this.props.store.chosenDateFrom,
      this.props.store.chosenDateTo,
    );
  }

  render() {
    return (
      <View style={{width: '100%'}}>
        <ListItem
          title={'Available E-TopUp'}
          amount={this.props.store.etopupavaiable}
        />
        <View
          style={{
            marginVertical: RH(2),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.dateWrapper}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.flexDate}
              onPress={this.showPickerFrom}>
              <Text style={styles.dateTxt}>
                {this.props.store.chosenDateFrom}
              </Text>
              <DateTimePicker
                isVisible={this.props.store.isVisibleFrom}
                onConfirm={this.handlePickerFrom}
                maximumDate={new Date()}
                onCancel={this.hidePickerFrom}
              />
              <FontAwesome
                style={{color: AppColors.white}}
                icon={SolidIcons.calendarAlt}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.flexDate}
              onPress={this.showPickerTo}>
              <Text style={styles.dateTxt}>
                {this.props.store.chosenDateTo}
              </Text>
              <DateTimePicker
                isVisible={this.props.store.isVisibleTo}
                onConfirm={this.handlePickerTo}
                maximumDate={new Date()}
                onCancel={this.hidePickerTo}
              />
              <FontAwesome
                style={{color: AppColors.white}}
                icon={SolidIcons.calendarAlt}
              />
            </TouchableOpacity>

            <Button style={styles.btn} onPress={this.handleSubmit.bind(this)}>
              <Text style={styles.dateTxt}>Submit</Text>
            </Button>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.header}>
            <View style={styles.headers}>
              <Text style={styles.headTxt}>Date</Text>
            </View>

            <View style={styles.headers}>
              <Text style={styles.headTxt}>Amount</Text>
            </View>

            <View style={styles.headers}>
              <Text style={styles.headTxt}>Bal. Before Transaction</Text>
            </View>

            <View style={styles.headers}>
              <Text style={styles.headTxt}>Tranfer Type</Text>
            </View>

            <View style={styles.headers}>
              <Text style={styles.headTxt}>Bal. After Transaction</Text>
            </View>
          </View>
          {this.renderRows()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    store: state.store,
  };
};

export default connect(mapStateToProps, {
  updateState,
  getTransactionHistory,
})(TransactionHst);

const styles = StyleSheet.create({
  paneTwo: {
    marginTop: RH(1),
    flex: 1,
    width: '100%',
  },
  table: {
    backgroundColor: AppColors.white,
    width: RW(100),
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#1455A9',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RH(2),
  },

  headers: {
    width: '20%',
  },

  col: {
    width: '20%',
    paddingVertical: RH(2),
  },
  headTxt: {
    color: AppColors.white,
    fontSize: RF(13),
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  rows: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    flex: 1,
    marginVertical: RH(1),
  },
  tableTxt: {
    textAlign: 'center',
    fontSize: RF(13),
    color: '#808080',
    fontFamily: 'Montserrat-Regular',
  },
  dateWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexDate: {
    flexDirection: 'row',
    width: '35%',
    backgroundColor: '#1455A9',
    padding: RH(1.5),
    marginHorizontal: RW(1),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: AppColors.white,
  },
  calenderIcon: {
    flex: 1,
    fontFamily: 'Font Awesome 5 Free',
    fontSize: RF(12),
    color: AppColors.white,
    textAlign: 'right',
  },
  btn: {
    flex: 1,
    marginHorizontal: 2,
    backgroundColor: '#1455A9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    color: AppColors.white,
  },
  dateTxt: {
    width: '80%',
    fontSize: RF(15),
    color: AppColors.white,
    textAlign: 'center',
  },
});
