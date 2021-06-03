const asyncHandler = require("express-async-handler");

exports.getTeam = asyncHandler(async (req, res, next) => {
  res.status(400).json({ message: 'not implemented' });
});
