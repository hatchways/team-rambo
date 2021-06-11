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

exports.setProfilePicture = asyncHandler(async (req, res) => {
  if (!req.picture) return res.status(404).send("Picture not found");

  const picture = { url: req.picture.url };

  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    { $set: { picture: picture } },
    { new: true }
  );

  if (user) return res.status(200).send({ picture });

  return res.status(400).send({ error: "Could not retrieve user!" });
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

  return res.status(200).send({ boards });
});
