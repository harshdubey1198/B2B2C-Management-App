const Notification = require("../schemas/notification.schema");
const User = require("../schemas/user.schema");
const { getSocketInstance } = require("../utils/socket");

/**
 * Send a new notification to a user and emit via socket
 */
const sendNotification = async ({ userId, message, type }) => {
  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Create notification
    const notification = new Notification({
      userId,
      message,
      type: type || "system",
      date: new Date(),
      isRead: false,
    });

    await notification.save();

    // Push notification ID to the user's notifications array
    user.notifications.push(notification._id);
    await user.save();

    // Emit new notification via Socket.IO
    const io = getSocketInstance();
    if (io) {
      io.to(userId).emit("newNotification", notification);
    }

    return notification;
  } catch (error) {
    console.error("Error in sendNotification service:", error);
    throw error;
  }
};

/**
 * Get all notifications for a user
 */
const getUserNotifications = async (userId) => {
  try {
    const user = await User.findById(userId).populate({
      path: "notifications",
      model: "Notification",
      options: { sort: { date: -1 } },
    });

    if (!user) throw new Error("User not found");

    return user.notifications;
  } catch (error) {
    console.error("Error in getUserNotifications service:", error);
    throw error;
  }
};

/**
 * Mark notification as read and emit update event
 */
const markNotificationAsRead = async (notificationId) => {
  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) throw new Error("Notification not found");

    notification.isRead = true;
    await notification.save();

    // Emit the update event via Socket.IO
    const io = getSocketInstance();
    if (io) {
      io.to(notification.userId.toString()).emit("notificationUpdated", {
        _id: notification._id,
        isRead: true, // Only send updated field
      });
    }

    return notification;
  } catch (error) {
    console.error("Error in markNotificationAsRead service:", error);
    throw error;
  }
};

module.exports = { sendNotification, getUserNotifications, markNotificationAsRead };
