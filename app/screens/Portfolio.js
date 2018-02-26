// system imports
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// app imports
import { StockLineChartWrapper } from '../components/StockLineChart';
import { Header } from '../components/Header';
import CoinList from '../components/CoinList/CoinList';

export default class Portfolio extends Component {
    render() {
        return (
          <View style={styles.portfolioContainer}>
                <LinearGradient colors={['#1294D5', '#125AD5']} style={styles.linearGradient}>
                    <ScrollView>
                        <View>
                            <Header headerText='Portfolio' />
                        </View>
                        <View>
                            <StockLineChartWrapper />
                        </View>
                        <View>
                            <CoinList />
                        </View>
                    </ScrollView>
                </LinearGradient>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    portfolioContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    linearGradient: {
        flex: 1
    },
    chartContainer: {
        paddingLeft: 6,
        paddingRight: 6
    }
});
