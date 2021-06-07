const asyncHandler = require("express-async-handler");
const TeamBoard = require("../../../models/TeamBoard");

/**
 * Create a team board
 * @route POST /team/:teamId/boards
 * @returns {Object} The team board resource
 */
exports.createTeamBoard = asyncHandler(async (req, res, next) => {
  const { team } = req;
  const { name } = req.body;
  const teamBoard = await TeamBoard.create({
    name,
    user: req.user.id,
  });

  team.boards.push(teamBoard.id);
  await team.save();

  return res.status(200).json({
    message: `Created board ${name}`,
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
 * Remove a board by it's id
 * @route DELETE /team/:teamId/boards/:boardId
 * @returns {Object} A success message or error
 */
exports.removeBoard = asyncHandler(async (req, res, next) => {
  const { team, teamBoard } = req;

  if (
    team.owner.toString() === req.user.id ||
    teamBoard.user.toString() === req.user.id
  ) {
    team.removeBoard(teamBoard.id).then(() => teamBoard.remove());
    return res.status(200).json({ message: `Deleted ${teamBoard.name}` });
  }

  res.status(401);
  throw new Error("You cannot perform this task");
});

/**
 * Add a collaborator or administrator to the team board.
 * @route POST /team/:teamId/boards/:boardId/collaborators
 * @returns {Object} A success message or error
 */
exports.addUserToBoard = asyncHandler(async (req, res, next) => {
  const { team, teamBoard } = req;
  let { isAdmin, user } = req.body;

  if (user === req.user.id) {
    res.status(400);
    throw new Error("You're already a part of the board");
  }

  if (team.owner.toString() === user || teamBoard.user.toString() === user) {
    res.status(400);
    throw new Error("This user has access to this board already");
  }

  const isOwner =
    teamBoard.user === req.user.id || team.owner.toString() === req.user.id;

  if (isOwner) {
    const notInBoard = await teamBoard.addCollaborator(user, isAdmin);
    if (!notInBoard) {
      return res.status(200).json({ message: "Collaborator already in board" });
    }
    return res.status(200).json({ message: "Collaborator added" });
  }

  res.status(401);
  throw new Error("You cannot perform this task");
});

/**
 * Remove an admin or collaborator from the team board
 * @route DELETE /team/:teamId/boards/:boardId/collaborators/:user
 * @returns {Object} Success message or error
 */
exports.removeUserFromBoard = asyncHandler(async (req, res, next) => {
  const { team, teamBoard } = req;
  const { user } = req.params;
  const ownsBoard = req.user.id === teamBoard.user;
  const collaboratorType = teamBoard.getUserType(user);

  if (!collaboratorType) {
    res.status(404);
    throw new Error("That collaborator is not in the board");
  }

  // admins can only be removed by board owner or team owner
  if (
    collaboratorType === "admin" &&
    (ownsBoard || team.owner.toString() === req.user.id)
  ) {
    await teamBoard.removeAdmin(user);
    return res
      .status(200)
      .json({ message: `Admin removed from board ${teamBoard.name}` });
  }

  const callerIsAdmin = teamBoard.getUserType(req.user.id) === "admin";

  if (
    collaboratorType === "collaborator" &&
    (callerType === "admin" ||
      callerIsAdmin ||
      ownsBoard ||
      team.owner.toString() === req.user.id)
  ) {
    await teamBoard.removeCollaborator(user);
    return res
      .status(200)
      .json({ message: `Collaborator removed from board ${teamBoard.name}` });
  }

  res.status(400);
  throw new Error("You cannot perform this task");
});
