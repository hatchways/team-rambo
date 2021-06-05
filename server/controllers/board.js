const asyncHandler = require("express-async-handler");
const Board = require("../models/Board");
const Column = require("../models/Column");
const Card = require("../models/Card");

exports.getBoard = asyncHandler(async (req, res) => {
  const board = await Board.findOne({ _id: req.params.id }).populate({
    path: "columns",
    populate: {
      path: "cards",
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

  //Use this for testing in postman
  const newBoard = await Board.create({
    name,
    user: "60b91df75edef24420936968",
  });

  if (!newBoard) {
    res.status(400);
    throw new Error("Board could not be created.");

    return;
  }

  const notStarted = await Column.create({
    name: "Not Started",
    boardId: newBoard._id,
  });
  const inProgress = await Column.create({
    name: "In Progress",
    boardId: newBoard._id,
  });
  const completed = await Column.create({
    name: "Completed",
    boardId: newBoard._id,
  });

  newBoard.columns.push(notStarted);
  newBoard.columns.push(inProgress);
  newBoard.columns.push(completed);
  await newBoard.save();

  const card1 = await Card.create({
    title: "Not Started Card 1",
    tag: "purple",
    columnId: notStarted._id,
  });
  const card2 = await Card.create({
    title: "Not Started Card 2",
    tag: "red",
    columnId: notStarted._id,
  });
  const card3 = await Card.create({
    title: "In Progress Card 1",
    tag: "blue",
    columnId: inProgress._id,
  });
  const card4 = await Card.create({
    title: "Completed Card 1",
    tag: "green",
    columnId: completed._id,
  });

  const CARDS = [card1, card2, card3, card4];
  const COLUMNS = [notStarted, inProgress, completed];

  COLUMNS.map((column) => {
    const index = newBoard.columns.findIndex(
      (boardColumn) => boardColumn._id === column._id
    );
    CARDS.map((card) => {
      if (card.columnId === column._id)
        newBoard.columns[index].cards.push(card);
    });
  });

  await newBoard.save();

  return res.status(200).json(newBoard);
});

// Needs major refactoring; won't need to update everything (columns) in updateBoard
exports.updateBoard = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  const update = {
    name,
  };

  const board = await Board.findOneAndUpdate(id, update, {
    new: true,
  }).populate({
    path: "columns",
    // populate: {
    //   path: "cards",
    // },
  });

  if (!board) {
    res.status(404);
    throw new Error("Board not found");
  }

  return res.status(200).json(board);
});

exports.reorderBoard = asyncHandler(async (req, res) => {
  //to be completed

  const board = await Board.findById(req.params.id).populate("columns");

  if (!board) {
    res.status(404);
    throw new Error("Board not found");
  }

  return res.status(200).json(board);
});
