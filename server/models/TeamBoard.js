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
  if (this.collaborators.includes(userId) || this.admins.includes(userId))
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
  const collaboratorIndex = this.collaborators.indexOf(userId);
  if (collaboratorIndex > -1) {
    this.collaborators.splice(collaboratorIndex, 1);

    await this.save();
    return true;
  }

  return false;
};

/**
 * Removes an admin from the team board.
 *
 * @param   {ObjectId}  userId *
 *
 * @return  {Boolean}   True if successful, false if not.
 */
teamBoardSchema.methods.removeAdmin = async function (userId) {
  const adminIndex = this.admins.indexOf(userId);
  if (adminIndex > -1) {
    this.admins.splice(adminIndex, 1);

    await this.save();
    return true;
  }

  return false;
};

/**
 * Check whether the user is in the admins array on the Team Board resource.
 *
 * @param   {ObjectId}  userId  A Mongo ObjectID
 *
 * @return  {Number}          Index of the admin or -1 if not found.
 */
teamBoardSchema.methods.userIsAdmin = function (userId) {
  return this.admins.indexOf(userId) > -1;
};

/**
 * Check whether the user is in the collaborators array on the Team Board resource.
 *
 * @param   {ObjectId}  userId  A Mongo ObjectID
 *
 * @return  {Number}          Index of the admin or -1 if not found.
 */
teamBoardSchema.methods.userIsCollaborator = function (userId) {
  return this.collaborators.indexOf(userId) > -1;
};

const TeamBoard = Board.discriminator("TeamBoard", teamBoardSchema);
module.exports = TeamBoard;
