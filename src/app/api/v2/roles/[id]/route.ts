import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("roles");
  const id = new ObjectId(params.id);
  const doc = await col.findOne({ _id: id });
  if (!doc) {
    return NextResponse.json({
      success: false,
      error: { message: "not found" },
    });
  }
  return NextResponse.json({ success: true, data: doc });
}

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("roles");
  const id = new ObjectId(params.id);
  const body = await req.json();
  const { name, level } = body;

  const doc = await col.updateOne(
    { _id: id },
    { $set: { name, level: parseInt(level) } }
  );

  return NextResponse.json({ success: true, data: doc });
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("roles");
  const id = new ObjectId(params.id);
  const doc = await col.deleteOne({ _id: id });

  return NextResponse.json({ success: true, data: doc });
}
