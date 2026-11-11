import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { buildOrderWhatsAppUrl } from "@/lib/whatsapp";

const OrderItemSchema = z.object({
  variantId: z.string(),
  productTitle: z.string(),
  size: z.string(),
  colorName: z.string(),
  unitPriceInPaise: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

const DeliveryAddressSchema = z.object({
  line1: z.string().min(1, "Street address is required"),
  line2: z.string().optional(),
  landmark: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().length(6, "Postal PIN code must be 6 digits"),
  country: z.string().default("India"),
});

const CreateOrderRequestSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(10, "Valid phone number is required"),
  deliveryAddress: DeliveryAddressSchema,
  items: z.array(OrderItemSchema).min(1, "Order must contain at least 1 item"),
  couponCode: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const validated = CreateOrderRequestSchema.parse(json);

    // Compute pricing strictly on the server
    const subtotalInPaise = validated.items.reduce(
      (acc, item) => acc + item.unitPriceInPaise * item.quantity,
      0
    );

    let discountInPaise = 0;
    if (validated.couponCode === "ZARF10") {
      discountInPaise = Math.round((subtotalInPaise * 10) / 100);
    } else if (validated.couponCode === "WELCOME200") {
      discountInPaise = Math.min(20000, subtotalInPaise);
    }

    const shippingFeeInPaise = subtotalInPaise >= 199900 ? 0 : 9900;
    const totalAmountInPaise = Math.max(
      0,
      subtotalInPaise - discountInPaise + shippingFeeInPaise
    );

    // Unique reference: ZRF-YYYYMMDD-XXXX
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `ZRF-${dateStr}-${randomSuffix}`;

    // Perform atomic transaction with Prisma
    const newOrder = await prisma.$transaction(async (tx) => {
      // Create Delivery Address
      const address = await tx.address.create({
        data: {
          fullName: validated.customerName,
          phone: validated.customerPhone,
          line1: validated.deliveryAddress.line1,
          line2: validated.deliveryAddress.line2 || null,
          landmark: validated.deliveryAddress.landmark || null,
          city: validated.deliveryAddress.city,
          state: validated.deliveryAddress.state,
          postalCode: validated.deliveryAddress.postalCode,
          country: "India",
        },
      });

      // Create Order
      const order = await tx.order.create({
        data: {
          referenceNumber,
          customerName: validated.customerName,
          customerEmail: validated.customerEmail,
          customerPhone: validated.customerPhone,
          deliveryAddressId: address.id,
          status: "ORDER_REQUESTED",
          subtotalInPaise,
          discountInPaise,
          shippingFeeInPaise,
          totalAmountInPaise,
          couponCode: validated.couponCode || null,
          notes: validated.notes || null,
          items: {
            create: validated.items.map((item) => ({
              variantId: item.variantId,
              productTitle: item.productTitle,
              size: item.size,
              colorName: item.colorName,
              unitPriceInPaise: item.unitPriceInPaise,
              quantity: item.quantity,
              totalPriceInPaise: item.unitPriceInPaise * item.quantity,
            })),
          },
          statusHistory: {
            create: {
              toStatus: "ORDER_REQUESTED",
              comment: "Official Order Request recorded in system.",
              createdBy: "CUSTOMER",
            },
          },
        },
        include: {
          items: true,
          statusHistory: true,
          deliveryAddress: true,
        },
      });

      // Update Inventory: decrement stockQuantity
      for (const item of validated.items) {
        const variant = await tx.productVariant.findUnique({
          where: { id: item.variantId },
        });

        if (variant) {
          const newStock = Math.max(0, variant.stockQuantity - item.quantity);
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { stockQuantity: newStock },
          });

          await tx.inventoryMovement.create({
            data: {
              variantId: item.variantId,
              type: "RESERVED",
              quantity: -item.quantity,
              balance: newStock,
              note: `Reserved for order ${referenceNumber}`,
              referenceId: order.id,
            },
          });
        }
      }

      return order;
    });

    const whatsAppUrl = buildOrderWhatsAppUrl({
      orderReference: referenceNumber,
      customerName: validated.customerName,
      customerPhone: validated.customerPhone,
      deliveryCity: validated.deliveryAddress.city,
      items: validated.items.map((i) => ({
        title: i.productTitle,
        variant: `${i.size} / ${i.colorName}`,
        quantity: i.quantity,
        priceInPaise: i.unitPriceInPaise,
      })),
      totalAmountInPaise,
    });

    return NextResponse.json(
      {
        success: true,
        order: newOrder,
        whatsAppUrl,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Order creation error:", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: err.message || "Failed to process order request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
        statusHistory: true,
        deliveryAddress: true,
        shipment: true,
      },
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
