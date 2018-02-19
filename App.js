import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { StockLineChart } from "./app/components/StockLineChart/index";

const Props = {};
export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StockLineChart />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#252b2e"
    }
});
