import { NextRequest, NextResponse } from "next/server";
import { DEMO_PRODUCTS } from "@/lib/demo-data";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { slug } = await params;
  const product = DEMO_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return NextResponse.json(
      { success: false, message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    product,
  });
}

