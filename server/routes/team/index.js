const express = require("express");
const protect = require("../../../middleware/auth");
const router = express.Router();

const teamRoute = require('./team/team');

router.use(protect);

router.route('/').use(teamRoute);

module.exports = router;
