const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  columns: [
    { type: mongoose.Schema.Types.ObjectId, ref: "card", required: false },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Board = mongoose.model("board", boardSchema);

module.exports = Board;
