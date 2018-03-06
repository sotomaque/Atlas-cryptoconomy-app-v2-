import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import cryptoApi from '../../../app/lib/crypto-compare-api';
import { StockLineChartWrapper } from '../../components/StockLineChart';
import { Header } from '../../components/Header';
import { sendChartData, resetChart } from '../../actions';
import coinList	from '../../../app/lib/coin-list';

class CoinFullPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mktCap: '',
			totalSupply: '',
			rank: '',
			hourPercentChange: '',
			dayPercentChange: '',
			weekPercentChange: '',
		};
	}
	componentWillMount() {
	cryptoApi.getHistoricalData({
			filter: this.props.filter,
			coinName: `${this.props.ticker}`,
		})
			.then((res) => {
				this.props.sendChartData(res, 'DAY');
			});

	coinList.getCoinListDetail(this.props.ticker, coinList.IS_DISPLAY_ALL)
			.then((res) => {
				const detailData = res[this.props.ticker].USD;
				console.log('getCoinListDetail', res);
				this.setState(() => {
					return {
						mktCap: detailData.MKTCAP,
						totalSupply: detailData.SUPPLY,
						rank: detailData.MKTCAP,
						hourPercentChange: detailData.CHANGEPCT24HOUR,
						dayPercentChange: detailData.CHANGEPCTDAY,
						weekPercentChange: detailData.CHANGEPCTDAY,
					};
				});
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
                      onPressLeft={() => this.goBack()}
                      onPressRight={() => {}}
										/>
									</View>
									<ScrollView scrollEnabled={this.props.scrollEnabled}>
											<View>
												<StockLineChartWrapper heightFixed={(Dimensions.get('window').height) * 0.525} />
											</View>
											<View>
												<Text>Mkt Cap {this.state.mktCap}</Text>
												<Text>Total Supply {this.state.totalSupply}</Text>
												<Text>Rank {this.state.rank}</Text>
												<Text>1Hour {this.state.hourPercentChange}%</Text>
												<Text>1Day {this.state.dayPercentChange}%</Text>
												<Text>1Week {this.state.weekPercentChange}%</Text>
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
	const { filter } = state.stockFilterReducer;
  return {
		name,
		ticker,
		scrollEnabled,
		filter,
	};
};

export default connect(mapStateToProps, { sendChartData, resetChart })(CoinFullPage);
