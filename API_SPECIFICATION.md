# ZARF WEAR — API SPECIFICATION
**Version:** 1.0.0  
**Format:** RESTful JSON over HTTPS / Next.js Route Handlers  
**Base URL:** `/api`  
**Authentication:** Cookie-based Session / Bearer JWT  
**Monetary Standard:** All financial amounts are integer Indian Paise (`paise`).  

---

## 1. Authentication Endpoints (`/api/auth`)

### 1.1 `POST /api/auth/register`
Creates a new customer account.

**Request Body:**
```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "password": "SecurePassword123!",
  "phone": "+919876543210"
}
```

**Validation (Zod):**
- `email`: valid email string.
- `password`: minimum 8 characters, at least 1 number or special character.
- `phone`: valid 10-digit Indian phone number optional prefix `+91`.

**Response `201 Created`:**
```json
{
  "success": true,
  "user": {
    "id": "cuid_123",
    "name": "Aarav Sharma",
    "email": "aarav@example.com",
    "role": "CUSTOMER"
  }
}
```

---

### 1.2 `POST /api/auth/login`
Authenticates a user and establishes an HTTP-only secure session cookie.

**Request Body:**
```json
{
  "email": "aarav@example.com",
  "password": "SecurePassword123!"
}
```

**Response `200 OK`:**
```json
{
  "success": true,
  "user": {
    "id": "cuid_123",
    "name": "Aarav Sharma",
    "email": "aarav@example.com",
    "role": "CUSTOMER"
  }
}
```

---

### 1.3 `GET /api/auth/me`
Retrieves current authenticated session details.

**Response `200 OK` (Authenticated):**
```json
{
  "authenticated": true,
  "user": {
    "id": "cuid_123",
    "name": "Aarav Sharma",
    "email": "aarav@example.com",
    "role": "CUSTOMER"
  }
}
```
**Response `401 Unauthorized` (Guest):**
```json
{
  "authenticated": false,
  "user": null
}
```

---

## 2. Catalog & Products (`/api/products`, `/api/categories`)

### 2.1 `GET /api/products`
Retrieves a paginated, filterable list of products.

**Query Parameters:**
- `category`: Category slug (e.g. `oversized-t-shirts`, `hoodies`)
- `size`: Variant size (e.g. `M`, `L`, `XL`)
- `color`: Variant color name (e.g. `Onyx Black`)
- `minPrice`: Minimum base price in paise (e.g. `99900`)
- `maxPrice`: Maximum base price in paise (e.g. `299900`)
- `search`: Keyword string matching title or description
- `sort`: `featured` | `newest` | `price_asc` | `price_desc`
- `page`: Page index (default: `1`)
- `limit`: Items per page (default: `12`)

**Response `200 OK`:**
```json
{
  "products": [
    {
      "id": "prod_1",
      "slug": "zarf-heavyweight-oversized-tee-onyx",
      "title": "ZARF 280 GSM Heavyweight Oversized Tee",
      "subtitle": "Architectural Drop-Shoulder Silhouette",
      "basePriceInPaise": 149900,
      "category": {
        "name": "Oversized T-Shirts",
        "slug": "oversized-t-shirts"
      },
      "images": [
        {
          "url": "/images/products/tee-onyx-front.webp",
          "viewType": "FRONT",
          "altText": "Front view of 280 GSM Oversized Tee in Onyx"
        },
        {
          "url": "/images/products/tee-onyx-back.webp",
          "viewType": "BACK",
          "altText": "Back view"
        }
      ],
      "availableSizes": ["S", "M", "L", "XL", "XXL"],
      "availableColors": [
        { "name": "Onyx Black", "hex": "#111111" },
        { "name": "Bone White", "hex": "#F5F3EE" }
      ],
      "isFeatured": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 24,
    "totalPages": 2
  }
}
```

---

### 2.2 `GET /api/products/[slug]`
Fetches complete product detail including all variants, inventory stock, care instructions, and fabric specs.

**Response `200 OK`:**
```json
{
  "id": "prod_1",
  "slug": "zarf-heavyweight-oversized-tee-onyx",
  "title": "ZARF 280 GSM Heavyweight Oversized Tee",
  "subtitle": "Architectural Drop-Shoulder Silhouette",
  "description": "Crafted from single-origin comb cotton with double-needle ribbed collar...",
  "fabricDetails": "100% Combed Compact Cotton, 280 GSM French Terry, Pre-shrunk",
  "careInstructions": "Cold machine wash inside out. Do not tumble dry. Iron on reverse.",
  "basePriceInPaise": 149900,
  "category": { "id": "cat_1", "name": "Oversized T-Shirts", "slug": "oversized-t-shirts" },
  "images": [
    { "id": "img_1", "url": "/images/products/tee-onyx-front.webp", "viewType": "FRONT" },
    { "id": "img_2", "url": "/images/products/tee-onyx-back.webp", "viewType": "BACK" },
    { "id": "img_3", "url": "/images/products/tee-onyx-detail.webp", "viewType": "DETAIL" }
  ],
  "variants": [
    {
      "id": "var_1",
      "sku": "ZRF-TEE-OVD-BLK-S",
      "size": "S",
      "colorName": "Onyx Black",
      "colorHex": "#111111",
      "priceAdjustmentInPaise": 0,
      "stockQuantity": 18
    },
    {
      "id": "var_2",
      "sku": "ZRF-TEE-OVD-BLK-M",
      "size": "M",
      "colorName": "Onyx Black",
      "colorHex": "#111111",
      "priceAdjustmentInPaise": 0,
      "stockQuantity": 25
    }
  ]
}
```

---

## 3. Order Requests (`/api/orders`)

### 3.1 `POST /api/orders`
Submits an official Order Request. Works for both guest and authenticated users. Recalculates all pricing server-side.

