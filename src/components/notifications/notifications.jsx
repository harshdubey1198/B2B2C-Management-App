import React, { useEffect, useState } from "react";
import socket from "../../utils/socket";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const userData = JSON.parse(localStorage.getItem("authUser"));
  const userId = userData?.response?._id;

  useEffect(() => {
    if (!userId) return;

    socket.connect();
    socket.emit("joinRoom", userId);

    socket.on("previousNotifications", (prevNotifs) => {
      setNotifications(prevNotifs);
    });

    socket.on("newNotification", (newNotif) => {
      setNotifications((prev) => [newNotif, ...prev]);
    });

    socket.on("notificationUpdated", (updatedNotif) => {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === updatedNotif._id ? { ...notif, isRead: updatedNotif.isRead } : notif
        )
      );
    });

    socket.on("notificationDeleted", (deletedNotif) => {
      console.log("🚀 Notification Deleted:", deletedNotif);
      setNotifications((prev) => prev.filter((notif) => notif._id !== deletedNotif._id));
    });

    return () => {
      socket.off("previousNotifications");
      socket.off("newNotification");
      socket.off("notificationUpdated");
      socket.off("notificationDeleted"); 
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
    <div className="page-content">
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        notifications.map((notif) => (
          <div
            key={notif._id}
            onClick={() => markAsRead(notif._id)}
            style={{
              background: notif.isRead ? "#ddd" : "#fff",
              padding: "10px",
              marginBottom: "5px",
              cursor: "pointer",
            }}
          >
            <p>{notif.message}</p>
            <small>{new Date(notif.date).toLocaleString()}</small>
            {!notif.isRead && <span style={{ color: "red" }}> • Unread</span>}
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
