const { S3, GetObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");

const CONFIG = require("../constants/config");
const ERRORMESSAGE = require("../constants/error");

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
    error.message = ERRORMESSAGE.ERROR_500;
    error.status = 500;

    return next(error);
  }
};

const uploadDocumentInS3 = async (documentTitle, document, next) => {
  try {
    await s3ConfigSetup();

    const pdfUpload = new Upload({
      client: s3,
      params: {
        Bucket: CONFIG.S3_BUCKET_NAME,
        Key: `documents/${documentTitle}.pdf`,
        Body: document,
      },
    });

    pdfUpload.on("httpUploadProgress", (progress) => {
      console.log(progress);
    });

    await pdfUpload.done();
  } catch (error) {
    error.message = ERRORMESSAGE.ERROR_500;
    error.status = 500;

    return next(error);
  }
};

const getDocumentInS3 = async (documentTitle, next) => {
  try {
    await s3ConfigSetup(next);

    const pdfInS3 = new GetObjectCommand({
      Bucket: CONFIG.S3_BUCKET_NAME,
      Key: `documents-${documentTitle}.pdf`,
    });

    const readableStream = await s3.send(pdfInS3);
    const arrayBuffer = await readableStream.Body.transformToByteArray();
    const buffer = Buffer.from(arrayBuffer);

    return buffer;
  } catch (error) {
    error.message = ERRORMESSAGE.ERROR_500;
    error.status = 500;

    return next(error);
  }
};

module.exports = {
  uploadDocumentInS3,
  getDocumentInS3,
};
