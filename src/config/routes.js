import React from "react";
import {IndexRoute, Route} from "react-router";
import AuthenticationRoutes from "../containers/Authentication/routes";
import Authenticate from '../containers/HOC/Authenticate';
import Home from "../screens/home";
import Login from "../screens/login";



export default (
    <Route path="/">
        <IndexRoute component={Authenticate(Home)}/>
        {AuthenticationRoutes}
    </Route>
);
