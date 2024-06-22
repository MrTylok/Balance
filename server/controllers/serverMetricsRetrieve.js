const Statistics = require('../model/statistics');

const controller = async (req, res, next) => {
  const projection = 'total_access registered_users';
  const metricsInfo = [];

  const documentInfo = retrieveDocumentName();
  if (documentInfo.status === 404) {
    return res.status(404).json(documentInfo.data);
  }

  await Statistics.findOne({ document_name: documentInfo.data })
    .select(projection)
    .then((file) => {
      if (!file) {
        return res.status(404).json('Missing doc');
      }
      metricsInfo.push({
        metric: 'Total Access',
        info: 'All time access',
        value: file.total_access,
      });
      metricsInfo.push({
        metric: 'Registered Users',
        info: 'All time registration',
        value: file.registered_users,
      });
    });

  if (metricsInfo.length > 0) {
    res.status(200).json(metricsInfo);
  } else {
    res.sendStatus(204);
  }
};

const retrieveDocumentName = () => {
  const stat_file_name = process.env?.server_stat;
  if (!stat_file_name) {
    return { status: 404, data: 'Missing env var' };
  }
  return { status: 200, data: stat_file_name };
};

module.exports = controller;
