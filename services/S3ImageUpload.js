const AWS = require('aws-sdk');

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_IAM_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_IAM_SECRET_ACCESS_KEY,
});

const upload_image_to_bucket = async (blob, key) => {
	const uploaded_image = await s3
		.upload({
			Bucket: process.env.AWS_S3_BUCKET_NAME,
			Key: key,
			Body: blob,
			ContentType: 'image/png',
		})
		.promise();

	return uploaded_image;
};

module.exports = {
	upload_image_to_bucket,
};
