import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Dashboard from "../Pages/Dashboard";

// Import Authentication pages
import Login from "../Pages/Authentication/Login";
import ForgetPasswordPage from "../Pages/Authentication/ForgetPassword";
import Logout from "../Pages/Authentication/Logout";
import Register from "../Pages/Authentication/Register";
import UserProfile from "../Pages/Authentication/user-profile";


const authProtectedRoutes = [
  //dashboard
  { path: "/dashboard", component: <Dashboard /> },

  // Profile
  { path: "/userprofile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
];

const publicRoutes = [

  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/auth-recoverpw", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

];

export { authProtectedRoutes, publicRoutes };
