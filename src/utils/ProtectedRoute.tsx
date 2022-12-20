import { Route, Redirect, useLocation } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { getCookie } from "./cookies";

type RouteProps = {
  children : any,
  fromUnauthorized : boolean,
  path : string,
  exact : boolean
};

export const ProtectedRoute : FC<RouteProps> = ({
  children,
  fromUnauthorized,
  path,
  exact
}) => {
  const isAuth = getCookie("refreshToken");
  const location = useLocation<{ from: any }>();
  return (
    <Route
      render={() => {
        if (
          //authorized users  are redirected to home page
          (isAuth && !fromUnauthorized) ||
          //unauthorized user can go to to reset password from "/forgot-password"
          (!isAuth &&
            path === "/reset-password" &&
            location?.state?.from !== "/forgot-password")
        ) {
          return <Redirect to={{ pathname: "/", state: { from: location } }} />;
        } else if (!isAuth && fromUnauthorized) {
          //unauthorized users are redirected to login
          return (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          );
        } else {
          return children;
        }
      }}
      path={path}
      exact={exact}
    />
  );
}
