import { Route, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookie } from "./cookies";

export function ProtectedRoute({
  children,
  fromUnauthorized,
  fromAuthorized,
  ...rest
}) {
  const isAuth = getCookie("refreshToken");
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (
          //authorized users  are redirected to home page
          (isAuth && fromAuthorized) ||
          //unauthorized user can go to to reset password from "/forgot-password"
          (!isAuth &&
            rest.path === "/reset-password" &&
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
    />
  );
}
