import { AsyncStorage } from "react-native";
import actionTypes from '../config/action-types';
import {normalize} from 'normalizr';
import { DATA_SESSION } from "../config/global";
import axios from 'axios';
import {setNormalized, stringify} from '../utils/general';
import {ARTIST} from '../utils/normalize';
import settings from '../config/settings';

import * as types from "../config/action-types/artist";

export function get_artist_list() { // Fake authentication function
    return async dispatch => {
        dispatch(get_artist_list_Request()); // dispatch a login request to update the state
        //console.log(id) 
        const MODEL = 'ARTISTS';
        dispatch({type: actionTypes[`SET_${MODEL}_PENDING`]});
        try {
    
            try {
                const response = await axios.get(`${settings.API_ROOT}/artists`);
                const {entities} = normalize(response.data, [ARTIST]);
                setNormalized(dispatch, entities);
                await AsyncStorage.setItem(DATA_SESSION, JSON.stringify(response))
                dispatch(get_artist_list_Success(response))
                // console.log(response) 
              } catch (error) {// Otherwise display an error to the user
                setTimeout(() => { // Dispatch an error state
                    dispatch(get_artist_list_Failed("GET ARTIST CHIE!!!"))
                }, 1500)
              }    

        } catch (err) { // When something goes wrong
            console.log(err)
            dispatch(loginFailed("Something went wrong"));
        }
    };
} // login

export function get_artist_album_list_2(id) { 
    return async dispatch => {
        dispatch(get_artist_albums_list_Request());
        
        try {
    
            try {
                const response = await axios.get(`${settings.API_ROOT}/albums?artist_name=${id}`);
                
                await AsyncStorage.setItem('list_artist', JSON.stringify(response))
                dispatch(get_artist_albums_list_Success(response))
                // console.log(response) 
              } catch (error) {// Otherwise display an error to the user
                setTimeout(() => { // Dispatch an error state
                    dispatch(get_artist_list_Failed("GET ARTIST CHIE!!!"))
                }, 1500)
              }    

        } catch (err) { // When something goes wrong
            console.log(err)
            dispatch(loginFailed("Something went wrong"));
        }
    };
}

export const getArtist_album_list = artistId => async dispatch => {
    
    dispatch(get_artist_albums_list_Request());
    try {
        const response = await axios.get(`${settings.API_ROOT}/albums?artist_name=${artistId}`);
        await AsyncStorage.setItem('list_artist', JSON.stringify(response))
        dispatch(get_artist_albums_list_Success(response))
    } catch(error) {
        throw error;
    }
};


export const getArtist = id => async dispatch => {
    const MODEL = 'ARTISTS';
    dispatch({type: actionTypes[`SET_${MODEL}_PENDING`]});
    try {
        const response = await axios.get(`${settings.API_ROOT}/artists/${id}`);
        const {entities} = normalize(response.data, ARTIST);
        setNormalized(dispatch, entities);
    } catch(error) {
        throw error;
    }
};

export function show_artist_front(showFront) { // Fake logout request
    return async dispatch => {
         // Dispatch a logout request
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                // await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                
                dispatch(show_Front_artistSuccess(showFront)) // Dispatch a logout success action
            }, 200)
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
} 


export function store_artist_detail(artistDetail) { // Fake logout request
    return async dispatch => {
         // Dispatch a logout request
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                // await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                
                dispatch(set_Detail_artistSuccess(artistDetail)) // Dispatch a logout success action
            }, 200)
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
}

export function show_artist_detail(showDetail) { // Fake logout request
    return async dispatch => {
         // Dispatch a logout request
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                // await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                
                dispatch(show_Detail_artistSuccess(showDetail)) // Dispatch a logout success action
            }, 200)
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
}

function get_artist_list_Request() {
    return {
        type: types.GET_ARTISTS_REQUEST
    };
} //loginRequest

function get_artist_albums_list_Request() {
    return {
        type: types.GET_ARTISTS_ALBUMS_REQUEST
    };
} 

function get_artist_list_Success(response) {
    return {
        type: types.GET_ARTISTS_SUCCESS_2,
        data: {
            response
        }
    };
} // loginSuccess

function get_artist_list_Failed(error) {
    if (!error) {
        error = "Network Error";
    }
    return {
        type: types.GET_ARTISTS_FAILED,
        data: {
            error: error
        }
    };
} // loginFailed

function get_artist_albums_list_Success(response) {
    return {
        type: types.GET_ARTISTS_ALBUMS_SUCCESS,
        data: {
            response
        }
    };
} 

function show_Front_artistSuccess(showFront) {
    return {
        type: types.SET_ARTISTS_VIEW_SUCCESS,
        data: {
            showFront
        }
    };
}

function set_Detail_artistSuccess(artistDetail) {
    return {
        type: types.SET_DETAIL_ARTIST_SUCCESS,
        data: {
            artistDetail
        }
    };
}

function show_Detail_artistSuccess(showDetail) {
    return {
        type: types.SET_DETAILVIEW_ARTIST_SUCCESS,
        data: {
            showDetail
        }
    };
}

