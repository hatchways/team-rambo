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
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Team owner is required"],
    },
  },
  { timestamps: true }
);

/**
 * After a user accepts invite invoke this method to add the user to the team as a collaborator.
 *
 * @param   {MongoId}  userId
 *
 * @return  {Boolean}          True - Successful, False - Unsuccessful
 */
teamSchema.methods.addMemberToTeam = (userId) => {};

module.exports = { Team: mongoose.model("team", teamSchema), teamSchema };
