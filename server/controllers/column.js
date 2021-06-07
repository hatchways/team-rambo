const asyncHandler = require("express-async-handler");
const Column = require("../models/Column");
const Board = require("../models/Board");

exports.createColumn = asyncHandler(async (req, res) => {
  const { name, boardId } = req.body;

  const newColumn = await Column.create({
    name,
    boardId,
  });
  await newColumn.save();
  return res.status(200).json(newColumn);
});

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

  return res.status(200).json(
    await Column.populate(column, {
      path: "cards",
    })
  );
});
