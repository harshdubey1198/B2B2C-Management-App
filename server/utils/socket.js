const { Server } = require("socket.io");
const mongoose = require("mongoose");
const Notification = require("../schemas/notification.schema");
const User = require("../schemas/user.schema");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinRoom", async (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined notifications room.`);

      try {
        const user = await User.findById(userId).populate({
          path: "notifications",
          model: "Notification",
          options: { sort: { date: -1 } },
        });

        if (user) {
          socket.emit("previousNotifications", user.notifications);
        }
      } catch (error) {
        console.error("Error fetching previous notifications:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  const notificationChangeStream = Notification.watch();

  notificationChangeStream.on("change", async (change) => {
    console.log("MongoDB Change Detected:", change);

    const { operationType, documentKey, fullDocument, updateDescription } = change;

    if (operationType === "insert") {
      const newNotification = fullDocument;
      const { userId, _id } = newNotification;

      try {
        await User.updateOne(
          { _id: userId },
          { $addToSet: { notifications: _id } }
        );

        console.log(`New Notification ID ${_id} added to user ${userId}`);

        io.to(userId.toString()).emit("newNotification", newNotification);
      } catch (error) {
        console.error("Error updating user notifications:", error);
      }
    }

    if (operationType === "update") {
      const updatedFields = updateDescription.updatedFields;
      const notificationId = documentKey._id;

      try {
        const notification = await Notification.findById(notificationId);

        if (notification) {
          console.log(`Updated Notification Fields:`, updatedFields);

          io.to(notification.userId.toString()).emit("notificationUpdated", {
            _id: notificationId,
            ...updatedFields,
          });
        }
      } catch (error) {
        console.error("Error fetching updated notification:", error);
      }
    }

    if (operationType === "delete") {
      const deletedNotificationId = documentKey._id;

      try {
        const affectedUser = await User.findOne({ notifications: deletedNotificationId });

        if (affectedUser) {
          await User.updateOne(
            { _id: affectedUser._id },
            { $pull: { notifications: deletedNotificationId } }
          );

          console.log(`Deleted Notification ID ${deletedNotificationId} removed from user ${affectedUser._id}`);

          io.to(affectedUser._id.toString()).emit("notificationDeleted", {
            _id: deletedNotificationId,
          });
        }
      } catch (error) {
        console.error("Error handling deleted notification:", error);
      }
    }
  });
};

const getSocketInstance = () => io;

module.exports = { initializeSocket, getSocketInstance };
