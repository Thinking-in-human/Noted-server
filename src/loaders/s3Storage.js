const { S3 } = require("@aws-sdk/client-s3");
const CONFIG = require("../config/constants");

const s3ConfigLoader = async () => {
  try {
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

    await s3.putBucketCors(bucketParams);
  } catch (error) {
    console.log(error, "S3 bucket config error");
  }
};

module.exports = s3ConfigLoader;
