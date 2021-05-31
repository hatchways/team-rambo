const { User } = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route POST /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const searchString = req.query.search;

  let users;
  if (searchString) {
    users = await User.find({
      email: { $regex: searchString, $options: "i" },
    });
  }

  if (!users) {
    res.status(404);
    throw new Error("No users found in search");
  }

  res.status(200).json({ users: users });
});

exports.setProfilePicture = asyncHandler(async (req, res) => {
  console.log(req.picture);
  if (!req.picture) return res.status(404).send("Picture not found");

  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    { $set: { picture: req.picture.url } },
    { new: true }
  );

  if (user) return res.status(200).send({ data: user });

  res.status(400);
  throw new Error("Could not retrieve user!");
});
