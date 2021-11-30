const express = require("express");

const app = express();
const port = 3000;

app.listen(port, (req, res) => {
  console.log(`Listening for requests at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Initial project setup");
});
