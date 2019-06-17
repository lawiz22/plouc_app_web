import { AsyncStorage } from "react-native";
import { DATA_SESSION } from "../config/global";
import actionTypes from '../config/action-types';
import {normalize} from 'normalizr';
import axios from 'axios';
import {setNormalized, stringify} from '../utils/general';
import {POST} from '../utils/normalize';
import settings from '../config/settings';

import * as types from "../config/action-types/post";

export const get_user_post = (params = {}) => async dispatch => {
        dispatch(get_user_posts_Request()); // dispatch a login request to update the state
        //console.log(id) 
        const MODEL = 'POSTS';
        dispatch({type: actionTypes[`SET_${MODEL}_PENDING`]});
        try {
    
            try {
                const response = await axios.get(`${settings.API_ROOT}/posts${stringify(params)}`);
                const {entities} = normalize(response.data, [POST]);
                setNormalized(dispatch, entities);
                await AsyncStorage.setItem(DATA_SESSION, JSON.stringify(response))
                dispatch(get_user_posts_Success(response))
                // console.log(entities) 
              } catch (error) {// Otherwise display an error to the user
                setTimeout(() => { // Dispatch an error state
                    dispatch(get_user_posts_Failed("GET POSTS CHIE!!!"))
                }, 1500)
              }    

        } catch (err) { // When something goes wrong
            console.log(err)
            dispatch(loginFailed("Something went wrong"));
        }
    };
 // login


export const getPost = id => async dispatch => {
    const MODEL = 'POSTS';
    dispatch({type: actionTypes[`SET_${MODEL}_PENDING`]});
    try {
        const response = await axios.get(`${settings.API_ROOT}/posts/${id}`);
        const {entities} = normalize(response.data, POST);
        setNormalized(dispatch, entities);
    } catch(error) {
        throw error;
    }
};

export function show_post_front(showFront) { // Fake logout request
    return async dispatch => {
         // Dispatch a logout request
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                // await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                
                dispatch(show_Front_postSuccess(showFront)) // Dispatch a logout success action
            }, 400)
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
}
export function set_post_list(showList) { // Fake logout request
    return async dispatch => {
         // Dispatch a logout request
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                // await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                
                dispatch(set_Listview_postSuccess(showList)) // Dispatch a logout success action
            }, 200)
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
}

export function store_post_detail(postDetail) { // Fake logout request
    return async dispatch => {
         // Dispatch a logout request
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                // await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                
                dispatch(set_Detail_postSuccess(postDetail)) // Dispatch a logout success action
            }, 200)
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
}

export function show_post_detail(showDetail) { // Fake logout request
    return async dispatch => {
         // Dispatch a logout request
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                // await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                
                dispatch(show_Detail_postSuccess(showDetail)) // Dispatch a logout success action
            }, 200)
        } catch (err) { // When something goes wrong
            dispatch(reset_songFailed("Something went wrong"))
        }
    }
}

function get_user_posts_Request() {
    return {
        type: types.GET_USER_POSTS_REQUEST
    };
} 

function get_user_posts_Success(response) {
    return {
        type: types.GET_USER_POSTS_SUCCESS,
        data: {
            response
        }
    };
} 

function get_user_posts_Failed(error) {
    if (!error) {
        error = "Network Error";
    }
    return {
        type: types.GET_USER_POSTS_FAILED,
        data: {
            error: error
        }
    };
} // loginFailed

function show_Front_postSuccess(showFront) {
    return {
        type: types.SET_POSTS_VIEW_SUCCESS,
        data: {
            showFront
        }
    };
}

function set_Listview_postSuccess(showList) {
    return {
        type: types.SET_LISTVIEW_POST_SUCCESS,
        data: {
            showList
        }
    };
}

function set_Detail_postSuccess(postDetail) {
    return {
        type: types.SET_DETAIL_POST_SUCCESS,
        data: {
            postDetail
        }
    };
}

function show_Detail_postSuccess(showDetail) {
    return {
        type: types.SET_DETAILVIEW_POST_SUCCESS,
        data: {
            showDetail
        }
    };
}

