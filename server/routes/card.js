const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { createCard, updateCard, deleteCard } = require("../controllers/card");

router.use(protect);

router.route("/").post(createCard);
router.route("/:id").patch(updateCard);
router.route("/:id").delete(deleteCard);

module.exports = router;
