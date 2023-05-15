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
  const col = client.db("eureka-school").collection("configs");
  const id = params.id;
  const doc = await col.findOne({ name: id });

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
  const col = client.db("eureka-school").collection("configs");
  const id = params.id;
  const body = await req.json();

  const doc = await col.replaceOne(
    { name: id },
    { ...body, updatedAt: new Date(), _id: new ObjectId(body._id) }
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
  const col = client.db("eureka-school").collection("configs");
  const id = params.id;
  const doc = await col.deleteOne({ name: id });

  return NextResponse.json({ success: true, data: doc });
}
