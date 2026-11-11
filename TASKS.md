# ZARF WEAR — MASTER TASKS LIST & PROGRESS TRACKER
**Version:** 1.0.0  
**Status:** Completed & Production Verified  

---

## Phase 1: Project Setup, Design System & Customer Storefront

- [x] **1.1 Next.js 15 TypeScript Project Initialization**
  - [x] Initialize Next.js project with App Router, TypeScript, and ESLint.
  - [x] Configure `tailwind.config.ts` with custom brand tokens (`#111111`, `#F5F3EE`, `#777777`, `#C8FF4D`).
  - [x] Set up `globals.css` with typography tokens, dark/light luxury styling, and custom scrollbars.
  - [x] Installed dependencies: `lucide-react`, `gsap`, `clsx`, `tailwind-merge`, `zod`, `@prisma/client`.
- [x] **1.2 Global Layout & Navigation**
  - [x] Sticky Header with editorial typography, category dropdown, and mobile navigation drawer.
  - [x] Cart flyout trigger with badge count indicator.
  - [x] Bilingual Language Switcher (`EN` / `HI` Hinglish toggle).
  - [x] Luxury Footer with brand manifesto, category links, GST info, and WhatsApp helpline.
  - [x] Ticker Announcement bar with Pan-India dispatch marquee.
- [x] **1.3 Editorial Homepage (`/`)**
  - [x] Hero Section: High-impact streetwear visual with bold typographic statement.
  - [x] Brand Statement & Manifesto: Textile integrity and domestic manufacturing standard.
  - [x] Curated Collections Grid: Visual category blocks with hover scale and quick-shop links.
  - [x] Featured Products Grid with front-to-back hover preview and INR pricing.
  - [x] Bespoke Custom Apparel highlight section with techniques overview (DTG, Puff, Embroidery).
  - [x] Corporate & Bulk Procurement spotlight section.
  - [x] Newsletter subscription form with validated input and confirmation.
- [x] **1.4 Product Catalogue & Category Pages (`/shop`, `/category/[slug]`)**
  - [x] Responsive Product Grid (4-col desktop, 2-col mobile).
  - [x] Filter Suite: Category, Size, Color, Price Slider, In-Stock Availability.
  - [x] Sorting controls (Featured, Price: Low to High, Price: High to Low).
  - [x] Live search bar with instant query filtering.
  - [x] Product Cards with image swap on hover, tag badges (`280 GSM`, `420 GSM`), and quick-add action.
- [x] **1.5 Product Details Page (`/product/[slug]`)**
  - [x] Multi-view image gallery (Front, Back, Detail views).
  - [x] Interactive Color Swatch picker.
  - [x] Size selector with real-time stock availability indicators.
  - [x] Interactive Size Guide modal with cm/inches switch.
  - [x] Quantity selector with stock ceiling.
  - [x] Fabric specifications and care instruction accordions.
  - [x] "Add to Order Request" and "Request Custom Branding" CTAs.
- [x] **1.6 Static & Supporting Pages**
  - [x] Brand Story & Craftsmanship (`/about`).
  - [x] Contact & Support (`/contact`) with inquiry form.
  - [x] Customization Studio Coming Soon (`/studio`).

---

## Phase 2: Cart, Order Request & Custom Enquiry Workflows

- [x] **2.1 Persistent Shopping Cart (`/cart`)**
  - [x] Client-side state store (`CartProvider`) with `localStorage` persistence.
  - [x] Cart drawer and dedicated `/cart` page with line items, quantity adjustments, and remove actions.
  - [x] Real-time pricing calculation in integer paise (`formatInr` utility).
  - [x] Promotional coupon code input (`ZARF10` for 10% off, `WELCOME200` for ₹200 off).
  - [x] Order Request informational banner (clarifying the no-immediate-payment review flow).
- [x] **2.2 Order Request Submission Flow (`/order-request`)**
  - [x] 3-step checkout: Contact Info -> Delivery Address (Pan-India PIN) -> Review & Notes.
  - [x] Order Request submission to `/api/orders`.
  - [x] Generation of unique reference code (e.g. `ZRF-20261111-8942`).
  - [x] Order confirmation view with direct tracking link.
  - [x] WhatsApp Order Concierge button pre-loaded with order details and SKU list.
