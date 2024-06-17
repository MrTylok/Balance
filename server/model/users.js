const mongoose = require('mongoose');

/**
 * Possible roles for each user:
 * 5000 -> default user : no special permissions
 * 5001 -> admin user : can access server config
 *
 * this values are saved under server configuration file
 */

const roles = {
  d: process.env.default_user,
  a: process.env.admin_user,
};

const User = new mongoose.Schema({
  uuid: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: { type: [Number], required: true, default: roles.d },
  refresh_token: { type: String, required: false },
});
