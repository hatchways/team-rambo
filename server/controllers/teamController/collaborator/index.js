const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { Team } = require("../../../models/Team");

/**
 * Get all collaborators for the team.
 * @route GET /team/:teamId/collaborators
 * @returns {Object} A message and payload
 */
exports.getCollaborators = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(errors);

  const { collaborators } = await req.team.populate("collaborators");

  return res.status(200).json(collaborators);
});

/**
 * Removes a collaborator from the team.
 * @route DELETE /team/:teamId/collaborators/:userId
 * @returns {Object} A message and payload
 */
exports.removeCollaborator = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(errors);
  const { team } = req;

  const isOwner = team.owner === req.user.id;

  if (isOwner) {
    const collaboratorIndex = team.collaborators.indexOf(req.params.userId);
    if (collaboratorIndex > -1) {
      team.collaborators.splice(collaboratorIndex, 1);
      await team.save();

      return res.status(200).json({
        message: "Collaborator removed",
      });
    }

    res.status(404);
    throw new Error("Collaborator not in team");
  }

  res.status(401);
  throw new Error("You cannot perform this task");
});
