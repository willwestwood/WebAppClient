import React from "react";
import { Redirect } from 'react-router-dom';
import { Route } from "react-router-dom";

export default ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      rest.props.isAuthenticated
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )