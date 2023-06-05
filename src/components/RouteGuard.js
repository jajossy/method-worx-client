import React from "react";
import { Route, useNavigate } from "react-router-dom";

const RouteGuard = ({ component: Component, ...rest }) => {
  function hasJWT() {
    let flag = false;

    //check user has JWT token
    localStorage.getItem("token") ? (flag = true) : (flag = false);

    return flag;
  }

  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) =>
        hasJWT() ? <Component {...props} /> : navigate("/login")
      }
    />
  );
};

export default RouteGuard;
