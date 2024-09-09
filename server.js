const express = require("express");
const path = require("path");
const app = require("./app");
const port = 3000;

app.use(express.static(path.join(__dirname, "static")));

app.listen(port, function () {
  console.log(`Chat App running on http://localhost:${port}/`);
});
