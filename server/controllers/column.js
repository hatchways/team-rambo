const asyncHandler = require("express-async-handler");
const Column = require("../models/Column");
const Board = require("../models/Board");
const Card = require("../models/Card");

exports.updateColumn = asyncHandler(async (req, res, next) => {
  const { _id, name, cards } = req.body;

  const update = {
    name,
    cards,
  };

  const column = await Column.findOneAndUpdate(_id, update, {
    new: true,
  });

  await column.save();
  return res.status(200).json(column);
});

exports.reorderColumn = asyncHandler(async (req, res) => {
  //to be completed
  return;
});

exports.renameColumn = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { columnName } = req.body;

  const column = await Column.findById(id).populate("cards");

  if (!column) {
    res.status(404);
    throw new Error("Column not found!");
  }

  await column.updateName(columnName);

  const board = await Board.findById(column.boardId);

  return res.status(200).json(
    await Board.populate(board, {
      path: "columns",
      populate: {
        path: "cards",
      },
    })
  );
});

exports.createColumnCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, tag } = req.body;

  const column = await Column.findById(id);

  if (!column) {
    res.status(404);
    throw new Error("Column not found");
  }

  await column.addCard(title, tag);

  const board = await Board.findById(column.boardId);

  if (!board) {
    res.status(404);
    throw new Error("Board not found");
  }

  return res.status(200).json(
    await Board.populate(board, {
      path: "columns",
      populate: {
        path: "cards",
      },
    })
  );
});

exports.swapCardsInColumn = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { cardId, source, destination } = req.body;

  const column = await Column.findById(id).populate("cards");

  await column.swapPosition(cardId, source, destination);

  const board = await Board.findById(column.boardId);

  return res.status(200).json(
    await Board.populate(board, {
      path: "columns",
      populate: {
        path: "cards",
      },
    })
  );
});

exports.swapCardsOutsideColumn = asyncHandler(async (req, res) => {
  const { cardId, source, destination } = req.body;

  const column1 = await Column.findById(source.droppableId).populate("cards");
  const column2 = await Column.findById(destination.droppableId).populate(
    "cards"
  );

  const card = await Card.findById(cardId);

  const clonedCards1 = column1.cards.slice();
  const clonedCards2 = column2.cards.slice();
  clonedCards1.splice(source.index, 1);
  clonedCards2.splice(destination.index, 0, card);

  column1.cards = clonedCards1;
  column2.cards = clonedCards2;

  await column1.save();
  await column2.save();

  const board = await Board.findById(column1.boardId);

  return res.status(200).json(
    await Board.populate(board, {
      path: "columns",
      populate: {
        path: "cards",
      },
    })
  );
});

exports.deleteColumnCard = asyncHandler(async (req, res) => {});
