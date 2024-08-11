require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Modèle Mongoose
const Vote = require('./models/votes');

// Définir un simple endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Endpoint pour recevoir les votes
app.post('/votes', async (req, res) => {
  const { gmName, eastVotes, westVotes } = req.body;

  const newVote = new Vote({
    gmName,
    eastVotes,
    westVotes,
  });

  try {
    await newVote.save();
    res.status(200).send({ message: 'Votes saved successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to save votes' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});