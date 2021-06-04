const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema(
  {
    team: {
      type: mongoose.Types.ObjectId,
      ref: "team",
      required: [true, "Team is required for sending invites"],
    },
  },
  { timestamps: true }
);

module.exports = {
  Invite: mongoose.model("invite", inviteSchema),
  inviteSchema,
};
