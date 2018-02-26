// import React from 'react';

import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
// Used this as an example. Placeholder Icons
// import Icon from 'react-native-vector-icons/FontAwesome';

// Import Components to set to different Routes.
import Portfolio from './Portfolio.js';
import CoinScreen from './Coin.js';
// import ProfileScreen from './ProfileScreen.js';
// import PaperTradingScreen from './PaperTradingScreen.js';

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
        search: {
            screen: Portfolio,
            navigationOptions: {
              header: null,
            },
        },
    },
    {
        initialRouteName: 'main', // default route
        animationEnabled: true,
    },
    {
    transitionConfig: () => ({
      screenInterpolator: (sceneProps) => {
        return CardStackStyleInterpolator.forVertical(sceneProps);
      },
    }),
  },
);

export default RouterComponent;
