import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';
import FBSDK from 'react-native-fbsdk';
import firebase, { FacebookAuthProvider } from 'firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../../components/Header';

const logo = require('../../assets/Logo.png');

const signInAndSignUpButtons = (nav) => {
	return (
	<View style={{ alignItems: 'center', padding: 20 }}>
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
  AccessToken,
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
											headerText=''
                      nameLeft="arrow-circle-left"
                      onPressRight={() => {}}
                      onPressLeft={() => this.goBack()}
										/>
									</View>
									<View
										scrollEnabled={this.props.scrollEnabled}
										style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
									>
										<Image
											source={logo}
											style={{ justifyContent: 'flex-start' }}
										/>
										<View style={{
											borderRadius: 10,
											backgroundColor: 'white',
											height: '65%',
											width: '90%',
											shadowColor: '#000000',
											shadowOffset: {
												width: 0,
												height: 2,
											},
											shadowRadius: 5,
											shadowOpacity: 0.5,
										}}
										>

											<Text style={styles.formLabelStyle}>
												E-Mail
											</Text>
											<TextInput
											autoCorrect={false}
											autoCapitalize='none'
											onChangeText={text => this.setState({ email: text })}
											style={styles.formInputStyle}
											/>
											<Text style={styles.formLabelStyle}>
												Password
											</Text>
											<TextInput
												style={styles.formInputStyle}
												autoCorrect={false}
												autoCapitalize='none'
												secureTextEntry
												onChangeText={text => this.setState({ pass: text })}
											/>
											{signInAndSignUpButtons(this.props.navigation)}
										</View>
											<LoginButton
												publishPermissions={['publish_actions']}
												onLoginFinished={
													(error, result) => {
														if (error) {
															alert('login has error: ', result.error);
														} else if (result.isCancelled) {
															alert('login is cancelled.');
														} else {
															AccessToken.getCurrentAccessToken().then((token) => {
																console.log('token: ', token);
																const cred = firebase.auth.FacebookAuthProvider
																.credential(token.accessToken);
																firebase.auth().signInWithCredential(cred).then((user) => {
																		console.log('User finally got :', user);
																	});
																});
															}
														}
													}
													onLogoutFinished={() => alert('logout.')}
											/>
									</View>
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
			color: 'black',
			textAlign: 'center',
		},
		formLabelStyle: {
			fontSize: 16,
			color: '#BDC3C7',
			marginBottom: 1,
			fontWeight: 'bold',
			marginLeft: 20,
			paddingBottom: 15,
			paddingTop: 20,
		},
		formInputStyle: {
		fontSize: 18,
		marginLeft: 20,
		marginRight: 40,
		borderBottomColor: '#BDC3C7',
		borderBottomWidth: 1,
		paddingBottom: 5,
		},
});

const mapStateToProps = (state) => {
  const { name, ticker } = state.coinPageReducer;
	const scrollEnabled = state.guiInfo.scrollingEnabled;
  return { name, ticker, scrollEnabled };
};

export default connect(mapStateToProps, { })(ProfileView);
