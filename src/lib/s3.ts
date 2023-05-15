import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const client = new S3Client({
  endpoint: process.env.ENDPOINT,
  credentials: {
    accessKeyId: process.env.APPLICATION_KEY_ID || "",
    secretAccessKey: process.env.APPLICATION_KEY || "",
  },
  region: process.env.REGION,
});

export const upload = async ({
  Key,
  Body,
  ContentType,
}: {
  Key: string;
  Body: any;
  ContentType: string;
}) => {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: Key,
      Body: Body,
      ContentType: ContentType,
    });
    const response = await client.send(command);
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const list = async (MaxKeys?: number) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.BUCKET_NAME,
      MaxKeys: MaxKeys ? MaxKeys : 20,
    });
    const response = await client.send(command);
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const get = async (Key: string) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: Key,
    });
    const response = await client.send(command);
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const remove = async (Key: string) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: Key,
    });
    const response = await client.send(command);
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
};
