import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RouteSignIn } from "@/helpers/RouteName";

const AuthRouteProtection = () => {
  const user = useSelector((state) => state.user);

  return user && user.isLoggedIn ? <Outlet /> : <Navigate to={RouteSignIn} />;
};

export default AuthRouteProtection;
