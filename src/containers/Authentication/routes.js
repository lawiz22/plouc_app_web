import React from 'react';
import {Route} from 'react-router';
import Login from "../../screens/login";
import Authentication from "../Authentication";
import Unauthenticated from '../../containers/HOC/Unauthenticated';




export default (
    <Route path="/" component={Unauthenticated(Authentication)}>
        <Route path="login" component={Login}/>
        
    </Route>
);
