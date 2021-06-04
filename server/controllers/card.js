const asyncHandler = require("express-async-handler");
const Card = require("../models/Card");
const { v4: uuidv4, v4 } = require("uuid");

exports.getCards = asyncHandler(async (req, res) => {
  const Cards = await Card.find();

  return res.json(Cards);
});

exports.getCard = asyncHandler(async (req, res) => {
  try {
    const Card = await Card.findById(req.params.id);

    if (!Card) res.status(404).json({ error: "Card not found" });

    return res.status(200).json(Card);
  } catch (error) {
    return res.json(error);
  }
});

exports.createCard = asyncHandler(async (req, res) => {
  const { name, tag, columnId } = req.body;
  const newCard = await Card.create({
    name: name,
    tag: tag,
    columnId: columnId,
    _id: v4(),
    createdAt: Date.now(),
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
    index,
    createdAt,
  } = req.body;

  try {
    const filter = { _id };
    const update = {
      _id,
      name,
      tag,
      description,
      deadline,
      comment,
      attachment,
      checklist,
      columnId,
      index,
      createdAt,
    };

    const Card = await Card.findOneAndUpdate(filter, update, {
      new: true,
    });

    const newCard = Card.removePassword();

    return res.status(200).json(newCard);
  } catch (error) {
    return res.json(error);
  }
});
