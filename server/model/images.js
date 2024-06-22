const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image_name: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String, required: true },
});

const images = mongoose.model('images', imageSchema);
module.exports = images;
