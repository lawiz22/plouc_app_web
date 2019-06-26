import { AsyncStorage } from "react-native";
import { DATA_SESSION } from "../config/global";
import axios from 'axios';
import actionTypes from '../config/action-types';
import {normalize} from 'normalizr';
import {setNormalized, stringify} from '../utils/general';
import {SONG} from '../utils/normalize';
import settings from '../config/settings';

import * as types from "../config/action-types/song";
import * as typeP from "../config/action-types/player";

export function get_song_list( limit, offset ) { // Fake authentication function
    return async dispatch => {
        dispatch(get_song_list_Request()); // dispatch a login request to update the state
        //console.log(id) 
        try {
    
            try {
                const response = await axios.get(`${settings.API_ROOT}/songs?limit=${limit}&offset=${offset}`);
                await AsyncStorage.setItem(DATA_SESSION, JSON.stringify(response))
                dispatch(get_song_list_Success(response))
                // console.log(response)
                
              } catch (error) {// Otherwise display an error to the user
                setTimeout(() => { // Dispatch an error state
                    dispatch(get_song_list_Failed("GET song CHIE!!!"))
                }, 1800)
              }    

        } catch (err) { // When something goes wrong
            console.log(err)
            dispatch(loginFailed("Something wen wong"));
        }
    };
} // login

export const getSongList = data => async dispatch => {
    const MODEL = 'SONGS';
    dispatch({type: actionTypes[`SET_${MODEL}_PENDING`]});
    try {
        const response = await axios.get(`${settings.API_ROOT}/songs`);
        const {entities} = normalize(response.data, [SONG]);
        setNormalized(dispatch, entities);
    } catch(error) {
        throw error;
    }
};

export const getSong = id => async dispatch => {
    const MODEL = 'SONGS';
    dispatch({type: actionTypes[`SET_${MODEL}_PENDING`]});
    try {
        const response = await axios.get(`${settings.API_ROOT}/songs/${id}`);
        const {entities} = normalize(response.data, SONG);
        setNormalized(dispatch, entities);
    } catch(error) {
        throw error;
    }
};

export function show_song_front(showFront) { // Fake logout request
    return async dispatch => {
         // Dispatch a logout request
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                // await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                
                dispatch(show_Front_songSuccess(showFront)) // Dispatch a logout success action
            }, 400)
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
}

export function show_audio_waveform(showWaveform) { // Fake logout request
    return async dispatch => {
         // Dispatch a logout request
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                // await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                
                dispatch(show_Audio_waveformSuccess(showWaveform)) // Dispatch a logout success action
            }, 400)
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
}

export function store_song_detail(songDetail) { // Fake logout request
    return async dispatch => {
         // Dispatch a logout request
        try {
            
                console.log(songDetail)
                dispatch(set_Detail_songSuccess(songDetail)) // Dispatch a logout success action
            
            } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
}

export function store_audio_context(audioContext) { 
    return async dispatch => {
         
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                
                console.log(audioContext)
                const audioContext2 = Object.values(audioContext)
                console.log(audioContext[0])
                dispatch(set_Audio_contextSuccess(audioContext))
            }, )
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
}

