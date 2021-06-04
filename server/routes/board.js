const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getBoards,
  createBoard,
  getBoard,
  updateBoard,
  reOrderBoard,
} = require("../controllers/board");

router.use(protect);
router.route("/").get(getBoards);
router.route("/").post(createBoard);
router.route("/:id").get(getBoard);
router.route("/:id").patch(updateBoard);
router.route("/:id").patch(reOrderBoard);

module.exports = router;
