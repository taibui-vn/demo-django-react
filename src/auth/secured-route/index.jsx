import { useAuth } from "../index";
import React from "react";
import { Redirect, Route } from "react-router-dom";

function SecuredRoute({ component: Component, ...rest }) {
  const { session } = useAuth();
  return (
    <Route
      {...rest}
      render={props => {
        return session ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
}

export default SecuredRoute;
