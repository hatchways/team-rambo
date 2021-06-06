const asyncHandler = require("express-async-handler");
const Column = require("../models/Column");

exports.getColumns = asyncHandler(async (req, res) => {
  const columns = await Column.find();

  return res.json(columns);
});

exports.getColumn = asyncHandler(async (req, res) => {
  const column = await Column.findOne({ _id: req.params.id }).populate("cards");

  if (!column) res.status(404).json({ error: "Column not found" });

  return res.status(200).json(column);
});

exports.createColumn = asyncHandler(async (req, res) => {
  const { name, boardId } = req.body;

  const newColumn = await Column.create({
    name,
    boardId,
  });
  await newColumn.save();
  return res.status(200).json(newColumn);
});

exports.updateColumn = asyncHandler(async (req, res, next) => {
  const { _id, name, cards } = req.body;

  const update = {
    name,
    cards,
  };

  const column = await Column.findOneAndUpdate(_id, update, {
    new: true,
  });

  await column.save();
  return res.status(200).json(column);
});

exports.reorderColumn = asyncHandler(async (req, res) => {
  //to be completed
  return;
});

exports.deleteColumn = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedColumn = await Column.findOneAndDelete(
    { _id: id },
    function (err) {
      if (err) {
        res.status(404);
        throw new error("Column not found!");
      }
    }
  );

  return res.status(200).json(deletedColumn);
});
