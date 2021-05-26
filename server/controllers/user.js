const { User } = require("../models/User");
const { Board } = require("../models/Board");
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

  res.status(200).json({ users: users });
});

exports.createBoard = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const newBoard = await Board.create({
    name: name,
    columns: [
      {
        name: "In progress",
        cards: [],
        createdAt: Date.now(),
      },
      {
        name: "Completed",
        cards: [],
        createdAt: Date.now(),
      },
    ],
    user: req.user.id,
  });

  return res.status(200).json({ board: newBoard });
});

exports.getUserBoards = asyncHandler(async (req, res, next) => {
  const boards = await Board.find({ user: req.user.id });

  return res.status(200).send({ boards: boards });
});
