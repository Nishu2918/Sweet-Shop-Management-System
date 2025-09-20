// src/app.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// later we'll import routes
app.get('/', (req, res) => {
  res.json({ message: 'Sweet Shop API is running!' });
});
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const sweetsRoutes = require('./routes/sweets');
app.use('/api/sweets', sweetsRoutes);


module.exports = app;
