import React, { Component } from 'react';
import { View, Dimensions, PanResponder, ScrollView } from 'react-native';
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
			/*
			onPanResponderGrant: (evt, gestureState) => {
			//	console.log('PanResponder start');
			},
			*/
			onPanResponderRelease: () => {
				this.setState({ xVal: -1 });
				//console.log(this.props.selectedPoint);
				},

		/*
		onMoveShouldSetPanResponder: (e, gestureState) => {

		},
		*/
			onPanResponderMove: (e) => {
				const { nativeEvent } = e;
				// console.log(gestureState.dx);   // to get total distance moved since gesture start.
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
		//console.log(this.props.endPoint, this.state.xVal, this.props.stockData);
		if (this.state.xVal < 1) {
			return this.props.endPoint;
			}
		return this.props.selectedPoint;
	}
/*
	<LineChart
			style={{ height: 200, zIndex: 2 }}
			data={this.props.stockData}
			svg={{ stroke: "#99c794", strokeWidth: 2 }}
			contentInset={{ top: 0, bottom: 20 }}
			showGrid={false}
			animate={false}
	/>
{*/
	render() {
			const width = Dimensions.get('window').width; // full device width, captured at runtime
			return (
				<ScrollView style={{ flexDirection: 'column', width }}>

					<View>
						<StockLineTicker data={this.getPointToSend()} />
					</View>

					<View style={{ height: 150 }} {...this.panResponder.panHandlers}>
						<Chart
							xVal={this.state.xVal}
							data={this.props.stockData}
						/>
					</View>

					<View>
						<StockLineFilter />
					</View>

					<View>
						<CoinList />
					</View>

				</ScrollView>
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
