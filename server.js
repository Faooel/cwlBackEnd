const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Définir la chaîne de connexion MongoDB
const mongoURI = process.env.MONGODB_URI || 'YOUR_LOCAL_MONGODB_CONNECTION_STRING';

// Connexion à MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Modèle Mongoose pour les votes
const voteSchema = new mongoose.Schema({
  gmName: String,
  eastVotes: [String],
  westVotes: [String],
  timestamp: { type: Date, default: Date.now }
});

const Vote = mongoose.model('Vote', voteSchema);

// Route pour soumettre les votes
app.post('/submitVotes', async (req, res) => {
  const { gmName, eastVotes, westVotes } = req.body;

  const newVote = new Vote({ gmName, eastVotes, westVotes });

  try {
    await newVote.save();
    res.status(201).json({ message: "Vote submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});