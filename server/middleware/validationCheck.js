const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

exports.checkForValidationErrors = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(errors);

  return next();
});
