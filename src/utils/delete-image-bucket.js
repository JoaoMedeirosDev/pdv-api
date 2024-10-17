const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('../libs/s3-service');

async function deleteImagemBucket(productImage) {
  if (!productImage) {
    return null;
  }
  const imageUrl = new URL(productImage);

  const imageName = imageUrl.pathname.replace('/', '');

  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageName,
  });

  const response = await s3Client.send(command);

  return response;
}

module.exports = { deleteImagemBucket };
