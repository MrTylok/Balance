const allowedOrigins = require('../config/allowedOrigins');

const checkCredentials = (req, res, next) => {
  const origin = req?.headers?.origin;
  if (!origin) next();
  if (allowedOrigins.includes(req?.headers?.origin)) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  next();
};

module.exports = checkCredentials;
