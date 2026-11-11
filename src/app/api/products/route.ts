import { NextRequest, NextResponse } from "next/server";
import { DEMO_PRODUCTS } from "@/lib/demo-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sort = searchParams.get("sort") || "featured";

  let products = [...DEMO_PRODUCTS];

  if (category && category !== "all") {
    products = products.filter((p) => p.category.slug === category);
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.name.toLowerCase().includes(q)
    );
  }

  if (minPrice) {
    products = products.filter((p) => p.basePriceInPaise >= Number(minPrice));
  }

  if (maxPrice) {
    products = products.filter((p) => p.basePriceInPaise <= Number(maxPrice));
  }

  if (sort === "price_asc") {
    products.sort((a, b) => a.basePriceInPaise - b.basePriceInPaise);
  } else if (sort === "price_desc") {
    products.sort((a, b) => b.basePriceInPaise - a.basePriceInPaise);
  } else if (sort === "featured") {
    products.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  return NextResponse.json({
    success: true,
    count: products.length,
    products,
  });
}

