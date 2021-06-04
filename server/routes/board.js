const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getBoards,
  createBoard,
  getBoard,
  updateBoard,
} = require("../controllers/board");

router.route("/").get(protect, getBoards);
router.route("/").post(protect, createBoard);
router.route("/:id").get(protect, getBoard);
router.route("/:id").patch(protect, updateBoard);

module.exports = router;
