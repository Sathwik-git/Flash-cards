const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3000;
const Deck = require("./models/Deck");

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/decks", async (req, res) => {
  const decks = await Deck.find();
  res.json(decks);
});

app.post("/decks", async (req, res) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

app.delete("/decks/:deckId", async (req, res) => {
  const deletedDeck = await Deck.findByIdAndDelete(req.params.deckId);
  res.json(deletedDeck);
});

app.post("/decks/:deckId/cards", async (req, res) => {
  const deck = await Deck.findById(req.params.deckId);
  const card = req.body.text;
  deck.cards.push(card);
  await deck.save();
  res.send("done");
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log(`port listening on ${port}`);
  app.listen(port);
});
