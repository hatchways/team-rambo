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

boardSchema.methods.deleteColumn = async function (
  /** @type {string} */ columnId
) {
  const colIndex = this.columns.findIndex((column) => column._id === columnId);
  this.columns.splice(colIndex, 1);
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

  this.columns = [notStarted, inProgress, completed];

  await this.populate();
  await this.save();
};

boardSchema.methods.swapColumns = async function (
  /** @type {{index: number; droppableId: string}} */ column1,
  /** @type {{index: number; droppableId: string}} */ column2
) {
  const col1 = this.columns[column1.index];
  const col2 = this.columns[column2.index];

  this.columns[column2.index] = col1;
  this.columns[column1.index] = col2;

  this.markModified("columns");
  await this.populate();
  await this.save();
};

const Board = mongoose.model("board", boardSchema);
module.exports = Board;
