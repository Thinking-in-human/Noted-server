const { S3, GetObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");

const CONFIG = require("../config/constants");

const s3 = new S3({
  region: CONFIG.S3_REGION,
  accessKeyId: CONFIG.S3_ACCESS_KEY_ID,
  secretAccessKey: CONFIG.S3_SECRET_ACCESSKEY,
});

const bucketParams = {
  Bucket: CONFIG.S3_BUCKET_NAME,
  CORSConfiguration: {
    CORSRules: new Array({
      AllowedMethods: ["GET", "PUT"],
      AllowedOrigins: ["http://localhost:4000"],
      MaxAgeSeconds: 3000,
    }),
  },
};

const s3ConfigSetup = async (next) => {
  try {
    await s3.putBucketCors(bucketParams);
  } catch (error) {
    error.message = "Internal Server Error";
    error.status = 500;

    next(error);
  }
};

const uploadDocumentInS3 = async (documentId, document, next) => {
  try {
    s3ConfigSetup();

    const pdfUpload = new Upload({
      client: s3,
      params: {
        Bucket: CONFIG.S3_BUCKET_NAME,
        Key: `documents/${documentId}.pdf`,
        Body: document,
      },
    });

    pdfUpload.on("httpUploadProgress", (progress) => {
      console.log(progress);
    });

    await pdfUpload.done();
  } catch (error) {
    error.message = "Internal Server Error";
    error.status = 500;

    next(error);
  }
};

const getDocumentInS3 = async (documentId, next) => {
  try {
    s3ConfigSetup();

    const pdfInS3 = new GetObjectCommand({
      Bucket: CONFIG.S3_BUCKET_NAME,
      Key: `documents/${documentId}.pdf`,
    });

    const response = await s3.send(pdfInS3);

    return response.Body;
  } catch (error) {
    error.message = "Internal Server Error";
    error.status = 500;

    next(error);
  }
};

module.exports = {
  uploadDocumentInS3,
  getDocumentInS3,
};
