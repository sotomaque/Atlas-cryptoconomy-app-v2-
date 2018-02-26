import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StockLineTickerStyles } from './styles';
//
export class StockLineTicker extends Component {

    props: {
      data: number
    };
    render() {
        const {
            tickerContainer,
            tickerTotalContainer,
            tickerTotalSymbol,
            tickerTotalMainAmount,
            tickerAuxillary,
            tickerFilterText
        } = StockLineTickerStyles;

        return (
            <View style={tickerContainer}>
                <View style={tickerTotalContainer}>
                    <Text style={tickerTotalSymbol}>$</Text>
                    <Text style={tickerTotalMainAmount}>{this.props.data}</Text>
                    {/* <Text style={tickerTotalMainAmount}>.00</Text> */}
                </View>
                <View style={tickerTotalContainer}>
                    <Text style={tickerAuxillary}>+106.11</Text>
                    <Text style={tickerAuxillary}>(20.43%)</Text>
                    <Text style={tickerFilterText}>PAST WEEK</Text>
                </View>
            </View>
        );
    }
}
