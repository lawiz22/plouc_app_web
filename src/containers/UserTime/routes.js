import React from 'react';
import {Route} from 'react-router';
import Authenticate from '../HOC/Authenticate';
import AuthenticationRequired from '../HOC/AuthenticationRequired';
import Profile from "./";
import PostList from "../PostList";
import PostDetail from "../PostDetail";
import UserTime from "../UserTime";



export default (
    <Route path="/time/:userId" component={Authenticate(UserTime)}>
       
    </Route>
);
