import React, { Component } from 'react';
import { View, Dimensions, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import TimerMixin from 'react-timer-mixin';

// import { LineChart } from "react-native-svg-charts";
// import { CoinListStyles } from './styles';
import { sendChartData, sendStockListData, changeCoin } from '../../actions';

import { Coin } from './Coin.js';
import coinList	from '../../../app/lib/coin-list';
import cryptoApi from '../../../app/lib/crypto-compare-api';

const userCoinList = [{ ticker: 'BTC', name: 'Bitcoin' }, { ticker: 'ETH', name: 'Ethereum' }];
class CoinList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPriceDisplayed: true,
    };
  }

	componentDidMount() {
		return coinList.getCoinListDetail(['BTC', 'ETH'])
			.then((res) => {
				console.log('componentDidMount', res);
				this.props.sendStockListData(res);
			});
	}

	onTogglePrice() {
		this.setState((preState) => {
			console.log('onTogglePrice', preState);
			return { isPriceDisplayed: !preState.isPriceDisplayed };
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

					data={this.props.stockList}
					renderItem={({ item }) => (
					<View>
	          <Coin
	            name={item.name}
							symbol={item.ticker}
							price={item.price}
							percentChange={item.percentChange}
							onPress={() => this.grabChart(`${item.ticker}`)}
	          />
						<Text onPress={() => { this.onTogglePrice(); }}>
							{this.state.isPriceDisplayed ? item.price : item.percentChange}
						</Text>
					</View>
					)}
					keyExtractor={item => item.ticker}
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

export default connect(mapStateToProps, { sendChartData, sendStockListData, changeCoin })(CoinList);
