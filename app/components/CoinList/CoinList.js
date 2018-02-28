import React, { Component } from 'react';
import { View, Dimensions, FlatList } from 'react-native';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import TimerMixin from 'react-timer-mixin';

// import { LineChart } from "react-native-svg-charts";
// import { CoinListStyles } from './styles';
import { sendChartData, sendStockListData, changeCoin, sendTickerAndName } from '../../actions';

import { Coin } from './Coin.js';
import coinList	from '../../../app/lib/coin-list';
import cryptoApi from '../../../app/lib/crypto-compare-api';

const userCoinTickerList = ['BTC', 'ETH', 'XRP'];
class CoinList extends Component {
	state = {
		isPriceDisplayed: true,
		userCoinList: [],
	}
	componentWillMount() {
		//coinList.getCoinListDetail(userCoinTickerList, coinList.IS_DISPLAY_ALL)
		return coinList.getCoinListDetail(userCoinTickerList)
			.then((res) => {
				this.props.sendStockListData(res);
				res.map((item) => {
					return this.setState({ userCoinList: [...this.state.userCoinList, item] });
				});
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

	priceOrPercent(item) {
		if (item !== undefined) {
			if (this.state.isPriceDisplayed === true) {
			return item.price;
			}
			return item.percentChange;
		}
		return null;
	}
	grabChart(ticker, name) {
		/*
		this.props.changeCoin(symbol);
		return cryptoApi.getHistoricalData({
			filter: 'DAY',
			coinName: `${symbol}`,
		})
			.then((res) => {
				this.props.sendChartData(res);
			});
			*/
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
				width: (width / 1.1),
				justifyContent: 'center',
				marginLeft: 0,
				flex: 1,
				}}
			>
				<FlatList

					data={this.state.userCoinList}
					keyExtractor={item => item.ticker}
					extraData={this.state.isPriceDisplayed}
					renderItem={({ item }) => (
					<View>
						<Coin
							name={item.name}
							symbol={item.ticker}
							priceChange={this.priceOrPercent(item)}
							change={item.percentChange}
							onPress={() => this.grabChart(item.ticker, item.name)}
							onPressPrice={() => this.onTogglePrice(item)}
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

export default connect(mapStateToProps, { sendChartData, sendStockListData, changeCoin, sendTickerAndName })(CoinList);
