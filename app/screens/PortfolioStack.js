// import React from 'react';

import { StackNavigator } from 'react-navigation';


import Portfolio from './Portfolio.js';
import ProfileScreen from './ProfileScreen.js';
import CoinFullPage from '../components/CoinList/CoinFullPage.js';
//  This Router sets the tab menu for the whole app
export const RouterComponent = StackNavigator(
    {
        profile: {
            screen: ProfileScreen,
            navigationOptions: {
              header: null,
              // we don't want the user fucking around in other views when making account
              tabBarVisible: false,
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
