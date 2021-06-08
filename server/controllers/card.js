const asyncHandler = require("express-async-handler");
const Card = require("../models/Card");
const Board = require("../models/Board");
const Column = require("../models/Column");

exports.getCard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const card = await Card.findById(id);

  if (!card) {
    res.status(404);
    throw new Error("Card not found");
  }

  return res.status(200).json(card);
});

exports.copyCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { columnId } = req.body;

  const card = await Card.findById(id);
  const column = await Column.findById(columnId).populate("cards");

  await card.duplicate(columnId, column);

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

exports.moveCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { columnId } = req.body;

  const card = await Card.findById(id);
  const oldColumn = await Column.findById(card.columnId).populate("cards");
  const newColumn = await Column.findById(columnId).populate("cards");

  const cardIndex = oldColumn.cards.findIndex(
    (colCard) => colCard._id === card._id
  );
  oldColumn.cards.splice(cardIndex, 1);
  newColumn.cards.push(card);

  await oldColumn.save();
  await newColumn.save();

  const board = await Board.findById(oldColumn.boardId);

  return res.status(200).json(
    await Board.populate(board, {
      path: "columns",
      populate: {
        path: "cards",
      },
    })
  );
});

exports.updateCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const card = await Card.findByIdAndUpdate(id, update, { upsert: true });

  if (!card) {
    res.status(404);
    throw new error("Card not found!");
  }
  const column = await Column.findById(card.columnId);
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

exports.deleteCard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const card = await Card.findById(id);
  const { columnId } = card;

  await card.deleteSelf(id);

  const column = await Column.findById(columnId);
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
