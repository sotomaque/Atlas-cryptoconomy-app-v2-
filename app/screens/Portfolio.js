import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import { StockLineChart } from "../components/StockLineChart";
import { Header } from "../components/Header";

export default class Portfolio extends Component {
    render() {
        return (
            <View style={styles.portfolioContainer}>
                <View>
                    <Header headerText={"Portfolio"}></Header>
                </View>
                <View>
                    <StockLineChart />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    portfolioContainer: {
        flex: 1
    }
});
