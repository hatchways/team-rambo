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

  // const newBoard = await Board.create({
  //   name,
  //   user: req.user.id,
  // });

  // For testing with postman
  const newBoard = await Board.create({
    name,
    user: "60b91df75edef24420936968",
  });

  if (!newBoard) {
    res.status(400);
    throw new Error("Board could not be created.");
  }

  await newBoard.createTemplateBoard();

  return res.status(200).json(
    await Board.populate(newBoard, {
      path: "columns",
      populate: {
        path: "cards",
      },
    })
  );
});

exports.updateBoardName = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const board = await Board.findById(id);

  if (!board) {
    res.status(404);
    throw new Error("Board not found");
  }

  await board.updateName(name);

  return res.status(200).json(
    await Board.populate(board, {
      path: "columns",
      populate: {
        path: "cards",
      },
    })
  );
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

  return res.status(200).json(
    await Board.populate(deletedBoard, {
      path: "columns",
      populate: {
        path: "cards",
      },
    })
  );
});

exports.reorderBoard = asyncHandler(async (req, res) => {
  //to be completed
  return;
});

exports.createBoardColumn = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { side, name } = req.body;

  const board = await Board.findById(id);

  if (!board) {
    res.status(404);
    throw new Error("Board not found");
  }

  await board.addColumn(side, name);

  return res.status(200).json(
    await Board.populate(board, {
      path: "columns",
      populate: {
        path: "cards",
      },
    })
  );
});
