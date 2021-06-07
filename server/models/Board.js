const mongoose = require("mongoose");
const Column = require("../models/Column");
const Card = require("../models/Card");

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

// Method that will remove the user's password before returning the board; this can be redone to ensure we don't pop user
boardSchema.methods.removePassword = function () {
  const board = this.toObject();
  delete board.user.password;
  return board;
};

boardSchema.methods.addColumn = async function (
  /** @type {string} */ side,
  /** @type {string} */ columnName
) {
  const newColumn = await Column.create({
    name: columnName,
    boardId: this._id,
  });

  side === "left"
    ? this.columns.unshift(newColumn)
    : this.columns.push(newColumn);

  await this.populate();
  await this.save();
};

boardSchema.methods.updateName = async function (
  /** @type {string} */ newName
) {
  this.name = newName;

  await this.populate();
  await this.save();
};

boardSchema.methods.createTemplateBoard = async function () {
  const notStarted = await Column.create({
    name: "Not Started",
    boardId: this._id,
  });
  const inProgress = await Column.create({
    name: "In Progress",
    boardId: this._id,
  });
  const completed = await Column.create({
    name: "Completed",
    boardId: this._id,
  });

  const card1 = await Card.create({
    title: "Not Started Card 1",
    tag: "green",
    columnId: notStarted._id,
  });
  const card2 = await Card.create({
    title: "In Progress Card 1",
    tag: "blue",
    columnId: inProgress._id,
  });
  const card3 = await Card.create({
    title: "Completed Card 1",
    tag: "red",
    columnId: notStarted._id,
  });

  this.columns = [notStarted, inProgress, completed];

  this.columns[0].cards.push(card1.id);
  this.columns[1].cards.push(card2.id);
  this.columns[2].cards.push(card3.id);

  await notStarted.save();
  await inProgress.save();
  await completed.save();
  await this.populate();
  await this.save();
};

const Board = mongoose.model("board", boardSchema);
module.exports = Board;
