const mongoose = require("mongoose");
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

  return res.status(200).json({ board });
});

exports.createBoard = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const newBoard = await Board.create({
    name: name,
    user: req.user.id,
  });

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

exports.swapColumns = asyncHandler(async (req, res) => {
  const batch = req.body;
  const bulkOps = [];

  for (const update of batch) {
    bulkOps.push(
      {
        updateOne: {
          filter: {
            columns: {
              $in: [mongoose.Types.ObjectId(update.key)],
            },
          },
          update: {
            $pull: {
              columns: mongoose.Types.ObjectId(update.key),
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
              columns: {
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

  Board.collection.bulkWrite(bulkOps);

  return res.status(200).json({ message: "working" });
});
