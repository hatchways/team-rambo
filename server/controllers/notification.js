const { Notification } = require("../models/Notification");
const asyncHandler = require("express-async-handler");

exports.newNotification = asyncHandler(async (req, res) => {
  const { type, title, description, link, user } = req.body;

  const newNotification = await Notification.create({
    type: type,
    title: title,
    description: description,
    link: link,
    user: user,
  });

  if (newNotification) return res.status(200).json({ data: newNotification });

  res.status(400);
  throw new Error("Notification could not be created!");
});

exports.getAllNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id });

  return res.status(200).json({ data: notifications });
});

exports.getUnreadNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    read: false,
    user: req.user.id,
  });

  return res.status(200).json({ data: notifications });
});

exports.setNotificationAsRead = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const notification = await Notification.findOneAndUpdate(
    { _id: id },
    {
      $set: { read: true },
    },
    { new: true }
  );

  if (notification) return res.status(200).json({ data: notification });

  throw new Error("Could not find a notification to update!");
});
