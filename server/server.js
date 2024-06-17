const express = require('express');
const mongoose = require('mongoose');

const app = express();
const connectDB = require('./config/mongoDB');

//config env variables
require('dotenv').config();

//call function for connection to database
connectDB();

//cookie parser
app.use(require('cookie-parser')());

//middleware for json body req
app.use(express.json());

app.use('/imagesCarousel', require('./routes/imagesCarousel'));
app.use('/auth', require('./routes/auth'));
app.use('/register', require('./routes/register'));
app.use('/refresh', require('./routes/refresh'));

//middleware for protected routes
app.use(require('./middleware/verifyAuthorization'));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(
    process.env.PORT,
    console.log('Server listening on port ' + process.env.PORT)
  );
});
