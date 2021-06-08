const asyncHandler = require("express-async-handler");
const Board = require("../models/Board");
const User = require("../models/User");

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
    user: req.params.id,
  });

  // For testing with postman
  // const newBoard = await Board.create({
  //   name,
  //   user: "60b91df75edef24420936968",
  // });

  if (!newBoard) {
    res.status(400);
    throw new Error("Board could not be created.");
  }

  await newBoard.createTemplateBoard();

  const board = await Board.populate(newBoard, {
    path: "columns",
    populate: {
      path: "cards",
    },
  });
  return res.status(200).json({ board });

  // { board?: a board, error?: string}
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

  const deletedBoard = await Board.findOneAndDelete({ _id: id });

  if (!deletedBoard) {
    res.status(404);
    throw new Error("Couldn't find a board to delete!");
  }

  const boards = await Board.find({ user: deletedBoard.user });

  return res.status(200).json(
    await Board.populate(boards, {
      path: "columns",
      populate: {
        path: "cards",
      },
    })
  );
});

exports.swapBoardColumns = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { column1, column2 } = req.body;

  console.log(column1, column2);

  const board = await Board.findById(id);

  await Board.populate(board, {
    path: "columns",
    populate: {
      path: "cards",
    },
  });

  await board.swapColumns(column1, column2);

  return res.status(200).json(
    await Board.populate(board, {
      path: "columns",
      populate: {
        path: "cards",
      },
    })
  );
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

exports.deleteBoardColumn = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { columnId } = req.body;

  const board = await Board.findById(id);

  if (!board) {
    res.status(404);
    throw new Error("Board not found");
  }

  await board.deleteColumn(columnId);

  return res.status(200).json(
    await Board.populate(board, {
      path: "columns",
      populate: {
        path: "cards",
      },
    })
  );
});
