const asyncHandler = require("express-async-handler");
const Card = require("../models/Card");
const Board = require("../models/Board");
const Column = require("../models/Column");

// exports.createCard = asyncHandler(async (req, res) => {
//   const { title, tag, columnId } = req.body;

//   const newCard = await Card.create({
//     title,
//     tag,
//     columnId,
//   });

//   if (!newCard) throw new Error("Card could not be created.");
//   await newCard.save();
//   return res.status(200).json(newCard);
// });

exports.getCard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const card = await Card.findById(id);

  if (!card) {
    res.status(404);
    throw new Error("Card not found");
  }

  return res.status(200).json(card);
});

exports.updateCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const card = await Card.findOneAndUpdate(id, update, {
    new: true,
  });

  if (!card) {
    res.status(404);
    throw new error("Card not found!");
  }
  await card.save();
  return res.status(200).json(card);
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
