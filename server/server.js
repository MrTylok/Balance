const express = require('express');
const mongoose = require('mongoose');

const app = express();
const connectDB = require('./config/mongoDB');

//config env variables
require('dotenv').config();

//call function for connection to database
connectDB();

app.use('/imagesCarousel', require('./routes/imagesCarousel'));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(
    process.env.PORT,
    console.log('Server listening on port ' + process.env.PORT)
  );
});
