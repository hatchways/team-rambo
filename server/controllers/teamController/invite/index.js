const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { Invite } = require("../../../models/Invite");
const { User } = require("../../../models/User");
const sendEmail = require("../../../utils/sendEmail");

const invitationTemplate = (team, inviteId) => `
  <img src="https://res.cloudinary.com/dpepwhv11/image/upload/v1622628335/logo_hgrobp.png" />
  <div>
    <h2>You've been invited to ${team.name}</h2>
    <p>
      ${team.name} would like you to join as a collaborator.
    </p>
    <hr />
    <div>
      <a style="padding: 8px 12px;background-color: #759CFC;color: white; text-decoration: none;border-radius: 8px;" href="http://localhost:3000/team/${team._id}/invite/${inviteId}/accept">Join ${team.name}</a>
    </div>
  <div>
`;

/**
 * Create a new invite and add the task to the queue to process emailing the recipient.
 * @route POST /team/:teamId/invite
 * @returns {Object} A message and payload
 */
exports.createInvite = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(errors);
  const { team } = req;
  const { recipient } = req.body;

  const invite = await Invite.findOne({ recipient, team: team.id });

  if (invite) {
    res.status(400);
    throw new Error("Recipient already has been invited");
  }

  if (recipient === req.user.id) {
    res.status(400);
    throw new Error("You cannot send an invite to yourself");
  }

  if (team.collaboratorIndexPosition(recipient) > -1) {
    res.status(400);
    throw new Error("That person is already in your team");
  }

  const isOwner = team.owner.toString() === req.user.id;

  if (isOwner) {
    const invite = await Invite.create({
      team: req.team.id,
      recipient,
      sender: req.user.id,
    });

    const recipientEmail = await User.getEmail(recipient);
    if (!recipientEmail) {
      res.status(400);
      throw new Error("Recipient does not exist");
    }

    const emailOptions = {
      subject: "Your invited to join a team",
      html: invitationTemplate(req.team, invite._id),
    };
    sendEmail(recipientEmail, emailOptions);

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
 */
exports.acceptInvite = asyncHandler(async (req, res, next) => {
  const { inviteId } = req.params;
  const { team } = req;
  const invite = await Invite.findOne({ _id: inviteId });
  if (!invite) {
    res.status(404);
    throw new Error("That invite does not exist");
  }

  if (invite.recipient.toString() !== req.user.id) {
    res.status(400);
    throw new Error("This invite is not for you");
  }

  const user = await User.findOne({ _id: invite.recipient });

  if (!user) {
    res.status(404);
    await invite.remove(); // no need to keep the invite anymore if the recipient doesn't exist.
    throw new Error("That user no longer exists");
  }

  team.addCollaborator(invite.recipient);

  await invite.remove();

  return res.status(200).json({
    message: `Added you to ${team.name}`,
  });
});

/**
 * Get a list of all active invites a team has.
 *
 * @route GET /team/:teamId/invites/
 * @returns {Array} A list of invite resources
 */
exports.getActiveInvites = asyncHandler(async (req, res, next) => {
  const { team } = req;
  const invites = await Invite.find({ team: team.id })
    .populate("recipient")
    .select("-password");

  return res.status(200).json(invites);
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
