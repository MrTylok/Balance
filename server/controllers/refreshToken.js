const User = require('../model/users');
const jwt = require('jsonwebtoken');

const controller = async (req, res) => {
  const auth_cookie = req?.cookies?.jwt_auth;
  const uuid = req?.body?.uuid;

  if (auth_cookie === undefined || uuid === undefined) {
    res.sendStatus(401); //Unauthorized
  }

  let foundUser = await User.findOne({ uuid: uuid }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden

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
        { expiresIn: '1h' }
      );
      return res.json({ accessToken: accessToken, roles: foundUser.roles });
    }
  );
};

module.exports = { controller };
