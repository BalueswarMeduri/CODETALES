import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RouteSignIn } from "@/helpers/RouteName"; // Ensure this path is correct

const AuthRouteProtectiononlytoadmin = () => {
  const user = useSelector((state) => state.user);

  return user && user.isLoggedIn && user.user.email === "balueswar109@gmail.com" ? (
    <Outlet />
  ) : (
    <Navigate to={RouteSignIn} />
  );
};

export default AuthRouteProtectiononlytoadmin;
