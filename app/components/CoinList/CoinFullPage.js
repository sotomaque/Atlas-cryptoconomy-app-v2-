import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { StockLineChartWrapper } from '../../components/StockLineChart';
import { Header } from '../../components/Header';

// import { sendTickerAndName } from '../../actions';

// import  Icon  from 'react-native-vector-icons/FontAwesome';


class CoinFullPage extends Component {
	state = { isOn: true };
  setIsOn(val) {
    this.setState({ isOn: val }); // For pan responder reseting a theme
	}
	render() {
			// const width = Dimensions.get('window').width; // full device width, captured at runtime
      const {
      ticker,
      name,
      price,
    } = this.props;
			return (
				<View style={styles.portfolioContainer}>
								<LinearGradient colors={['#1294D5', '#125AD5']} style={styles.linearGradient}>
									<View>
										<Header
											headerText={name}
                      nameLeft="arrow-circle-left"
                      nameRight="search"
                      onPressLeft={() => this.props.navigation.goBack()}
                      onPressRight={() => {}}
										/>
									</View>
									<ScrollView
											onScrollBeginDrag={() => this.setIsOn(false)}
											onScrollEndDrag={() => this.setIsOn(true)}
									>
											<View>
												<StockLineChartWrapper isOn={this.state.isOn} />
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

const mapStateToProps = (state) => {
  const { name, ticker } = state.coinPageReducer;
  return { name, ticker };
};

export default connect(mapStateToProps, { })(CoinFullPage);
