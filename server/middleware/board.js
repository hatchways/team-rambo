const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const TeamBoard = require("../models/TeamBoard");

exports.hasAccessToBoard = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(errors);
  const { team } = req;
  const { boardId } = req.params;
  const teamBoard = await TeamBoard.findById(boardId)
    .populate("collaborators")
    .populate("admins")
    .select("-password");

  if (!teamBoard) {
    res.status(404);
    throw new Error("Unable to find team board");
  }

  if (
    team.owner.toString() === req.user.id ||
    teamBoard.user.toString() === req.user.id ||
    teamBoard.getUserType(req.user.id) === "admin" ||
    teamBoard.getUserType(req.user.id) === "collaborator"
  ) {
    req.teamBoard = teamBoard;
    return next();
  }

  res.status(401);
  throw new Error("You do not have access to this board");
});
