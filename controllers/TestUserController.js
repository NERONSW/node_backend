const { upload_image_to_bucket } = require("../services/S3ImageUpload.js");
const UserWithImageModal = require("../models/UserWithImageModal");

// const db = require('../database/instance');

// const Slides = db.Slides;

/**
 * Uploads the image into the S3 bucket & stores the genrated link in the database.
 * @param {*} file
 * @param {*} data req.body object
 * @returns Created Slide element
 */
const create_image_data = async (file, data) => {
  try {
    const blob = file.buffer;
    const key = file.originalname;
    const uploaded_image = await upload_image_to_bucket(blob, key);
    data.image_url = uploaded_image.Location;

    const newUser = await UserWithImageModal.create(data);
    return newUser;
  } catch (e) {
    //console.log('Error :', e);
    console.error("Something went wrong in User Controller :", e);
    process.exit(1);
  }
};

module.exports = {
  create_image_data,
};
