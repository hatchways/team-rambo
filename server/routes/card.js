const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createCard,
  updateCard,
  updateDate,
  deleteCard,
  copyCard,
  moveCard,
} = require("../controllers/card");

router.use(protect);

router.route("/:boardId/columns/:columnId/cards/").post(createCard);
router.route("/:boardId/columns/:columnId/cards/:id").patch(updateCard);
router.route("/:boardId/columns/:columnId/cards/:id").delete(deleteCard);
router.route("/:boardId/columns/:columnId/cards/:id/copyCard").post(copyCard);
router.route("/:boardId/columns/:columnId/cards/:id/moveCard").patch(moveCard);
router
  .route("/:boardId/columns/:columnId/cards/:id/updateDate")
  .patch(updateDate);

module.exports = router;
