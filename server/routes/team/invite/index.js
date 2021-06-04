const express = require("express");
const { body, param, oneOf } = require("express-validator");
const protect = require("../../../middleware/auth");
const { inviteController } = require("../../../controllers/teamController");

const router = express.Router();

router.use(protect);

router.post(
  "/invite",
  body("recipient").not().isEmpty().withMessage("Recipient must not be empty"),
  oneOf([
    body("recipient")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a proper email address or ID"),
    body("recipient")
      .isMongoId()
      .withMessage("Please provide a proper email address or ID"),
  ]),
  body("sender").isMongoId().withMessage("Please provide a proper sender id"),
  inviteController.createInvite
);

router.get(
  "/invite/:inviteId",
  param("inviteId").isMongoId().withMessage("Please provide a valid ID"),
  inviteController.getInvite
);

router.delete(
  "/invite/:inviteId/revoke",
  param("inviteId").isMongoId().withMessage("Please provide a valid ID"),
  inviteController.revokeInvite
);

module.exports = router;
