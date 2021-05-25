const { Card } = require("../../models/Card");
const asyncHandler = require("express-async-handler");

exports.getCard = asyncHandler(async (req, res, next) => {
  if (!req.params.cardId) {
    res.status(400);
    throw new Error('Card ID is required');
  }
  const card = await Card.getCardById(req.params.cardId);
  if (!card) {
    res.status(404);
    throw new Error('Card not found');
  }
  return res.status(200).json(card);
});
