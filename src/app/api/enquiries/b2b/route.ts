import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const B2BEnquirySchema = z.object({
  companyName: z.string().min(2),
  contactPerson: z.string().min(2),
  designation: z.string().optional().nullable(),
  gstin: z.string().optional().nullable(),
  email: z.string().email(),
  phone: z.string().min(10),
  category: z.string().min(2),
  quantity: z.number().int().min(25),
  budgetRange: z.string().optional().nullable(),
  deadlineDate: z.string().optional().nullable(),
  deliveryCity: z.string().min(2),
  deliveryPincode: z.string().optional().nullable(),
  requirements: z.string().min(5),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const validated = B2BEnquirySchema.parse(json);

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const enquiryNumber = `ENQ-B2B-${dateStr}-${randomSuffix}`;

    const newEnquiry = await prisma.b2BEnquiry.create({
      data: {
        enquiryNumber,
        companyName: validated.companyName,
        contactPerson: validated.contactPerson,
        designation: validated.designation || null,
        gstin: validated.gstin || null,
        email: validated.email,
        phone: validated.phone,
        category: validated.category,
        quantity: validated.quantity,
        budgetRange: validated.budgetRange || null,
        deadlineDate: validated.deadlineDate ? new Date(validated.deadlineDate) : null,
        deliveryCity: validated.deliveryCity,
        deliveryPincode: validated.deliveryPincode || null,
        requirements: validated.requirements,
        status: "NEW",
      },
    });

    return NextResponse.json(
      {
        success: true,
        enquiryNumber,
        enquiry: newEnquiry,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("B2B enquiry error:", err);
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
    const enquiries = await prisma.b2BEnquiry.findMany({
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
