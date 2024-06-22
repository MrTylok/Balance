const jwt = require('jsonwebtoken');

const authVerify = (req, res, next) => {
  const authorization =
    req?.headers?.authorization || req?.headers?.Authorization;
  if (!authorization) {
    return res.status(401).json('NO header authorization');
  }

  if (!authorization.startsWith('Bearer ')) {
    console.log(2);
    return res.sendStatus(401);
  }
  const token = authorization.split(' ')[1]; //Bearer token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      console.log('Invalid token');
      return res.status(403).json('Invalid token');
    }
    req.email = decoded.UserInfo.email;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = authVerify;
