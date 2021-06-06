const asyncHandler = require("express-async-handler");
const Card = require("../models/Card");

exports.createCard = asyncHandler(async (req, res) => {
  const { title, tag, columnId } = req.body;

  const newCard = await Card.create({
    title,
    tag,
    columnId,
  });

  if (!newCard) throw new Error("Card could not be created.");
  await newCard.save();
  return res.status(200).json(newCard);
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

  const deletedCard = await Card.findOneAndDelete({ _id: id }, function (err) {
    if (err) {
      res.status(404);
      throw new error("Card not found!");
    }
  });

  return res.status(200).json(deletedCard);
});
