import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export const userSelect = {
  username: true,
  role: {
    select: {
      name: true,
    },
  },
  profile: {
    select: {
      name: true,
      avatar: true,
      phone: true,
      email: true,
      created_at: true,
      updated_at: true,
    },
  },
};

export async function GET(req: NextRequest) {
  const docs = await prisma.user.findMany({
    // select: userSelect,
  });

  return NextResponse.json({ success: true, data: docs });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, avatar, role_id, phone, email, username, password } = body;
  const userExists = await prisma.user.findFirst({
    where: { username: username },
  });
  if (userExists) {
    return NextResponse.json({
      success: false,
      message: "user already exists",
    });
  }

  const profile = await prisma.profile.create({
    data: {
      name,
      avatar,
      phone,
      email,
    },
  });
  const doc = await prisma.user.create({
    data: {
      username,
      password: await hash(password, 10),
      role_id,
      profile_id: profile.id,
    },
  });

  return NextResponse.json({ success: true, data: doc });
}
