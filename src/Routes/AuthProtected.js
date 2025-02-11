import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useProfile } from "../Hooks/UserHooks";
import { getSidebarByRole } from "../apiServices/service"; 

const AuthProtected = (props) => {
  const { userProfile, loading } = useProfile();
  const location = useLocation();
  const [allowedRoutes, setAllowedRoutes] = useState([]);
  // const [routesLoading, setRoutesLoading] = useState(true);

  // Check if authUser is present in localStorage
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const isLocked = JSON.parse(localStorage.getItem("isLocked"));

  useEffect(() => {
    if (authUser) {
      const token = authUser.token;
      try {
        const { exp } = JSON.parse(atob(token.split(".")[1]));
        const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
        const timeUntilExpiryInSeconds = exp - currentTimeInSeconds;
        const timeUntilExpiryInMs = timeUntilExpiryInSeconds * 1000;

        if (timeUntilExpiryInSeconds > 0) {
          const logoutTimeout = setTimeout(() => {
            localStorage.removeItem("authUser");
            console.log("Token Expired - User Logged Out Automatically");
            window.location.href = "/login";
          }, timeUntilExpiryInMs);
          return () => clearTimeout(logoutTimeout);
        } else {
          localStorage.removeItem("authUser");
          console.log("Token Expired - User Logged Out Immediately");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Invalid Token:", error);
        localStorage.removeItem("authUser");
        window.location.href = "/login";
      }
    }
  }, [authUser]);

  useEffect(() => {
    const fetchAllowedRoutes = async () => {
      if (userProfile?.role) {
        try {
          const response = await getSidebarByRole(userProfile.role);
          if (response?.response?.sidebar) {
            setAllowedRoutes(flattenRoutes(response.response.sidebar));
          }
        } catch (error) {
          console.error("Error fetching allowed routes:", error);
        } finally {
          // setRoutesLoading(false); // Ensure UI does not redirect until data is ready
        }
      } else {
        // setRoutesLoading(false);
      }
    };
    fetchAllowedRoutes();
  }, [userProfile]);


  if (isLocked) {
    return <Navigate to="/auth-lock-screen" />;
  }

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  if (!userProfile) {
    return <Navigate to="/login" />;
  }

  const currentPath = location.pathname;
  if (allowedRoutes.length > 0 && !allowedRoutes.includes(currentPath)) {
    return <Navigate to="/dashboard" />;
  }

  return <>{props.children}</>;
};

const flattenRoutes = (data) => {
  return data.reduce((acc, item) => {
    if (item.url) acc.push(item.url);
    if (item.subItem) {
      item.subItem.forEach((sub) => acc.push(sub.link));
    }
    return acc;
  }, []);
};

export default AuthProtected;

//master ->  sidebar data || user routes defined { limited routes  -> output  }
// master -> restrictions || routes defined === accessed route -> /dashboard 