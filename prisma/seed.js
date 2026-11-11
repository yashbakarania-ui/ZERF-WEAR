const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Starting ZARF Wear database seed...");

  // 1. Store Settings
  await prisma.storeSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      storeName: "ZARF Wear",
      whatsappNumber: "+919876543210",
      supportEmail: "support@zarfwear.in",
      supportPhone: "+918000000000",
      address: "ZARF Studios, Industrial Fashion District, Mumbai, MH, 400013",
      freeShippingThresholdInPaise: 199900,
      standardShippingFeeInPaise: 9900,
      b2bMinimumOrderQuantity: 25,
      orderPrefix: "ZRF",
    },
  });

  // 2. Coupons
  await prisma.coupon.upsert({
    where: { code: "ZARF10" },
    update: {},
    create: {
      code: "ZARF10",
      discountType: "PERCENTAGE",
      discountValue: 10,
      minOrderValueInPaise: 99900,
      isActive: true,
    },
  });

  await prisma.coupon.upsert({
    where: { code: "WELCOME200" },
    update: {},
    create: {
      code: "WELCOME200",
      discountType: "FIXED_PAISE",
      discountValue: 20000,
      minOrderValueInPaise: 149900,
      isActive: true,
    },
  });

  // 3. Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@zarfwear.in" },
    update: {},
    create: {
      email: "admin@zarfwear.in",
      name: "ZARF Studio Lead",
      phone: "+919876543210",
      role: "ADMIN",
    },
  });

  // 4. Customer User with Address
  const customerUser = await prisma.user.upsert({
    where: { email: "aarav@gmail.com" },
    update: {},
    create: {
      email: "aarav@gmail.com",
      name: "Aarav Sharma",
      phone: "+919876543210",
      role: "CUSTOMER",
      addresses: {
        create: {
          fullName: "Aarav Sharma",
          phone: "+919876543210",
          line1: "Flat 402, Skyline Towers, 14th Road",
          city: "Mumbai",
          state: "Maharashtra",
          postalCode: "400050",
          country: "India",
          isDefault: true,
        },
      },
    },
  });

  // 5. Categories
  const categoriesData = [
    {
      id: "cat_oversized",
      slug: "oversized-t-shirts",
      name: "Oversized T-Shirts",
      description: "Architectural drop-shoulder silhouettes in 240-280 GSM French Terry and single-origin combed cotton.",
      imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "cat_hoodies",
      slug: "hoodies",
      name: "Hoodies & Sweatshirts",
      description: "400 GSM heavyweight brushed fleece with double-layer hoods, seamless ribbing, and minimal hardware.",
      imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "cat_polos",
      slug: "polo-t-shirts",
      name: "Polo T-Shirts",
      description: "Structured honeycomb pique and luxury mercerized cotton, engineered for boardroom-to-street transitions.",
      imageUrl: "https://images.unsplash.com/photo-1625910513413-74291c953589?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "cat_sweats",
      slug: "sweatshirts",
      name: "Crewneck Sweatshirts",
      description: "Drop-cut crewnecks crafted with interior flatlock stitching and zero-twist loopback cotton.",
      imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "cat_caps",
      slug: "caps",
      name: "Caps & Headwear",
      description: "Heavy twill 6-panel unstructured dad caps and structured snapbacks with precision tonal embroidery.",
      imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "cat_corporate",
      slug: "corporate-uniforms",
      name: "Corporate & Team Apparel",
      description: "Bespoke corporate merchandise, branded executive workwear, and custom university apparel with bulk tiers.",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // 6. Products & Variants
  const p1 = await prisma.product.upsert({
    where: { slug: "zarf-280gsm-heavyweight-oversized-tee-onyx" },
    update: {},
    create: {
      slug: "zarf-280gsm-heavyweight-oversized-tee-onyx",
      title: "ZARF 280 GSM Heavyweight Oversized Tee",
      subtitle: "Architectural Drop-Shoulder Silhouette",
      description: "Engineered from single-origin combed compact cotton, this piece features an oversized silhouette with reinforced double-needle ribbed collar. Pre-shrunk and bio-washed.",
      fabricDetails: "100% Combed Compact Cotton • 280 GSM French Terry • Bio-washed & Pre-shrunk",
      careInstructions: "Machine wash cold inside out • Do not tumble dry • Iron on reverse side",
      basePriceInPaise: 149900,
      isFeatured: true,
      categoryId: "cat_oversized",
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85",
            altText: "Front view in Onyx Black",
            viewType: "FRONT",
          },
          {
            url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85",
            altText: "Back Silhouette",
            viewType: "BACK",
          },
        ],
      },
      variants: {
        create: [
          { sku: "ZRF-TEE-280-BLK-S", size: "S", colorName: "Onyx Black", colorHex: "#111111", stockQuantity: 24 },
          { sku: "ZRF-TEE-280-BLK-M", size: "M", colorName: "Onyx Black", colorHex: "#111111", stockQuantity: 38 },
          { sku: "ZRF-TEE-280-BLK-L", size: "L", colorName: "Onyx Black", colorHex: "#111111", stockQuantity: 42 },
          { sku: "ZRF-TEE-280-WHT-M", size: "M", colorName: "Bone White", colorHex: "#F5F3EE", stockQuantity: 28 },
        ],
      },
    },
  });

  const p2 = await prisma.product.upsert({
    where: { slug: "zarf-420gsm-raw-box-hoodie-charcoal" },
    update: {},
    create: {
      slug: "zarf-420gsm-raw-box-hoodie-charcoal",
      title: "ZARF 420 GSM Box-Fit Raw Hoodie",
      subtitle: "Heavyweight Double-Layer Brushed Fleece",
      description: "Built for heavy winters and understated everyday wear. Features an oversized double-layer hood without drawstrings.",
      fabricDetails: "100% Super-Combed Ring Spun Cotton • 420 GSM Brushed Fleece",
      careInstructions: "Dry clean recommended or machine wash cold gentle",
      basePriceInPaise: 299900,
      isFeatured: true,
      categoryId: "cat_hoodies",
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85",
            altText: "ZARF 420 GSM Hoodie Front",
            viewType: "FRONT",
          },
        ],
      },
      variants: {
        create: [
          { sku: "ZRF-HD-420-CHR-M", size: "M", colorName: "Charcoal Grey", colorHex: "#2B2B2B", stockQuantity: 20 },
          { sku: "ZRF-HD-420-CHR-L", size: "L", colorName: "Charcoal Grey", colorHex: "#2B2B2B", stockQuantity: 15 },
        ],
      },
    },
  });

  // 7. Demo Order Request
  const variantM = await prisma.productVariant.findFirst({
    where: { sku: "ZRF-TEE-280-BLK-M" },
  });

  if (variantM) {
    const existingOrder = await prisma.order.findUnique({
      where: { referenceNumber: "ZRF-20261111-8942" },
    });

    if (!existingOrder) {
      await prisma.order.create({
        data: {
          referenceNumber: "ZRF-20261111-8942",
          customerName: "Aarav Sharma",
          customerEmail: "aarav@gmail.com",
          customerPhone: "+919876543210",
          status: "IN_PRODUCTION",
          subtotalInPaise: 299800,
          discountInPaise: 0,
          shippingFeeInPaise: 0,
          totalAmountInPaise: 299800,
          notes: "Please confirm batch printing finish before dispatch.",
          userId: customerUser.id,
          items: {
            create: [
              {
                variantId: variantM.id,
                productTitle: "ZARF 280 GSM Heavyweight Oversized Tee",
                size: "M",
                colorName: "Onyx Black",
                unitPriceInPaise: 149900,
                quantity: 2,
                totalPriceInPaise: 299800,
              },
            ],
          },
          statusHistory: {
            create: [
              {
                toStatus: "ORDER_REQUESTED",
                comment: "Official Order Request recorded in system.",
                createdBy: "CUSTOMER",
              },
              {
                toStatus: "UNDER_REVIEW",
                comment: "Inventory reservation confirmed for 280 GSM blanks.",
                createdBy: "ADMIN",
              },
              {
                toStatus: "CONFIRMED",
                comment: "Customer approved quotation via WhatsApp.",
                createdBy: "ADMIN",
              },
              {
                toStatus: "IN_PRODUCTION",
                comment: "Garments queued on screen print carousel #2.",
                createdBy: "ADMIN",
              },
            ],
          },
          shipment: {
            create: {
              courierName: "Bluedart Express Surface",
              trackingNumber: "AWB-781920491",
              status: "LABEL_CREATED",
            },
          },
        },
      });
    }
  }

  // 8. Demo Custom & B2B Enquiries
  await prisma.customEnquiry.upsert({
    where: { enquiryNumber: "ENQ-CUST-20261111-3019" },
    update: {},
    create: {
      enquiryNumber: "ENQ-CUST-20261111-3019",
      customerName: "Vikram Patel",
      customerPhone: "+919811122233",
      customerEmail: "vikram@designstudio.in",
      apparelCategory: "420 GSM Box-Fit Raw Hoodie",
      estimatedQty: 35,
      printMethod: "High-Density 3D Puff Print",
      sizeBreakdown: "M:15, L:15, XL:5",
      colorPreferences: "Bone White",
      notes: "Front chest puff print + back oversized screen print.",
      quotedAmountInPaise: 4200000,
      status: "QUOTED",
    },
  });

  await prisma.b2BEnquiry.upsert({
    where: { enquiryNumber: "ENQ-B2B-20261111-9120" },
    update: {},
    create: {
      enquiryNumber: "ENQ-B2B-20261111-9120",
      companyName: "Razorpay Tech Labs",
      contactPerson: "Sneha Roy",
      designation: "People Ops Lead",
      gstin: "29AABCR1234F1Z5",
      email: "sneha@company.com",
      phone: "+919822233344",
      category: "Corporate Uniforms & Polo Tees",
      quantity: 150,
      deliveryCity: "Bengaluru",
      requirements: "Embroidered chest logo for 150 polo t-shirts in deep navy. Needs sample swatch approval.",
      status: "NEW",
    },
  });

  console.log("Database seeded successfully with ZARF Wear foundational dataset!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
