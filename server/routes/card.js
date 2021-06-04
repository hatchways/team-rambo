const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getCards,
  createCard,
  getCard,
  updateCard,
} = require("../controllers/card");

router.route("/").get(protect, getCards);
router.route("/").post(protect, createCard);
router.route("/:id").get(protect, getCard);
router.route("/:id").patch(protect, updateCard);

module.exports = router;
