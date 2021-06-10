const express = require("express");
const { imageUpload, cloudinaryUpload } = require("../files/file");
const protect = require("../middleware/auth");
const { setProfilePicture } = require("../controllers/user");
const router = express.Router();

router
  .route("/upload")
  .post(protect, imageUpload, cloudinaryUpload, setProfilePicture);

module.exports = router;
