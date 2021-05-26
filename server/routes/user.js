const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { searchUsers, getUserBoards } = require("../controllers/user");

// A `/` route typically is an index
// If searching users, should consider either a :id, or string query=...
router.route("/").get(protect, searchUsers);
router.route("/board").get(protect, getUserBoards);

module.exports = router;
