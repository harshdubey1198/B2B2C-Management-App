const Notification = require("../schemas/notification.schema");
const User = require("../schemas/user.schema");
const Item = require("../schemas/inventoryItem.schema");
const Invoice = require("../schemas/invoice.schema");
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

const handleCriticalItemNotification = async (io, itemId) => {
  console.log(`handleCriticalItemNotification called for item: ${itemId}`);

  try {
    const item = await Item.findById(itemId).populate("firmId", "companyTitle adminId");
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

      const usersToNotify = await User.find({
        $or: [
          { _id: item.firmId.adminId, role: "client_admin" },
          { adminId: item.firmId._id, role: { $in: ["firm_admin", "employee"] } } 
        ]
      });

      console.log("Firm Admin ID:", item.firmId._id);
      console.log("Client Admin ID:", item.firmId.adminId);
      console.log("Users to notify:", usersToNotify);

      if (usersToNotify.length === 0) {
        console.log("No users found to notify.");
        return;
      }

      for (const user of usersToNotify) {
        let userNotificationMessage = notificationMessage;

        if (user.role === "client_admin" && item.firmId?.companyTitle) {
          userNotificationMessage = `${item.firmId.companyTitle}: ${notificationMessage}`;
        }

        const newNotification = await Notification.create({
          userId: user._id,
          message: userNotificationMessage,
          type: "stock_alert",
        });

        console.log(`Notification created for ${user.role} - ID: ${user._id}:`, newNotification);

        io.to(user._id.toString()).emit("stockAlert", { message: userNotificationMessage });
      }

      console.log(`Notification sent to firm ${item.firmId.companyTitle} & admin ${item.firmId?.adminId || "undefined"}`);
    } else {
      console.log(`Stock level is sufficient for item: ${item.name}`);
    }
  } catch (error) {
    console.error("Error handling critical item notification:", error);
  }
};


const handleDuePaymentNotification = async (io) => {
  try {
      console.log("Checking for due payment notifications...");

      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      // Fetch invoices where the due date has passed and status is not 'paid'
      const dueInvoices = await Invoice.find({ 
          status: { $in: ['unpaid', 'partially paid'] }, 
          dueDate: { $lte: new Date() } 
      }).populate("firmId", "companyTitle adminId");

      console.log(`Found ${dueInvoices.length} invoices with due payments.`);

      for (const invoice of dueInvoices) {
          if (!invoice?.firmId) {
              console.log(`Skipping invoice ${invoice.invoiceNumber}: No firm details found.`);
              continue;
          }

          const firm = invoice.firmId;

          // Check if a notification for this invoice was already created today
          const existingNotification = await Notification.findOne({
              userId: firm.adminId,
              type: "due_payment",
              relatedId: invoice._id,
              createdAt: { $gte: todayStart, $lte: todayEnd }
          });

          if (existingNotification) {
              console.log(`Notification for Invoice #${invoice.invoiceNumber} already sent today.`);
              continue; // Skip this invoice
          }

          // Get all relevant users (client admin + firm admin & employees)
          const usersToNotify = await User.find({
              $or: [
                  { _id: firm.adminId, role: "client_admin" },
                  { adminId: firm._id, role: { $in: ["firm_admin", "employee"] } }
              ]
          });

          if (usersToNotify.length === 0) {
              console.log(`No users found for due payment notification of Invoice #${invoice.invoiceNumber}`);
              continue;
          }

          for (const user of usersToNotify) {
              let notificationMessage = `Payment due for Invoice #${invoice.invoiceNumber}. Amount Due: ₹${invoice.amountDue}`;

              if (user.role === "client_admin" && firm.companyTitle) {
                  notificationMessage = `${firm.companyTitle}: ${notificationMessage}`;
              }

              const newNotification = await Notification.create({
                  userId: user._id,
                  message: notificationMessage,
                  type: "due_payment",
                  relatedId: invoice._id,
              });

              console.log(`Due Payment Notification Created for ${user.role} - ID: ${user._id}:`, newNotification);

              io.to(user._id.toString()).emit("duePaymentAlert", {
                  message: notificationMessage,
                  invoiceId: invoice._id,
              });

              console.log(`Notification sent to user ${user._id}`);
          }

          console.log(`Due payment notifications processed for Invoice #${invoice.invoiceNumber}`);
      }
  } catch (error) {
      console.error("Error handling due payment notifications:", error);
  }
};




module.exports = {
  handleUserJoin,
  handleNewNotification,
  handleNotificationUpdate,
  handleNotificationDelete,
  handleCriticalItemNotification,
  handleDuePaymentNotification,
};
