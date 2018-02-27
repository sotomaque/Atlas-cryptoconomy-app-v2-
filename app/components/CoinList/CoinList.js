import React, { Component } from 'react';
import { View, Dimensions, FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import TimerMixin from 'react-timer-mixin';

// import { LineChart } from "react-native-svg-charts";
// import { CoinListStyles } from './styles';
import { sendChartData, sendStockListData, changeCoin, sendTickerAndName } from '../../actions';

import { Coin } from './Coin.js';
import coinList	from '../../../app/lib/coin-list';
import cryptoApi from '../../../app/lib/crypto-compare-api';

//const userCoinList = [{ ticker: 'BTC', name: 'Bitcoin' }, { ticker: 'ETH', name: 'Ethereum' }];
class CoinList extends Component {
	state = {
		isPriceDisplayed: true,
		userCoinList: [],
	}

	componentWillMount() {
		return coinList.getCoinListDetail(['BTC', 'ETH'])
			.then((res) => {
				console.log('test Config: componentDidMount', res);
				this.props.sendStockListData(res);
				res.map( (item) => {
					this.setState({ userCoinList: [...this.state.userCoinList, item] });
					console.log('State printed:', this.state);
				},
					);
			});
	}

	onTogglePrice() {
		console.log('flipped bool', this.state);
		this.setState({ isPriceDisplayed: !this.state.isPriceDisplayed });
	}

	priceOrPercent(item) {
		console.log("re-endered: ", item);
		if(item !== undefined) {

		if (this.state.isPriceDisplayed === true) {
			return item.price;
		}
		return item.percentChange;
		}
		return null;
	}

	getPrice(ticker) {
		this.props.changeCoin(ticker);
		cryptoApi.getHistoricalData({
			filter: 'DAY',
			coinName: `${ticker}`,
		})
			.then((res) => {

				const lastNum = res.slice(-1).pop();
				console.log('oh?', lastNum);
				return lastNum;
			});
	}
	grabChart(symbol) {
		this.props.changeCoin(symbol);
		return cryptoApi.getHistoricalData({
			filter: 'DAY',
			coinName: `${symbol}`,
		})
			.then((res) => {
				this.props.sendChartData(res);
			});
			console.log(this.props);
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
				width: (width - 5) / 1.5,
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
							price={item.price}
							percentChange={item.percentChange}
							onPress={() => this.grabChart(`${item.ticker}`)}
						/>
						<TouchableOpacity onPress={() => this.onTogglePrice(item)}>
							<Text>
								{this.priceOrPercent(item)}
							</Text>
						</TouchableOpacity>
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
