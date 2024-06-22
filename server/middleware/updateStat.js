const Statistics = require('../model/statistics');

/**
 * Middleware to update statistics after an operation completes successfully
 *
 *
 */
const updateStats = async (req, res) => {
  const stat = res.locals?.stat;
  if (checkStat(stat) == -1) {
    return;
  }
  const projection = stat;

  const documentInfo = retrieveDocumentName();
  if (documentInfo.status === '404') {
    return;
  }
  const doc = await Statistics.findOne(
    { document_name: documentInfo.data },
    projection
  ).exec();
  if (!doc) return;
  else {
    doc[stat] = doc[stat] + 1;
    await doc.save();
    return;
  }
};

const retrieveDocumentName = () => {
  const stat_file_name = process.env?.server_stat;
  if (!stat_file_name) {
    return { status: 404, data: 'Missing env var' };
  }
  return { status: 200, data: stat_file_name };
};

const checkStat = (stat) => {
  const allowedStat = ['total_access', 'registered_users'];
  if (!allowedStat.includes(stat)) {
    return -1;
  } else {
    return 1;
  }
};

module.exports = updateStats;
