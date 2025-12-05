import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category"); // slug optionnel

    const where: any = {};
    if (category) {
      const cat = await prisma.category.findUnique({ where: { slug: category } });
      if (!cat) return NextResponse.json({ success: true, count: 0, products: [] });
      where.categoryId = cat.id;
    }

    const products = await prisma.product.findMany({
      where,
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        basePrice: true,
        active: true,
        stock: true,
        categoryId: true,
        images: { select: { url: true, order: true } },
      },
      orderBy: { id: "desc" },
      take: 200,
    });

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error) {
    console.error("Debug products error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
