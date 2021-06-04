const express = require("express");
const { body, param } = require("express-validator");
const protect = require("../../../middleware/auth");
const { inviteController } = require("../../../controllers/team");

const router = express.Router();

router.use(protect);

router.post(
  "/",
  param("team").isMongoId().withMessage("Please provide a proper team id"),
  body("recipient").not().isEmpty().withMessage("Name must not be empty"),
  body("recipient")
    .isEmail()
    .isMongoId()
    .withMessage("Name must be an email or proper id"),
  body("sender").isMongoId().withMessage("Please provide a proper sender id"),
  inviteController.createInvite
);

module.exports = router;
