const router = require("express").Router();
const protect = require("../middleware/auth");
const {
  createColumn,
  updateColumn,
  deleteColumn,
  swapCards,
} = require("../controllers/column");

router.use(protect);

router.route("/:boardId/columns/").post(createColumn);
router.route("/:boardId/columns/:id").patch(updateColumn);
router.route("/:boardId/columns/:id").delete(deleteColumn);
router.route("/columns/batch/swapCards").patch(swapCards);

module.exports = router;
