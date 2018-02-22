import React from 'react';

import { TabNavigator } from 'react-navigation';

// Used this as an example. Placeholder Icons
import Icon from 'react-native-vector-icons/FontAwesome';

// Import Components to set to diffrent Routes.
import Portfolio from './Portfolio.js';
//import ProfileScreen from './ProfileScreen.js';
//import PaperTradingScreen from './PaperTradingScreen.js';

//  This Router sets the tab menu for the whole app
//  Ignoring the styling until we get actual designs. -Pedro
 export const RouterComponent = TabNavigator( // TabNavigator -> Menu on Bottom. Drawer on Left.

  {
    profile: { screen: Portfolio, // sets Router Component to use
          navigationOptions: {
            title: 'Profile', // Text shown in tab bar
            tabBarIcon: <Icon
                        name='user-circle'  // Sets Icon
                        size={20}           // Use 20 for FontAwesome Icons generally

            />
          }
    },
    portfolio: { screen: Portfolio,
          navigationOptions: {
            title: 'My Portfolio',
            tabBarIcon: <Icon
                        name='dollar'
                        size={20}
            />
          }
    },
    papertrade: { screen: Portfolio,
          navigationOptions: {
            title: 'Paper Trading',
            tabBarIcon: <Icon
                        name='magic'
                        size={20}
            />
          }
    }
  },
  {
   initialRouteName: 'portfolio', // Which route to start with at initialization?
   animationEnabled: true,
   tabBarOptions: {
             activeBackgroundColor: '#fff', // Sets active tab color.
             inactiveBackgroundColor: '#252b2e',  // Sets inactive tab color.
             style: {
               backgroundColor: '#252b2e',  // Set the same 'inactiveBackgroundColor'.
             }
             },
    });

export default (RouterComponent);
