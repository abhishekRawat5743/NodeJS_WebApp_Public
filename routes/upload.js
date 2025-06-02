const express = require("express");
const multer = require("multer");
const path = require("path");
const os = require("os");
const axios = require("axios");
const { uploadImageToBlob } = require("../services/blobStorageService");

const upload = multer({ dest: path.join(os.tmpdir(), "uploads") });
const router = express.Router();

// Logic App's trigger URL (store in env for safety)
const logicAppUrl = process.env.LOGIC_APP_TRIGGER_URL;

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const blobName = path.basename(req.file.originalname);
    const localFilePath = req.file.path;

    const blobUrl = await uploadImageToBlob(localFilePath, blobName);

    // ✅ Notify Logic App
    await axios.post(
      logicAppUrl,
      {
        blobName,
        blobUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.send(
      `<p>Uploaded successfully: <a href="${blobUrl}" target="_blank">${blobUrl}</a></p>`
    );
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).send(`Upload failed: ${err.message}`);
  }
});

module.exports = router;
