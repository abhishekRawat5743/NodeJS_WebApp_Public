require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const uploadRouter = require("./routes/upload");
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use("/upload", uploadRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname + "/about.html"));
});

app.listen(port, () => console.log(`Server running on ${port}`));
