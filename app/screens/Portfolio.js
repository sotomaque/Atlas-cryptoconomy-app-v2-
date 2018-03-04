// system imports
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import CodePush from 'react-native-code-push';
// app imports
import { StockLineChartWrapper } from '../components/StockLineChart';
import { Header } from '../components/Header';
import CoinList from '../components/CoinList/CoinList';
import { scrollingisEnabled } from '../actions';

// import PortfolioRouter from './PortfolioStack.js';

const CodePushConfig = {
  updateDialog: true,
  installMode: CodePush.InstallMode.IMMEDIATE,
};

class Portfolio extends Component {
  // state = { isOn: true };

  componentWillMount() {
  }

  setScrolling(val) {
    this.props.scrollingisEnabled(val);
  }

  checkForUpdates = () => {
     CodePush.sync(CodePushConfig);
   }

  render() {
        return (
          <View style={styles.portfolioContainer}>
                <LinearGradient colors={['#1294D5', '#125AD5']} style={styles.linearGradient}>
                  <View>
                    <Header
                      headerText='Portfolio'
                      nameLeft="user-circle"
                      nameRight="search"
                      onPressLeft={() => this.props.navigation.navigate('profile')}
                      onPressRight={() => this.props.navigation.navigate('search')}
                    />
                  </View>
                    <ScrollView
                      scrollEnabled={this.props.scrollEnabledValue}
                  //    onScrollBeginDrag={() => this.setIsOn(false)}
                  //    onScrollEndDrag={() => this.setIsOn(true)}
                    >
                      <View>
                        <StockLineChartWrapper />
                      </View>
                      <View>
                        <CoinList
                        nav={this.props.navigation}
                        />
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

export default connect(mapStateToProps, { scrollingisEnabled })(Portfolio);
