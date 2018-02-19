import React, { Component } from "react";
import { View, Dimensions } from 'react-native';
import { LineChart } from "react-native-svg-charts";

export default class LineChartExample extends Component {
    render() {
        const data = [
            50,
            10,
            40,
            95,
            -4,
            -24,
            85,
            91,
            35,
            53,
            -53,
            24,
            50,
            -20,
            -80,
            50,
            10,
            40,
            95,
            -4,
            -24,
            85,
            91,
            35,
            53,
            -53,
            24,
            50,
            -20,
            -80,
            50,
            10,
            40,
            95,
            102,
            112,
            110,
            118
        ];

        var width = Dimensions.get('window').width; //full width

        return (
            <View>
                <LineChart
                    style={{ height: 200, width: width }}
                    data={data}
                    svg={{ stroke: "#99c794", strokeWidth: 2 }}
                    contentInset={{ top: 20, bottom: 20 }}
                    showGrid={false}
                    animate={false}
                />
            </View>
        );
    }
}
