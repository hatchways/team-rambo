const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Column = require("../models/Column");
const Board = require("../models/Board");
const Card = require("../models/Card");
const { update } = require("../models/Card");

exports.createColumn = asyncHandler(async (req, res) => {
  const { boardId } = req.params;
  const { side, name } = req.body;

  const column = await Column.create({ side, name, boardId });

  const board = await Board.findById(boardId).populate({
    path: "columns",
    populate: {
      path: "cards",
    },
  });

  side === "left" ? board.columns.unshift(column) : board.columns.push(column);
  await board.save();

  return res.status(200).json({ board });
});

exports.updateColumn = asyncHandler(async (req, res, next) => {
  const { boardId, id } = req.params;
  const { name } = req.body;

  const column = await Column.findById(id);
  column.name = name;
  await column.save();

  const board = await Board.findById(boardId).populate({
    path: "columns",
    populate: {
      path: "cards",
    },
  });

  return res.status(200).json({ board });
});

exports.deleteColumn = asyncHandler(async (req, res) => {
  const { id, boardId } = req.params;

  await Column.findOneAndDelete({ _id: id });

  const board = await Board.findById(boardId).populate({
    path: "columns",
    populate: {
      path: "cards",
    },
  });

  return res.status(200).json({ board });
});

exports.swapCards = asyncHandler(async (req, res) => {
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
