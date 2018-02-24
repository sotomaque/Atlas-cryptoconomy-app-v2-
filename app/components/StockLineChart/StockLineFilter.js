import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { StockLineFilterStyles } from './styles';
import { sendChartData } from '../../actions';
import cryptoApi from '../../../app/lib/crypto-compare-api';

class StockLineFilter extends Component {

	constructor(props){
		super(props);
	}

	/***
	 *	@Param : option
	 *
	 */
	onFilterStockChart(option) {
		cryptoApi.getHistoricalData({ ...option,
			coinName: 'BTC' })
			.then((res) => {
				this.props.sendChartData(res);
			});
	}//onFilterStockChart

    render() {
        const { container, text } = StockLineFilterStyles;

        return (
            <View style={container}>
						<View>
						<Text onPress={() => this.onFilterStockChart({ filter: 'DAY' })} style={text}>1D</Text>
						</View>
						<View>
						<Text onPress={() => this.onFilterStockChart({ filter: 'WEEK' })} style={text}>1W</Text>
						</View>
						<View>
						<Text onPress={() => this.onFilterStockChart({ filter: 'MONTH' })} style={text}>1M</Text>
						</View>
						<View>
						<Text onPress={() => this.onFilterStockChart({ filter: '3MONTH' })} style={text}>3M</Text>
						</View>
						<View>
						<Text onPress={() => this.onFilterStockChart({ filter: '6MONTH' })} style={text}>6M</Text>
						</View>
						<View>
						<Text onPress={() => this.onFilterStockChart({ filter: '1YEAR' })} style={text}>1Y</Text>
						</View>
                <View>
                    <Text
											onPress={() => this.onFilterStockChart({ filter: 'MAX' })}
											style={text}
                    >
											MAX
										</Text>
                </View>
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
		endPoint: store.stockFilterReducer.endPoint
  };
}


export default connect(mapStateToProps,	{ sendChartData })(StockLineFilter)
