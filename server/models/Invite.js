const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema(
  {
    team: {
      type: mongoose.Types.ObjectId,
      ref: "team",
      required: [true, "Team is required for sending invites"],
    },
    recipient: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Recipient is required for sending invites"],
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Sender is required for sending invites"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("invite", inviteSchema);
