import { AsyncStorage } from "react-native";
import { DATA_SESSION } from "../config/global";
import axios from 'axios';
import {hashHistory} from 'react-router';
import actionTypes from '../config/action-types';
import settings from '../config/settings';

import * as types from "../config/action-types/authenticate";

export function login(email, password ,navigateTo) { // Fake authentication function
    return async dispatch => {
        dispatch(loginRequest()); // dispatch a login request to update the state
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
        const body = JSON.stringify({ email, password });  
        try {
            
            try {
                const session = await axios.post(`${settings.API_ROOT}/login`, body, config);
                await AsyncStorage.setItem(DATA_SESSION, JSON.stringify(session));
                console.log(session);
                setTimeout(() => { // Add a delay for faking a asynchronous request
                    dispatch(loginSuccess(session)) // Dispatch a successful sign in after 1.5 seconds
                    console.log(session)
                    localStorage.setItem('activeUser', JSON.stringify(session.data));
                        dispatch({
                            type: actionTypes[`LOGIN_SUCCESS`],
                            payload: session.data
                        });
                    hashHistory.push('/');
                    // navigateTo("AuthenticatedInitialScreens") // If successfull login navigate to the authenticated screen
                }, 1500)
              } catch (error) {// Otherwise display an error to the user
                setTimeout(() => { // Dispatch an error state
                    
                    dispatch(loginFailed("Incorrect email or password"))
                }, 1500)
              }    

        } catch (err) { // When something goes wrong
            console.log(err)
            dispatch(loginFailed("Something went wrong"));
        }
    };
} // login

export function restoreSession() { // Restore session of the user who is authenticated
    return async dispatch => {
        dispatch(restoreRequest()); // Dispatch an restore request session
        try {
            const session = await AsyncStorage.getItem(DATA_SESSION) // Get the data session in the current device
            if (session != null) { // If session exist and authenticated
                dispatch(loginSuccess(JSON.parse(session))) // Dispatch a login success redirecting to the home screen
            } else { // If not dispatch a restore failed action to be redirected to the login screen
                dispatch(restoreFailed())
            }
        } catch (err) { // When something goes wrong
            dispatch(restoreFailed())
        }
    };
} // restoreSession

export function logout() { // Fake logout request
    return async dispatch => {
        dispatch(logoutRequest()) // Dispatch a logout request
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                // navigateTo("UnauthenticatedScreens") // If successfull logout navigate to the login screen
                dispatch(logoutSuccess())
                this.logoutactiveUser() // Dispatch a logout success action
            }, 1500)
        } catch (err) { // When something goes wrong
            dispatch(logoutFailed("Something went wrong"))
        }
    }
} // logout

export function show_profile_front(showProfile) { // Fake logout request
    return async dispatch => {
         // Dispatch a logout request
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                // await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                
                dispatch(show_Profile_Success(showProfile)) // Dispatch a logout success action
            }, 400)
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
}

function show_Profile_Success(showProfile) {
    return {
        type: types.SET_PROFILE_VIEW_SUCCESS,
        data: {
            showProfile
        }
    };
}

function loginRequest() {
    return {
        type: types.LOGIN_REQUEST
    };
} //loginRequest

function loginSuccess(session) {
    return {
        type: types.LOGIN_SUCCESSS,
        data: {
            session
        }
    };
} // loginSuccess

function loginFailed(error) {
    if (!error) {
        error = "Network Error";
    }
    return {
        type: types.LOGIN_FAILED,
        data: {
            error: error
        }
    };
} // loginFailed

function logoutRequest() {
    return {
        type: types.LOGOUT_REQUEST
    };
} //logoutRequest

function logoutSuccess() {
    return {
        type: types.LOGOUT_SUCCESS,
    };
} // logoutSuccess

function logoutFailed(error) {
    if (!error) {
        error = "Network Error";
    }
    return {
        type: types.LOGOUT_FAILED,
        data: {
            error: error
        }
    };
} // logoutFailed

function restoreRequest() {
    return {
        type: types.RESTORE_REQUEST
    };
} //restoreRequest

function restoreFailed() {
    return {
        type: types.RESTORE_FAILED
    };
} //restoreFailed

export const logoutactiveUser = () => dispatch => {
    localStorage.removeItem('activeUser');
    dispatch({
        type: actionTypes[`LOGOUT_SUCCESS`]
    });
    
};