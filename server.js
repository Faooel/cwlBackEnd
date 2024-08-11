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
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Définir un simple endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Importer les routes si vous en avez
// const routes = require('./routes');
// app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});