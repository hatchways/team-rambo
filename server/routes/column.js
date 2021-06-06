const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getColumns,
  createColumn,
  getColumn,
  updateColumn,
  reorderColumn,
  deleteColumn,
} = require("../controllers/column");

router.use(protect);

router.route("/").get(getColumns);
router.route("/").post(createColumn);
router.route("/:id").get(getColumn);
router.route("/:id").patch(updateColumn);
router.route("/:id/reorder").patch(reorderColumn);
router.route("/:id").delete(deleteColumn);
module.exports = router;
