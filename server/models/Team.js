const mongoose = require("mongoose");
const TeamBoard = require("./TeamBoard");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Team name is required"],
      minLength: [2, "Team name must be minimum 2 characters"],
    },
    boards: [
      {
        type: mongoose.Types.ObjectId,
        ref: "board",
        required: false,
      },
    ],
    collaborators: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: false,
      },
    ],
    invites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "invite",
        required: false,
      },
    ],
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Team owner is required"],
    },
  },
  { timestamps: true }
);

/**
 * When an invite is accepted this will add the collaborator to the team.
 *
 * @param   {ObjectId}  userId
 *
 * @return  {Boolean}   True if successful, false if not.
 */
teamSchema.methods.addCollaborator = async function (userId) {
  if (this.collaborators.includes(userId)) return false;
  if (userId === this.owner) return false;

  this.collaborators.push(userId);
  await this.save();
  return true;
};

/**
 * Removes an invite from the Teams resource. Used after revoking an invite and adding a collaborator.
 *
 * @param   {ObjectId}  inviteId
 *
 * @return  {Boolean}   True if successful, false if not.
 */
teamSchema.methods.removeInvite = async function (inviteId) {
  const invite = this.invites.findIndex((invite) => invite.id === inviteId);
  if (invite < 0) return false;

  this.invites.splice(invite, 1);

  await this.save();
  return true;
};

/**
 * Removes a board from the Teams resource.
 *
 * @param   {ObjectId}  boardId
 *
 * @return  {Boolean}   True if successful, false if not.
 */
teamSchema.methods.removeBoard = async function (boardId) {
  const board = this.boards.findIndex((board) => board.id === boardId);
  if (board < 0) return false;

  this.boards.splice(board, 1);

  await this.save();
  return true;
};

/**
 * Transfers ownership of team boards. Used for when a collaborator leaves or is removed from the team.
 * The ownership is automatically given to the team owner.
 *
 * @param   {ObjectId}  userId The resource owner.
 *
 * @param   {ObjectId}  targetUserId The new owners id
 *
 * @return
 */
teamSchema.methods.transferBoardsOwnership = async function (
  userId,
  targetUserId
) {
  const update = await TeamBoard.updateMany(
    { user: userId },
    { user: targetUserId }
  );
  return update;
};

/**
 * Checks if the user id given is in the list of collaborators.
 *
 * @param   {ObjectId}  userId  A Mongo ObjectID
 *
 * @return  {Number}          Index of the collaborator or -1 if not found.
 */
teamSchema.methods.collaboratorIndexPosition = function (userId) {
  return this.collaborators.findIndex(
    (collaborator) => collaborator.id === userId
  );
};

module.exports = { Team: mongoose.model("team", teamSchema), teamSchema };