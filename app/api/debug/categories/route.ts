import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const cats = await prisma.category.findMany({
      select: { id: true, name: true, slug: true, description: true },
      orderBy: { id: "asc" },
    });
    return NextResponse.json({ success: true, count: cats.length, categories: cats });
  } catch (error) {
    console.error("Debug categories error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
