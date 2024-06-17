const timeStamp = (req, res, next) => {
  console.log(req.path + ' attempt from ', req?.body?.email);
  console.log('TimeStamp: ', Date.now());
  next();
};

module.exports = { timeStamp };
