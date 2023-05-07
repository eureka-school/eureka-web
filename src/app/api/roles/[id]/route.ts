import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const id = parseInt(params.id);
  const doc = await prisma.role.findFirst({
    where: { id: id },
  });

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
  const id = parseInt(params.id);
  const body = await req.json();
  const { name } = body;

  const doc = await prisma.role.update({
    where: { id: id },
    data: { name },
  });

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
  const id = parseInt(params.id);
  const doc = await prisma.role.delete({
    where: { id: id },
  });

  return NextResponse.json({ success: true, data: doc });
}
