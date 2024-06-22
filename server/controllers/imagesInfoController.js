const Image = require('../model/images');

const controller = async (req, res) => {
  if (checkControllerBody(req) === -1) {
    res.sendStatus(400);
  }

  const { img_info } = req?.body;

  const result_save = await saveImageDb(img_info);

  if (result_save === 1) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(500);
  }
};

const checkControllerBody = (req) => {
  const { img_info } = req?.body;
  if (img_info === undefined) {
    return -1;
  }

  //check content of img_info , expected {name, image_name, level, description}
  if (img_info.name === undefined) return -1;
  if (img_info.image_name === undefined) return -1;
  if (img_info.level === undefined) return -1;
  if (img_info.description === undefined) return -1;

  return 1;
};

const saveImageDb = async (img_info) => {
  try {
    const image = new Image({
      name: img_info.name,
      image_name: img_info.image_name,
      level: img_info.level,
      description: img_info.description,
    });
    await image.save();

    return 1;
  } catch (error) {
    console.log('ImageInfo', error.message);
    return -1;
  }
};

module.exports = controller;
