const notificationService = require("../services/notification.service");

/**
 * Controller to send a new notification
 */
const sendNotification = async (req, res) => {
  try {
    const { userId, message, type } = req.body;
    const notification = await notificationService.sendNotification({ userId, message, type });

    return res.status(201).json({
      message: "Notification sent successfully",
      notification,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return res.status(500).json({ error: error.message || "Failed to send notification" });
  }
};

/**
 * Controller to get user notifications
 */
const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await notificationService.getUserNotifications(userId);

    return res.status(200).json({
      message: "Notifications fetched successfully",
      data: notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({ error: error.message || "Failed to fetch notifications" });
  }
};

/**
 * Controller to mark a notification as read
 */
const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await notificationService.markNotificationAsRead(notificationId);

    return res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return res.status(500).json({ error: error.message || "Failed to update notification" });
  }
};

module.exports = { sendNotification, getUserNotifications, markNotificationAsRead };
