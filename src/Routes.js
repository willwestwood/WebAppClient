import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Pending from "./containers/Pending";
import Login from "./containers/Login";
import Register from "./containers/Register";
import NewCompany from "./containers/NewCompany";
import Companies from "./containers/Companies";
import Admin from "./containers/Admin";
import NotFound from "./containers/NotFound";
import Error from "./containers/Error";
import AppliedRoute from "./components/AppliedRoute";
import PrivateRoute from "./components/PrivateRoute";

export default ({ childProps }) =>
  <Switch>
    <PrivateRoute path="/" exact component={Home} props={childProps} />
    <PrivateRoute path="/home" exact component={Home} props={childProps} />
    <PrivateRoute path="/pending" exact component={Pending} props={childProps} />
    <PrivateRoute path="/admin" exact component={Admin} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/register" exact component={Register} props={childProps} />
    <PrivateRoute path="/companies/new" exact component={NewCompany} props={childProps} />
    <PrivateRoute path="/companies/:id" exact component={Companies} props={childProps} />
    <AppliedRoute path="/error" exact component={Error} props={childProps}/>
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;

