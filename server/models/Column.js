import mongoose from "mongoose";
import Card from "./Card";

const columnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cards: {
    type: [Card],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Column = mongoose.model("column", columnSchema);
