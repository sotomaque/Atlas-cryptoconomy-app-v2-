import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux'; // Added Redux-Perist Config
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist'; // See configureStore for persist settings
import firebase from 'firebase';
import { configureStore } from './app/config/configureStore';
import InitRouter from './app/screens/InitRouter.js';
// import cryptoApi from './app/lib/crypto-compare-api';

// More Redux-Persist
const store = configureStore();
const perst = persistStore(
  store,
  null,
  () => {},
);

export default class App extends Component {

    // This function is called while PersistGate grabs the local data from device
    // Consider it a place holder, we should have a pic of the logo when loading
     loadingFunc() {
     return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      );
    }

    // Added the remote bugger to stop the "Remote debugger is in a
    // background tab which may cause apps to perform slowly." from popping
    // up whenever the app is ran in the simulator.
    // Also added Firebase configuration for App. -Pedro
    componentWillMount() {
      console.ignoredYellowBox = ['Remote debugger'];
      const config = {
        apiKey: 'AIzaSyCp5WAl6CaOy_cIKpVZ8MP78x9NHRYXTKo',
        authDomain: 'atlas-app-cryptoconomy.firebaseapp.com',
        databaseURL: 'https://atlas-app-cryptoconomy.firebaseio.com',
        projectId: 'atlas-app-cryptoconomy',
        storageBucket: 'atlas-app-cryptoconomy.appspot.com',
        messagingSenderId: '525306710041',
      };
      firebase.initializeApp(config);
    }

    render() {
        return (

          <Provider store={store}>
              <PersistGate loading={this.loadingFunc()} persistor={perst}>
                <InitRouter />
              </PersistGate>
          </Provider>

        );
    }
}
