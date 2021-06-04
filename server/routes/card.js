const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getCards,
  createCard,
  getCard,
  updateCard,
} = require("../controllers/card");

router.use(protect);

router.route("/").get(getCards);
router.route("/").post(createCard);
router.route("/:id").get(getCard);
router.route("/:id").patch(updateCard);

module.exports = router;
