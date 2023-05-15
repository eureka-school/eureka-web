import { NextRequest, NextResponse } from "next/server";
import { upload } from "@/lib/s3";
import clientPromise from "@/lib/mongodb";
import { uploadLocation } from "@/lib/helper";

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("uploads");
  // const res = (await list()) as any;

  // const docs = await col.insertMany(
  //   res?.Contents?.map((v: any) => ({
  //     Key: v.Key,
  //     createdAt: new Date(),
  //   }))
  // );
  const docs = await col.find({}).toArray();
  const mapped = docs.map((doc) => ({
    ...doc,
    Location: uploadLocation(doc._id.toString()),
  }));
  return NextResponse.json({ success: true, data: mapped });
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file: Blob = form.get("file") as any;
  const data = await file.arrayBuffer();
  const Key = `${new Date().valueOf()}_${file.name}`;
  const res = await upload({
    Key: Key,
    Body: Buffer.from(data),
    ContentType: file.type,
  });

  if (!res) {
    return NextResponse.json({
      success: true,
      error: {
        message: "upload failed",
      },
    });
  }

  const client = await clientPromise;
  const col = client.db("eureka-school").collection("uploads");
  const doc = await col.insertOne({
    Key: Key,
    createdAt: new Date(),
  });
  return NextResponse.json({
    success: true,
    data: { _id: doc.insertedId, Key },
  });
}
