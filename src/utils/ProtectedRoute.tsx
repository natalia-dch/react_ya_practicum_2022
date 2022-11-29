import { Route, Redirect, useLocation, useHistory } from "react-router-dom";
import { FC, ReactNode, useEffect, useState } from "react";
import { getCookie } from "./cookies";

type TProtectedRouteProps = {
  children: ReactNode;
  fromUnauthorized?: boolean;
  fromAuthorized?: boolean;
  path: string;
  exact: boolean;
};

export const ProtectedRoute = ({
  fromUnauthorized,
  fromAuthorized,
  path,
  exact,
  children,
}: TProtectedRouteProps) => {
  const isAuth = getCookie("refreshToken");
  const location = useLocation<{ from: any }>();
  return (
    <Route path={path} exact={exact}>
      {/* {((isAuth && fromAuthorized) ||
      (!isAuth &&
        path === "/reset-password" &&
        location?.state?.from !== "/forgot-password")) ? (
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      ) : !isAuth && fromUnauthorized ? (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      ) : (
        children
      )} */}
      {children }
    </Route>
  );
};
