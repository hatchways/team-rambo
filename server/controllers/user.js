const { User } = require("../models/User");
const Board = require("../models/Board");
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
  const user = await User.findById(req.user.id);

  const newBoard = await Board.create({
    name: "My board",
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
    user: user,
  });

  const boardWithoutPassword = newBoard.removePassword();
  return res.status(200).json({ boards: boardWithoutPassword });
});

exports.getUserBoards = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const boards = await Board.find({ "user._id": user._id });

  const boardsWithoutPassword = boards.map((board) => board.removePassword());

  return res.status(200).send({ boards: boardsWithoutPassword });
});
