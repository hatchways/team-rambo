const router = require("express").Router();
const protect = require("../middleware/auth");
const {
  updateColumn,
  swapCardsInColumn,
  swapCardsOutsideColumn,
  reorderColumn,
  renameColumn,
  createColumnCard,
  deleteColumnCard,
} = require("../controllers/column");

// router.use(protect);

router.route("/:id").patch(updateColumn);
router.route("/:id/swapCardsInColumn").patch(swapCardsInColumn);
router.route("/:id/swapCardsOutsideColumn").patch(swapCardsOutsideColumn);
router.route("/:id/reorder").patch(reorderColumn);
router.route("/:id/rename").patch(renameColumn);
router.route("/:id/addCard").patch(createColumnCard);
router.route("/:id/removeCard").delete(deleteColumnCard);
module.exports = router;
