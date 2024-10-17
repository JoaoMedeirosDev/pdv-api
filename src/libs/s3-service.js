const { S3Client } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  Region: process.env.AWS_REGION,
});

module.exports = { s3Client };
