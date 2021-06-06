const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  searchUsers,
  getUserBoards,
  getUsersInvites,
} = require("../controllers/user");

router.use(protect);

router.route("/").get(searchUsers);
router.route("/board").get(getUserBoards);
router.route("/invites").get(getUsersInvites);

module.exports = router;
