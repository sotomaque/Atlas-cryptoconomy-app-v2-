import React, { Component } from 'react';
import { View, Dimensions, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import TimerMixin from 'react-timer-mixin';

//import { LineChart } from "react-native-svg-charts";
import { CoinListStyles } from './styles';
import { sendChartData, sendStockListData } from '../../actions';

import { SingleCoinDisplay } from './SingleCoinDisplay';
import { Coin } from './Coin.js';
import coinList	from '../../../app/lib/coin-list';
import cryptoApi from '../../../app/lib/crypto-compare-api';

const userCoinList = [{ ticker: 'BTC', name: 'Bitcoin' }, { ticker: 'ETH', name: 'Ethereum' }];
class CoinList extends Component {

	componentDidMount() {
		return coinList.getCoinListDetail(['BTC', 'ETH'])
			.then((res) => {
				console.log('componentDidMount', res);
				this.props.sendStockListData(res);
			});
	}

	grabChart(symbol) {
		console.log('why');
		return cryptoApi.getHistoricalData({ filter: 'DAY',
			coinName: `${symbol}` })
			.then((res) => {
				this.props.sendChartData(res);
				this.setState({
					stockList: res,
				});
			});
	}

	render() {
		/*
			const width = Dimensions.get('window').width; // full device width, captured at runtime
			return (
				<View style={{ backgroundColor: 'blue', flexDirection: 'column', width }}>
					<FlatList
						data={this.props.stockList}
						keyExtractor={item => item.key}
						renderItem={ ({ item, index }) => {
						return (<SingleCoinDisplay data={item} />)
					}};
					</FlatList>
				</View>
			);
    }
	*/
		const width = Dimensions.get('window').width;
		return (
			<View
				style={{
				borderRadius: 10,
				padding: 10,
				width: (width - 5) / 1.5,
				justifyContent: 'center',
				marginLeft: 0,
				flex: 1
				}}
			>
				<FlatList

					data={userCoinList}
					renderItem={({ item }) => (
          <Coin
            name={item.name}
						symbol={item.ticker}
						price='100'
						onPress={() => this.grabChart(`${item.ticker}`)}
          />
					)}
					keyExtractor={item => item.ticker}
				/>
			</View>
	);
	}
}
/*
<Coin
	name='Bitcoin'
	symbol='BTC'
	price='$50'
	onPress={() => this.grabChart('BTC')}
/>
<Coin
	name='Ethereum'
	symbol='ETH'
	price='$60'
		onPress={() => this.grabChart('ETH')}
/>
*/

function mapStateToProps(store) {
  return {
		filter: store.stockFilterReducer.filter,
		stockList: store.stockFilterReducer.stockList,
		stockData: store.stockFilterReducer.stockData,
		selectedPoint: store.stockFilterReducer.selectedPoint,
		endPoint: store.stockFilterReducer.endPoint
  };
}

export default connect(mapStateToProps, { sendChartData, sendStockListData })(CoinList);
