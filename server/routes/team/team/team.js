const express = require("express");
const protect = require("../../../middleware/auth");
const {
  teamController
} = require('../../../controllers/team');

const router = express.Router();

/*
  We check if the user has access to the team they are trying to access. If they do proceed otherwise, return a unauthorized
*/
router.use(protect);
router.use(hasAccessToTeam);

// router.route('/').post(createTeam);
router.route("/:teamId").get(teamController.getTeam);

module.exports = router;
