const jwt = require('jsonwebtoken');
const User = require('../model/users');

const controller = (req, res) => {
  let cookie = checkCookie(req, res);
  if (cookie.ret === -1) return res.sendStatus(204);

  const verify = verifyToken(cookie.token, process.env.REFRESH_TOKEN_SECRET);
  if (verify) {
    checkDb(cookie.token);
    clearCookie(res, 'jwt_auth', {
      httpOnly: true,
      sameSite: 'None',
      secure: false,
    });
  } else {
    return res.sendStatus(403);
  }

  return res.sendStatus(200);
};

const checkCookie = (req) => {
  const token = req?.cookies?.jwt_auth;
  if (token === undefined) {
    return { ret: -1, token: undefined };
  }

  return { ret: 200, token: token };
};

const verifyToken = (token, secret) => {
  let result;
  jwt.verify(token, secret, (error, decoded) => {
    if (error) result = false;
    result = true;
  });
  return result;
};

const checkDb = async (filter) => {
  foundUser = await User.findOne({ filter }).exec();
  if (!foundUser) return false;
  else {
    foundUser.refresh_token = '';
    await foundUser.save();
    return true;
  }
};

const clearCookie = (res, cookieName, options) => {
  res.clearCookie(cookieName, options);
};

module.exports = controller;
