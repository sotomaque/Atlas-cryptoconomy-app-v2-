import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'firebase';
import { Header } from '../../components/Header';

// import { connect } from 'react-redux';
// import { hideSettings } from '../../../actions';

class SignUpView extends Component {
  state = {
            email: '',
            pass: '',
            error: '',
          };

  goBack() {
    // this.props.hideSettings(false);
    this.props.navigation.goBack();
  }
  signUp() {
    const { email, pass } = this.state;

      console.log('Email: ', email);
      console.log('Password: ', pass);

      firebase.auth().createUserWithEmailAndPassword(email, pass).then((user) => {
        this.setState({ error: '' });
        console.log('User created: ', user);
        this.props.navigation.navigate('initProfile');
      }).catch((err) => {
        console.log('Error: ', err);
        this.setState({ error: err.message });
      });
  }
  render() {
    return (
      <View style={styles.portfolioContainer}>
        <LinearGradient colors={['#1294D5', '#125AD5']} style={styles.linearGradient}>
          <View>
            <Header
              headerText='Sign Up'
              nameLeft="arrow-circle-left"
              onPressRight={() => {}}
              onPressLeft={() => this.props.navigation.goBack()}
            />
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
            <View style={{ paddingTop: 15, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'red', fontSize: 19 }}>
                {this.state.error}
              </Text>
            </View>
            <TouchableOpacity
              style={{ paddingTop: 40, marginLeft: 30, marginRight: 30 }}
              onPress={() => this.signUp()}
            >
              <View style={{
                backgroundColor: '#45B39D',
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              >
                <Text style={{ fontSize: 22 }}>
                  Tap to sign up!
                </Text>
              </View>
            </TouchableOpacity>
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

  formValidationStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
  },
  formLabelStyle: {
      fontSize: 16,
      color: 'black',
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
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      paddingBottom: 5,
  },
  headerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default (SignUpView);
