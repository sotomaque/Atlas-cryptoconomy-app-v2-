import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileView from '../../components/profile_auth/ProfileView.js';
import SignRouter from '../../components/profile_auth/SignRouter.js';

class ProfileScreen extends Component {
	componentWillMount() {

	}

	goBack() {
		this.props.navigation.goBack();
	}

	ifIsSignedIn() {
		if (this.props.isSignedIn === true) {
			return (<ProfileView nav={this.props.navigation} />);
		}
		return <SignRouter screenProps={{ nav: this.props.navigation }} />;
	}
	render() {
			return this.ifIsSignedIn();
    }
}

const mapStateToProps = (state) => {
  const { isSignedIn } = state.userInfo;

	return { isSignedIn };
};

export default connect(mapStateToProps, { })(ProfileScreen);
