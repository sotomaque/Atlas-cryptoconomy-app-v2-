// system imports
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

// app imports
import { Header } from '../../components/Header';
import { } from '../../actions';

// import PortfolioRouter from './PortfolioStack.js';

class AddCoinScreen extends Component {
  render() {
        return (
          <View style={styles.portfolioContainer}>
                <LinearGradient colors={['#1294D5', '#125AD5']} style={styles.linearGradient}>
                  <Header
                    headerText='Portfolio'
                    nameLeft="arrow-circle-left"
                    nameRight="save"
                    onPressLeft={() => this.props.navigation.goBack()}
                    onPressRight={() => this.props.navigation.goBack()}
                  />
                  <Text>Coin Add</Text>
                </LinearGradient>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    portfolioContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    linearGradient: {
        flex: 1,
    },
    chartContainer: {
        paddingLeft: 6,
        paddingRight: 6,
    },
});

function mapStateToProps(store) {
  return {
		filter: store.stockFilterReducer.filter,
		scrollEnabledValue: store.guiInfo.scrollingEnabled,
  };
}

export default connect(mapStateToProps, { })(AddCoinScreen);
