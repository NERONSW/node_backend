const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TestUserSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('TestUser', TestUserSchema);
