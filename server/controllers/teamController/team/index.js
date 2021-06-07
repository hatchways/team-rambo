const asyncHandler = require("express-async-handler");
const { Team } = require("../../../models/Team");

/**
 * Create a new Team resource and store in the database.
 * @route POST /team
 * @returns {Object} A message and payload
 */
exports.createTeam = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const team = await Team.create({
    name,
    owner: req.user.id,
  });

  return res.status(200).json({
    message: "Team created successfully!",
    payload: team,
  });
});

/**
 * Gets a list of users available teams
 * @route GET /team
 * @returns {Array} A list of users team resources
 */
exports.getUsersTeams = asyncHandler(async (req, res, next) => {
  const teams = await Team.find(
    {
      $or: [{ owner: req.user.id }, { collaborators: req.user.id }],
    },
    "name" // only interested in the name as this route will be used for showing the users teams by name.
  );

  return res.status(200).json(teams);
});

/**
 * Gets the Team by ID, otherwise returns null.
 * @route GET /team/:teamId
 * @returns {Object} The team
 */
exports.getTeam = asyncHandler(async (req, res, next) => {
  return res.status(200).json(req.team);
});

/**
 * Update teams (only name)
 *
 * We only allow updating name for Team here because edits to linked resources must happen with their relationship modal methods.
 * @route PATCH /team/:teamId
 * @returns {Object} The updated team
 */
exports.updateTeam = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  const team = await Team.findOneAndUpdate(
    { _id: req.params.teamId, owner: req.user.id },
    { name }
  );

  // middleware handles if a team doesn't exist, so if team is null then user is not the owner.
  if (!team) {
    res.status(400);
    throw new Error("You cannot perform this task");
  }

  return res.status(200).json(team);
});

/**
 * Deletes a team from the database.
 *
 * @route DELETE /team/:teamId
 * @returns {Object} The updated team
 */
exports.deleteTeam = asyncHandler(async (req, res, next) => {
  const { team } = req;

  const isOwner = team.owner.toString() === req.user.id;

  if (isOwner) {
    await team.remove();
    return res.status(200).json({ message: "Team deleted" });
  }

  res.status(400);
  throw new Error("You cannot perform this task");
});
