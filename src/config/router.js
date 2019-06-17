import React from 'react'

import {
    createSwitchNavigator,
    createAppContainer,
    createStackNavigator
} from 'react-navigation';

import { createBrowserApp } from 'react-navigation';

import { COLOR } from './styles'

import Selector from "../Selector";


const UnauthenticatedScreens = createStackNavigator(
    { // Screens
        Selector: { screen: Selector }
    }
);

const AuthenticatedInitialScreens = createStackNavigator(
    { // Screens
        
        Selector: { screen: Selector },
       
        
    }, { // Default options
         headerMode: "none" ,
        defaultNavigationOptions: ({ navigation }) => {
            return {
            
                
                  
            };
        }
    }
);





const AppSwitchNavigator = createSwitchNavigator(
    { // Screens
        Selector: { screen: Selector },
        UnauthenticatedScreens: { screen: UnauthenticatedScreens },
        AuthenticatedInitialScreens: { screen: AuthenticatedInitialScreens },
        
        
        

    }, { // Default options
        initialRouteName: 'Selector'
    }
);


const AppContainer = createBrowserApp(AppSwitchNavigator);

export default AppContainer