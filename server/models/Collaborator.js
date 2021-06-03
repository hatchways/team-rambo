const mongoose = require("mongoose");
/*
Teams has many Collaborators, this will let us keep business logic more inline with Teams because a User by itself is not a collaborator. Collaborator has many Teams.
*/
const collaboratorSchema = new mongoose.Schema({
  teams: [{
    type: mongoose.Types.ObjectId,
    ref: "team",
    required: false
  }],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true
  }
}, { timestamps: true });

module.exports = { Collaborator: mongoose.model("collaborator", collaboratorSchema), collaboratorSchema };
