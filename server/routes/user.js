const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  searchUsers,
  createBoard,
  getUserBoards,
} = require("../controllers/user");

router.route("/").get(protect, searchUsers);

router.route("/board").post(protect, createBoard);
router.route("/board").get(protect, getUserBoards);

module.exports = router;
