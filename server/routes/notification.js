const express = require("express");
const protect = require("../middleware/auth");
const router = express.Router();
const {
  newNotification,
  getAllNotifications,
  getUnreadNotifications,
  setNotificationAsRead,
} = require("../controllers/notification");

router.route("/new").post(newNotification);
router.route("/all").get(protect, getAllNotifications);
router.route("/unread").get(protect, getUnreadNotifications);
router.route("/set").patch(protect, setNotificationAsRead);

module.exports = router;
