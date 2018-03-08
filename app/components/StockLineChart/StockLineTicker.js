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
        // '#55FF40' green
        // '#E74C3C' red
        const colorPercentChange = this.props.chartPercentChange > 0 ? '#55FF40' : '#FF4040';
        return (
            <View style={tickerContainer}>
                <View style={tickerTotalContainer}>
                    <Text style={tickerTotalSymbol}>$</Text>
                    <Text style={tickerTotalMainAmount}>{this.props.ticker.toLocaleString()}</Text>
                    {/* <Text style={tickerTotalMainAmount}>.00</Text> */}
                </View>
                <View style={tickerTotalContainer}>
                    <Text style={[tickerAuxillary, { color: colorPercentChange }]}>
                      {this.props.chartAmountChange}
                    </Text>
                    <Text style={[tickerAuxillary, { color: colorPercentChange }]}>
                      ({this.props.chartPercentChange}%)
                    </Text>
                    <Text style={tickerFilterText}>{this.props.chartTimeInterval}</Text>
                </View>
            </View>
        );
    }
}
