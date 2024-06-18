const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const connectDB = require('./config/mongoDB');
const corsOptions = require('./config/corsConfig');

//config env variables
require('dotenv').config();

//call function for connection to database
connectDB();

//cookie parser
app.use(require('cookie-parser')());

//middleware for json body req
app.use(express.json());

//set credentials if allowed
app.use(require('./middleware/credentials'));

//cors
app.use(cors(corsOptions));

app.use('/imagesCarousel', require('./routes/imagesCarousel'));
app.use('/auth', require('./routes/auth'));
app.use('/register', require('./routes/register'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

//middleware for protected routes
app.use(require('./middleware/verifyAuthorization'));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(
    process.env.PORT,
    console.log('Server listening on port ' + process.env.PORT)
  );
});
