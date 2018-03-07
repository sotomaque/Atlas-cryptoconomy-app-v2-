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
		stockData: [],
		xVal: -10,
		timer: 0,
	}

	componentWillMount() {
		this.panResponder = PanResponder.create({
			onMoveShouldSetResponderCapture: () => true,
			onMoveShouldSetPanResponderCapture: () => true,
			onPanResponderRelease: () => {
				this.setState({ xVal: -10 });
				this.setState({ timer: 0 });
				this.props.scrollingisEnabled(true);
				console.log('release');
			},
			onPanResponderGrant: () => {


			},
			onPanResponderMove: (e, gesture) => {
				const { nativeEvent } = e;
					this.setState({ timer: this.state.timer + 1 });

					if(this.state.timer > 5) {
						this.props.scrollingisEnabled(false);
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

	props: {
		heightFixed: number
	};

	render() {
			const height = this.props.heightFixed ? this.props.heightFixed : 240;
			const width = Dimensions.get('window').width; // full device width, captured at runtime

			const pointSelected = this.getPointFromArray();
			const initPoint = this.props.stockData[0];
			const amountChange = (pointSelected - initPoint).toFixed(2);
			const percentChange = (((pointSelected - initPoint) * 100) / initPoint).toFixed(2);

		//	console.log('init Point: ', initPoint, 'pointSelected: ', pointSelected, 'percentChange: ', percentChange);
			// percentChange: `${((value.USD.PRICE - value.USD.OPENDAY)
			// * 100 / value.USD.OPENDAY).toFixed(2)}%`,
			return (
				<View style={{ flexDirection: 'column', width }}>

					<View>
						<StockLineTicker
							ticker={pointSelected}
							chartAmountChange={amountChange}
							chartPercentChange={percentChange}
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
		stockData: store.stockFilterReducer.stockData,
		endPoint: store.stockFilterReducer.endPoint,
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
