import React, { Component } from "react";
import { View, Dimensions, PanResponder } from "react-native";
//import { LineChart } from "react-native-svg-charts";
import Chart from '../chart.js';

import  StockLineFilter  from "./StockLineFilter";
import { StockLineTicker } from "./StockLineTicker";
import { connect } from 'react-redux';
import { sendChartData } from '../../actions';

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
		onPanResponderGrant: (evt, gestureState) => {
		//	console.log('PanResponder start');
		},
		onPanResponderRelease: (evt, gestureState) => {
		//	console.log('end PanResponder');
			this.setState({ xVal: -1 });
		},
		onMoveShouldSetPanResponder: (e, gestureState) => {

		},
		onPanResponderMove: (e, gestureState) => {
			const { nativeEvent } = e;
		// console.log(gestureState.dx);   // to get total distance moved since gesture start.
	//   console.log(nativeEvent.locationX);
		this.setState({ xVal: nativeEvent.locationX });
		}
		});

	}
	componentDidMount() {
		var self = this;
		console.log('Log 0: ', self);
		console.log('componentDidMount', this.props.stockList,self)
		setTimeout(() => {
			//console.log('componentDidMount', this.props.stockList,self)
			console.log('Log 1: ', self);
			return self.props.stockList
			.then(function(res) {
				console.log('Log 2: ', self);
				self.props.sendChartData(res);
				self.setState({
					stockList : res,

				});
			})
		}, 1000);





	}

/*
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
		//	console.log('Start stockLineChart Log: ', this.props);
			let width = Dimensions.get("window").width; // full device width, captured at runtime
	        return (
	            <View style={{ flexDirection: "column", width: width }}>
	                <View>
	                    <StockLineTicker />
	                </View>

	                <View style={{ height: 100 }} {...this.panResponder.panHandlers}>
											  <Chart
													xVal={this.state.xVal}
													data={this.props.stockData}
												/>

	                </View>

	                <View>
	                    <StockLineFilter />
	                </View>
	            </View>
	           )


    }
}

// references
// https://github.com/JesperLekland/react-native-svg-charts#common-props

function mapStateToProps(store) {
  return {
		filter: store.stockFilterReducer.filter,
		stockList: store.stockFilterReducer.stockList,
		stockData: store.stockFilterReducer.stockData
  };
}

export const StockLineChartWrapper = connect(mapStateToProps, { sendChartData })(StockLineChart);
