const express = require("express");
const multer = require("multer");
const path = require("path");
const os = require("os");
const { uploadImageToBlob } = require("../services/blobStorageService");

const upload = multer({ dest: path.join(os.tmpdir(), "uploads") });
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
    console.error("Upload failed:", err);
    res.status(500).send(`Upload failed: ${err.message}`);
  }
});

module.exports = router;
