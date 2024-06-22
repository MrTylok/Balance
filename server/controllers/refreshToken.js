const User = require('../model/users');
const jwt = require('jsonwebtoken');

const controller = async (req, res) => {
  const auth_cookie = req?.cookies?.jwt_auth;
  const uuid = req?.body?.uuid;

  if (auth_cookie === undefined || uuid === undefined) {
    console.log('Info', auth_cookie);
    return res.status(401).json('missing cookie or uuid'); //Unauthorized
  }

  let foundUser = await User.findOne({ uuid: uuid }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden

  console.log('new token for ', foundUser.email);

  jwt.verify(
    auth_cookie,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if (error || foundUser.email !== decoded.email)
        return res.sendStatus(403);

      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: decoded.email,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '20m' }
      );
      return res.json({ accessToken: accessToken, roles: foundUser.roles });
    }
  );
};

module.exports = controller;
