const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { randomUUID } = require('node:crypto');
const { extname } = require('node:path');
const { s3Client } = require('../libs/s3-service');

async function uploadImageBucket(image, productId) {
  if (!image) {
    return null;
  }

  const mimeTypeRegex = /^(image)\/[a-zA-Z]+/;

  const isValidFormat = mimeTypeRegex.test(image.mimetype);

  if (!isValidFormat) {
    throw new Error('Formato de imagem inválido.');
  }

  const imageId = randomUUID();
  const imageExtension = extname(image.originalname);

  const imageName = imageId.concat(imageExtension);

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `products/${productId}/${imageName}`,
    Body: image.buffer,
  });

  const response = await s3Client.send(command);

  if (response.$metadata.httpStatusCode !== 200) {
    throw new Error('Erro ao enviar a imagem.');
  }

  const imageUrl = new URL(process.env.AWS_BASE_URL);

  imageUrl.pathname = `products/${productId}/${imageName}`;

  return imageUrl.toString();
}

module.exports = { uploadImageBucket };
