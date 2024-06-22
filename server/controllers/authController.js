const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../model/users');

const controller = async (req, res, next) => {
  if (req?.body?.email === undefined || req?.body?.psw === undefined) {
    return res.sendStatus(403);
  }

  const { email, psw } = req?.body;

  let foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.sendStatus(404); //User not found

  return bcrypt
    .compare(psw, foundUser.password)
    .then((match) => {
      if (match) {
        const accessToken = jwt.sign(
          {
            UserInfo: {
              email: foundUser.email,
              roles: foundUser.roles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '20m' }
        );

        const refreshToken = jwt.sign(
          {
            email: foundUser.email,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d' }
        );

        foundUser.refresh_token = refreshToken;
        foundUser.save();
        setLocal(res);
        res.status(200);
        res.cookie('jwt_auth', refreshToken, {
          httpOnly: true,
          sameSite: 'None',
          secure: false,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({
          accessToken: accessToken,
          uuid: foundUser.uuid,
          roles: foundUser.roles,
        });

        next();
      } else {
        res.sendStatus(403);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
};

const setLocal = (res) => {
  res.locals.stat = 'total_access';
};

module.exports = controller;
