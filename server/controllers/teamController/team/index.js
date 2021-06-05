const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { Team } = require("../../../models/Team");

/**
 * Create a new Team resource and store in the database.
 * @route POST /team
 * @returns {Object} A message and payload
 */
exports.createTeam = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(errors);

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
 * Gets the Team by ID, otherwise returns null.
 * @route GET /team
 * @returns {Array} A list of users team resources
 */
exports.getUsersTeams = asyncHandler(async (req, res, next) => {
  const teams = await Team.find({ owner: req.user.id })
    .populate("collaborator")
    .select("-password");

  return res.status(200).json(teams);
});

/**
 * Gets the Team by ID, otherwise returns null.
 * @route GET /team/:teamId
 * @returns {Object} The team
 */
exports.getTeam = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(errors);

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(errors);

  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }
  const team = await Team.findOneAndUpdate(
    { _id: req.params.teamId, owner: req.user.id },
    { name }
  );

  return res.status(200).json(team);
});
