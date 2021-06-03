const asyncHandler = require("express-async-handler");
const { Collaborator } = require('../models/Collaborator');

exports.hasAccessToTeam = asyncHandler(async (req, res, next) => {
  const collaborator = await Collaborator.find({ _id: req.user.id })
});
