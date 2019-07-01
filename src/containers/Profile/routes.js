import React from 'react';
import {Route} from 'react-router';
import Authenticate from '../HOC/Authenticate';
import AuthenticationRequired from '../HOC/AuthenticationRequired';
import Profile from "./";
import PostList from "../PostList";
import PostDetail from "../PostDetail";



export default (
    <Route path="/profile/:userId" component={Authenticate(Profile)}>
       <Route path="posts" component={PostList}/>
       <Route path="posts/:postId" component={PostDetail}/>  
    </Route>
);
