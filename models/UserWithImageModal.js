const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserWithImageSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		image_url: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('UserWithImage', UserWithImageSchema);
