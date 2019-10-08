import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Pending from "./containers/Pending";
import Login from "./containers/Login";
import Register from "./containers/Register";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";
import PrivateRoute from "./utils/PrivateRoute";

export default ({ childProps }) =>
  <Switch>
    {/* <AppliedRoute path="/" exact component={Home} props={childProps} /> */}
    <AppliedRoute path="/" exact component={Login} props={childProps} />
    <PrivateRoute path="/home" exact component={Home} props={childProps} />
    <PrivateRoute path="/pending" exact component={Pending} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/register" exact component={Register} props={childProps} />
    <AppliedRoute path="/test" exact component={Home} props={childProps}/>
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;

