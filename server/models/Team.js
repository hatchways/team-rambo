const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Untitled'
  },
  boards: [{
    type: mongoose.Types.ObjectId,
    ref: "board",
    required: false
  }],
  collaborators: [{
    type: mongoose.Types.ObjectId,
    ref: "collaborator",
    required: false
  }],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
}, { timestamps: true });

module.exports = { Team: mongoose.model("team", teamSchema), teamSchema };
