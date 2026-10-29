import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const orgs = await prisma.organization.findMany({
      orderBy: { id: "asc" },
      include: {
        news: {
          select: { id: true },
        },
      },
    });

    return NextResponse.json(orgs);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}