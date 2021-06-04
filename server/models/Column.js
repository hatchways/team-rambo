const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema(
  {
    name: {
      type: Array,
      required: false,
    },
    cards: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

columnSchema.methods.removePassword = function () {
  const object = this.toObject();
  delete object.user.password;
  return object;
};

const Column = mongoose.model("column", columnSchema);
module.exports = Column;
