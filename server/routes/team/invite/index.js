const express = require("express");
const { body, param, oneOf } = require("express-validator");
const protect = require("../../../middleware/auth");
const { inviteController } = require("../../../controllers/teamController");

const router = express.Router();

router.use(protect);

router.post(
  "/invite",
  body("recipient").not().isEmpty().withMessage("Recipient must not be empty"),
  body("recipient")
    .isMongoId()
    .withMessage("Please provide a proper ID for recipient"),
  inviteController.createInvite
);

router.get(
  "/invite/:inviteId",
  param("inviteId").isMongoId().withMessage("Please provide a valid ID"),
  inviteController.getInvite
);

router.get("/invites", inviteController.getActiveInvites);

router.get(
  "/invite/:inviteId/accept",
  param("inviteId").isMongoId().withMessage("Please provide a valid ID"),
  inviteController.acceptInvite
);

router.delete(
  "/invite/:inviteId/revoke",
  param("inviteId").isMongoId().withMessage("Please provide a valid ID"),
  inviteController.revokeInvite
);

module.exports = router;
