const express = require("express");
const { imageUpload, cloudinaryUpload } = require("../files/file");

const router = express.Router();

router.route("/upload").post(imageUpload, cloudinaryUpload);

module.exports = router;
