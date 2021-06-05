const mongoose = require("mongoose");
const Column = require("../models/Column");

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    columns: [
      { type: mongoose.Schema.Types.ObjectId, ref: "column", required: false },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

boardSchema.methods.removePassword = function () {
  const board = this.toObject();
  delete board.user.password;
  return board;
};

const Board = mongoose.model("board", boardSchema);
module.exports = Board;
