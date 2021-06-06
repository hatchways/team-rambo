const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createBoard,
  getBoard,
  updateBoard,
  reorderBoard,
  deleteBoard,
} = require("../controllers/board");

router.use(protect);

router.route("/").post(createBoard);
router.route("/:id").get(getBoard);
router.route("/:id").patch(updateBoard);
router.route("/:id/reorder").patch(reorderBoard);
router.route(":id").delete(deleteBoard);

module.exports = router;
