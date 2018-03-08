import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
// import cryptoApi from '../../../app/lib/crypto-compare-api';
// import { StockLineChartWrapper } from '../../components/StockLineChart';
import { Header } from '../../components/Header';
// import { sendChartData, resetChart } from '../../actions';
// import coinList	from '../../../app/lib/coin-list';
 import { changeLoggedIn } from '../../actions';

// import  Icon  from 'react-native-vector-icons/FontAwesome';


class ProfileView extends Component {
	componentWillMount() {

	}

  props: {
    nav: Object,
  };
	goBack() {
    console.log(this);
		this.props.nav.goBack();
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
									<ScrollView
										contentContainerStyle={styles.tempScrollViewStyle}
									>
											<Text style={styles.tempTextStyle}>
												Signed in!
											</Text>
											<Text style={styles.tempTextStyle}>
												{this.props.isSignedIn}
											</Text>
											<TouchableOpacity onPress={() => this.props.changeLoggedIn(false)}>
												<Text>Sign Out</Text>
											</TouchableOpacity>
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

const mapStateToProps = (state) => {
  const { isSignedIn } = state.userInfo;
  return { isSignedIn };
};

export default connect(mapStateToProps, { changeLoggedIn })(ProfileView);
