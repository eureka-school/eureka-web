import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("users");
  const docs = await col
    .aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "roleId",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $addFields: {
          role: {
            $arrayElemAt: ["$role", 0],
          },
        },
      },
      {
        $project: {
          password: 0,
        },
      },
    ])
    .toArray();
  return NextResponse.json({ success: true, data: docs });
}

export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const col = client.db("eureka-school").collection("users");
  const body = await req.json();
  const { name, avatar, roleId, phone, email, username, password } = body;
  const doesExist = await col.findOne({ username });
  if (doesExist) {
    return NextResponse.json({
      success: false,
      message: "user already exists",
    });
  }

  const doc = await col.insertOne({
    name,
    avatar,
    roleId: new ObjectId(roleId),
    phone,
    email,
    username,
    password: await hash(password, 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return NextResponse.json({ success: true, data: doc });
}
