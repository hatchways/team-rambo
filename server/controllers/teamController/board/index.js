const asyncHandler = require("express-async-handler");
const TeamBoard = require("../../../models/TeamBoard");

/**
 * Create a team board
 * @route POST /team/:teamId/boards
 * @returns {Object} The team board resource
 */
exports.createTeamBoard = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const teamBoard = await TeamBoard.create({
    name,
    user: req.user.id,
  });

  return res.status(200).json({
    message: "Team board created!",
    payload: teamBoard,
  });
});

/**
 * Get a team board by id
 * @route GET /team/:teamId/boards/:boardId
 * @returns {Object} The team board resource
 */
exports.getTeamBoard = asyncHandler(async (req, res, next) => {
  return res.status(200).json(req.teamBoard);
});

/**
 * Add a collaborator or administrator to the team board.
 * @route POST /team/:teamId/boards/:boardId/collaborators/new
 * @returns {Object} A success message or error
 */
exports.addUserToBoard = asyncHandler(async (req, res, next) => {
  const { team, teamBoard } = req;
  let { isAdmin, userId } = req.body;

  if (userId === req.user.id) {
    res.status(400);
    throw new Error("You're already a part of the board");
  }

  if (team.owner.toString() === userId) {
    res.status(200);
    throw new Error("This user has access to this board already");
  }

  const isOwner =
    teamBoard.user === req.user.id || team.owner.toString() === req.user.id;

  if (isOwner) {
    const notInBoard = await teamBoard.addCollaborator(userId, isAdmin);
    if (!notInBoard) {
      return res.status(200).json({ message: "Collaborator already in board" });
    }
    return res.status(200).json({ message: "Collaborator added" });
  }

  res.status(401);
  throw new Error("You cannot perform this task");
});

exports.removeUserFromBoard = asyncHandler(async (req, res, next) => {});
