const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cards: [
    { type: mongoose.Schema.Types.ObjectId, ref: "card", required: false },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Column = mongoose.model("board", columnSchema);

module.exports = Column;
