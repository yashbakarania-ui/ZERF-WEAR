import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ reference: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { reference } = await params;
  const cleanRef = reference.toUpperCase().trim();

  try {
    const order = await prisma.order.findUnique({
      where: { referenceNumber: cleanRef },
      include: {
        items: true,
        statusHistory: {
          orderBy: { createdAt: "asc" },
        },
        shipment: true,
        deliveryAddress: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found with reference " + cleanRef },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

