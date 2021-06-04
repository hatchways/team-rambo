const mongoose = require("mongoose");
<<<<<<< HEAD
const { columnSchema } = require("./Column");
=======
>>>>>>> feat-be-task-queues

const boardSchema = new mongoose.Schema(
  {
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
  },
<<<<<<< HEAD
  { timestamps: true }
);
=======
  columns: {
    type: Array,
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
>>>>>>> feat-be-task-queues

boardSchema.methods.removePassword = function () {
  const object = this.toObject();
  delete object.user.password;
  return object;
};

const Board = mongoose.model("board", boardSchema);
module.exports = Board;
