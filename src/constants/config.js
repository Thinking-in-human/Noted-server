require("dotenv").config();

const CONFIG = {
  PORT: process.env.PORT,
  MONGODB: process.env.MONGODB,
  S3_REGION: process.env.S3_REGION,
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESSKEY: process.env.S3_SECRET_ACCESSKEY,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
};

module.exports = CONFIG;
