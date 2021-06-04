const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const maxImageSize = 5e8;
const acceptedImageFiles = ["image/png", "image/jpeg"];

const imageUploadFilter = (req, file, next) => {
  if (!acceptedImageFiles.includes(file.mimetype)) {
    return next(null, false);
  }

  return next(null, true);
};

const imageUploadConfig = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageUploadFilter,
  limits: { fileSize: maxImageSize },
}).single("image");

const imageUpload = (req, res, next) => {
  imageUploadConfig(req, res, (err) => {
    if (err && err.code == "LIMIT_FILE_SIZE") {
      return res.status(413).send({ error: "File is too big!" });
    } else if (err) {
      return res.status(500).send({ error: err });
    }
    next();
  });
};

const streamUpload = (req, res) => {
  if (!req.file) return res.status(404).send({ error: "File not found!" });

  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { public_id: req.user.id },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};

const cloudinaryUpload = async (req, res, next) => {
  try {
    let result = await streamUpload(req);
    req.picture = result;
    next();
  } catch (err) {
    return res
      .status(400)
      .send({ error: "Could not upload file to Cloudinary!" });
  }
};

module.exports = { imageUpload, cloudinaryUpload };
