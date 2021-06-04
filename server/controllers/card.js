const asyncHandler = require("express-async-handler");
const Card = require("../models/Card");

exports.getCards = asyncHandler(async (req, res) => {
  const cards = await Card.find();

  return res.json(cards);
});

exports.getCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id);

  if (!card) res.status(404).json({ error: "Card not found" });

  return res.status(200).json(card);
});

exports.createCard = asyncHandler(async (req, res) => {
  const { name, tag, columnId } = req.body;
  const newCard = await Card.create({
    name: name,
    tag: tag,
    columnId: columnId,
  });

  return res.status(200).json({ Card: newCard });
});

exports.updateCard = asyncHandler(async (req, res, next) => {
  const {
    _id,
    name,
    tag,
    description,
    deadline,
    comment,
    attachment,
    checklist,
    columnId,
  } = req.body;

  const filter = { _id };
  const update = {
    name,
    tag,
    description,
    deadline,
    comment,
    attachment,
    checklist,
    columnId,
  };

  const card = await Card.findOneAndUpdate(filter, update, {
    new: true,
  });

  const newCard = card.removePassword();

  return res.status(200).json(newCard);
});
