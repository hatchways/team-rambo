const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const Board = require("../models/Board");

exports.getBoards = asyncHandler(async (req, res) => {
  const boards = await Board.find();

  return res.json(boards);
});

exports.getBoard = asyncHandler(async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) res.status(404).json({ error: "Board not found" });

    return res.status(200).json(board);
  } catch (error) {
    return res.json(error);
  }
});

// createBoard should be in boards controller + routes instead of users
exports.createBoard = asyncHandler(async (req, res) => {
  // This needs to be fixed according to a non-double-stringified body from frontend
  const { board } = req.body;
  const temp = JSON.parse(board);
  const boardValues = JSON.parse(temp);

  try {
    // @ts-ignore
    const user = await User.findById(req.user.id);

    if (!user) res.status(404).json({ error: "User not found" });

    const newBoard = await Board.create({
      name: boardValues.name,
      columns: boardValues.columns,
      user: user,
    });

    // @ts-ignore
    const boardWithoutPassword = newBoard.removePassword();

    return res.status(200).json(boardWithoutPassword);
  } catch (error) {
    return res.json(error);
  }
});

exports.updateBoard = asyncHandler(async (req, res, next) => {
  // This needs to be fixed according to a non-double-stringified body from frontend
  const { id } = req.params;
  const { board } = req.body;
  const temp = JSON.parse(board);
  const boardValues = JSON.parse(temp);

  try {
    const filter = { _id: id };
    const update = {
      name: boardValues.name,
      columns: boardValues.columns,
    };

    const board = await Board.findOneAndUpdate(filter, update, {
      new: true,
    });

    //@ts-ignore
    const newBoard = board.removePassword();

    return res.status(200).json(newBoard);
  } catch (error) {
    return res.json(error);
  }
});
