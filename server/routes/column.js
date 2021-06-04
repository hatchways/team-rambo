const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getColumns,
  createColumn,
  getColumn,
  updateColumn,
} = require("../controllers/column");

router.route("/").get(protect, getColumns);
router.route("/").post(protect, createColumn);
router.route("/:id").get(protect, getColumn);
router.route("/:id").patch(protect, updateColumn);

module.exports = router;
