const asyncHandler = require("express-async-handler");
const Column = require("../models/Column");
const { v4: uuidv4, v4 } = require("uuid");

exports.getColumns = asyncHandler(async (req, res) => {
  const Columns = await Column.find();

  return res.json(Columns);
});

exports.getColumn = asyncHandler(async (req, res) => {
  try {
    const Column = await Column.findById(req.params.id);

    if (!Column) res.status(404).json({ error: "Column not found" });

    return res.status(200).json(Column);
  } catch (error) {
    return res.json(error);
  }
});

exports.createColumn = asyncHandler(async (req, res) => {
  const { name, tag } = req.body;
  const newColumn = await Column.create({
    name: name,
    tag: tag,
    _id: v4(),
    createdAt: Date.now(),
  });

  return res.status(200).json({ Column: newColumn });
});

exports.updateColumn = asyncHandler(async (req, res, next) => {
  const { _id, name, cards, index, createdAt } = req.body;

  try {
    const filter = { _id };
    const update = {
      _id,
      name,
      cards,
      index,
      createdAt,
    };

    const Column = await Column.findOneAndUpdate(filter, update, {
      new: true,
    });

    const newColumn = Column.removePassword();

    return res.status(200).json(newColumn);
  } catch (error) {
    return res.json(error);
  }
});
