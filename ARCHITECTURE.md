# ZARF WEAR — SYSTEM ARCHITECTURE SPECIFICATION
**Version:** 1.0.0  
**Stack:** Next.js (App Router), TypeScript, Tailwind CSS, GSAP, Prisma ORM, PostgreSQL  

---

## 1. High-Level Architectural Overview

ZARF Wear is built on a modern, unified Next.js App Router architecture that delivers high-performance Server Components (RSC) for initial page loads and SEO, coupled with client-side interactive islands for rich editorial micro-interactions, cart management, and administrative dashboards.

```
+-----------------------------------------------------------------------+
|                             CLIENT TIER                               |
|   +-----------------------+    +----------------------------------+   |
|   |   Public Storefront   |    |    Protected Admin Suite         |   |
|   |   (Editorial / Shop)  |    |    (Catalog, Orders, Inventory)  |   |
|   +-----------------------+    +----------------------------------+   |
|               |                                  |                    |
|       Zustand (Cart) / Context            React Hook Form / Zod       |
|       GSAP Animation Hooks                Server Actions & Fetch      |
+-----------------------------------------------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                          NEXT.JS APP SERVER                           |
|   +---------------------------------------------------------------+   |
|   |                    Middleware & Security Gate                 |   |
|   |         - Role-Based Access Control (Admin vs Customer)       |   |
|   |         - Session Verification (JWT / NextAuth)               |   |
|   |         - Security Headers & CSRF Checks                      |   |
|   +---------------------------------------------------------------+   |
|                                   |                                   |
|   +-------------------------------+-------------------------------+   |
|   |                               |                               |   |
|   v                               v                               v   |
| [Server Components / Pages]  [Route Handlers / API]      [Server Actions]  |
| - RSC Data Fetching          - Zod Validation Schemas    - Form mutations  |
| - Dynamic Metadata / SEO     - Safe Integer Calculations - State changes   |
| - Localization Hydration     - WhatsApp Message Format   - Transacted ops  |
+-----------------------------------------------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------+
|                           DATA & SERVICE TIER                         |
|   +---------------------------------------------------------------+   |
|   |                      Prisma ORM Client                        |   |
|   |          - Strong Type Definitions & Prisma Client            |   |
|   |          - Interactive Transactions ($transaction)            |   |
|   |          - Normalized Relational Data Models                  |   |
|   +---------------------------------------------------------------+   |
|                                   |                                   |
|   +-------------------------------+-------------------------------+   |
|   |                               |                               |   |
|   v                               v                               v   |
| [PostgreSQL Database]       [Local / Cloud Assets]      [WhatsApp API] |
| - Normalized Tables         - WebP / AVIF High-Res      - Pre-filled   |
| - Integer Paise Currency    - Cloudinary / Local Dir    - Dynamic link |
| - Audit Timeline Logs       - Secure Upload Validation  - Web & Mobile |
+-----------------------------------------------------------------------+
```

---

## 2. Directory & Module Structure

The project structure is organized for modularity, clean domain boundaries, and maintainability:

