// system imports
import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// app imports
import {StockLineChartWrapper} from '../components/StockLineChart';
import {Header} from '../components/Header';
import CoinList from '../components/CoinList/CoinList';
// import PortfolioRouter from './PortfolioStack.js';

export default class Portfolio extends Component {
    state = {
        isOn: true
    };
    setIsOn(val) {
        this.setState({isOn: val});
    }

    render() {
        return (
            <View style={styles.portfolioContainer}>
                {/* <LinearGradient colors={['#1294D5', '#125AD5']} style={styles.linearGradient}> */}
                <LinearGradient colors={['#ad5389', '#3c1053']} style={styles.linearGradient}>
                    <View>
                        <Header headerText='Portfolio' navigation={this.props.navigation}/>
                    </View>
                    <ScrollView
                        onScrollBeginDrag={() => this.setIsOn(false)}
                        onScrollEndDrag={() => this.setIsOn(true)}>
                        <View>
                            <StockLineChartWrapper isOn={this.state.isOn}/>
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
