const router = require("express").Router();
const protect = require("../middleware/auth");
const {
  createColumn,
  updateColumn,
  reorderColumn,
  deleteColumn,
} = require("../controllers/column");

router.use(protect);

router.route("/").post(createColumn);
router.route("/:id").patch(updateColumn);
router.route("/:id/reorder").patch(reorderColumn);
router.route("/:id").delete(deleteColumn);
module.exports = router;
