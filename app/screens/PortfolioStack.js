// import React from 'react';

import { StackNavigator } from 'react-navigation';


import Portfolio from './Portfolio.js';
import CoinScreen from './Coin.js';
import CoinFullPage from '../components/CoinList/CoinFullPage.js';
//  This Router sets the tab menu for the whole app
export const RouterComponent = StackNavigator(
    {
        profile: {
            screen: CoinScreen,
            navigationOptions: {
              header: null,
            },
        },
        main: {
            screen: Portfolio,
            navigationOptions: {
              header: null,
            },
        },
        coinpage: {
            screen: CoinFullPage,
            navigationOptions: {
              header: null,
            },
        search: {
            screen: Portfolio,
            navigationOptions: {
              header: null,
            },
        },
    },
    },
    {
    initialRouteName: 'main', // default route
    animationEnabled: true,
  },
);

export default RouterComponent;
