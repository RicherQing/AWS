import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';

const REGION = 'us-east-1'; //e.g. "us-east-1"
const BucketName = 'aws-codestar-us-east-1-189200616234-demo-pipe';
let s3Client = null;

const createS3Client = () => {
  if (!s3Client) {
    s3Client = new S3Client({
      region: REGION,
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: REGION }),
        identityPoolId: 'eu-north-1:90755eab-b2f7-4650-aa6e-af595a687ac9', // IDENTITY_POOL_ID
      }),
    });
  }
  return s3Client;
};
const createPutObjectCommand = async (data) => {
    const params = {
      Bucket: BucketName, // The name of the bucket. For example, 'sample_bucket_101'.
      Key: `${data.name}`, // The name of the object. For example, 'sample_upload.txt'.
    };
    const s3 = createS3Client();
    try {
        /*
       * @ PutObjectCommand 该命令接受一个对象 { Body: '上传数据文件的话为file对象', Bucket: '桶名称', Key: '可以理解为上传到桶中的文件路径( folder/sample_upload.txt )' }
       */
      alert(params.toString());
      await s3.send(new PutObjectCommand({ Body: data, ...params }));
      return `https://s3.${REGION}.amazonaws.com/${BucketName}/${params.Key}`;
    } catch (err) {
      Promise.resolve(err);
    }
  };
  export { createPutObjectCommand };