const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { Team } = require("../../../models/Team");

/**
 * Add a collaborator to the provided team.
 * @route POST /team
 * @returns {Object} A message and payload
 */
exports.addCollaboratorToTeam = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(errors);

  return res.status(200).json({ message: "not implmented" });
});
