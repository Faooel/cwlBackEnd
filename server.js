require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware CORS avec options spécifiques
const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Origine du frontend
  methods: ['GET', 'POST', 'OPTIONS'], // Méthodes HTTP autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
  credentials: true, // Autoriser les cookies de session
  optionsSuccessStatus: 204 // Pour maintenir la compatibilité avec d'anciens navigateurs
};

app.use(cors(corsOptions));
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

// Middleware personnalisé pour gérer les requêtes préflight (OPTIONS)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.status(204).json({});
  }
  next();
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
    res.status(500).send({ error: 'Failed to save votes', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});