import { AsyncStorage } from "react-native";
import { DATA_SESSION } from "../config/global";
import axios from 'axios';
import actionTypes from '../config/action-types';
import {normalize} from 'normalizr';
import {setNormalized, stringify} from '../utils/general';
import {ALBUM} from '../utils/normalize';
import settings from '../config/settings';

import * as types from "../config/action-types/album";

export function get_album_list() { // Fake authentication function
    return async dispatch => {
        dispatch(get_album_list_Request()); // dispatch a login request to update the state
        //console.log(id)
        const MODEL = 'ALBUMS';
        dispatch({type: actionTypes[`SET_${MODEL}_PENDING`]}); 
        try {
    
            try {
                const response = await axios.get(`${settings.API_ROOT}/albums`);
                const {entities} = normalize(response.data, [ALBUM]);
                setNormalized(dispatch, entities);
                await AsyncStorage.setItem(DATA_SESSION, JSON.stringify(response))
                dispatch(get_album_list_Success(response))
                // console.log(response) 
              } catch (error) {// Otherwise display an error to the user
                setTimeout(() => { // Dispatch an error state
                    dispatch(get_album_list_Failed("GET album CHIE!!!"))
                }, 1500)
              }    

        } catch (err) { // When something goes wrong
            console.log(err)
            dispatch(loginFailed("Something went wrong"));
        }
    };
} // login

export const getAlbum_song_list = id => async dispatch => {
    
    dispatch(get_album_songs_list_Request());
    try {
        const response = await axios.get(`${settings.API_ROOT}/songs?album=${id}`);
        await AsyncStorage.setItem('list_album', JSON.stringify(response))
        dispatch(get_album_songs_list_Success(response))
    } catch(error) {
        throw error;
    }
};

export const getAlbum = id => async dispatch => {
    const MODEL = 'ALBUMS';
    dispatch({type: actionTypes[`SET_${MODEL}_PENDING`]});
    try {
        const response = await axios.get(`${settings.API_ROOT}/albums/${id}`);
        const {entities} = normalize(response.data, ALBUM);
        setNormalized(dispatch, entities);
    } catch(error) {
        throw error;
    }
};

export function show_album_front(showFront) { // Fake logout request
    return async dispatch => {
         // Dispatch a logout request
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                // await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                
                dispatch(show_Front_albumSuccess(showFront)) // Dispatch a logout success action
            }, 200)
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
}

export function store_album_detail(albumDetail) { // Fake logout request
    return async dispatch => {
         // Dispatch a logout request
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                // await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                
                dispatch(set_Detail_albumSuccess(albumDetail)) // Dispatch a logout success action
            }, 200)
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
}

export function show_album_detail(showDetail) { // Fake logout request
    return async dispatch => {
         // Dispatch a logout request
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                // await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                
                dispatch(show_Detail_albumSuccess(showDetail)) // Dispatch a logout success action
            }, 200)
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
}

function get_album_list_Request() {
    return {
        type: types.GET_ALBUMS_SONGS_REQUEST
    };
} //loginRequest

function get_album_songs_list_Request() {
    return {
        type: types.GET_ALBUMS_REQUEST
    };
} 

function get_album_list_Success(response) {
    return {
        type: types.GET_ALBUMS_SUCCESS,
        data: {
            response
        }
    };
} // loginSuccess

function get_album_songs_list_Success(response) {
    return {
        type: types.GET_ALBUMS_SONGS_SUCCESS,
        data: {
            response
        }
    };
} 

function get_album_list_Failed(error) {
    if (!error) {
        error = "Network Error";
    }
    return {
        type: types.GET_ALBUMS_FAILED,
        data: {
            error: error
        }
    };
} // loginFailed

function show_Front_albumSuccess(showFront) {
    return {
        type: types.SET_ALBUMS_VIEW_SUCCESS,
        data: {
            showFront
        }
    };
}

function set_Detail_albumSuccess(albumDetail) {
    return {
        type: types.SET_DETAIL_ALBUM_SUCCESS,
        data: {
            albumDetail
        }
    };
}

function show_Detail_albumSuccess(showDetail) {
    return {
        type: types.SET_DETAILVIEW_ALBUM_SUCCESS,
        data: {
            showDetail
        }
    };
}

