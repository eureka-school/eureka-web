import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const docs = await prisma.role.findMany({});
  return NextResponse.json({ success: true, data: docs });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name } = body;
  const roleExists = await prisma.role.findFirst({
    where: { name: name },
  });
  if (roleExists) {
    return NextResponse.json({
      success: false,
      message: "role already exists",
    });
  }
  const doc = await prisma.role.create({
    data: { name },
  });

  return NextResponse.json({ success: true, data: doc });
}