**Request Body:**
```json
{
  "customerName": "Aarav Sharma",
  "customerEmail": "aarav@example.com",
  "customerPhone": "+919876543210",
  "deliveryAddress": {
    "line1": "Flat 402, Skyline Towers",
    "line2": "Bandra West",
    "landmark": "Near Linking Road",
    "city": "Mumbai",
    "state": "Maharashtra",
    "postalCode": "400050",
    "country": "India"
  },
  "items": [
    {
      "variantId": "var_1",
      "quantity": 2
    }
  ],
  "couponCode": "ZARF10",
  "notes": "Please check delivery availability before 6 PM."
}
```

**Response `201 Created`:**
```json
{
  "success": true,
  "order": {
    "referenceNumber": "ZRF-20261111-8942",
    "status": "ORDER_REQUESTED",
    "customerName": "Aarav Sharma",
    "itemCount": 2,
    "subtotalInPaise": 299800,
    "discountInPaise": 29980,
    "shippingFeeInPaise": 0,
    "totalAmountInPaise": 269820,
    "createdAt": "2026-11-11T10:30:00Z"
  },
  "whatsAppUrl": "https://wa.me/919876543210?text=..."
}
```

---

### 3.2 `GET /api/orders/track/[reference]`
Public tracking endpoint to inspect order progress.

**Response `200 OK`:**
```json
{
  "referenceNumber": "ZRF-20261111-8942",
  "status": "IN_PRODUCTION",
  "createdAt": "2026-11-11T10:30:00Z",
  "items": [
    {
      "productTitle": "ZARF 280 GSM Heavyweight Oversized Tee",
      "size": "S",
      "colorName": "Onyx Black",
      "quantity": 2,
      "unitPriceInPaise": 149900
    }
  ],
  "statusTimeline": [
    {
      "toStatus": "ORDER_REQUESTED",
      "comment": "Order request received and queued for review.",
      "createdAt": "2026-11-11T10:30:00Z"
    },
    {
      "toStatus": "UNDER_REVIEW",
      "comment": "Inventory checked and reserved.",
      "createdAt": "2026-11-11T11:00:00Z"
    },
    {
      "toStatus": "CONFIRMED",
      "comment": "Customer approved quote.",
      "createdAt": "2026-11-11T11:45:00Z"
    },
    {
      "toStatus": "IN_PRODUCTION",
      "comment": "Garment queued in batch printing.",
      "createdAt": "2026-11-11T14:00:00Z"
    }
  ],
  "shipment": null
}
```

---

## 4. Custom Apparel & B2B Enquiries (`/api/enquiries`)

### 4.1 `POST /api/enquiries/custom`
Submits a bespoke custom printing inquiry.

**Request Body:**
```json
{
  "customerName": "Vikram Patel",
  "customerPhone": "+919811122233",
  "customerEmail": "vikram@designstudio.in",
  "apparelCategory": "Hoodie",
  "estimatedQty": 35,
  "printMethod": "Puff Print + Back Screen Print",
  "sizeBreakdown": "M: 15, L: 15, XL: 5",
  "colorPreferences": "Bone White & Charcoal",
  "notes": "Need puff print on front chest (4 inches) and large screen print on back.",
  "artworkUrls": [
    "/uploads/artworks/logo-vector.png"
  ]
}
```

**Response `201 Created`:**
```json
{
  "success": true,
  "enquiryNumber": "ENQ-CUST-20261111-3019",
  "status": "NEW",
  "whatsAppUrl": "https://wa.me/919876543210?text=..."
}
```

---

### 4.2 `POST /api/enquiries/b2b`
Submits a corporate bulk apparel procurement request.

**Request Body:**
```json
{
  "companyName": "Razorpay Tech Labs",
  "contactPerson": "Sneha Roy",
  "designation": "People Ops Lead",
  "email": "sneha@company.com",
  "phone": "+919822233344",
  "category": "Corporate Uniforms & Polo Tees",
  "quantity": 150,
  "budgetRange": "₹1,00,000 - ₹2,00,000",
  "deliveryCity": "Bengaluru",
  "deliveryPincode": "560001",
  "requirements": "Embroidered chest logo for 150 polo t-shirts in navy blue. Needs sample approval."
}
```

**Response `201 Created`:**
```json
{
  "success": true,
  "enquiryNumber": "ENQ-B2B-20261111-9120",
  "status": "NEW"
}
```

---

## 5. Admin Suite Endpoints (`/api/admin/*`)
*Protected: Requires `ADMIN` or `STAFF` session token.*

### 5.1 `GET /api/admin/metrics`
Returns real-time KPI metrics.
```json
{
  "totalOrders": 48,
  "pendingReview": 7,
  "inProduction": 12,
  "delivered": 25,
  "totalPipelineValueInPaise": 58400000,
  "lowStockVariants": 3
}
```

### 5.2 `PATCH /api/admin/orders/[id]/status`
Transitions an order status with an audit note.
```json
{
  "toStatus": "SHIPPED",
  "comment": "Dispatched via Bluedart Express AWB# 781293812",
  "courierName": "Bluedart",
  "trackingNumber": "781293812"
}
```

### 5.3 `POST /api/admin/inventory/adjust`
Logs a stock adjustment for a variant with movement history.
```json
{
  "variantId": "var_1",
  "type": "RESTOCK",
  "quantity": 50,
  "note": "Batch #104 restocked from factory"
}
```

### 5.4 `POST /api/upload`
Uploads artwork or asset file (validates mime types: `image/jpeg`, `image/png`, `image/webp`, `application/pdf`; max 10MB).
```json
{
  "url": "/uploads/artwork/art_176286.webp",
  "filename": "brand-logo.png",
  "size": 184920
}
```

