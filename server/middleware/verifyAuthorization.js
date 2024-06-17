const jwt = require('jsonwebtoken');

const authVerify = (req, res, next) => {
  const authorization =
    req?.headers?.authorization || req?.headers?.Authorization;
  if (!authorization) {
    return res.sendStatus(401);
  }

  if (!authorization.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }
  const token = authorization.split(' '); //Bearer token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.sendStatus(403);
    }
    req.email = decoded.UserInfo.email;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = authVerify;
