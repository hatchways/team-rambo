const asyncHandler = require("express-async-handler");
const Board = require("../models/Board");
const router = require("express").Router();
const protect = require("../middleware/auth");

const createBoard = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const newBoard = await Board.create({
    name: name,
    user: req.user.id,
  });

  if (!newBoard) {
    res.status(400);
    throw new Error("Board could not be created.");
  }

  await newBoard.createTemplateBoard();

  const board = await Board.populate(newBoard, {
    path: "columns",
    populate: {
      path: "cards",
    },
  });
  return res.status(200).json({ board });
});

router.route("/").post(protect, createBoard);
module.exports = router;
