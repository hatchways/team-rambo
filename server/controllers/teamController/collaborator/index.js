const asyncHandler = require("express-async-handler");
const { Team } = require("../../../models/Team");

/**
 * Get all collaborators for the team.
 * @route GET /team/:teamId/collaborators
 * @returns {Object} A message and payload
 */
exports.getCollaborators = asyncHandler(async (req, res, next) => {
  const { collaborators } = await Team.findOne({ _id: req.team._id })
    .populate("collaborators")
    .select("-password");

  return res.status(200).json(collaborators);
});

/**
 * Removes a collaborator from the team.
 * @route DELETE /team/:teamId/collaborators/:userId
 * @returns {Object} A message and payload
 */
exports.removeCollaborator = asyncHandler(async (req, res, next) => {
  const { collaboratorId } = req.params;
  const { team } = req;

  const isOwner = team.owner.toString() === req.user.id;

  if (isOwner || collaboratorId === req.user.id) {
    const collaboratorIndex = team.collaboratorIndexPosition(collaboratorId);
    if (collaboratorIndex > -1) {
      await team.transferBoardsOwnership(collaboratorId, team.owner);

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
