import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { buildCustomEnquiryWhatsAppUrl } from "@/lib/whatsapp";

const CustomEnquirySchema = z.object({
  customerName: z.string().min(2),
  customerPhone: z.string().min(10),
  customerEmail: z.string().email(),
  organization: z.string().optional().nullable(),
  apparelCategory: z.string().min(2),
  estimatedQty: z.number().int().min(10),
  printMethod: z.string().optional().nullable(),
  sizeBreakdown: z.string().optional().nullable(),
  colorPreferences: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const validated = CustomEnquirySchema.parse(json);

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const enquiryNumber = `ENQ-CUST-${dateStr}-${randomSuffix}`;

    const newEnquiry = await prisma.customEnquiry.create({
      data: {
        enquiryNumber,
        customerName: validated.customerName,
        customerPhone: validated.customerPhone,
        customerEmail: validated.customerEmail,
        apparelCategory: validated.apparelCategory,
        estimatedQty: validated.estimatedQty,
        printMethod: validated.printMethod || null,
        sizeBreakdown: validated.sizeBreakdown || null,
        colorPreferences: validated.colorPreferences || null,
        notes: validated.notes || null,
        status: "NEW",
      },
    });

    const whatsAppUrl = buildCustomEnquiryWhatsAppUrl({
      enquiryNumber,
      customerName: validated.customerName,
      apparelCategory: validated.apparelCategory,
      estimatedQty: validated.estimatedQty,
      printMethod: validated.printMethod || undefined,
      sizeBreakdown: validated.sizeBreakdown || undefined,
      colorPreferences: validated.colorPreferences || undefined,
      notes: validated.notes || undefined,
    });

    return NextResponse.json(
      {
        success: true,
        enquiryNumber,
        enquiry: newEnquiry,
        whatsAppUrl,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Custom enquiry error:", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const enquiries = await prisma.customEnquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({
      success: true,
      enquiries,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
