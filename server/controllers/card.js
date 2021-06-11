const asyncHandler = require("express-async-handler");
const Card = require("../models/Card");
const Board = require("../models/Board");
const Column = require("../models/Column");

exports.createCard = asyncHandler(async (req, res) => {
  const { boardId, columnId, id } = req.params;
  const { title, tag } = req.body;

  const column = await Column.findById(columnId).populate({ path: "cards" });

  const card = await Card.create({ title, tag, columnId });

  column.cards.push(card);
  await column.save();

  const board = await Board.findById(boardId).populate({
    path: "columns",
    populate: {
      path: "cards",
    },
  });

  return res.status(200).json({ board });
});

exports.updateCard = asyncHandler(async (req, res) => {
  const { boardId, id } = req.params;
  const update = req.body;

  const card = await Card.findByIdAndUpdate(id, update, {
    new: true,
    upsert: true,
  });

  if (!card) {
    res.status(404);
    throw new error("Card not found!");
  }

  const board = await Board.findById(boardId).populate({
    path: "columns",
    populate: {
      path: "cards",
    },
  });

  return res.status(200).json({ board });
});

exports.deleteCard = asyncHandler(async (req, res) => {
  const { boardId, id } = req.params;

  await Card.findOneAndDelete({ _id: id }, function (err) {
    if (err) {
      res.status(404);
      throw new Error("Card not found!");
    }
  });

  const board = await Board.findById(boardId).populate({
    path: "columns",
    populate: {
      path: "cards",
    },
  });

  return res.status(200).json({ board });
});

exports.copyCard = asyncHandler(async (req, res) => {
  const { boardId, id } = req.params;
  const { columnId } = req.body;

  const card = await Card.findById(id);
  const column = await Column.findById(columnId).populate("cards");

  await card.duplicate(columnId, column);

  const board = await Board.findById(boardId).populate({
    path: "columns",
    populate: {
      path: "cards",
    },
  });

  return res.status(200).json({ board });
});

exports.moveCard = asyncHandler(async (req, res) => {
  const { boardId, id } = req.params;
  const { newColumnId } = req.body;

  const card = await Card.findById(id);
  const oldColumn = await Column.findById(card.columnId).populate("cards");
  const newColumn = await Column.findById(newColumnId).populate("cards");

  const cardIndex = oldColumn.cards.findIndex((colCard) => colCard._id == id);

  oldColumn.cards.splice(cardIndex, 1);

  await card.updateColumnId(oldColumn, newColumn);

  const board = await Board.findById(boardId).populate({
    path: "columns",
    populate: {
      path: "cards",
    },
  });

  return res.status(200).json({ board });
});
