const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { Invite } = require("../../../models/Invite");
const { User } = require("../../../models/User");
const sendEmail = require("../../../utils/sendEmail");
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Create a new invite and add the task to the queue to process emailing the recipient.
 * @route POST /team/:teamId/invite
 * @returns {Object} A message and payload
 */
exports.createInvite = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(errors);
  const { recipient, sender } = req.body;
  const senderEmail = await User.getEmail(sender);

  if (recipient === senderEmail || recipient === sender) {
    res.status(400);
    throw new Error("You cannot send an invite to yourself");
  }

  const isOwner = req.team.owner.toHexString() === sender;

  if (isOwner) {
    const invite = await Invite.create({
      team: req.team,
      recipient,
      sender,
    });

    const emailOptions = {
      subject: "Your invited to join a team",
      html: "build the template",
    };

    if (!EMAIL_REGEX.test(recipient)) {
      const recipientEmail = await User.getEmail(recipient);
      sendEmail(recipientEmail, emailOptions);
    } else {
      sendEmail(recipient, emailOptions);
    }

    return res.status(200).json({
      message: "Invite sent",
      payload: invite,
    });
  }

  res.status(400);
  throw new Error("You cannot invite to this team");
});

/**
 * Accepting a team invitation
 * @route GET /team/:teamId/:inviteId/accept
 * @redirect http://localhost:3000/auth/register
 */
exports.acceptInvite = asyncHandler((req, res, next) => {
  /*
    get the invite
    figure out where we are accepting this from (dashboard or email)
    
    if it's email
      see if the user exists in the database, if they don't we need to have them register. 
      Set a cookie (pendingTeamInvitation) that will be checked after they register their account.
    
    [it's an id]

    add the user as a collaborator to the team and revoke the invite and return a successful message.

  */
});

/**
 * Get a invite resource by it's id.
 *
 * Mongo ObjectId's are used as the codes for the invites.
 * @route GET /team/:teamId/invite/:inviteId
 * @returns {Object} An invite resource
 */
exports.getInvite = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(errors);
  const { inviteId } = req.params;
  const invite = await Invite.findOne({ _id: inviteId });

  if (!invite) {
    res.status(404);
    throw new Error("Invite could not be found");
  }

  return res.status(200).json(invite);
});

/**
 * Delete an invite resource by it's ID.
 *
 * @route DELETE /team/:teamId/invite/:inviteId/revoke
 * @returns {Object} A message
 */
exports.revokeInvite = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(errors);
  const { inviteId } = req.params;
  const invite = await Invite.findOne({ _id: inviteId });

  if (!invite) {
    res.status(404);
    throw new Error("Invite could not be found");
  }

  await invite.remove();
  return res.status(200).json({ message: "Invite deleted" });
});
