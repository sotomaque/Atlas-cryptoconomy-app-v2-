import React from 'react';

import { TabNavigator } from 'react-navigation';

// Used this as an example. Placeholder Icons
import Icon from 'react-native-vector-icons/FontAwesome';

// Import Components to set to different Routes.
import Portfolio from './Portfolio.js';
//import ProfileScreen from './ProfileScreen.js';
//import PaperTradingScreen from './PaperTradingScreen.js';

//  This Router sets the tab menu for the whole app
export const RouterComponent = TabNavigator(
    {
        profile: {
            screen: Portfolio,
            navigationOptions: {
                tabBarIcon: (
                    <Icon name="home" size={20} color="#fff" />
                )
            }
        },
        portfolio: {
            screen: Portfolio,
            navigationOptions: {
                tabBarIcon: <Icon name="line-chart" size={20} color="#fff" />
            }
        },
        papertrade: {
            screen: Portfolio,
            navigationOptions: {
                tabBarIcon: <Icon name="trophy" size={20} color="#fff" />
            }
        },
        settings: {
            screen: Portfolio,
            navigationOptions: {
                tabBarIcon: <Icon name="gear" size={20} color="#fff" />
            }
        }
    },
    {
        initialRouteName: 'portfolio', // default route
        animationEnabled: true,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: 'tomato',
            showLabel: false,
            tabBarHideShadow: true,
            activeBackgroundColor: '#125AD5', // Sets active tab color.
            inactiveBackgroundColor: '#125AD5', // Sets inactive tab color.
            style: {
                borderTopWidth: 0,
            }
        }
    }
);

export default RouterComponent;
