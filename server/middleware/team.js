const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { Team } = require("../models/Team");

exports.hasAccessToTeam = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(errors);

  const { teamId } = req.params;
  const team = await Team.findById(teamId)
    .populate("collaborators")
    .populate("boards")
    .populate({
      path: "invites",
      populate: {
        path: "recipient",
        select: "-password",
      },
    })
    .select("-password");

  if (!team) {
    res.status(404);
    throw new Error("Unable to find team");
  }
  if (
    team.owner == req.user.id ||
    team.collaboratorIndexPosition(req.user.id) > -1
  ) {
    req.team = team;
    return next();
  }

  // need to think of a cleaner way to do this, perhaps a regular expression to match the req.path but for now this will suffice.
  // Only bypass if accepting invite to become a collaborator.
  if (req.path.startsWith("/invite") && req.path.endsWith("/accept")) {
    req.team = team;
    return next();
  }

  res.status(401);
  throw new Error("You are not a part of this team");
});
