import React, { Component } from 'react';
import { View, Dimensions, PanResponder } from 'react-native';
import { connect } from 'react-redux';
//import { LineChart } from "react-native-svg-charts";
import Chart from '../chart.js';
import StockLineFilter from './StockLineFilter';
import { StockLineTicker } from './StockLineTicker';
import CoinList from '../CoinList/CoinList';
import { sendChartData } from '../../actions';

import cryptoApi from '../../../app/lib/crypto-compare-api';


export class StockLineChart extends Component {

	state = {
		stockList: [],
		stockData: [],
		xVal: 0
	}


	componentWillMount() {
		this.panResponder = PanResponder.create({
			onMoveShouldSetResponderCapture: () => true,
			onMoveShouldSetPanResponderCapture: () => true,
			onPanResponderRelease: () => {
				this.setState({ xVal: -1 });
			},
			onPanResponderMove: (e) => {
				const { nativeEvent } = e;
				this.setState({ xVal: nativeEvent.locationX });
			}
		});
	}

	componentDidMount() {
		return cryptoApi.getHistoricalData({ filter: 'DAY',
			coinName: 'BTC' })
			.then((res) => {
				this.props.sendChartData(res);
				this.setState({
					stockList: res,
				});
			});
	}

	getPointToSend() {
		if (this.state.xVal < 1) {
			return this.props.endPoint;
			}
		return this.props.selectedPoint;
	}

	render() {
			return (
				<View style={{ flexDirection: 'column' }}>

					<View>
						<StockLineTicker data={this.getPointToSend()} />
					</View>

					<View style={{ height: 180, marginLeft: 12, marginRight: 12 }} {...this.panResponder.panHandlers}>
						<Chart
							xVal={this.state.xVal}
							data={this.props.stockData}
						/>
					</View>

					<View>
						<StockLineFilter />
					</View>
				</View>
			);
    }
}

// references
// https://github.com/JesperLekland/react-native-svg-charts#common-props

function mapStateToProps(store) {
  return {
		filter: store.stockFilterReducer.filter,
		stockList: store.stockFilterReducer.stockList,
		stockData: store.stockFilterReducer.stockData,
		selectedPoint: store.stockFilterReducer.selectedPoint,
		endPoint: store.stockFilterReducer.endPoint
  };
}

export const StockLineChartWrapper = connect(mapStateToProps, { sendChartData })(StockLineChart);
