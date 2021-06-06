const { User } = require("../models/User");
const Board = require("../models/Board");
const { Invite } = require("../models");
const asyncHandler = require("express-async-handler");

// @route POST /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const searchString = req.query.search;

  let users;
  if (searchString) {
    users = await User.find({
      email: { $regex: searchString, $options: "i" },
    });
  }

  if (!users) {
    res.status(404);
    throw new Error("No users found in search");
  }

  return res.status(200).json({ users: users });
});

exports.getUserBoards = asyncHandler(async (req, res, next) => {
  //@ts-ignore
  const boards = await Board.find({ user: req.user.id });

  return res.status(200).send({ boards: boards });
});

/**
 * Get the authenticated user's outstanding invites.
 *
 * Note: we only return the name because the user is not a part of the team and shouldn't be able to see the full team object in the network response.
 * @route GET /users/invites
 * @returns {Array} List of invite resources
 */
exports.getUsersInvites = asyncHandler(async (req, res, next) => {
  const invites = await Invite.find({ recipient: req.user.id }).populate(
    "team",
    "name"
  );

  return res.status(200).json(invites);
});
