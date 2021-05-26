const mongoose = require("mongoose");
const { columnSchema } = require("./Column");
const { userSchema } = require("./User");

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  columns: {
    type: [columnSchema],
    required: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

boardSchema.methods.removePassword = function () {
  const object = this.toObject();
  delete object.user.password;
  return object;
};

module.exports = { Board: mongoose.model("board", boardSchema), boardSchema };
