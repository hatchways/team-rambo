const mongoose = require("mongoose");
const Column = require("../models/Column");

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
    date: {
      type: String,
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

cardSchema.methods.duplicate = async function (
  /** @type {string} */ columnId,
  column
) {
  const newCard = await Card.create({
    title: this.title,
    tag: this.tag,
    columnId,
  });

  column.cards.push(newCard);
  await column.save();
};

cardSchema.methods.updateColumnId = async function (oldColumn, newColumn) {
  this.columnId = newColumn._id;
  await this.save();

  newColumn.cards.push(this);

  await oldColumn.save();
  await newColumn.save();
};

const Card = mongoose.model("card", cardSchema);
module.exports = Card;
