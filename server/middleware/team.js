const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { Team } = require("../models/Team");

exports.hasAccessToTeam = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(errors);

  const { teamId } = req.params;
  const team = await Team.findOne({ _id: teamId });

  if (!team) {
    res.status(400);
    throw new Error("Unable to find team");
  }
  if (team.owner == req.user.id || team.collaborators.includes(req.user.id)) {
    req.team = team;
    return next();
  }

  res.status(401);
  throw new Error("You are not invited to this team");
});
