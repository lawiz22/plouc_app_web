import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Appbar } from 'react-native-paper';
import {hashHistory, Router} from "react-router";
import { reducer as formReducer } from "redux-form";

import * as reducers from "./src/reducers";
import rootReducer from './src/reducers/index';
import routes from "./src/config/routes";


import { composeWithDevTools } from 'redux-devtools-extension';

import { LOGOUT_SUCCESS } from "./src/config/action-types/authenticate";

import Home from './src/screens/home';





const middleware = [
  thunk,
  logger
];

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(...middleware))(createStore);




const store = createStoreWithMiddleware(rootReducer);

const theme = {
  ...DefaultTheme,
  roundness: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2d8259',
    accent: 'yellow',
    surface: 'green',
    backdrop: 'green',
    placeholder: 'green',
  }
};


class App extends Component {
  render() {
    return (
    
      <Provider store={store}>
         <PaperProvider theme={theme}>
         <React.Fragment>
         
              {Platform.OS === 'web' ? (
                
                <style type="text/css">{`
                  @font-face {
                    font-family: 'MaterialIcons';
                    src: url(${require('react-native-vector-icons/Fonts/MaterialIcons.ttf')}) format('truetype');
                  }
                `}</style>
                
              ) : null}
              
              <Router history={hashHistory} routes={routes}/>
          </React.Fragment>
        </PaperProvider>
      </Provider>

    );
  }
}

export default App;

const styles = StyleSheet.create({
  body1White: {
    color: 'white',
  },
  Container: {
    flex: 1,
  },
  Header: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: '#263238',
  },
  title: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: '#B0BEC5',
  },
});
