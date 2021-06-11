const mongoose = require("mongoose");
const { Board } = require("./Board");

const teamBoardSchema = new mongoose.Schema({
  collaborators: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: false,
    },
  ],
  admins: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  ],
  description: {
    type: String,
    default: "",
  },
});

/**
 * Adds a new collaborator to the team board.
 *
 * @param   {ObjectId}  userId
 *
 * @param   {Boolean}   isAdmin
 *
 * @return  {Boolean}   True if successful, false if not.
 */
teamBoardSchema.methods.addCollaborator = async function (userId, isAdmin) {
  if (this._userIsCollaborator(userId) > -1 || this._userIsAdmin(userId) > -1)
    return false;
  // this.user because of inheritance of Board will act as the board owner.
  if (userId === this.user) return false;

  if (isAdmin) {
    this.admins.push(userId);
  } else {
    this.collaborators.push(userId);
  }

  await this.save();
  return true;
};

/**
 * Removes an collaborator from the team board.
 *
 * @param   {ObjectId}  userId
 *
 * @return  {Boolean}   True if successful, false if not.
 */
teamBoardSchema.methods.removeCollaborator = async function (userId) {
  const collaborator = this._userIsCollaborator(userId);
  if (collaborator > -1) {
    this.collaborators.splice(collaborator, 1);

    await this.save();
    return true;
  }

  return false;
};

/**
 * Removes an admin from the team board.
 *
 * @param   {ObjectId}  userId
 *
 * @return  {Boolean}   True if successful, false if not.
 */
teamBoardSchema.methods.removeAdmin = async function (userId) {
  const userAdmin = this._userIsAdmin(userId);
  if (userAdmin > -1) {
    this.admins.splice(userAdmin, 1);

    await this.save();
    return true;
  }

  return false;
};

/**
 * Determine the type of user we are looking for.
 *
 * @param   {ObjectId}  userId  A Mongo ObjectID
 *
 * @return  {String}            'collaborator' | 'admin' | null (not in team board)
 */
teamBoardSchema.methods.getUserType = function (userId) {
  if (this._userIsCollaborator(userId) > -1) {
    return "collaborator";
  } else if (this._userIsAdmin(userId) > -1) {
    return "admin";
  }

  return null;
};

// PRIVATE

teamBoardSchema.methods._userIsCollaborator = function (userId) {
  return this.collaborators.findIndex((c) => c.id === userId);
};

teamBoardSchema.methods._userIsAdmin = function (userId) {
  return this.admins.findIndex((a) => a.id === userId);
};

const TeamBoard = Board.discriminator("TeamBoard", teamBoardSchema);
module.exports = TeamBoard;
