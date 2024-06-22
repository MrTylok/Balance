const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  document_name: { type: String, default: 'server-stat' },
  daily_access: { type: Number, default: 0 },
  total_access: { type: Number, default: 0 },
  registered_users: { type: Number, default: 0 },
});

const statistics = mongoose.model('statistics', schema);

module.exports = statistics;
