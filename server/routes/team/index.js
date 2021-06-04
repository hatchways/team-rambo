const express = require("express");
const { body, param } = require("express-validator");
const protect = require("../../middleware/auth");
const { hasAccessToTeam } = require("../../middleware/team");
const { teamController } = require("../../controllers/teamController");

const router = express.Router();

const inviteRoute = require("./invite");

router.use(protect);

router.use(
  "/:teamId",
  param("teamId").isMongoId().withMessage("Please provide a proper team id"),
  hasAccessToTeam,
  inviteRoute
);

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

// catch express-validation errors;
router.use((error, req, res, next) => {
  const { errors } = error;
  if (errors && Array.isArray(errors)) {
    res.status(400);
    const error = errors[0];
    if (error.nestedErrors) {
      const { msg } = error.nestedErrors[0];
      throw new Error(msg);
    }
    throw new Error(error.msg);
  }
  return next(error);
});

module.exports = router;
