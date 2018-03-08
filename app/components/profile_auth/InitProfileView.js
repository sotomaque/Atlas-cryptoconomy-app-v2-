import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
 import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
// import cryptoApi from '../../../app/lib/crypto-compare-api';
// import { StockLineChartWrapper } from '../../components/StockLineChart';
import { Header } from '../../components/Header';
// import { sendChartData, resetChart } from '../../actions';
// import coinList	from '../../../app/lib/coin-list';
 import { changeLoggedIn } from '../../actions';

// import  Icon  from 'react-native-vector-icons/FontAwesome';


class InitProfileView extends Component {
	render() {
			return (
				<View style={styles.portfolioContainer}>
								<LinearGradient colors={['#1294D5', '#125AD5']} style={styles.linearGradient}>
									<View>
										<Header
											headerText='Create Profile'
                      onPressRight={() => this.props.changeLoggedIn(true)}
                      onPressLeft={() => {}}
                      nameRight="save"
										/>
									</View>
									<ScrollView
										contentContainerStyle={styles.tempScrollViewStyle}
										scrollEnabled={this.props.scrollEnabled}
									>
											<Text style={styles.tempTextStyle}>
												Cutomize stuff here!
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

		tempScrollViewStyle: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'flex-start',
		},

		tempTextStyle: {
			fontSize: 18,
			fontWeight: '600',
			color: 'white',
			textAlign: 'center',
		},
});
  // Will be useful for setting profile settings.
const mapStateToProps = (state) => {
  const { isSignedIn } = state.userInfo;
  return { isSignedIn };
};

export default connect(mapStateToProps, { changeLoggedIn })(InitProfileView);
