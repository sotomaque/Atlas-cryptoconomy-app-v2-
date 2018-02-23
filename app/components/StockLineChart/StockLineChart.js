import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-svg-charts";

import  StockLineFilter  from "./StockLineFilter";
import { StockLineTicker } from "./StockLineTicker";
import { connect } from 'react-redux';
import { sendChartData } from '../../actions';

export class StockLineChart extends Component {

	state = {
	stockList: [],
	stockData: []
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
		}, 5000);





	}

	render() {


			console.log('Start stockLineChart Log: ', this.props);
			let width = Dimensions.get("window").width; // full device width, captured at runtime
	        return (
	            <View style={{ flexDirection: "column", width: width }}>
	                <View>
	                    <StockLineTicker />
	                </View>

	                <View>
	                    <LineChart
	                        style={{ height: 200, zIndex: 2 }}
	                        data={this.state.stockList}
	                        svg={{ stroke: "#99c794", strokeWidth: 2 }}
	                        contentInset={{ top: 0, bottom: 20 }}
	                        showGrid={false}
	                        animate={false}
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
