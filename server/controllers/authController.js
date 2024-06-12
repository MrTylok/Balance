const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../model/users');

const controller = async (req, res) => {
  const { email, psw } = req?.body;

  const foundUser = User.findOne({ email: email });
  if (!foundUser) return res.sendStatus(404); //User not found

  const match = await bcrypt.compare(psw, foundUser.password);

  if (match) {
    const accessToken = jws.sign(
      {
        email: foundUser.email,
      },
      //TODO add access token secret here process.env.access_token_secret
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      {
        email: foundUser.email,
      },
      //TODO add refresh token secret here process.env.refresh_token_secret
      { expiresIn: '1d' }
    );

    foundUser.refreshToken = refreshToken;
    foundUser.save();

    res.status(200);
    res.cookie('jwt_auth', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      accessToken: accessToken,
      roles: foundUser.roles,
    });
  } else {
    res.sendStatus(403);
  }
};
