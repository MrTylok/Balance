import { Schema } from 'mongoose';

const imageSchema = new Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Images', imageSchema);
