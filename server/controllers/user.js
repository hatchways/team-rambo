const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const Board = require("../models/Board");

// @route POST /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res) => {
  const searchString = req.query.search;

  try {
    const users = await User.find({
      email: { $regex: searchString, $options: "i" },
    });

    if (!users) {
      res.status(404);
      throw new Error("No users found in search");
    }

    return res.status(200).json({ users: users });
  } catch (error) {
    return res.json(error);
  }
});

exports.getUserBoards = asyncHandler(async (req, res) => {
  try {
    // @ts-ignore
    const user = await User.findById(req.user.id);

    if (!user) res.status(404).json({ error: "User not found" });

    const boards = await Board.find({ "user._id": user._id });

    if (!boards) res.status(404).json({ error: "No boards for the that user" });

    //@ts-ignore
    const boardsWithoutPassword = boards.map((board) => board.removePassword());

    return res.status(200).send({ boards: boardsWithoutPassword });
  } catch (error) {
    return res.json(error);
  }
});