- [x] **2.3 Custom Apparel Enquiry Wizard (`/custom-apparel`)**
  - [x] 5-step form: Silhouette selection -> Print technique -> Sizes/Colors -> Artwork & Notes -> Contact.
  - [x] File upload with client-side preview for artwork mockups.
  - [x] Instant WhatsApp generation bridge with pre-formatted specs.
  - [x] Submission persistence via `/api/enquiries/custom`.
- [x] **2.4 Corporate & Bulk B2B Portal (`/b2b`)**
  - [x] B2B landing page with corporate value propositions and MOQ guide.
  - [x] Corporate enquiry form with company name, GSTIN (optional), designation, quantities, and delivery location.
  - [x] Submission persistence via `/api/enquiries/b2b` and WhatsApp escalation option.

---

## Phase 3: Database, ORM & Customer Dashboard

- [x] **3.1 Prisma Schema & Database Initialization**
  - [x] Normalized `prisma/schema.prisma` with 20 models.
  - [x] Database synchronized via `npx prisma db push` (`dev.db`).
  - [x] Safe integer paise currency standard across models.
- [x] **3.2 Customer Account Portal (`/account`)**
  - [x] Profile overview and contact details update.
  - [x] Saved address book management.
  - [x] Order History with status badges and full item breakdowns.
  - [x] Custom & B2B enquiry tracker.
  - [x] Quick re-order button to reload past order variants into cart.
  - [x] Client Login (`/account/login`) and Register (`/account/register`) pages.
- [x] **3.3 Public Order Tracking (`/track`, `/track/[reference]`)**
  - [x] Search by order reference number.
  - [x] 10-stage visual order progress indicator.
  - [x] Historical audit timeline with timestamps and admin remarks.
  - [x] Courier partner, AWB tracking link, and dispatch status.

---

## Phase 4: Protected Admin Operating Suite

- [x] **4.1 Admin Shell & Dashboard Overview (`/admin`)**
  - [x] Admin layout with responsive navigation sidebar.
  - [x] Live KPI cards: Total orders, Pending review, Confirmed, In production, Pipeline value in INR.
  - [x] Recent order requests stream and low-stock warning widgets.
- [x] **4.2 Product & Variant Management (`/admin/products`)**
  - [x] Product listing with category filters and active/inactive indicators.
  - [x] Product creation and edit modal (Title, subtitle, fabric specs, base price in INR).
  - [x] Active variants and stock summary.
- [x] **4.3 Inventory & Stock Movements (`/admin/inventory`)**
  - [x] Master inventory table by variant SKU.
  - [x] Stock adjustment modal (Restock, Damage write-off, Reconciliation).
- [x] **4.4 Order Processing & Shipping Management (`/admin/orders`)**
  - [x] Filterable order list by status and search query.
  - [x] Order inspection & status transition modal across all 10 stages.
  - [x] Manual shipping dispatch: Courier partner name, AWB tracking number, audit remark.
  - [x] Direct WhatsApp customer contact link.
- [x] **4.5 Custom & B2B Enquiry Management (`/admin/enquiries`)**
  - [x] Tabbed inbox: Custom Apparel vs Corporate B2B leads.
  - [x] Lead review modal: set quotation value in INR, update status (`NEW`, `IN_REVIEW`, `QUOTED`, `SAMPLE_APPROVED`, `CONVERTED`), and record internal notes.
  - [x] Direct WhatsApp link to contact prospect.

---

## Phase 5: Verification & Production Readiness

- [x] **5.1 Bilingual Localization (English & Hinglish)**
  - [x] Centralized translation dictionaries (`src/lib/i18n/en.json` & `hi.json`).
  - [x] Instant toggle in navigation bar with `localStorage` persistence.
- [x] **5.2 Security & Financial Precision Audit**
  - [x] Server-side Zod validation across all API route handlers.
  - [x] Integer paise money standard (`formatInr` utility) preventing floating-point errors.
  - [x] Zero fake payment gates or simulated checkout confirmations.
- [x] **5.3 Production Build Verification**
  - [x] Next.js 15 production build compiled with code 0 (`npm run build`).
  - [x] All 25 static & dynamic routes compiled without errors.
