const mongoose = require("mongoose");
const { cardSchema } = require("./Card");

const columnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cards: {
    type: [cardSchema],
    required: false,
  },
}, { timestamps: true });

module.exports = {
  Column: mongoose.model("column", columnSchema),
  columnSchema,
};
