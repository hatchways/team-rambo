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

router.patch(
  "/:teamId",
  hasAccessToTeam,
  param("teamId").isMongoId().withMessage("Please provide a valid ID"),
  body("name").not().isEmpty().withMessage("Name must noy be empty"),
  teamController.updateTeam
);

router.use((error, req, res, next) => {
  const { errors } = error;
  if (errors && Array.isArray(errors)) {
    const { msg } = errors[0];
    res.status(400);
    throw new Error(msg);
  }
  return next(error);
});

module.exports = router;
