const bcrypt = require('bcrypt');
const User = require('../model/users');
const { v4: uuidv4 } = require('uuid');

const controller = async (req, res, next) => {
  if (req?.body?.email === undefined || req?.body?.psw === undefined) {
    return res.sendStatus(403);
  }

  const { email, psw } = req?.body;

  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  return bcrypt.hash(psw, 10).then((hashedPsw) => {
    User.create({ uuid: uuidv4(), email: email, password: hashedPsw }).then(
      () => {
        setLocal(res);
        res.sendStatus(201);
        next();
      },
      (err) => {
        console.log(err);
        return res.sendStatus(500);
      }
    );
  });
};

const setLocal = (res) => {
  res.locals.stat = 'registered_users';
};

module.exports = controller;
