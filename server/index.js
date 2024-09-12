const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const Deck = require("./models/Deck");

require("dotenv").config();

app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello" });
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log(`port listening on ${port}`);
  app.listen(port);
});
