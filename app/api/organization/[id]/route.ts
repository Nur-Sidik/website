import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orgId = parseInt(id, 10);

    if (isNaN(orgId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const org = await prisma.organization.findUnique({
      where: { id: orgId },
      include: {
        news: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!org) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(org);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}