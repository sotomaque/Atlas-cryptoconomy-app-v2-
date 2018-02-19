import React, { Component } from "react";
import { View, Button, Text } from "react-native";
import { StockLineFilterStyles } from "./styles";

export class StockLineFilter extends Component {

    render() {
        const { container, text } = StockLineFilterStyles;

        return (
            <View style={container}>
                <View>
                    <Text style={text}>1D</Text>
                </View>
                <View>
                    <Text style={text}>1W</Text>
                </View>
                <View>
                    <Text style={text}>1M</Text>
                </View>
                <View>
                    <Text style={text}>3M</Text>
                </View>
                <View>
                    <Text style={text}>6M</Text>
                </View>
                <View>
                    <Text style={text}>1Y</Text>
                </View>
                <View>
                    <Text style={text}>MAX</Text>
                </View>
            </View>
        );
    }
}
