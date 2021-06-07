const mongoose = require("mongoose");
const Card = require("./Card");

const columnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cards: [
      { type: mongoose.Schema.Types.ObjectId, ref: "card", required: false },
    ],
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
  },
  { timestamps: true }
);

columnSchema.methods.updateName = async function (columnName) {
  this.name = columnName;

  await this.populate();
  await this.save();
};

columnSchema.methods.addCard = async function (
  /** @type {string} */ title,
  /** @type {string} */ tag
) {
  const newCard = await Card.create({
    title: title,
    tag: tag,
    columnId: this._id,
  });

  this.cards.push(newCard);

  await this.populate();
  await this.save();
};

const Column = mongoose.model("column", columnSchema);
module.exports = Column;
