const mongoose = require("mongoose");
import Card from "./Card";
import Column from "./Column";
import User from "./User";

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  columns: {
    type: [Column],
    required: true,
  },
  user: {
    type: [User],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Board = mongoose.model("board", boardSchema);
