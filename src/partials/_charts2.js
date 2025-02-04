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
  if (v < 50) {
    v = 30 + v;
  }
  return v;
}

export class ChartTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barWidth: 30,
      chartData: props.chartData,
      isLoading: true,
      isData: false,
    };
  }

  loadChart = data => {
    let maxHeight = RH(60) - RH(3);
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
      maxHeight,
      chartData: data,
      chartSum: sum,
    });
  };

  componentDidMount() {
    if (this.props.chartData.length > 0) {
      this.setState({isData: true, isLoading: false});
      this.loadChart(this.props.chartData);
    }
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
    minHeight: RH(10),
    marginBottom: RH(1),
    padding: RW(5),
  },

  bar: {
    width: 30,
    height: RH(50),
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
