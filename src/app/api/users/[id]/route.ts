import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id } = params;
  const docs = await prisma.user.findFirst({
    where: { id: parseInt(id) },
    select: userSelect,
  });

  return NextResponse.json({ success: true, data: docs });
}

// export async function PUT(
//   req: NextRequest,
//   {
//     params,
//   }: {
//     params: { id: string };
//   }
// ) {
//   const body = await req.json();
//   const { name, avatar, role_id, phone, email, username, password } = body;

//   const profile = await prisma.profile.create({
//     data: {
//       name,
//       avatar,
//       phone,
//       email,
//     },
//   });
//   const doc = await prisma.user.create({
//     data: { username, password, role_id, profile_id: profile.id },
//   });

//   return NextResponse.json({ success: true, data: doc });
// }
