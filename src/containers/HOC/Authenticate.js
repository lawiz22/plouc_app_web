import React, {Component} from 'react';
import {connect} from 'react-redux';
import {normalize} from 'normalizr';
import actionTypes from '../../config/action-types';
import {setNormalized} from '../../utils/general';
import {USER} from '../../utils/normalize';
import { authenticate } from '../../reducers';
import { bindActionCreators } from "redux";
import { AsyncStorage } from "react-native";
import { DATA_SESSION } from "../../config/global";
import * as authActions from "../../actions/authenticate";

import * as types from "../../config/action-types/authenticate";





export default function(InnerComponent) {

    class Authenticate extends Component {

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
                    

                } 
            }
            
            
        }

        async componentWillMount(){
            const {dispatch} = this.props;
            const session = await AsyncStorage.getItem(DATA_SESSION);
            if(session){
                console.log("Je passe dasn AUTHENTICATE HOC et HOC!! ")
                dispatch(loginSuccess(JSON.parse(session))) 
                
            }
            }
    
          
        render() {
           
            return <InnerComponent {...this.props} />;
        }

    }

    function loginSuccess(session) {
        return {
            type: types.LOGIN_SUCCESSS,
            data: {
                session
            }
        };
    } // loginSuccess


    return connect(state => ({
        activeUser: state.activeUser,
        authenticate : state.authenticate.isAuth,
       // actions: bindActionCreators(authActions)
    }))(Authenticate);

}