export function store_audio_buffer(audioBuffer) { 
    return async dispatch => {
        
        try {
             // Add a 1.5 second delay to fake an asynchronous ajax request
                
                console.log(audioBuffer)
                const audioBuffer2 = Object.values(audioBuffer)
                console.log(audioBuffer2[0])
                dispatch(set_Audio_bufferSuccess(audioBuffer2[0]))
            
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
}


export function show_song_detail(showDetail) { // Fake logout request
    return async dispatch => {
         // Dispatch a logout request
        try {
             // Add a 1.5 second delay to fake an asynchronous ajax request
                // await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                
                dispatch(show_Detail_songSuccess(showDetail)) // Dispatch a logout success action
            
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
}

export function set_song_random(setRandom) { // Fake logout request
    return async dispatch => {
         // Dispatch a logout request
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                // await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                
                dispatch(set_Random_songSuccess(setRandom)) // Dispatch a logout success action
            }, 200)
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
}

function set_Random_songSuccess(setRandom) {
    return {
        type: types.SET_SONGS_RANDOM_SUCCESS,
        data: {
            setRandom
        }
    };
}

function show_Front_songSuccess(showFront) {
    return {
        type: types.SET_SONGS_VIEW_SUCCESS,
        data: {
            showFront
        }
    };
}

function show_Audio_waveformSuccess(showWaveform) {
    return {
        type: typeP.SHOW_AUDIO_WAVEFORM_SUCCESS,
        data: {
            showWaveform
        }
    };
}

function get_song_list_Request() {
    return {
        type: types.GET_SONGS_REQUEST,
        
    };
} //loginRequest

function get_song_list_Success(response) {
    return {
        type: types.GET_SONGS_SUCCESS,
        data: {
            response
        }
    };
} // loginSuccess

function get_song_list_Failed(error) {
    if (!error) {
        error = "Network Error";
    }
    return {
        type: types.GET_SONGS_FAILED,
        data: {
            error: error
        }
    };
} // loginFailed

export function reset_song_list(limit, offset) { // Fake logout request
    return async dispatch => {
        dispatch(reset_songRequest()) // Dispatch a logout request
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                // await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                
                dispatch(reset_songSuccess(limit, offset)) // Dispatch a logout success action
            }, 1800)
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
} // logout


function reset_songRequest() {
    return {
        type: types.RESET_SONGS_REQUEST
    };
} //loginRequest

function reset_songSuccess(limit, offset) {
    return {
        type: types.RESET_SONGS_SUCCESS,
        data: {
            limit,
            offset
        }
    };
} // loginSuccess

function reset_songFailed(error) {
    if (!error) {
        error = "Network Error";
    }
    return {
        type: types.RESET_SONGS_FAILED,
        data: {
            error: error
        }
    };
} // loginFailed

export function get_user_song_count(user) { // Fake authentication function
    return async dispatch => {
        dispatch(count_songRequest()); // dispatch a login request to update the state
        //console.log(id) 
        try {
    
            try {
                const response = await axios.get(`${settings.API_ROOT}/songs`);
                await AsyncStorage.setItem(DATA_SESSION, JSON.stringify(response));
                // console.log(response['data'])
                console.log(user)
                const songList = Object.values(response['data'])
                    .filter(song => song.user.id === user);    
                console.log(songList)
                                
                dispatch(count_songSuccess(songList))
                // console.log(response.data.length)
                
              } catch (error) {// Otherwise display an error to the user
                setTimeout(() => { // Dispatch an error state
                    dispatch(count_songFailed("GET con song CHIE!!!"))
                }, 1500)
              }    

        } catch (err) { // When something goes wrong
            console.log(err)
            dispatch(loginFailed("Something wen wong"));
        }
    };
}

export function get_song_count() { // Fake authentication function
    return async dispatch => {
        dispatch(count_songRequest()); // dispatch a login request to update the state
        //console.log(id) 
        try {
    
            try {
                const response = await axios.get(`${settings.API_ROOT}/songs`);
                await AsyncStorage.setItem(DATA_SESSION, JSON.stringify(response));
                // console.log(response['data'])
                // console.log(user)
                const songList = Object.values(response['data'])
                //    .filter(song => song.user.id === user);    
                // console.log(songList)
                                
                dispatch(count_songSuccess(songList))
                // console.log(response.data.length)
                
              } catch (error) {// Otherwise display an error to the user
                setTimeout(() => { // Dispatch an error state
                    dispatch(count_songFailed("GET con song CHIE!!!"))
                }, 1500)
              }    

        } catch (err) { // When something goes wrong
            console.log(err)
            dispatch(loginFailed("Something wen wong"));
        }
    };
}

function count_songRequest() {
    return {
        type: types.COUNT_SONGS_TOTAL_REQUEST
    };
} //loginRequest

function count_songSuccess(response) {
    return {
        type: types.COUNT_SONGS_TOTAL_SUCCESS,
        data: {
            response
        }
    };
} // loginSuccess

function count_songFailed(error) {
    if (!error) {
        error = "Network Error";
    }
    return {
        type: types.COUNT_SONGS_TOTAL_FAILED,
        data: {
            error: error
        }
    };
}

function set_Detail_songSuccess(songDetail) {
    return {
        type: types.SET_DETAIL_SONG_SUCCESS,
        data: {
            songDetail
        }
    };
}

function show_Detail_songSuccess(showDetail) {
    return {
        type: types.SET_DETAILVIEW_SONG_SUCCESS,
        data: {
            showDetail
        }
    };
}

function set_Audio_contextSuccess(audioContext) {
    return {
        type: typeP.LOAD_AUDIO_CONTEXT_SUCCESS,
        data: {
            audioContext
        }
    };
}

export function set_Audio_bufferRequest() {
    return {
        type: typeP.LOAD_AUDIO_BUFFER_REQUEST
    };
}

export function flush_Audio_bufferSuccess() {
    return {
        type: typeP.FLUSH_AUDIO_BUFFER_SUCCESS
    };
}

function set_Audio_bufferSuccess(audioBuffer) {
    return {
        type: typeP.LOAD_AUDIO_BUFFER_SUCCESS,
        data: {
            audioBuffer
        }
    };
}