const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const urlRoutes = require('./routes/urlRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


const limiter = rateLimit({
  windowMs: 20*60*1000, 
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});


app.use(express.json());


app.use(limiter);


app.use('/', urlRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
