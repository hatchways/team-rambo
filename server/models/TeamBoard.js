const mongoose = require("mongoose");
const { Board } = require("./");

const teamBoardSchema = Board.base(
  "TeamBoard",
  new mongoose.Schema({
    collaborators: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: false,
      },
    ],
    admins: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
  })
);

module.exports = mongoose.model("teamBoard", teamBoardSchema);
