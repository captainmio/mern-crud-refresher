
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const workoutsRoutes = require('./routes/workouts');

// constants
const PORT = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;


// express app initialization
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
})

// routes
app.use('/api/workouts', workoutsRoutes)

// connect to DB
mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    // listen on port
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:');
    console.error(error);
  });


