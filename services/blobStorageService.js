const { BlobServiceClient } = require("@azure/storage-blob");
const fs = require("fs");
require("dotenv").config();

const connectionString = process.env.DB_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

if (!connectionString) {
  throw new Error("AZURE_STORAGE_CONNECTION_STRING is not set.");
}

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

async function uploadImageToBlob(filePath, blobName) {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const uploadBlobResponse = await blockBlobClient.uploadFile(filePath);
  console.log("Upload complete:", uploadBlobResponse.requestId);

  fs.unlink(filePath, () => {}); // delete temp file
  return blockBlobClient.url;
}

module.exports = { uploadImageToBlob };
