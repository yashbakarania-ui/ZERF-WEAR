# ZARF WEAR — PRODUCT REQUIREMENTS DOCUMENT (PRD)
**Version:** 1.0.0  
**Product:** ZARF Wear Luxury & Custom Apparel E-Commerce Platform  
**Target Market:** India (Pan-India)  
**Business Model:** Direct-to-Consumer (B2C) & Business-to-Business (B2B)  

---

## 1. Executive Product Vision

**ZARF Wear** is an all-in-one apparel brand providing ready-to-wear editorial streetwear alongside bespoke custom printing and corporate manufacturing services for individuals, startups, universities, and enterprise organizations across India.

### 1.1 Brand Positioning
- **Aesthetic:** Editorial luxury meets contemporary utilitarian streetwear. Clean, monochrome-dominant layout with sharp typography, architectural grid spacing, and controlled micro-interactions.
- **Value Proposition:** 
  - For Retail Shoppers: Premium-grade fabrics (240+ GSM french terry, combed cotton, custom oversized silhouettes) with transparent craftsmanship.
  - For Custom & Bulk Buyers: Seamless enquiry intake, transparent MOQ guidelines, sample consultation, and direct WhatsApp concierge support without tedious phone calls.

---

## 2. User Personas

### Persona A: "Aarav" — The Streetwear & Culture Enthusiast (B2C)
- **Age:** 22–30 | **Location:** Metro India (Mumbai, Bengaluru, Delhi NCR)
- **Behavior:** Values fabric weight, collar structure, drop-shoulder cuts, minimal branding, and seamless digital aesthetics.
- **Needs:** Fast catalog browsing, clear sizing charts with height/weight references, front-and-back garment views, effortless order request flow.

### Persona B: "Pooja" — Corporate People & Culture Lead (B2B)
- **Age:** 28–42 | **Location:** Hyderabad / Pune tech corridors
- **Behavior:** Ordering 50–500 branded hoodies & polo t-shirts for annual team offsites and new hire kits.
- **Needs:** Streamlined bulk quotation requests, GST-compliant invoicing enquiry fields, fabric sample requests, reliable lead-time visibility, and tracking updates.

### Persona C: "Kabir" — University Fest / Creative Agency Lead (B2B/Custom)
- **Age:** 20–25 | **Location:** Pan-India
- **Behavior:** Needs high-quality custom merchandise printed with intricate artwork.
- **Needs:** Custom apparel enquiry submission with artwork attachment, quantity break pricing info, and instant WhatsApp continuation with pre-filled specs.

### Persona D: "ZARF Administrator & Fulfillment Specialist"
- **Behavior:** Reviews incoming order requests and custom inquiries, calculates quotes, adjusts variant inventory, coordinates manual shipping dispatch, and updates order timelines.

---

## 3. Product Features & Detailed Specifications

### 3.1 Customer Storefront & Navigation (14 Routes)

#### 1. Global Navigation Bar (`/`)
- Brand identity mark: **ZARF WEAR** (all-caps editorial type).
- Navigation links:
  - *Shop* (Megamenu / direct link: All Products, Oversized Tees, Hoodies, Sweatshirts, Polos, Caps).
  - *Custom Apparel* (Interactive enquiry wizard).
  - *Corporate & B2B* (Bulk merchandise portal).
  - *About Us* (Story & craft philosophy).
- Utility actions:
  - Language Switcher (`EN` / `HI` Hinglish toggle).
  - Search trigger (overlay modal with live debounced search).
  - Account icon (Profile / Login).
  - Shopping Bag trigger with live item count badge.
- Sticky glassmorphic / high-contrast header on scroll. Mobile drawer navigation with responsive micro-animations.

#### 2. Editorial Homepage (`/`)
- **Hero Section:** Full-viewport editorial imagery, bold typographic statement ("CRAFTED FOR THE UNCONVENTIONAL"), primary CTAs ("Explore Collection" and "Custom & Bulk Orders").
- **Brand Statement Banner:** Architectural marquee ticker ("240 GSM HEAVYWEIGHT TERRY • PAN-INDIA DISPATCH • BESPOKE CRAFTSMANSHIP").
- **Curated Collections Grid:** Visual category blocks (Oversized, Hoodies, Polos, Headwear) with hover zoom and quick-shop links.
- **Featured Products Carousel/Grid:** High-priority items showing front-to-back hover switch, price in ₹ (INR), and quick-add drawer.
- **Custom Apparel Showcase:** Split editorial section explaining DTG (Direct-to-Garment), Screen Printing, High-Density Puff, and Embroidery services.
- **Corporate & B2B Spotlight:** Value proposition for teams, clients, and colleges with MOQ callouts.
- **Brand Philosophy:** High-fashion layout highlighting fabric provenance, sustainable packaging, and stitching integrity.
- **Newsletter Subscription:** Email capture with server-side validation.
- **Footer:** Brand manifesto, categorical links, policy links (Terms, Privacy, Shipping, Returns), contact details, social links, and GST registration notice.

