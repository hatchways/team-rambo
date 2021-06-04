const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { Invite } = require("../../../models/Invite");

/**
 * Create a new invite and add the task to the queue to process emailing the recipient.
 * @route POST /team/:teamId/invite
 * @returns {Object} A message and payload
 */
exports.createinvite = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(errors);
  const { recipient, sender } = req.body;

  const invite = await Invite.create({
    team: req.params.teamId,
    recipient,
    sender,
  });

  return res.status(200).json({
    message: "Invite sent",
    payload: invite,
  });
});
