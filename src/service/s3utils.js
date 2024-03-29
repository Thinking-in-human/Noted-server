const { S3, GetObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");

const CONFIG = require("../constants/config");
const ERRORMESSAGE = require("../constants/error");

const s3 = new S3({
  region: CONFIG.S3_REGION,
  credentials: {
    accessKeyId: CONFIG.S3_ACCESS_KEY_ID,
    secretAccessKey: CONFIG.S3_SECRET_ACCESSKEY,
  },
});

const bucketParams = {
  Bucket: CONFIG.S3_BUCKET_NAME,
  CORSConfiguration: {
    CORSRules: new Array({
      AllowedMethods: ["GET", "PUT"],
      AllowedOrigins: [CONFIG.CLIENT_URL],
      MaxAgeSeconds: 3000,
    }),
  },
};

const s3ConfigSetup = async () => {
  try {
    await s3.putBucketCors(bucketParams);
  } catch (error) {
    throw error;
  }
};

const uploadDocumentInS3 = async (userId, documentId, document) => {
  try {
    await s3ConfigSetup();

    const pdfUpload = new Upload({
      client: s3,
      params: {
        Bucket: CONFIG.S3_BUCKET_NAME,
        Key: `users/${userId}/documents/${documentId}.pdf`,
        Body: document,
      },
    });

    pdfUpload.on("httpUploadProgress", (progress) => {
      console.log("progress", progress);
    });

    await pdfUpload.done();
  } catch (error) {
    throw error;
  }
};

const getDocumentInS3 = async (userId, documentId) => {
  try {
    await s3ConfigSetup();

    const pdfInS3 = new GetObjectCommand({
      Bucket: CONFIG.S3_BUCKET_NAME,
      Key: `users/${userId}/documents/${documentId}.pdf`,
    });

    const readableStream = await s3.send(pdfInS3);
    const arrayBuffer = await readableStream.Body.transformToByteArray();

    const buffer = Buffer.from(arrayBuffer);

    return buffer;
  } catch (error) {
    throw error;
  }
};

const getFontInS3 = async (fontId) => {
  try {
    await s3ConfigSetup();

    const fontInS3 = new GetObjectCommand({
      Bucket: CONFIG.S3_BUCKET_NAME,
      Key: `font/${fontId}.woff2`,
    });
    const readableStream = await s3.send(fontInS3);
    const arrayBuffer = await readableStream.Body.transformToByteArray();
    const buffer = Buffer.from(arrayBuffer);

    return buffer;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  uploadDocumentInS3,
  getDocumentInS3,
  getFontInS3,
};
