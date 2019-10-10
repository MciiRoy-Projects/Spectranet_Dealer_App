import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import {RW, RH, RF} from '../lib/_sizes';
import AppColors from '../lib/_colors';
import {monthlyPerformance, getData, idCheck, Snack} from './_api';
import {H1, P, H2} from './_components';

function minChartHeight(v) {
  if (v < 25) {
    v = 40 + v;
  }
  return v;
}

export class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      barWidth: 30,
      chartData: [],
      isLoading: true,
      isData: true,
    };
  }

  init() {
    getData('userDetails')
      .then(res => {
        if (res) {
          res = JSON.parse(res);
          let userId = idCheck(res, 'userId');
          this.loadData(userId);
        }
      })
      .catch(err => console.log(err));
  }

  loadData = userId => {
    monthlyPerformance(userId)
      .then(res => {
        res = res.data;
        if (res.success == true) {
          if (res.data.length < 1) {
            Snack('No Data Found for This User');
            this.setState({isData: false});
            return;
          }
          this.loadChart(res.data);
        }
      })
      .catch(err => alert('Error Loading Data'))
      .then(() => this.setState({isLoading: false}));
  };

  loadChart = data => {
    var sum = 0;
    let barWidth;
    let number = data.length;

    data.forEach(i => {
      sum += parseFloat(i.count);
    });

    if (number < 3) {
      barWidth = Math.ceil((RW(80) / number) * 0.2);
    } else if (number < 5) {
      barWidth = Math.ceil((RW(70) / number) * 0.7);
    } else {
      barWidth = Math.ceil((RW(80) / number) * 0.88);
    }

    this.setState({
      barWidth: barWidth,
      maxHeight: RH(48) - RH(3),
      chartData: data,
      chartSum: sum,
    });
  };

  componentDidMount() {
    this.init();
  }

  render() {
    const {
      barWidth,
      maxHeight,
      chartData,
      chartSum,
      isLoading,
      isData,
    } = this.state;
    return isLoading ? (
      <ActivityIndicator size="large" color={AppColors.cobalt} />
    ) : isData ? (
      <View style={styles.container}>
        {chartData.map((item, key) => (
          <Animated.View
            style={[
              styles.bar,
              {
                width: barWidth,
                height: minChartHeight((item.count / chartSum) * maxHeight),
              },
            ]}
            key={key}>
            <View style={styles.paneOne}>
              <P
                style={{
                  opacity: 0.5,
                  fontSize: RF(13),
                  color: AppColors.greyishBrown,
                }}>
                {item.count}
              </P>
            </View>

            <View
              style={[
                styles.paneTwo,
                {backgroundColor: AppColors.lightGreyBlue},
              ]}
            />
            <View style={styles.paneThree}>
              <H1
                style={{
                  fontSize: RF(12),
                  marginTop: RH(0.3),
                }}>
                {item.monthname.substring(0, 3)}
              </H1>
            </View>
          </Animated.View>
        ))}
      </View>
    ) : (
      <View>
        <H2 style={{marginBottom: RH(10), fontSize: RF(18), opacity: 0.2}}>
          No Information
        </H2>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  bar: {
    width: 30,
    height: 200,
    marginLeft: RW(2),
  },

  paneOne: {
    alignItems: 'center',
  },

  paneTwo: {
    alignItems: 'center',
    flex: 1,
  },

  paneThree: {
    alignItems: 'center',
  },
});
