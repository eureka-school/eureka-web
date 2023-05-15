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
  const col = client.db("eureka-school").collection("users");
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
  const col = client.db("eureka-school").collection("users");
  const id = new ObjectId(params.id);
  const body = await req.json();
  const { name, avatar, roleId, phone, email, username } = body;
  const doc = await col.updateOne(
    { _id: id },
    {
      $set: {
        name,
        avatar,
        roleId: new ObjectId(roleId),
        phone,
        email,
        username,
        updatedAt: new Date(),
      },
    }
  );
  return NextResponse.json({ success: true, data: doc });
}