#### 3. Shop All & Category Pages (`/shop`, `/category/[slug]`)
- Dynamic category header with description and active item count.
- **Filter Suite:**
  - Category filter (T-shirts, Oversized, Hoodies, Sweatshirts, Polos, Caps).
  - Size filter (XS, S, M, L, XL, XXL).
  - Color filter (Onyx Black, Bone White, Vintage Grey, Forest Green, Earth Brown).
  - Price Range filter slider (in ₹).
  - Availability filter (In Stock only).
  - Sort by: Featured, Newest, Price: Low to High, Price: High to Low.
- Responsive CSS Grid (4 columns desktop, 2 columns mobile) with editorial hover states and badge tags (`NEW`, `BESTSELLER`, `HEAVYWEIGHT`).

#### 4. Product Details Page (`/product/[slug]`)
- **Editorial Gallery:** Multi-image preview including primary front, secondary back, fabric close-up, and on-model editorial shots. Fullscreen zoom on click.
- **Product Header:** Product title, SKU, price in ₹, and stock status.
- **Interactive Variant Pickers:**
  - Color swatches with active ring indicator and color name tooltip.
  - Size selector with real-time inventory count per variant.
  - Interactive Size Guide modal (Chest, Length, Shoulder dimensions in cm and inches).
- **Quantity Selector:** Increment/decrement controls bounded by available variant stock.
- **Primary Actions:**
  - "Add to Order Request" (adds to bag with flyout feedback).
  - "Request Custom Branding on This Item" (launches Custom Enquiry pre-populated with this SKU).
- **Accordion Tabs:**
  - Fabric & Specifications (GSM, weave, pre-shrunk status).
  - Custom Printing Options Available.
  - Shipping & Turnaround Time (Metro 3-5 days, Pan-India 5-7 days).
  - Care Instructions (Cold wash, wash inside out, iron on reverse).

#### 5. Shopping Bag (`/cart`)
- Line items displaying thumbnail, title, selected size & color, unit price, quantity modifier, and subtotal.
- Promotional Coupon code input with real-time validation (flat or percentage discount calculated in paise).
- Cost breakdown: Subtotal, Estimated Taxes, Shipping (Free above ₹1,999 threshold), Total.
- Clear explanatory callout: *"No immediate payment required. You are submitting an official Order Request. Our concierge will review your order and send confirmation and payment links."*
- Primary CTA: "Proceed to Order Request".

#### 6. Order Request Checkout (`/order-request`)
- **Step 1: Contact Information** (Full Name, Phone number with Indian WhatsApp verification check, Email).
- **Step 2: Delivery Address** (Flat/House No, Street, Landmark, City, State, 6-digit Indian PIN code).
- **Step 3: Order Review & Special Notes** (Delivery instructions, sizing notes, corporate billing details if applicable).
- **Step 4: Submission & Reference Generation**:
  - Creates atomic database record.
  - Generates secure tracking reference `ZRF-YYYYMMDD-XXXX`.
  - Direct link to track order in real-time.
  - Instant button: "Send Order Request via WhatsApp" with pre-formatted message.

#### 7. Custom Apparel Enquiry (`/custom-apparel`)
- **Step-by-step Interactive Enquiry Wizard:**
  1. *Garment Silhouette Selection:* Oversized T-shirt, Classic T-shirt, Hoodie, Sweatshirt, Polo, Cap, Custom Uniform.
  2. *Quantity Tier:* 10-25 pcs, 26-50 pcs, 51-100 pcs, 100-500 pcs, 500+ pcs.
  3. *Print/Decoration Technique:* Screen Print, DTG, Puff Print, Embroidery, Sublimation.
  4. *Sizes & Colors Breakdown:* Quantities per size (S/M/L/XL/XXL) and fabric color preferences.
  5. *Artwork & Notes:* Upload artwork preview (mockup, logo, PDF/PNG/AI guidelines) and print placement notes (Front chest, Back oversize, Left sleeve, etc.).
  6. *Contact & Dispatch details:* Name, Organization, Phone (WhatsApp), Email, City & PIN code.
- **Instant WhatsApp Bridge:** Automatically formats payload into a clean, human-readable WhatsApp message and provides a single-tap button to open WhatsApp Web / App with the official ZARF concierge number.

#### 8. Corporate & Bulk Orders Portal (`/b2b`)
- Dedicated corporate landing page speaking to marketing teams, procurement leads, colleges, and startups.
- Value pillars: Custom fabric sourcing, PAN-India bulk logistics, sample swatches on demand, GST input tax credits.
- Comprehensive B2B Enquiry Form (Company name, GSTIN optional, Contact Person, Designation, Email, Phone, Apparel category, Quantity, Budget tier, Expected delivery deadline, Delivery location).
- Downloadable Digital Catalog trigger (or view online lookbook).

#### 9. Brand & Craft Story (`/about`)
- Editorial narrative on ZARF Wear’s manufacturing roots, heavy GSM standards, ethical Indian textile partnerships, and the mission to elevate Indian-made apparel.

