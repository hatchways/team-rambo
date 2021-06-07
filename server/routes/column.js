const router = require("express").Router();
const protect = require("../middleware/auth");
const {
  createColumn,
  updateColumn,
  reorderColumn,
  deleteColumn,
  renameColumn,
  createColumnCard,
} = require("../controllers/column");

// router.use(protect);

router.route("/").post(createColumn);
router.route("/:id").patch(updateColumn);
router.route("/:id/reorder").patch(reorderColumn);
router.route("/:id/rename").patch(renameColumn);
router.route("/:id").delete(deleteColumn);
router.route("/:id/addCard").patch(createColumnCard);
module.exports = router;
