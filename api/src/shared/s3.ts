import { S3Client } from 'bun';

export const s3 = new S3Client({
    accessKeyId: process.env.S3_ACCESS_ID,
    secretAccessKey: process.env.S3_SECRET_KEY,
    bucket: process.env.S3_BUCKET,

    endpoint: process.env.S3_ENDPOINT,
});