#### 10. Contact & Support (`/contact`)
- Direct contact details: Physical studio/dispatch hub address, customer support email, official WhatsApp helpline.
- Interactive contact form with category selector (Order enquiry, Custom printing consultation, Press & collaboration).
- FAQ section answering common questions on turnarounds, sizing, and order reviews.

#### 11. Customer Account & Authentication (`/account`, `/account/login`, `/account/register`)
- Email & password registration with password confirmation and hashing.
- Role-based session: `CUSTOMER` vs `ADMIN`.
- Customer profile view: Name, email, phone.
- Address book management: Add/edit/delete default shipping and billing addresses.
- Order History table: Date, Reference code, Item count, Order status badge, and Total amount.
- Enquiry History table: Track submitted custom and B2B requests.
- Re-order action: Easily load past order items back into the cart.

#### 12. Order Tracking (`/track`, `/track/[reference]`)
- Standalone public tracking tool for both guest and registered shoppers.
- Enter Order Reference (e.g., `ZRF-20261111-4821`) and phone/email to view:
  - Visual status progress bar (10 stages).
  - Status history timeline with timestamps and admin remarks.
  - Assigned courier partner, tracking AWB number, and dispatch date (when available).

#### 13. Customization Studio (`/studio`)
- High-aesthetic teaser page marked **"COMING SOON — 3D LIVE APPAREL STUDIO"**.
- Preview of upcoming 3D canvas, artwork drag-and-drop, and live garment 360 preview.
- "Join VIP Waitlist" email capture.

---

## 4. Admin Operating Hub (`/admin`)

The admin interface is protected by role-based authorization (`ADMIN` or `STAFF`).

1. **Executive Dashboard (`/admin`)**:
   - Live KPI cards: Total Order Requests, Under Review, Confirmed, In Production, Delivered, Total Pipeline Value (in ₹).
   - Recent Order Requests feed with quick action status buttons.
   - Recent Custom & B2B Enquiries feed.
   - Low inventory warning widgets.

2. **Product & Catalog Manager (`/admin/products`, `/admin/products/new`, `/admin/products/[id]`):**
   - Create, update, toggle active status, and archive products.
   - Multi-image upload manager with drag reordering and view tags (`FRONT`, `BACK`, `DETAIL`).
   - Variant table builder: Generate sizes (XS to 3XL) and colors, assign custom SKUs, per-variant price adjustments, and stock levels.

3. **Inventory Management (`/admin/inventory`):**
   - Real-time stock audit table by SKU and variant.
   - Stock adjustment modal: Add restock, manual write-off, or inventory reconciliation with mandatory note.
   - Automatic movement log records every change.

4. **Order Management (`/admin/orders`, `/admin/orders/[id]`):**
   - Filter by status, date range, customer search, or order reference.
   - Full order detail inspector: Customer details, delivery address, ordered variants, pricing breakdown.
   - Status transition dropdown with mandatory/optional audit note.
   - Statuses:
     1. `ORDER_REQUESTED`
     2. `UNDER_REVIEW`
     3. `QUOTATION_SENT`
     4. `AWAITING_APPROVAL`
     5. `CONFIRMED`
     6. `PROCESSING`
     7. `IN_PRODUCTION`
     8. `SHIPPED`
     9. `DELIVERED`
     10. `CANCELLED`
   - Manual Shipping Dispatch: Enter courier name (e.g. Bluedart, Delhivery, DTDC), AWB tracking number, dispatch date, and estimated arrival.

5. **Custom & B2B Enquiries (`/admin/enquiries`):**
   - Tabbed view: Custom Apparel vs Corporate B2B.
   - View uploaded artwork files, quantity requirements, and sizing breakdown.
   - Update enquiry status: `NEW`, `IN_REVIEW`, `QUOTED`, `SAMPLE_ORDER`, `CONVERTED`, `REJECTED`.
   - Record quotation amount and internal notes.
   - Direct button to launch WhatsApp chat with the prospect.

6. **Coupons & Promotions (`/admin/coupons`):**
   - Create coupons with code, discount type (`PERCENTAGE` vs `FIXED_PAISE`), discount value, minimum order value, start date, expiry date, and usage limits.

7. **Store Settings (`/admin/settings`):**
   - Configure WhatsApp concierge number.
   - Configure support email, phone number, and studio address.
   - Set free shipping threshold (in paise).
   - Configure default order prefix and B2B default MOQ.

---

## 5. Non-Functional Requirements

- **Security:** Passwords hashed with bcrypt; JWT session tokens with HTTP-only cookies; Server-side Zod validation on all API endpoints; Rate limiting on public submission endpoints.
- **Financial Precision:** Zero float arithmetic. All amounts stored and computed in integer paise.
- **Responsiveness:** Flawless mobile-first execution across breakpoints (375px, 640px, 768px, 1024px, 1280px, 1536px).
- **Performance:** Lazy loading on images, responsive WebP/AVIF formats, server component data fetching, sub-second route transitions.
- **Accessibility:** WCAG AA compliant contrast ratios on typography, aria-labels on icon buttons, keyboard navigable modals and drawers.