```
c:\Users\Yash Bakarania\Documents\WEBSITE\ZERF WEAR\
├── prisma/
│   ├── schema.prisma              # Complete relational schema
│   ├── seed.ts                    # Idempotent demo dataset seeder
│   └── migrations/                # Versioned SQL migrations
├── public/
│   ├── images/
│   │   ├── products/              # High-definition product imagery
│   │   ├── editorial/             # Hero banners, craft stories, lookbook
│   │   └── categories/            # Category hero thumbnails
│   └── brand/                     # ZARF Wear logos and favicon marks
├── src/
│   ├── app/
│   │   ├── (storefront)/          # Public consumer routes
│   │   │   ├── layout.tsx         # Storefront layout (Header, Footer, Cart Drawer)
│   │   │   ├── page.tsx           # Editorial Homepage
│   │   │   ├── shop/page.tsx      # Full Catalogue & Filter Grid
│   │   │   ├── category/[slug]/   # Category landing pages
│   │   │   ├── product/[slug]/    # Product detail page
│   │   │   ├── cart/page.tsx      # Shopping bag & review
│   │   │   ├── order-request/     # Order request multi-step form
│   │   │   ├── custom-apparel/    # Bespoke custom enquiry wizard
│   │   │   ├── b2b/page.tsx       # Corporate & Bulk B2B portal
│   │   │   ├── about/page.tsx     # Brand manifesto & manufacturing craft
│   │   │   ├── contact/page.tsx   # Contact channels & inquiry form
│   │   │   ├── track/             # Public order tracking lookup
│   │   │   └── studio/page.tsx    # Coming Soon 3D customization studio
│   │   ├── account/               # Customer account portal
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx           # Profile overview
│   │   │   ├── login/page.tsx     # Customer authentication
│   │   │   ├── register/page.tsx  # Customer registration
│   │   │   ├── orders/page.tsx    # Order history & reordering
│   │   │   ├── addresses/page.tsx # Saved delivery addresses
│   │   │   └── enquiries/page.tsx # Custom & B2B enquiry tracking
│   │   ├── admin/                 # Protected administrative hub
│   │   │   ├── layout.tsx         # Admin sidebar, header & auth guard
│   │   │   ├── page.tsx           # KPI metrics & recent activity
│   │   │   ├── products/          # Product CRUD & image manager
│   │   │   ├── inventory/         # Variant stock & adjustment ledger
│   │   │   ├── orders/            # Order review, lifecycle & shipping dispatch
│   │   │   ├── enquiries/         # Custom apparel & B2B enquiry inbox
│   │   │   ├── coupons/           # Promotional coupon manager
│   │   │   └── settings/          # Store settings (WhatsApp, phone, thresholds)
│   │   ├── api/                   # REST route handlers
│   │   │   ├── auth/              # Auth endpoints (login, register, me, logout)
│   │   │   ├── products/          # Catalog read & admin CRUD
│   │   │   ├── categories/        # Category listing
│   │   │   ├── orders/            # Order request placement & retrieval
│   │   │   ├── enquiries/         # Custom & B2B enquiry submission
│   │   │   ├── admin/             # Secure administrative mutations
│   │   │   └── upload/            # Secure file upload for artwork
│   │   └── globals.css            # Tailwind & CSS custom properties tokens
│   ├── components/
│   │   ├── layout/                # Header, Footer, MobileNav, AnnouncementBar
│   │   ├── storefront/            # ProductCard, ProductGrid, HeroBanner, FilterDrawer
│   │   ├── product/               # ProductGallery, VariantSelector, SizeGuideModal
│   │   ├── cart/                  # CartDrawer, CartLineItem, OrderSummary
│   │   ├── forms/                 # CustomEnquiryWizard, B2BEnquiryForm, OrderRequestForm
│   │   ├── admin/                 # AdminSidebar, MetricCard, StatusBadge, OrderTimeline
│   │   └── ui/                    # Button, Input, Modal, Dropdown, Badge, Spinner
│   ├── lib/
│   │   ├── prisma.ts              # Global Prisma client singleton
│   │   ├── auth.ts                # Session verification & password hashing
│   │   ├── currency.ts            # Paise to INR formatting utilities
│   │   ├── whatsapp.ts            # Dynamic WhatsApp URI generator & templates
│   │   ├── i18n/                  # Localization engine (EN & Hinglish)
│   │   │   ├── context.tsx        # Locale provider
│   │   │   ├── en.json            # English translation strings
│   │   │   └── hi.json            # Hinglish translation strings
│   │   ├── validations/           # Zod schemas for forms and API requests
│   │   └── animations.ts          # GSAP animation helper functions
│   └── types/                     # TypeScript shared interfaces & enums
├── PROJECT_PLAN.md
├── PRD.md
├── ARCHITECTURE.md
├── DATABASE_SCHEMA.md
├── API_SPECIFICATION.md
└── TASKS.md
```

---

## 3. Design System & Token Strategy

The design system embodies contemporary minimalist luxury. The color system uses CSS custom properties configured in `globals.css` and mapped into `tailwind.config.ts`:

### 3.1 Color Palette
```css
:root {
  --color-canvas-dark: #111111;       /* Near Black - Dominant Dark */
  --color-canvas-light: #F5F3EE;      /* Warm Off-White - Editorial Light */
  --color-canvas-subtle: #1A1A1A;     /* Muted Charcoal Surface */
  --color-canvas-card: #202020;       /* Card Elevation */
  --color-text-primary: #F5F3EE;      /* Light Text on Dark Canvas */
  --color-text-secondary: #AAAAAA;    /* Muted Secondary Text */
  --color-text-inverse: #111111;      /* Dark Text on Light Surface */
  --color-border-subtle: #2D2D2D;     /* Editorial Divider Lines */
  --color-border-strong: #404040;     /* Focused / Active Borders */
  --color-accent-lime: #C8FF4D;       /* Electric Acid Lime - Brand Highlight */
  --color-accent-hover: #B4E840;      /* Lime Hover State */
  --color-status-success: #38E088;    /* Confirmed / Delivered */
  --color-status-warning: #FFB347;    /* In Review / Pending */
  --color-status-danger: #FF5A5A;     /* Cancelled / Out of Stock */
}
```

