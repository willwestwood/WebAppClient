import React from "react";
import { Redirect } from 'react-router-dom';
import { Route } from "react-router-dom";

function equalsPath(left, right)
{
  if (left.startsWith("/"))
  {
    if (right.startsWith("/"))
      return left === right
    else
      return left === "/" + right
  }
  else if (right.startsWith("/"))
    return left === "/" + right
  else
    return left === right
}

export default ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
      if (rest.props.isAuthenticated)
      {
        if (rest.props.isPending)
        {
          if (!equalsPath(rest.path, "pending"))
            return <Redirect to='/pending' />
          else
            return <Component {...rest.props} />
        }

        if (equalsPath(rest.path, "admin"))
        {
          if (rest.props.isAdmin)
            return <Component {...rest.props} />
          else
            return <Redirect to='/home' />
        }

        return <Component {...rest.props} />
      }
      else if (equalsPath(rest.path, "login"))
        return <Component {...rest.props} />
      else
        return <Redirect to='/login' />
    }} />
  )