const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  updateCard,
  deleteCard,
  getCard,
  copyCard,
  moveCard,
} = require("../controllers/card");

//router.use(protect);

router.route("/:id").get(getCard);
router.route("/:id").patch(updateCard);
router.route("/:id/copyCard").post(copyCard);
router.route("/:id/moveCard").patch(moveCard);
router.route("/:id").delete(deleteCard);

module.exports = router;
