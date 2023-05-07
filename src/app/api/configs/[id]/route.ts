import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

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
  const { name } = body;

  const doc = await col.updateOne(
    { name: id },
    { ...body, updatedAt: new Date() }
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
