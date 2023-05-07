import { NextRequest, NextResponse } from "next/server";
import s3 from "@/lib/s3";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file: Blob = form.get("file") as any;
  const data = await file.arrayBuffer();

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: file.name,
    Body: Buffer.from(data),
    ContentType: file.type,
  };

  const res = await s3.upload(params).promise();

  return NextResponse.json({ success: true, data: res });
}
