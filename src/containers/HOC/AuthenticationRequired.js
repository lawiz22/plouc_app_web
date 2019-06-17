import React, {Component} from 'react';
import {connect} from 'react-redux';
import {normalize} from 'normalizr';
import {hashHistory} from 'react-router';
import actionTypes from '../../config/action-types';
import {setNormalized} from '../../utils/general';
import {USER} from '../../utils/normalize';
import { authenticate } from '../../reducers';
import { DATA_SESSION } from "../../config/global";


export default function(InnerComponent) {

    class AuthenticationRequired extends Component {

        componentDidMount() {
            const {activeUser, authenticate, dispatch} = this.props;
            if(!activeUser) {
                const data = localStorage.getItem('activeUser');
                if(data) {
                    const {entities} = normalize(JSON.parse(data), USER);
                    setNormalized(dispatch, entities);
                    dispatch({
                        type: actionTypes[`LOGIN_SUCCESS`],
                        payload: JSON.parse(data)
                    });
                    this.restoreSession()
                } else {
                    hashHistory.push('/login');
                }
            }
        }
        restoreSession() { // Restore session of the user who is authenticated
            return async dispatch => {
                dispatch(restoreRequest()); // Dispatch an restore request session
                try {
                    const session = await AsyncStorage.getItem(DATA_SESSION) 
                    console.log(session)// Get the data session in the current device
                    if (session != null) { // If session exist and authenticated
                        dispatch(loginSuccess(JSON.parse(session))) // Dispatch a login success redirecting to the home screen
                    } else { // If not dispatch a restore failed action to be redirected to the login screen
                        dispatch(restoreFailed())
                    }
                } catch (err) { // When something goes wrong
                    dispatch(restoreFailed())
                }
            };
        } 
        render() {
            const {activeUser} = this.props;
            const {authenticate} = this.props;
            const {userposts_status} = this.props;
            if(!activeUser) return null;
            return <InnerComponent {...this.props} />;
        }

    }

    return connect(state => ({
        activeUser: state.activeUser,
        authenticate: state.authenticate,
        userposts_status : state.list_post
    }))(AuthenticationRequired);

}
