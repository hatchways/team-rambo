const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    deadline: {
      type: Date,
      required: false,
    },
    comment: {
      type: String,
      required: false,
    },
    attachment: {
      type: String,
      required: false,
    },
    checklist: {
      type: Array,
      required: false,
    },
    columnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "column",
      required: true,
    },
  },
  { timestamps: true }
);

const Card = mongoose.model("card", cardSchema);
module.exports = Card;
