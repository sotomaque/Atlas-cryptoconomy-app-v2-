import React, { Component } from 'react';
import { View, Dimensions, PanResponder } from 'react-native';
import { connect } from 'react-redux';
import Chart from '../chart';
import StockLineFilter from './StockLineFilter';
import { StockLineTicker } from './StockLineTicker';
// import CoinList from '../CoinList/CoinList';
import { sendChartData, scrollingisEnabled } from '../../actions';

// import cryptoApi from '../../../app/lib/crypto-compare-api';
// import coinList	from '../../../app/lib/coin-list';

export class StockLineChart extends Component {
	state = {
		stockList: [],
		stockData: [],
		xVal: -10,
	}

	componentWillMount() {
		this.panResponder = PanResponder.create({
			onMoveShouldSetResponderCapture: () => true,
			onMoveShouldSetPanResponderCapture: () => true,
			onPanResponderRelease: () => {
				this.setState({ xVal: -10 });
				this.props.scrollingisEnabled(true);
			},
			onPanResponderGrant: () => {
				this.props.scrollingisEnabled(false);
			},
			onPanResponderMove: (e, gesture) => {
				const { nativeEvent } = e;
				if (Math.abs(gesture.dx) > 5) {
					this.setState({ xVal: nativeEvent.locationX });
				}
			},
		});
	}

	componentDidMount() {

	}

	getPointFromArray() {
		const widthArray = (this.props.stockData.length / (Dimensions.get('window').width));
		let elementIndex = Math.round(widthArray * this.state.xVal) - 1;
		if (elementIndex < 0) elementIndex = 0;
		if (this.state.xVal < 1) {
			this.state.xVal = -10;
			return this.props.endPoint;
		}
		return this.props.stockData[elementIndex];
	}
	getPointToSend() {
		// || this.props.isOn === false
		if (this.state.xVal < 1) {
			this.state.xVal = -10;
			return this.props.endPoint;
			}
		return this.props.selectedPoint;
	}

	props: {
		heightFixed: number
	};

	render() {
			const height = this.props.heightFixed ? this.props.heightFixed : 240;
			const width = Dimensions.get('window').width; // full device width, captured at runtime
			return (
				<View style={{ flexDirection: 'column', width }}>

					<View>
						<StockLineTicker
							ticker={this.getPointFromArray()}
							chartAmountChange={this.props.chartAmountChange}
							chartPercentChange={this.props.chartPercentChange}
							chartTimeInterval={this.props.chartTimeInterval}
						/>
					</View>

					<View style={{ height }} {...this.panResponder.panHandlers}>
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
		endPoint: store.stockFilterReducer.endPoint,
		chartAmountChange: store.stockFilterReducer.chartAmountChange,
		chartPercentChange: store.stockFilterReducer.chartPercentChange,
		chartTimeInterval: store.stockFilterReducer.chartTimeInterval,
		scrollEnabledValue: store.guiInfo.scrollingEnabled,
  };
}

export const StockLineChartWrapper = connect(
	mapStateToProps,
	{
		sendChartData,
		scrollingisEnabled,
	},
	)(StockLineChart);
