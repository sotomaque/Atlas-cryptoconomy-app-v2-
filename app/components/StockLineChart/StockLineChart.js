import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-svg-charts";

import { StockLineFilter } from "./StockLineFilter";
import { StockLineTicker } from "./StockLineTicker";

export class StockLineChart extends Component {
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
            118,
            150,
            110,
            140,
            195,
            182,
            112,
            110,
            118
        ];

        let width = Dimensions.get("window").width; // full device width, captured at runtime

        return (
            <View style={{ flexDirection: "column", width: width }}>
                <View>
                    <StockLineTicker />
                </View>

                <View>
                    <LineChart
                        style={{ height: 200 }}
                        data={data}
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
        );
    }
}

// references
// https://github.com/JesperLekland/react-native-svg-charts#common-props
