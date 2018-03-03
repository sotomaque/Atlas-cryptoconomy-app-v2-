import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import FBSDK from 'react-native-fbsdk';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../../components/Header';

const signInAndSignUpButtons = (nav) => {
	return (
	<View style={{ alignItems: 'flex-end' }}>
	<TouchableOpacity
		style={{
			padding: 15,
			backgroundColor: 'green',
			borderRadius: 14,
			width: 120,
			alignItems: 'center',
			marginBottom: 10,
		}}
		onPress={() => nav.navigate('signUpView')}
	>
		<Text style={{ fontSize: 18, color: 'white' }}>
			SIGN UP
		</Text>
	</TouchableOpacity>

	<TouchableOpacity
		onPress={() => nav.navigate('signInView')}
		style={{
			padding: 15,
			width: 120,
			alignItems: 'center',
			backgroundColor: 'orange',
			borderRadius: 14,
		}}
	>
		<Text style={{ fontSize: 18, color: 'white' }}>
			SIGN IN
		</Text>
	</TouchableOpacity>
	</View>
);
};

const {
  LoginButton,
  AccessToken
} = FBSDK;

class ProfileView extends Component {
	componentWillMount() {

	}

	goBack() {
		this.props.screenProps.nav.goBack();	// Goes back to Portfolio screen
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
										scrollEnabled={this.props.scrollEnabled}
										style={{ flex: 1 }}
									>
											<Text style={styles.tempTextStyle}>
												Sign up to get cool new features!
											</Text>
											{signInAndSignUpButtons(this.props.navigation)}
											<LoginButton
												publishPermissions={['publish_actions']}
												onLoginFinished={
													(error, result) => {
														if (error) {
															alert('login has error: ', result.error);
														} else if (result.isCancelled) {
															alert('login is cancelled.');
														} else {
															AccessToken.getCurrentAccessToken().then((data) => {
																	console.log(data);
																});
															}
														}
													}
													onLogoutFinished={() => alert('logout.')}
											/>
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
  const { name, ticker } = state.coinPageReducer;
	const scrollEnabled = state.guiInfo.scrollingEnabled;
  return { name, ticker, scrollEnabled };
};

export default connect(mapStateToProps, { })(ProfileView);
