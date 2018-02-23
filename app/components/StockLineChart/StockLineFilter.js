import React, { Component } from "react";
import { View, Button, Text } from "react-native";
import { StockLineFilterStyles } from "./styles";
import { updateFilter } from '../../actions/index.js';
import { connect } from 'react-redux';

class StockLineFilter extends Component {
	
	constructor(props){
		super(props);
	}

	/***
	 *	@Param : option
	 * 
	 */
	onFilterStockChart( option ){
		this.props.onSelectFilterClick(option);
		
	}//onFilterStockChart
	
    render() {
        const { container, text } = StockLineFilterStyles;

        return (
            <View style={container}>
            	<View>
		            <Text onPress={() => this.onFilterStockChart({filter:'DAY'})} style={text}>1D</Text>
		        </View>
		        <View>
		            <Text  onPress={() => this.onFilterStockChart({filter:'WEEK'})} style={text}>1W</Text>
		        </View>
		        <View>
		            <Text  onPress={() => this.onFilterStockChart({filter:'MONTH'})} style={text}>1M</Text>
		        </View>
		        <View>
		            <Text  onPress={() => this.onFilterStockChart({filter:'3MONTH'})} style={text}>3M</Text>
		        </View>
		        <View>
		            <Text  onPress={() => this.onFilterStockChart({filter:'6MONTH'})} style={text}>6M</Text>
		        </View>
		        <View>
		            <Text  onPress={() => this.onFilterStockChart({filter:'1YEAR'})} style={text}>1Y</Text>
		        </View>
                <View>
                    <Text style={text}>MAX</Text>
                </View>
            </View>
        );
    }
}


	
export default connect (
	(store) => ({
		filter : store.stockFilterReducer.filter
	})
	,(dispatch) =>{
		return {
			onSelectFilterClick : option => {
				dispatch(updateFilter(option))
			}
		}
	})
(StockLineFilter)