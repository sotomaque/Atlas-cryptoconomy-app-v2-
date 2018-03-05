import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { StockLineFilterStyles } from './styles';
import { sendChartData, changeFilter, resetData } from '../../actions';

import cryptoApi from '../../../app/lib/crypto-compare-api';

const FilterButton = (props) => {
		const color = (props.name === props.filter ? 'black' : 'white');
    return (
			<View>
				<Text
					onPress={props.onPressButton}
					style={[filterStyle.text, { color }]}
				>
					{props.text}
				</Text>
			</View>
    );
};
class StockLineFilter extends Component {
	onFilterStockChart(option) {
		this.props.changeFilter(option.filter);
		cryptoApi.getHistoricalData({
			...option,
			coinName: this.props.selectedCoin,
		})
			.then((res) => {
				this.props.sendChartData(res, option.filter);
			});
	}

    render() {
        const { container } = StockLineFilterStyles;
        return (
					<View style={container}>

						<FilterButton
							onPressButton={() => {
								this.onFilterStockChart({ filter: 'DAY' });
								this.props.resetData('DAY');
							}}
							text='1D'
							name='DAY'
							filter={this.props.filter}
						/>

						<FilterButton
							onPressButton={() => {
								this.onFilterStockChart({ filter: 'WEEK' });
								this.props.resetData('WEEK');
							}}
							text='1W'
							name='WEEK'
							filter={this.props.filter}
						/>

						<FilterButton
							onPressButton={() => {
								this.onFilterStockChart({ filter: 'MONTH' });
								this.props.resetData('MONTH');
							}}
							text='1M'
							name='MONTH'
							filter={this.props.filter}
						/>

						<FilterButton
							onPressButton={() => {
								this.onFilterStockChart({ filter: '3MONTH' });
								this.props.resetData('3MONTH');
							}}
							text='3M'
							name='3MONTH'
							filter={this.props.filter}
						/>

						<FilterButton
							onPressButton={() => {
								this.onFilterStockChart({ filter: '6MONTH' });
								this.props.resetData('6MONTH');
							}}
							text='6M'
							name='6MONTH'
							filter={this.props.filter}
						/>

						<FilterButton
							onPressButton={() => {
								this.onFilterStockChart({ filter: '1YEAR' });
								this.props.resetData('1YEAR');
							}}
							text='1Y'
							name='1YEAR'
							filter={this.props.filter}
						/>

						<FilterButton
							onPressButton={() => {
								this.onFilterStockChart({ filter: 'MAX' });
								this.props.resetData('MAX');
							}}
							text='MAX'
							name='MAX'
							filter={this.props.filter}
						/>
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
		endPoint: store.stockFilterReducer.endPoint,
		selectedCoin: store.stockFilterReducer.selectedCoin,
  };
}

const filterStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 14,
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
        // borderBottomWidth: 1,
        // borderBottomColor: 'white'
    },
});
export default connect(mapStateToProps,	{ sendChartData, changeFilter, resetData })(StockLineFilter);
