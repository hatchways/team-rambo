const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Column = require("../models/Column");
const Board = require("../models/Board");
const Card = require("../models/Card");
const { update } = require("../models/Card");

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
  const batch = req.body;
  const bulkOps = [];

  for (const update of batch) {
    bulkOps.push(
      {
        updateOne: {
          filter: {
            cards: {
              $in: [mongoose.Types.ObjectId(update.key)],
            },
          },
          update: {
            $pull: {
              cards: mongoose.Types.ObjectId(update.key),
            },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: {
            _id: mongoose.Types.ObjectId(update.change.destination.droppableId),
          },
          update: {
            $push: {
              cards: {
                $each: [mongoose.Types.ObjectId(update.key)],
                $position: update.change.destination.index,
              },
            },
          },
          upsert: true,
        },
      }
    );
  }

  Column.collection.bulkWrite(bulkOps);

  return res.status(200).json({ message: "working" });
});

exports.deleteColumnCard = asyncHandler(async (req, res) => {});
