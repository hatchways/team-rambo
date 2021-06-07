const mongoose = require("mongoose");

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

const Column = mongoose.model("column", columnSchema);
module.exports = Column;
