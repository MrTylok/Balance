const timeStamp = (req, res, next) => {
  const path = req.originalUrl;
  const id = req?.body?.uuid === undefined ? req?.body?.email : req?.body?.uuid;
  console.log(path + ' attempt from ' + id + ' TimeStamp: ' + Date.now());

  next();
};

module.exports = timeStamp;
