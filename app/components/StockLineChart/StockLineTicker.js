import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StockLineTickerStyles } from './styles';
//
export class StockLineTicker extends Component {
    props: {
      ticker: number,
      chartAmountChange: number,
      chartPercentChange: number,
      chartTimeInterval: string,
    };
    render() {
        const {
            tickerContainer,
            tickerTotalContainer,
            tickerTotalSymbol,
            tickerTotalMainAmount,
            tickerAuxillary,
            tickerFilterText,
        } = StockLineTickerStyles;

        return (
            <View style={tickerContainer}>
                <View style={tickerTotalContainer}>
                    <Text style={tickerTotalSymbol}>$</Text>
                    <Text style={tickerTotalMainAmount}>{this.props.ticker.toLocaleString()}</Text>
                    {/* <Text style={tickerTotalMainAmount}>.00</Text> */}
                </View>
                <View style={tickerTotalContainer}>
                    <Text style={tickerAuxillary}>{this.props.chartAmountChange}</Text>
                    <Text style={tickerAuxillary}>({this.props.chartPercentChange}%)</Text>
                    <Text style={tickerFilterText}>{this.props.chartTimeInterval}</Text>
                </View>
            </View>
        );
    }
}
