import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux'; // Added Redux-Perist Config
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist'; // See configureStore for persist settings
import firebase from 'firebase';
import AppIntroSlider from 'react-native-app-intro-slider';
import { store } from './app/config/configureStore';
import InitRouter from './app/screens/InitRouter.js';
// import cryptoApi from './app/lib/crypto-compare-api';

// More Redux-Persist
const perst = persistStore(
  store,
  null,
  () => {},
);

const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Title 3',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    backgroundColor: '#22bcb5',
  },
];

// This function is called while PersistGate grabs the local data from device
// Consider it a place holder, we should have a pic of the logo when loading

const loadingComp = () => {
return (
 <View style={{ flex: 1, justifyContent: 'center' }}>
   <ActivityIndicator size="large" color="#0000ff" />
 </View>
 );
};

export default class App extends Component {
      state = { hasSeenIntro: true };
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

    onDone = () => {
    this.setState({ hasSeenIntro: true });
    }
    grabIntroOrRouter() {
      if (this.state.hasSeenIntro === false) {
        return (
          <AppIntroSlider
            slides={slides}
            onDone={this.onDone}
          />
        );
      }
      return (<InitRouter />);
    }
    render() {
        return (
          <Provider store={store}>
              <PersistGate loading={loadingComp()} persistor={perst}>
                {this.grabIntroOrRouter()}
              </PersistGate>
          </Provider>

        );
    }
}
