import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("roles");
  const docs = await col.find().toArray();
  return NextResponse.json({ success: true, data: docs });
}

export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("roles");
  const body = await req.json();
  const { name, level } = body;
  const doesExist = await col.findOne({ name });
  if (doesExist) {
    return NextResponse.json({
      success: false,
      message: "role already exists",
    });
  }
  const doc = await col.insertOne({ name, level: parseInt(level) });

  return NextResponse.json({ success: true, data: doc });
}
