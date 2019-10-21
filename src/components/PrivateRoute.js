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

export default ({ component: Component, props: cProps, ...rest }) => (
    <Route {...rest} render={(props) => {
      if (cProps.isAuthenticated)
      {
        if (cProps.isPending)
        {
          if (!equalsPath(rest.path, "pending"))
            return <Redirect to='/pending' />
          else
            return <Component {...props} {...cProps} />
        }

        if (equalsPath(rest.path, "admin"))
        {
          if (cProps.isAdmin)
            return <Component {...props} {...cProps} />
          else
            return <Redirect to='/home' />
        }

        return <Component {...props} {...cProps} />
      }
      else if (equalsPath(rest.path, "login"))
        return <Component {...props} {...cProps} />
      else
        return <Redirect to='/login' />
    }} />
  )