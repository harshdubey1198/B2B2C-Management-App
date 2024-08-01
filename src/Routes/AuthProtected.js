import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useProfile } from "../Hooks/UserHooks";
import { userRolesSidebarData } from "../Layout/VerticalLayout/SidebarData"; // Import sidebar data function

const AuthProtected = (props) => {
  const { userProfile, loading } = useProfile();
  const location = useLocation();

  // Check if authUser is present in localStorage
  const authUser = JSON.parse(localStorage.getItem('authUser'));

  if (loading) {
    return  <Navigate to={{ pathname: "/login", state: { from: location } }} />;
  }

  // Redirect to login if authUser is not found
  if (!authUser) {
    return <Navigate to={{ pathname: "/login", state: { from: location } }} />;
  }

  // Check if userProfile is present
  if (!userProfile) {
    return <Navigate to={{ pathname: "/login", state: { from: location } }} />;
  }

  const allowedRoutes = getAllowedRoutes(userProfile.role);

  const currentPath = location.pathname;
  if (!allowedRoutes.includes(currentPath)) {
    return <Navigate to="/dashboard" />;
  }

  return <>{props.children}</>;
};

const getAllowedRoutes = (role) => {
  const sidebarData = userRolesSidebarData(role);

  const flattenRoutes = (data) => {
    return data.reduce((acc, item) => {
      if (item.url) acc.push(item.url);
      if (item.subItem) {
        item.subItem.forEach((sub) => acc.push(sub.link));
      }
      return acc;
    }, []);
  };

  return flattenRoutes(sidebarData);
};

export default AuthProtected;

//master ->  sidebar data || user routes defined { limited routes  -> output  }
// master -> restrictions || routes defined === accessed route -> /dashboard 