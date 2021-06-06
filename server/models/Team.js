const mongoose = require("mongoose");

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

module.exports = mongoose.model("team", teamSchema);
