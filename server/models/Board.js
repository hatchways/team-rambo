const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      required: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true, discriminatorKey: "__type" }
);

boardSchema.methods.removePassword = function () {
  const object = this.toObject();
  delete object.user.password;
  return object;
};

module.exports = { Board: mongoose.model("board", boardSchema), boardSchema };
