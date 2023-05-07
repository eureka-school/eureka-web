import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { getToken } from "next-auth/jwt";

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

export async function POST(req: NextRequest) {
  console.log("req.cookies", req.cookies);
  const body = await req.json();
  const { username, password } = body;
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!session || !session.user) {
    return NextResponse.json({ success: false });
  }
  const doc = await prisma.user.update({
    where: { username: username },
    data: {
      password: await hash(password, 10),
    },
  });

  return NextResponse.json({ success: true, data: doc });
}
