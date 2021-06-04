const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getColumns,
  createColumn,
  getColumn,
  updateColumn,
  reOrderColumn,
} = require("../controllers/column");

router.use(protect);

router.route("/").get(getColumns);
router.route("/").post(createColumn);
router.route("/:id").get(getColumn);
router.route("/:id").patch(updateColumn);
router.route("/:id").patch(reOrderColumn);

module.exports = router;
