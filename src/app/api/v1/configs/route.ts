import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("configs");
  const docs = await col.find().toArray();
  return NextResponse.json({ success: true, data: docs });
}

export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("configs");
  const body = await req.json();
  const doc = await col.insertOne({
    ...body,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return NextResponse.json({ success: true, data: doc });
}
