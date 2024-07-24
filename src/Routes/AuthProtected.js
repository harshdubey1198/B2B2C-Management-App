import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useProfile } from "../Hooks/UserHooks";
import { userRolesSidebarData } from "../Layout/VerticalLayout/SidebarData"; // Import sidebar data function

const AuthProtected = (props) => {
  const { userProfile, loading } = useProfile();
  const location = useLocation();

  if (loading) {
    // Add a loading state if needed
    return <div>Loading...</div>;
  }

  if (!userProfile) {
    return <Navigate to={{ pathname: "/login", state: { from: location } }} />;
  }

  // Get allowed routes for the user's role
  const allowedRoutes = getAllowedRoutes(userProfile.role);

  // Check if the current path is in the allowed routes
  const currentPath = location.pathname;
  if (!allowedRoutes.includes(currentPath)) {
    // Redirect to the dashboard if not allowed
    return <Navigate to="/dashboard" />;
  }

  return <>{props.children}</>;
};

// Helper function to extract allowed routes from sidebar data
const getAllowedRoutes = (role) => {
  const sidebarData = userRolesSidebarData(role);

  // Flatten the sidebar data to get a list of all URLs and subItem links
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
