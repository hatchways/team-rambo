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
 * Determine if the user id owns the team resource.
 *
 * @param   {MongoId}  userId
 *
 * @return  {Boolean}          True - Successful, False - Unsuccessful
 */
teamSchema.statics.isOwner = async function (teamId, userId) {
  const team = await this.findOne({ _id: teamId, owner: userId });
  if (!team) return false;
  return true;
};

module.exports = { Team: mongoose.model("team", teamSchema), teamSchema };
