const mongoose = require("mongoose");
const columnSchema = require("./Column");
const { userSchema } = require("./User");

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
    type: userSchema,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Board = mongoose.model("board", boardSchema);
