const express = require("express");
const { body, param, oneOf } = require("express-validator");
const protect = require("../../../middleware/auth");
const {
  collaboratorController,
} = require("../../../controllers/teamController");

const router = express.Router();

router.use(protect);

router.get("/", collaboratorController.getCollaborators);

router.delete(
  "/:collaboratorId",
  param("collaboratorId")
    .isMongoId()
    .withMessage("Please provide a proper collaborator ID"),
  collaboratorController.removeCollaborator
);

module.exports = router;
