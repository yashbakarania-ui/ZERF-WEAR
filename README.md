# ZARF WEAR — LUXURY CUSTOM APPAREL PLATFORM
**Version:** 1.0.0  
**Market:** Pan-India (B2C & B2B)  
**Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, GSAP, Prisma ORM, SQLite / PostgreSQL  

---

## 1. Overview & Brand Proposition

**ZARF Wear** is an all-in-one Indian custom apparel house and ready-to-wear streetwear brand. We engineer heavyweight garments (240–420 GSM French Terry, single-origin combed compact cotton, mercerized honeycomb piques) and provide bespoke printing, puff prints, and corporate bulk manufacturing across India.

Unlike off-the-shelf templates, ZARF Wear delivers:
- **Editorial Luxury Aesthetics:** Monochrome near-black (`#111111`) and warm off-white (`#F5F3EE`) palette with electric acid lime (`#C8FF4D`) accents and architectural typographic hierarchy.
- **Authentic Order Request Pipeline:** V1 operates on a genuine **Order Request & Quotation Workflow** (no fake payment confirmations or premature payment gateways).
- **Dual Commercial Engine:** Retail direct ordering with variant matrices (sizes XS to 3XL, custom colorways) alongside a dedicated B2B Corporate Procurement portal with MOQ controls.
- **WhatsApp Concierge Bridge:** Pre-formatted specifications automatically encoded into WhatsApp click-to-chat links for instantaneous customer follow-up.
- **Integer Paise Financial Standard:** All pricing and calculations are handled in integer paise (`₹1,499` = `149900` paise) to prevent floating-point errors.
- **Bilingual Localization:** Centralized dictionary supporting both English (`en`) and Hinglish (`hi`).

---

## 2. Customer-Facing Routes (14 Core Pages)

1. `/` — **Homepage:** Hero editorial banner, ticker marquee, curated collection grid, featured silhouettes, bespoke custom highlight, corporate B2B spotlight, and newsletter subscription.
2. `/shop` — **Product Catalogue:** 4-column responsive grid with search, multi-category filters, size and color selectors, price range slider, and sorting.
3. `/category/[slug]` — **Category Archive:** Filtered landing pages for Oversized T-Shirts, Hoodies, Polos, Sweatshirts, Caps, and Corporate Uniforms.
4. `/product/[slug]` — **Product Details:** Multi-view gallery (Front, Back, Detail), interactive color swatches, size selector with real-time stock availability, interactive Size Guide modal (Inches / CM), and custom enquiry CTA.
5. `/cart` — **Shopping Bag:** Line item table, quantity adjustments, coupon validation (`ZARF10`, `WELCOME200`), Pan-India free delivery threshold (₹1,999), and order request disclaimer.
6. `/order-request` — **Order Request Checkout:** 3-step checkout (Contact Info -> Delivery Address -> Review) generating unique reference codes (`ZRF-YYYYMMDD-XXXX`) and WhatsApp bridge.
7. `/custom-apparel` — **Custom Apparel Enquiry Wizard:** Silhouette selection, print techniques (Puff print, Screen print, DTG, Embroidery), size/color breakdown, artwork attachment, and instant WhatsApp continuation.
8. `/b2b` — **Corporate & Bulk Orders:** Dedicated B2B procurement portal with GSTIN support, sample swatch requests, and volume discount tiers.
9. `/about` — **Craft & Story:** Manufacturing manifesto on 280 GSM combed cotton, ethical domestic textile mills, and zero fake marketing claims.
10. `/contact` — **Studio & Helpline:** Contact form, physical studio address, official WhatsApp concierge, and commercial FAQs.
11. `/account` — **Customer Suite:** Client dashboard with order history, repeat order action, custom/B2B enquiry tracking, and saved delivery destinations.
12. `/account/login` — **Customer Login:** Secure credentials authentication.
13. `/account/register` — **Customer Registration:** Account creation.
14. `/track` & `/track/[reference]` — **Public Order Tracking:** Real-time 10-stage order progress timeline, status audit history, and manual courier AWB tracking.
15. `/studio` — **Customization Studio:** Editorial teaser for the upcoming 3D WebGL live apparel editor.

---

## 3. Administrative Operating Suite (`/admin`)

- `/admin` — **Executive Dashboard:** Live KPI cards (Total orders, pending review, in production, delivered, pipeline value in INR), low-stock warning alerts, and recent order stream.
- `/admin/orders` — **Order Lifecycle Manager:** Filter orders by 10 stages (`ORDER_REQUESTED`, `UNDER_REVIEW`, `QUOTATION_SENT`, `CONFIRMED`, `PROCESSING`, `IN_PRODUCTION`, `SHIPPED`, `DELIVERED`, `CANCELLED`), assign courier partners & AWB tracking numbers, and add audit notes.
- `/admin/inventory` — **Variant Stock Audit:** Real-time inventory table across all SKUs with stock adjustment modal (Restock, Damage Write-off, Reconciliation).
- `/admin/products` — **Product Management:** Product creator and editor with pricing in INR, fabric specifications, category mapping, and active variant controls.
- `/admin/enquiries` — **Custom & B2B Leads Inbox:** Review custom print requests and corporate bulk inquiries, set quotation values, record internal staff notes, and launch WhatsApp chats with prospects.

---

## 4. Getting Started & Local Development

### Prerequisites
- Node.js 18+ (tested on v24.15.0)
- npm 9+ (tested on v11.12.1)

### Installation
```bash
# Install dependencies
npm install

# Generate Prisma Client & Sync Database
npx prisma generate
npx prisma db push
```

### Running the Application
```bash
# Start local development server
npm run dev

# Open in browser
http://localhost:3000
```

### Building for Production
```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## 5. Security & Commercial Integrity
- Server-side validation via **Zod** on all API routes and forms.
- Zero client-side price or stock trust: All totals and discounts are recalculated server-side.
- Zero fake payment states: Customers understand the verified order request flow from start to finish.

