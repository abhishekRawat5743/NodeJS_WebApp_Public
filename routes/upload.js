const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadImageToBlob } = require("../services/blobStorageService");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const blobName = path.basename(req.file.originalname);
    const localFilePath = req.file.path;

    const blobUrl = await uploadImageToBlob(localFilePath, blobName);
    res.send(
      `<p>Uploaded successfully: <a href="${blobUrl}" target="_blank">${blobUrl}</a></p>`
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading image");
  }
});

module.exports = router;
