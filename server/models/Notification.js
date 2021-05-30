const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  Notification: mongoose.model("notification", notificationSchema),
  notificationSchema,
};
