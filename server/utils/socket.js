const { Server } = require("socket.io");
const { handleUserJoin, handleNewNotification, handleNotificationUpdate, handleNotificationDelete ,handleCriticalItemNotification} = require("../services/socket.services");
const Notification = require("../schemas/notification.schema");
const Item = require("../schemas/inventoryItem.schema");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinRoom", (userId) => handleUserJoin(socket, userId));

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  const notificationChangeStream = Notification.watch();
  
  notificationChangeStream.on("change", async (change) => {
    console.log("MongoDB Change Detected:", change);
    
    const { operationType, documentKey, fullDocument, updateDescription } = change;

    if (operationType === "insert") {
      handleNewNotification(io, fullDocument);
    } else if (operationType === "update") {
      handleNotificationUpdate(io, updateDescription, documentKey);
    } else if (operationType === "delete") {
      handleNotificationDelete(io, documentKey);
    }
  });
};

const inventoryChangeStream = Item.watch();
inventoryChangeStream.on("change", async (change) => {
    console.log("Inventory Change Detected:", JSON.stringify(change, null, 2)); 

    const { operationType, documentKey, updateDescription } = change;

    if (operationType === "update" && updateDescription.updatedFields?.quantity !== undefined)
      {
        console.log(`Detected stock quantity update for item ${documentKey._id}:`, updateDescription.updatedFields);
        await handleCriticalItemNotification(io, documentKey._id);
    }
});

const getSocketInstance = () => io;

module.exports = { initializeSocket, getSocketInstance };
