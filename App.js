import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux'; // Added Redux-Perist Config
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist'; // See configureStore for persist settings
import { configureStore } from './app/config/configureStore';
import InitRouter from './app/screens/InitRouter.js';
import cryptoApi from './app/lib/crypto-compare-api'

// More Redux-Persist
const store = configureStore();
const perst = persistStore(
  store,
  null,
  () => {}
);

const props = {};
export default class App extends Component {

    constructor(props){
        super(props);
    }
    
    // Added the remote bugger to stop the "Remote debugger is in a
    // background tab which may cause apps to perform slowly." from popping
    // up whenever the app is ran in the simulator. -Pedro
    componentWillMount() {
      console.ignoredYellowBox = ['Remote debugger'];
    }


    // This function is called while PersistGate grabs the local data from device
    // Consider it a place holder, we should have a pic of the logo when loading
    loadingFunc() {
      return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      );
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      
    }
});
