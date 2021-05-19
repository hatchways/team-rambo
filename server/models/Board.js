const mongoose = require("mongoose");
const columnSchema = require("./Column");

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  columns: {
    type: [columnSchema],
    required: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Board = mongoose.model("board", boardSchema);
