const express = require("express");
const { getUserNotifications, markNotificationAsRead } = require("../controllers/notification.controller");

const router = express.Router();

router.get("/:userId", getUserNotifications);

router.put("/read/:notificationId", markNotificationAsRead);

module.exports = router;
