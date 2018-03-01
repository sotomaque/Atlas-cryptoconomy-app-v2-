import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
// import cryptoApi from '../../../app/lib/crypto-compare-api';
// import { StockLineChartWrapper } from '../../components/StockLineChart';
import { Header } from '../components/Header';
// import { sendChartData, resetChart } from '../../actions';
// import coinList	from '../../../app/lib/coin-list';
// import { sendTickerAndName } from '../../actions';

// import  Icon  from 'react-native-vector-icons/FontAwesome';


class ProfileScreen extends Component {
	componentWillMount() {

	}

	goBack() {
		this.props.navigation.goBack();
	}

	render() {
			return (
				<View style={styles.portfolioContainer}>
								<LinearGradient colors={['#1294D5', '#125AD5']} style={styles.linearGradient}>
									<View>
										<Header
											headerText='Profile'
                      nameLeft="arrow-circle-left"
                      onPressRight={() => {}}
                      onPressLeft={() => this.goBack()}
										/>
									</View>
									<ScrollView scrollEnabled={this.props.scrollEnabled}>
											<Text>
												Test
											</Text>
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

const mapStateToProps = (state) => {
  const { name, ticker } = state.coinPageReducer;
	const scrollEnabled = state.guiInfo.scrollingEnabled;
  return { name, ticker, scrollEnabled };
};

export default connect(mapStateToProps, { })(ProfileScreen);
