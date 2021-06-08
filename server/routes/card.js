const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { updateCard, deleteCard, getCard } = require("../controllers/card");

router.use(protect);

router.route("/:id").get(getCard);
router.route("/:id").patch(updateCard);
router.route("/:id").delete(deleteCard);

module.exports = router;
