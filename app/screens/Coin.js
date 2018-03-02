// system imports
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// app imports
// import PortfolioRouter from './PortfolioStack.js';
// Using this a test
export default class Coin extends Component {
  render() {
        return (
          <View style={styles.portfolioContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text>
                  Tap to go back
                </Text>
            </TouchableOpacity>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    portfolioContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    linearGradient: {
        flex: 1,
    },
    chartContainer: {
        paddingLeft: 6,
        paddingRight: 6,
    },
});
