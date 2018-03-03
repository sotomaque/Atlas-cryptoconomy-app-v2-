import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import cryptoApi from '../../../app/lib/crypto-compare-api';
import { StockLineChartWrapper } from '../../components/StockLineChart';
import { Header } from '../../components/Header';
import { sendChartData, resetChart } from '../../actions';
import coinList	from '../../../app/lib/coin-list';
// import { sendTickerAndName } from '../../actions';

// import  Icon  from 'react-native-vector-icons/FontAwesome';


class CoinFullPage extends Component {
	// state = { isOn: true };


	componentWillMount() {
		return cryptoApi.getHistoricalData({
			filter: 'DAY',
			coinName: `${this.props.ticker}`,
		})
			.then((res) => {
				this.props.sendChartData(res, 'DAY');
			});
	}

	goBack() {
		// This is inefficient as hell, I made a reducer that
		// will do this all in one funciton call, but we'll need
		// spomething better than coinList.getUserHistoryData
		// as a way of grabbing userTransaction history, hopefully
		// it'll be on Redux by then.
		this.props.resetChart();
		coinList
			.getUserHistoryData()
				.then((res) => {
					this.props.sendChartData(res, 'DAY');
				});
		this.props.navigation.goBack();
	}
	render() {
			// const width = Dimensions.get('window').width; // full device width, captured at runtime
      const {
  //    ticker,
      name,
  //    price,
    } = this.props;
			return (
				<View style={styles.portfolioContainer}>
								<LinearGradient colors={['#1294D5', '#125AD5']} style={styles.linearGradient}>
									<View>
										<Header
											headerText={name}
                      nameLeft="arrow-circle-left"
                      nameRight="search"
                      onPressLeft={() => this.goBack()}
                      onPressRight={() => {}}
										/>
									</View>
									<ScrollView scrollEnabled={this.props.scrollEnabled}>
											<View>
												<StockLineChartWrapper />
											</View>
											<View>
												<Text style={styles.statsLabel}>Stats</Text>
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
		statsLabel: {

		},
});

const mapStateToProps = (state) => {
  const { name, ticker } = state.coinPageReducer;
	const scrollEnabled = state.guiInfo.scrollingEnabled;
  return { name, ticker, scrollEnabled };
};

export default connect(mapStateToProps, { sendChartData, resetChart })(CoinFullPage);
