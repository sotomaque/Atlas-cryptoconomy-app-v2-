import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-svg-charts";

import  StockLineFilter  from "./StockLineFilter";
import { StockLineTicker } from "./StockLineTicker";
import { connect } from 'react-redux';


export class StockLineChart extends Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			stockList : []
		}
	}


	componentDidMount() {
		var self = this;
		console.log('componentDidMount', this.props.stockList,self)
		setTimeout(() => {
			return self.props.stockList
			.then(function(res){
				self.setState({
					stockList : res
				})
				return cryptoApi.trimDataSetToList(res.Data)
			})
		    }, 500);
		
		
		
	    
		
	}
	
	render() {
       

			
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

export const StockLineChartWrapper = connect(
	(store) => ({
		filter 		: store.stockFilterReducer.filter
		,stockList 	: store.stockFilterReducer.stockList
	}))
(StockLineChart)

