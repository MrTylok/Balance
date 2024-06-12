const express = require('express');
const router = express.Router();
const controllerAuth = require('../controllers/authController');

const timeStamp = (req, res, next) => {
  if (req?.body?.email === undefined || req?.body?.psw === undefined) {
    return res.sendStatus(403);
  }
  console.log('Login attempt from', req?.body?.email);
  console.log('TimeStamp: ', Date.now());
  next();
};

router.post('/', [timeStamp, controllerAuth]);
