import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";
import axios from "axios";

// i18n
import { withTranslation } from "react-i18next";
import socket from "../../../utils/socket";

const NotificationDropdown = (props) => {
  const [menu, setMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const userData = JSON.parse(localStorage.getItem("authUser"));
  const userId = userData?.response?._id;

  useEffect(() => {
    if (!userId) return;

    // Connect to socket
    socket.connect();
    socket.emit("joinRoom", userId);

    socket.on("previousNotifications", (prevNotifs) => {
      setNotifications(prevNotifs.sort((a, b) => a.isRead - b.isRead));
    });

    socket.on("newNotification", (newNotif) => {
      setNotifications((prev) => [newNotif, ...prev]);
    });

    socket.on("notificationUpdated", (updatedNotif) => {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === updatedNotif._id ? { ...notif, isRead: updatedNotif.isRead } : notif
        )
        .sort((a, b) => a.isRead - b.isRead)
      );
    });

    // **🔥 Listen for Deleted Notifications**
    socket.on("notificationDeleted", (deletedNotif) => {
      console.log("🚀 Notification Deleted:", deletedNotif);
      setNotifications((prev) => prev.filter((notif) => notif._id !== deletedNotif._id));
    });

    return () => {
      socket.off("previousNotifications");
      socket.off("newNotification");
      socket.off("notificationUpdated");
      socket.off("notificationDeleted"); // Remove listener
      socket.disconnect();
    };
  }, [userId]);

  const markAsRead = async (notifId) => {
    try {
      await axios.put(`${process.env.REACT_APP_URL}/notification/read/${notifId}`);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <Dropdown
      isOpen={menu}
      toggle={() => setMenu(!menu)}
      className="dropdown d-inline-block"
      tag="li"
    >
      <DropdownToggle
        className="btn header-item noti-icon"
        tag="button"
        id="page-header-notifications-dropdown"
      >
        <i className="ri-notification-3-line" />
        {notifications.some((notif) => !notif.isRead) && <span className="noti-dot"></span>}
      </DropdownToggle>

      <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
        <div className="p-3">
          <Row className="align-items-center">
            <Col>
              <h6 className="m-0">{props.t("Notifications")}</h6>
            </Col>
            {/* <div className="col-auto">
              <Link to="/notifications" className="small">
                View All
              </Link>
            </div> */}
          </Row>
        </div>

        <SimpleBar style={{ height: "230px" }}>
          {notifications.length === 0 ? (
            <div className="text-center p-3">No notifications yet</div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif._id}
                className={`text-reset notification-item `}
                onClick={() => markAsRead(notif._id)}
                style={{ cursor: "pointer", padding: "5px 10px", background: notif.isRead ? "#ddd" : "#fff" }}
              >
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar-xs">
                      <span className={`avatar-title rounded-circle font-size-16 ${notif.isRead ? "bg-secondary" : "bg-primary"}`}>
                        <i className="ri-notification-3-line"></i>
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{notif.message}</h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">{notif.isRead ? "Marked as read" : "Unread notification"}</p>
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline"></i> {new Date(notif.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </SimpleBar>
      </DropdownMenu>
    </Dropdown>
  );
};

export default withTranslation()(NotificationDropdown);

NotificationDropdown.propTypes = {
  t: PropTypes.any,
};