### 3.2 Typography Hierarchy
- **Display & Headlines:** Uncompromising high-contrast grotesque sans-serif (`font-display`) with tight tracking (`tracking-tight` / `tracking-tighter`), all-caps uppercase styling for editorial titles.
- **Body & Technical Specs:** Clean geometric sans-serif (`font-sans` / Inter / system-ui) optimized for high legibility on mobile screens.
- **Micro-copy & SKUs:** Monospace (`font-mono`) for reference codes (`ZRF-20261111-8942`), timestamps, dimensions, and financial breakdowns.

### 3.3 GSAP Motion Philosophy
Animations must be subtle, performant, and purposeful:
- **Hero Reveal:** Staggered opacity and translateY reveal on page load.
- **Product Card Hover:** Gentle scale zoom on garment imagery with instant swap to the back view.
- **Drawer Entrances:** Smooth slide-in-right on cart and filter sheets with backdrop blur.
- **Status Timeline:** Progressive line expansion matching order status completion.
- Animations respect `prefers-reduced-motion`.

---

## 4. Integer Currency Standard (The Paise Pattern)

To avoid precision and floating-point errors inherent in JavaScript IEEE 754 representations:
- **Rule 1:** Every price, discount, tax, subtotal, and total in the database and API payloads is an **integer representing Indian Paise**.
- **Rule 2:** ₹1.00 = 100 paise. (Example: ₹1,499.00 = `149900` paise).
- **Rule 3:** Floating-point currency values are never saved to the database.
- **Rule 4:** The utility function `formatInr(amountInPaise: number): string` formats the integer for display (e.g. `149900` -> `"₹1,499"`).

```typescript
// src/lib/currency.ts
export function formatInr(paise: number, includeDecimals = false): string {
  const rupees = paise / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  }).format(rupees);
}

export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}
```

---

## 5. Order Request & Commercial Flow

Because V1 operates without an online payment gateway, the order lifecycle is designed around an authentic **Order Request Engine**:

```
+-------------------------------------------------------------+
| Customer creates cart (Sizes, Colors, Quantities)           |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| Customer fills delivery & WhatsApp contact info            |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| Order Request submitted -> Database creates:                |
| 1. Order record with status ORDER_REQUESTED                 |
| 2. OrderItem records with snapshot pricing (paise)         |
| 3. OrderStatusHistory entry ("Order Request Received")     |
| 4. Unique tracking reference code: ZRF-YYYYMMDD-XXXX       |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| User receives confirmation screen + instant tracking link   |
| + Optional "Send via WhatsApp" one-tap bridge               |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| Admin reviews request in /admin/orders                      |
| - Verifies stock / bulk discount                           |
| - Moves status to QUOTATION_SENT / CONFIRMED                |
| - Sends invoice / payment link to customer out-of-band     |
| - Once paid, transitions to PROCESSING / IN_PRODUCTION      |
| - Dispatches with Courier Name & AWB -> SHIPPED            |
+-------------------------------------------------------------+
```

---

## 6. WhatsApp Concierge Integration Architecture

ZARF Wear provides direct integration with WhatsApp without relying on brittle third-party paid bridges for initial conversations:

```typescript
// src/lib/whatsapp.ts
export interface WhatsAppOrderPayload {
  orderReference: string;
  customerName: string;
  items: Array<{ title: string; variant: string; quantity: number }>;
  totalAmountInPaise: number;
}

export function buildOrderWhatsAppUrl(payload: WhatsAppOrderPayload, phone: string): string {
  const itemList = payload.items
    .map((item) => `• ${item.quantity}x ${item.title} (${item.variant})`)
    .join('\n');

  const message = [
    `*NEW ORDER REQUEST — ZARF WEAR*`,
    `Reference: *${payload.orderReference}*`,
    `Customer: ${payload.customerName}`,
    ``,
    `*Items Requested:*`,
    itemList,
    ``,
    `Estimated Total: *${formatInr(payload.totalAmountInPaise)}*`,
    ``,
    `I would like to confirm my order and receive payment details.`
  ].join('\n');

  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
```

---

## 7. Localization Architecture (English + Hinglish)

ZARF Wear implements a lightweight, zero-dependency dictionary-based translation system:
- **Stored in `src/lib/i18n/`** with parallel JSON structures (`en.json`, `hi.json`).
- Locale state persists in `localStorage` and a cookie (`zarf_locale`), defaulting to `en`.
- A custom hook `useTranslation()` provides access to keypaths and interpolation:
  - English: *"Crafted For The Unconventional"*
  - Hinglish: *"Unconventional logo ke liye bespoke apparel"*
  - English: *"Add to Order Request"*
  - Hinglish: *"Order request mein add karein"*

