import React from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import Pie from 'react-native-pie';
import {Header, WrapperMain, H1, H2, P, Title, Card, Touch, LiImage, Ico} from '../partials/_components';
import AppColors from '../lib/_colors';
import AppIcons from '../partials/_icons';
import {RF, RW, RH} from '../lib/_sizes';
import numeral from 'numeral';
import {keyContact, getData, idCheck, dealerPerformance, dealerAvailableStock, Snack} from '../partials/_api';

export default class Target extends React.Component {
	state = {
		dealerTarget: '-',
		targetAchieved: '-',
		recharge: {'Dealer Target': '-'},
		available: {'Dealer Target': '-'},
		isLoading: true,
		isChart: true,
		soldPercent: 0,
		totalStock: 0,
		stockList: [],
	};

	loadKeyContactData = userId => {
		keyContact(userId)
			.then(res => {
				console.log(userId);
				res = res.data;
				if (res.success == true) {
					this.setState(
						{
							dealerTarget: res.data['dealertarget'],
						},
						() => {
							this.checkChart();
						},
					);
				}
			})
			.catch(err => Snack('Connection Error. Please try again later.'))
			.then(() => this.setState({isLoading: false}));
	};

	loadPerformance = userId => {
		dealerPerformance(userId)
			.then(res => {
				const {data} = this.state;
				res = res.data;
				if (res.success == true) {
					res = res.data;
					this.setState({targetAchieved: res.last3month}, () => {
						this.checkChart();
					});
				}
			})
			.catch(err => console.log(err));
	};

	loadDealerAvailableStock = userId => {
		dealerAvailableStock(userId)
			.then(res => {
				const {data} = this.state;
				var totalStock = 0;
				res = res.data;
				if (res.success == true) {
					res.data.forEach(el => {
						totalStock += el.count;
					});
					this.setState({totalStock, stockList: res.data});
				}
			})
			.catch(err => console.log(err));
	};

	init() {
		getData('userDetails').then(res => {
			if (res) {
				res = JSON.parse(res);
				let userId = idCheck(res, 'userId');
				this.loadKeyContactData(userId);
				this.loadPerformance(userId);
				this.loadDealerAvailableStock(userId);
			}
		});
	}

	checkChart = () => {
		const {dealerTarget, targetAchieved} = this.state;
		if (dealerTarget == '-' || targetAchieved == '-') return;
		var soldPercent = Math.ceil((targetAchieved / dealerTarget) * 100);
		this.setState({isChart: true, soldPercent});
	};

	componentDidMount() {
		this.init();
	}

	render() {
		const {navigation} = this.props;
		const {isLoading, dealerTarget, targetAchieved, recharge, available, isChart, soldPercent, stockList, totalStock} = this.state;
		return (
			<WrapperMain>
				<View style={{paddingHorizontal: RW(6)}}>
					<Header openDrawer={() => navigation.openDrawer()} openProfile={() => navigation.navigate('Profile')} />
					<Title> Target for the month</Title>
				</View>

				{isLoading ? (
					<ActivityIndicator size="large" color={AppColors.cobalt} />
				) : (
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={styles.paneTwoOne}>
							{isChart ? (
								<Pie radius={RW(25)} innerRadius={RW(22)} series={[soldPercent]} colors={[AppColors.cobalt]} backgroundColor="#efefef" />
							) : null}
							<H1 style={styles.two}>
								{targetAchieved} / {dealerTarget}
							</H1>
							<H1 style={styles.textOneOne}>Activations</H1>
						</View>

						<View style={styles.paneTwo}>
							<H1 style={styles.textOneOne}>Available Stock (Device Wise)</H1>
							<H1 style={styles.two2}>{totalStock}</H1>

							{stockList.map((el, i) => (
								<View key={i} style={styles.grid}>
									<H2 style={styles.textOne}>{el.devicetype.toUpperCase()}</H2>
									{isNaN(el.count) || el.count == null ? (
										<H1 style={styles.textTwo}> 0 </H1>
									) : (
										<H1 style={styles.textTwo}>{numeral(el.count).format(0, 0)}</H1>
									)}
								</View>
							))}
						</View>
					</ScrollView>
				)}
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
		borderRadius: RH(2),
		marginHorizontal: RW(6),
		flex: 1,
	},
	paneTwoOne: {
		marginTop: RH(1),
		backgroundColor: '#fff',
		paddingTop: RH(4),
		paddingHorizontal: RW(6),
		borderRadius: RH(2),
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
});
