const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../model/users');
const { v4: uuidv4 } = require('uuid');

const controller = async (req, res) => {
  if (req?.body?.email === undefined || req?.body?.psw === undefined) {
    return res.sendStatus(403);
  }

  const { email, psw } = req?.body;

  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  return bcrypt.hash(psw, 10).then((hashedPsw) => {
    User.create({ uuid: uuidv4(), email: email, password: hashedPsw }).then(
      () => {
        return res.sendStatus(201);
      },
      (err) => {
        console.log(err);
        return res.sendStatus(500);
      }
    );
  });
};

module.exports = { controller };
