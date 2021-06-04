const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: Array,
    required: false,
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
    type: mongoose.Types.ObjectId,
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

cardSchema.methods.removePassword = function () {
  const object = this.toObject();
  delete object.user.password;
  return object;
};

const Card = mongoose.model("card", cardSchema);
module.exports = Card;
