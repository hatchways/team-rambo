const asyncHandler = require("express-async-handler");
const Column = require("../models/Column");

exports.getColumns = asyncHandler(async (req, res) => {
  const columns = await Column.find();

  return res.json(Columns);
});

exports.getColumn = asyncHandler(async (req, res) => {
  const column = await Column.findById(req.params.id);

  if (!column) res.status(404).json({ error: "Column not found" });

  return res.status(200).json(column);
});

exports.createColumn = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const newColumn = await Column.create({
    name: name,
  });

  return res.status(200).json({ Column: newColumn });
});

exports.updateColumn = asyncHandler(async (req, res, next) => {
  const { _id, name, cards, index } = req.body;

  const filter = { _id };
  const update = {
    name,
    cards,
    index,
  };

  const column = await Column.findOneAndUpdate(filter, update, {
    new: true,
  });

  const newColumn = column.removePassword();

  return res.status(200).json(newColumn);
});
