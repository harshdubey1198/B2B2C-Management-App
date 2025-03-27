const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["stock_alert", "invoice","due_payment", "payment", "other","system"], default: "other" },
    date: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
