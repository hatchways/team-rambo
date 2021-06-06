const asyncHandler = require("express-async-handler");
const Board = require("../models/Board");

exports.getBoard = asyncHandler(async (req, res) => {
  const board = await Board.findOne({ _id: req.params.id }).populate({
    path: "columns",
    populate: {
      path: "cards",
      model: "card",
    },
  });

  if (!board) {
    res.status(404);
    throw new Error("Board not found");
  }

  return res.status(200).json(board);
});

exports.createBoard = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const newBoard = await Board.create({
    name,
    user: req.user.id,
  });

  if (!newBoard) {
    res.status(400);
    throw new Error("Board could not be created.");
  }

  await newBoard.createTemplateBoard();
  await newBoard.save();

  return res.status(200).json(
    await Board.populate(newBoard, {
      path: "columns",
      populate: {
        path: "cards",
      },
    })
  );
});

exports.updateBoard = asyncHandler(async (req, res) => {
  /* Leaving this open to whatever udpates we want in the request body, but maybe it just needs to be name? */
  const update = req.body;
  const { id } = req.params;

  const board = await Board.findOneAndUpdate(id, update, {
    new: true,
  }).populate({ path: "columns" });

  if (!board) {
    res.status(404);
    throw new Error("Board not found");
  }
  await board.save();
  return res.status(200).json(board);
});

exports.deleteBoard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedBoard = await Board.findOneAndDelete(
    { _id: id },
    function (err) {
      if (err) {
        res.status(404);
        throw new error("Board not found!");
      }
    }
  );

  return res.status(200).json(deletedBoard);
});

exports.reorderBoard = asyncHandler(async (req, res) => {
  //to be completed
  return;
});
