const mongoose = require('mongoose');
const Image = require('../model/images');
const { options } = require('../routes/imagesCarousel');

const controller = async (req, res) => {
  let type, value, records;

  const dataValidation = checkData(req);
  if (dataValidation.code === -1)
    return res.status(400).json(dataValidation.cause);
  else if (dataValidation.code === -2)
    return res.status(404).json(dataValidation.cause);
  if (dataValidation.code === 1) ({ type, value, records } = req?.body);

  const images = await dataRetrieve(type, value, records);
  if (images.length >= 1) {
    if (images.length < parseInt(records)) {
      return res
        .status(206)
        .json({ expected: records, actual: images.length, images: images });
    } else {
      return res.status(200).json(images);
    }
  } else {
    return res.sendStatus(204);
  }
};

const checkData = (req) => {
  const { type, value, records } = req?.body;
  if (!type) {
    return { code: -1, cause: 'type missing' };
  }
  if (!value) {
    return { code: -1, cause: 'value missing' };
  }
  if (!records) {
    return { code: -1, cause: 'records missing' };
  }

  if (type !== 'name' && type !== 'level' && type !== 'description')
    return {
      code: -2,
      cause: 'type must be name/level/description but is ' + type,
    };

  if (isNaN(parseInt(records)) || records < 1 || records > 10)
    return { code: -2, cause: 'records doesnt match the requirements' };

  return { code: 1, cause: 'Ok' };
};

const dataRetrieve = async (type, value, records) => {
  let retrievedImages;
  const requiredFields = 'name image_name level description';
  const options = { limit: records };
  switch (type) {
    case 'name':
      retrievedImages = await Image.find(
        { name: value },
        requiredFields,
        options
      ).exec();

      break;
    case 'level':
      retrievedImages = await Image.find(
        { level: value },
        requiredFields,
        options
      ).exec();

      break;
    case 'description':
      const strings = value.split(' ');
      if (strings.length < 1) return [];
      let regexs = [];
      strings.map((s, idx) => {
        if (s.length > 20) return;
        else regexs.push(new RegExp(s, 'i'));
        return;
      });
      if (regexs.length >= 1) {
        retrievedImages = await Image.find(
          { description: { $in: regexs } },
          requiredFields,
          options
        ).exec();
      }
      break;

    default:
      return [];
  }
  return retrievedImages;
};

module.exports = controller;
