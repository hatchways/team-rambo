const asyncHandler = require("express-async-handler");
const Board = require("../models/Board");
const { v4: uuidv4, v4 } = require("uuid");

exports.getBoards = asyncHandler(async (req, res) => {
  const boards = await Board.find();

  return res.json(boards);
});

exports.getBoard = asyncHandler(async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) res.status(404).json({ error: "Board not found" });

    return res.status(200).json(board);
  } catch (error) {
    return res.json(error);
  }
});

exports.createBoard = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const newBoard = await Board.create({
    name: name,
    columns: [
      {
        name: "Not Started",
        cards: [
          {
            _id: "car-1",
            columnId: "col-1",
            name: "Essay on the environment",
            tag: "green",
          },
        ],
        _id: v4(),
        createdAt: Date.now(),
      },
      {
        name: "In Progress",
        cards: [
          {
            _id: "car-2",
            columnId: "col-2",
            name: "Midterm exam",
            dueDate: new Date(),
            tag: "red",
          },
          {
            _id: "car-3",
            columnId: "car-3",
            name: "Homework",
            tag: "red",
          },
        ],
        _id: v4(),
        createdAt: Date.now(),
      },
      {
        _id: v4(),
        name: "Completed",
        cards: [],
        createdAt: Date.now(),
      },
    ],
    user: req.user.id,
  });

  return res.status(200).json({ board: newBoard });
});

exports.updateBoard = asyncHandler(async (req, res, next) => {
  const { _id, name, user, columns, createdAt } = req.body;

  try {
    const filter = { _id };
    const update = {
      _id,
      user,
      name,
      columns,
      createdAt,
    };

    const board = await Board.findOneAndUpdate(filter, update, {
      new: true,
    });

    const newBoard = board.removePassword();

    return res.status(200).json(newBoard);
  } catch (error) {
    return res.json(error);
  }
});
