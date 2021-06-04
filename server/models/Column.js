const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: Array,
    required: false,
  },
  cards: {
    type: Array,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

columnSchema.methods.removePassword = function () {
  const object = this.toObject();
  delete object.user.password;
  return object;
};

const Column = mongoose.model("column", columnSchema);
module.exports = Column;
