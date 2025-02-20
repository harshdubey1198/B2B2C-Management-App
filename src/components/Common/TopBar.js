import React, { useEffect, useState } from "react";
import logosm from "../../assets/images/logo-sm.png";
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";

// Import components
import ProfileMenu from "./TopbarDropdown/ProfileMenu";
import NotificationDropdown from "./TopbarDropdown/NotificationDropdown";
import LanguageDropdown from "./TopbarDropdown/LanguageDropdown";
import AppsDropdown from "./TopbarDropdown/AppsDropdown";
import socket from "../../utils/socket";

const TopBar = () => {
  const [hasUnread, setHasUnread] = useState(false);
  const userData = JSON.parse(localStorage.getItem("authUser"));
  const userId = userData?.response?._id;

  useEffect(() => {
    if (!userId) return;

    socket.connect();
    socket.emit("joinRoom", userId);

    // Listen for previous notifications
    socket.on("previousNotifications", (prevNotifs) => {
      setHasUnread(prevNotifs.some((notif) => !notif.isRead)); // Set red dot based on unread
    });

    // Listen for new notifications
    socket.on("newNotification", (newNotif) => {
      setHasUnread(true); // New notifications are unread by default
    });

    // Listen for updates to notifications (e.g., isRead changes)
    socket.on("notificationUpdated", (updatedNotif) => {
      setHasUnread((prev) => {
        if (updatedNotif.isRead) {
          return prev ? prevNotifs.some((notif) => !notif.isRead) : false;
        }
        return true;
      });
    });

    return () => {
      socket.off("previousNotifications");
      socket.off("newNotification");
      socket.off("notificationUpdated");
      socket.disconnect();
    };
  }, [userId]);

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box text-center">
              <a href="#" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logosm} alt="logo-sm-dark" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logodark} alt="logo-dark" height="24" />
                </span>
              </a>

              <a href="#" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logosm} alt="logo-sm-light" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logolight} alt="logo-light" height="24" />
                </span>
              </a>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-24 header-item waves-effect"
              id="vertical-menu-btn"
            >
              <i className="ri-menu-2-line align-middle"></i>
            </button>
          </div>

          <div className="d-flex">
            <LanguageDropdown />
            <AppsDropdown />
            <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                data-toggle="fullscreen"
              >
                <i className="ri-fullscreen-line"></i>
              </button>
            </div>

            {/* Notification Dropdown */}
            <NotificationDropdown hasUnread={hasUnread} />

            <ProfileMenu />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default TopBar;
