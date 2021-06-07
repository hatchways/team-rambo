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

  return res.status(200).json({ users: users });
});

exports.getUserBoards = asyncHandler(async (req, res, next) => {
  //@ts-ignore
  const boards = await Board.find({ user: req.user.id }).populate({
    path: "columns",
    populate: {
      path: "cards",
      model: "card",
    },
  });
  /* If no no boards, create a single template board */
  if (!boards) {
    const newBoard = await Board.create().createTemplateBoard();
    boards.push(newBoard);
    await boards.populate();
  }

  return res.status(200).send({ boards: boards });
});
