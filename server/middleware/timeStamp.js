const timeStamp = (req, res, next) => {
  console.log(
    req.originalUrl + ' attempt from ',
    req?.body?.uuid,
    'TimeStamp: ',
    Date.now()
  );

  next();
};

module.exports = { timeStamp };
