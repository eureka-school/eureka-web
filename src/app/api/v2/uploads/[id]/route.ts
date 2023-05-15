import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { get, remove } from "@/lib/s3";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("uploads");
  const id = new ObjectId(params.id);
  const doc = await col.findOne({ _id: id });
  if (!doc) {
    return NextResponse.json({
      success: false,
      error: { message: "not found" },
    });
  }
  const res = (await get(doc!.Key)) as any;
  return new Response(res.Body);
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
  const col = client.db("eureka-school").collection("uploads");
  const id = new ObjectId(params.id);
  const doc = await col.findOne({ _id: id });
  if (!doc) {
    return NextResponse.json({
      success: false,
      error: { message: "not found" },
    });
  }
  await col.deleteOne({ _id: id });
  const res = (await remove(doc!.Key)) as any;
  return NextResponse.json({
    success: true,
    data: res,
  });
}
