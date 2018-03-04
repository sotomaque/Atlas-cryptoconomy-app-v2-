import React, { Component } from 'react';
import { View, Dimensions, FlatList } from 'react-native';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import TimerMixin from 'react-timer-mixin';

// import { LineChart } from "react-native-svg-charts";
// import { CoinListStyles } from './styles';
import { sendChartData, resetChart, sendStockListData, changeCoin, sendTickerAndName, resetToUserHistory } from '../../actions';
import { Coin } from './Coin.js';
import coinList	from '../../../app/lib/coin-list';
import cryptoApi from '../../../app/lib/crypto-compare-api';

const userCoinTickerList = ['BTC', 'ETH', 'XRP'];
const userCoinHoldingList = { BTC: 3.5, NEO: 10 };

class CoinList extends Component {
	state = {
		isPriceDisplayed: true,
		userCoinList: [],
	}
	componentWillMount() {
		// coinList.getCoinListDetail(userCoinTickerList, coinList.IS_DISPLAY_ALL)
		coinList.getCoinListDetail(userCoinTickerList)
			.then((res) => {
		//		this.props.sendStockListData(res);
				res.map((item) => {
					return this.setState({ userCoinList: [...this.state.userCoinList, item] });
				});
			});
	//		this.props.resetToUserHistory();
		return coinList
			.getUserHistoryData()
				.then((res) => {
					this.props.sendChartData(res, 'DAY');
				});
	}

	onTogglePrice() {
		this.setState({ isPriceDisplayed: !this.state.isPriceDisplayed });
	}

	getPrice(ticker) {
		this.props.changeCoin(ticker);
		cryptoApi.getHistoricalData({
			filter: 'DAY',
			coinName: `${ticker}`,
		})
			.then((res) => {
				const lastNum = res.slice(-1).pop();
				return lastNum;
			});
	}

	grabChart(ticker, name) {
		this.props.resetChart();
		this.props.changeCoin(ticker);	// Sets filter to usew with selectedCoin
		this.props.sendTickerAndName(ticker, name);
		this.props.nav.navigate('coinpage');
	}

	render() {
		const width = Dimensions.get('window').width;
		return (
			<View
				style={{
				borderRadius: 10,
				padding: 10,
				width,
				justifyContent: 'space-around',
				marginLeft: 0,
				}}
			>
				<FlatList

					data={this.state.userCoinList}
					keyExtractor={item => item.ticker}
					extraData={this.state.isPriceDisplayed}
					renderItem={({ item }) => (
					<View style={{ marginRight: 0 }}>
						<Coin
							name={item.name}
							symbol={item.ticker}
							quantity={userCoinHoldingList[item.ticker]}
							percentChange={item.percentChange}
							onPress={() => this.grabChart(item.ticker, item.name)}
							onPressPrice={() => this.onTogglePrice(item)}
							price={item.price}
							priceOverPercent={this.state.isPriceDisplayed}
						/>
					</View>
					)}

				/>
			</View>
	);
	}
}

function mapStateToProps(store) {
  return {
		filter: store.stockFilterReducer.filter,
		stockList: store.stockFilterReducer.stockList,
		stockData: store.stockFilterReducer.stockData,
		selectedPoint: store.stockFilterReducer.selectedPoint,
		endPoint: store.stockFilterReducer.endPoint,
  };
}

export default connect(
	mapStateToProps,
	{
		sendChartData,
		sendStockListData,
		changeCoin,
		sendTickerAndName,
		resetToUserHistory,
		resetChart,
	},
	)(CoinList);
