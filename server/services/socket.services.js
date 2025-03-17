const Notification = require("../schemas/notification.schema");
const User = require("../schemas/user.schema");
const Item = require("../schemas/inventoryItem.schema");

const handleUserJoin = async (socket, userId) => {
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
};

const handleNewNotification = async (io, newNotification) => {
  const { userId, _id } = newNotification;

  try {
    await User.updateOne({ _id: userId }, { $addToSet: { notifications: _id } });
    console.log(`New Notification ID ${_id} added to user ${userId}`);

    io.to(userId.toString()).emit("newNotification", newNotification);
  } catch (error) {
    console.error("Error updating user notifications:", error);
  }
};

const handleNotificationUpdate = async (io, updateDescription, documentKey) => {
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
};

const handleNotificationDelete = async (io, documentKey) => {
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
};

// const handleCriticalItemNotification = async (io, itemId) => {
//     console.log(`handleCriticalItemNotification called for item: ${itemId}`);

//     try {
//         const item = await Item.findById(itemId);
//         if (!item) {
//             console.log(`No item found for ID: ${itemId}`);
//             return;
//         }

//         console.log(`Item found: ${item.name}, Quantity: ${item.quantity}`);

//         // Extract stock levels from the `criticalStockAlerts` array
//         const [outOfStock, lowStock, criticalStock] = item.criticalStockAlerts || [0, 2, 5];

//         if (item.quantity <= criticalStock) {
//             console.log(`Stock is critical for item: ${item.name} - Quantity: ${item.quantity}`);

//             let notificationMessage = `Warning! Item "${item.name}" stock is at ${item.quantity}.`;
//             if (item.quantity === outOfStock) {
//                 notificationMessage = `Alert! Item "${item.name}" is out of stock.`;
//             } else if (item.quantity <= lowStock) {
//                 notificationMessage = `Caution! Item "${item.name}" is in low stock (${item.quantity} left).`;
//             }

//             console.log(`Backend Log: ${notificationMessage}`); // Log message here

//             // Emit real-time alert
//             io.emit("stockAlert", { message: notificationMessage });
//         } else {
//             console.log(`Stock level is sufficient for item: ${item.name}`);
//         }
//     } catch (error) {
//         console.error("Error handling critical item notification:", error);
//     }
// };

const handleCriticalItemNotification = async (io, itemId) => {
    console.log(`handleCriticalItemNotification called for item: ${itemId}`);

    try {
        const item = await Item.findById(itemId);
        if (!item) {
            console.log(`No item found for ID: ${itemId}`);
            return;
        }

        console.log(`Item found: ${item.name}, Quantity: ${item.quantity}`);

        const [outOfStock, lowStock, criticalStock] = item.criticalStockAlerts || [0, 2, 5];

        if (item.quantity <= criticalStock) {
            console.log(`Stock is critical for item: ${item.name} - Quantity: ${item.quantity}`);

            let notificationMessage = `Warning! Item "${item.name}" stock is at ${item.quantity}.`;
            if (item.quantity === outOfStock) {
                notificationMessage = `Alert! Item "${item.name}" is out of stock.`;
            } else if (item.quantity <= lowStock) {
                notificationMessage = `Caution! Item "${item.name}" is in low stock (${item.quantity} left).`;
            }

            console.log(`Backend Log: ${notificationMessage}`);

            // **Find users linked to the item's firmId & adminId**
            const usersToNotify = await User.find({ 
                adminId: item.firmId, 
            });

            for (const user of usersToNotify) {
                await Notification.create({
                    userId: user._id,
                    message: notificationMessage,
                    type: "stock_alert",
                });

                io.to(user._id.toString()).emit("stockAlert", { message: notificationMessage });
            }

            console.log(`Notification sent to users of firm ${item.firmId} & admin ${item.adminId}`);
        } else {
            console.log(`Stock level is sufficient for item: ${item.name}`);
        }
    } catch (error) {
        console.error("Error handling critical item notification:", error);
    }
};


module.exports = {
  handleUserJoin,
  handleNewNotification,
  handleNotificationUpdate,
  handleNotificationDelete,
  handleCriticalItemNotification,
};
