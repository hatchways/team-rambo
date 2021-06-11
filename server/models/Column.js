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

columnSchema.methods.deleteCard = async function (
  /** @type {string} */ cardId
) {
  await Card.deleteOne({ _id: cardId });

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

columnSchema.methods.swapPosition = async function (
  /** @type {string} */ cardId,
  /** @type {{index: number, droppableId: string}} */ source,
  /** @type {{index: number, droppableId: string}} */ destination
) {
  const card = await Card.findById(cardId);

  const clonedCards = this.cards.slice();
  clonedCards.splice(source.index, 1);
  clonedCards.splice(destination.index, 0, card);

  this.cards = clonedCards;

  this.markModified("cards");
  await this.populate();
  await this.save();
};

columnSchema.methods.deleteSelf = async function () {
  await this.remove({}, function (err, result) {
    if (err) {
      console.err(err);
    }

    return;
  });
};

const Column = mongoose.model("column", columnSchema);
module.exports = Column;
