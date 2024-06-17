/**
 * Controller to supply fixed number of images names
 * @param {*} req holding query with number of images
 * @param {*} res
 * @returns
 */
const controller = (req, res) => {
  const {
    query: { q },
  } = req;
  if (!q) {
    //400 Bad Request
    return res.sendStatus(400);
  }

  if (isNaN(q)) {
    //return bad content , q should be a number
    //406 Not Acceptable
    return res.sendStatus(406);
  }

  if (q > 6 || q < 1) {
    //return bad content , q should be included in [1,6]
    return res.sendStatus(406);
  }

  //TODO everythings ok return content
  return res.sendStatus(200);
};

module.exports = controller;
