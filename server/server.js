const express = require('express');

const app = express();

//config env variables
require('dotenv').config();

app.get('/imagesCarousel');

app.listen(
  process.env.PORT,
  console.log('Server listening on port ' + process.env.PORT)
);
