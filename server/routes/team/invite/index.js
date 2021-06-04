const express = require("express");
const { body, param } = require("express-validator");
const protect = require("../../../middleware/auth");
const { hasAccessToTeam } = require("../../../middleware/team");
const { teamController } = require("../../../controllers/team");

const router = express.Router();

router.use(protect);
router.post(
  "/",
  body("name").not().isEmpty().withMessage("Name must not be empty"),
  teamController.createTeam
);

router.get(
  "/:teamId",
  hasAccessToTeam,
  param("teamId").isMongoId().withMessage("Please provide a valid ID"),
  teamController.getTeam
);

module.exports = router;
