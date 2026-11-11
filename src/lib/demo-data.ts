export interface ProductImage {
  id: string;
  url: string;
  altText: string;
  viewType: "FRONT" | "BACK" | "DETAIL" | "LIFESTYLE";
}

export interface ProductVariant {
  id: string;
  sku: string;
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "3XL";
  colorName: string;
  colorHex: string;
  priceAdjustmentInPaise: number;
  stockQuantity: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  fabricDetails: string;
  careInstructions: string;
  basePriceInPaise: number;
  category: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  badge?: string;
  isFeatured: boolean;
  isB2BEligible: boolean;
}

export const CATEGORIES: Category[] = [
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

export const DEMO_PRODUCTS: Product[] = [
  {
    id: "prod_1",
    slug: "zarf-280gsm-heavyweight-oversized-tee-onyx",
    title: "ZARF 280 GSM Heavyweight Oversized Tee",
    subtitle: "Architectural Drop-Shoulder Silhouette",
    description: "Engineered from single-origin combed compact cotton, this piece features an oversized silhouette with reinforced double-needle ribbed collar. Pre-shrunk and bio-washed for an ultra-soft handle that holds its structure indefinitely.",
    fabricDetails: "100% Combed Compact Cotton • 280 GSM French Terry • Bio-washed & Pre-shrunk",
    careInstructions: "Machine wash cold inside out • Do not tumble dry • Iron on reverse side • Do not bleach",
    basePriceInPaise: 149900, // ₹1,499
    badge: "280 GSM",
    isFeatured: true,
    isB2BEligible: true,
    category: CATEGORIES[0],
    images: [
      {
        id: "img_1_1",
        url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85",
        altText: "ZARF 280 GSM Heavyweight Oversized Tee - Front View in Onyx Black",
        viewType: "FRONT",
      },
      {
        id: "img_1_2",
        url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85",
        altText: "ZARF 280 GSM Heavyweight Oversized Tee - Back Silhouette",
        viewType: "BACK",
      },
      {
        id: "img_1_3",
        url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85",
        altText: "Fabric grain and collar detail",
        viewType: "DETAIL",
      },
    ],
    variants: [
      { id: "var_1_1", sku: "ZRF-TEE-280-BLK-S", size: "S", colorName: "Onyx Black", colorHex: "#111111", priceAdjustmentInPaise: 0, stockQuantity: 24 },
      { id: "var_1_2", sku: "ZRF-TEE-280-BLK-M", size: "M", colorName: "Onyx Black", colorHex: "#111111", priceAdjustmentInPaise: 0, stockQuantity: 38 },
      { id: "var_1_3", sku: "ZRF-TEE-280-BLK-L", size: "L", colorName: "Onyx Black", colorHex: "#111111", priceAdjustmentInPaise: 0, stockQuantity: 42 },
      { id: "var_1_4", sku: "ZRF-TEE-280-BLK-XL", size: "XL", colorName: "Onyx Black", colorHex: "#111111", priceAdjustmentInPaise: 0, stockQuantity: 19 },
      { id: "var_1_5", sku: "ZRF-TEE-280-WHT-M", size: "M", colorName: "Bone White", colorHex: "#F5F3EE", priceAdjustmentInPaise: 0, stockQuantity: 28 },
      { id: "var_1_6", sku: "ZRF-TEE-280-WHT-L", size: "L", colorName: "Bone White", colorHex: "#F5F3EE", priceAdjustmentInPaise: 0, stockQuantity: 30 },
    ],
  },
  {
    id: "prod_2",
    slug: "zarf-420gsm-raw-box-hoodie-charcoal",
    title: "ZARF 420 GSM Box-Fit Raw Hoodie",
    subtitle: "Heavyweight Double-Layer Brushed Fleece",
    description: "Built for heavy winters and understated everyday wear. Features an oversized double-layer hood without drawstrings for a clean architectural aesthetic, deep kangaroo pocket, and hidden thumbhole cuffs.",
    fabricDetails: "100% Super-Combed Ring Spun Cotton • 420 GSM Brushed Fleece • Ribbed Lycra hem",
    careInstructions: "Dry clean recommended or machine wash cold gentle • Lay flat to dry",
    basePriceInPaise: 299900, // ₹2,999
    badge: "420 GSM",
    isFeatured: true,
    isB2BEligible: true,
    category: CATEGORIES[1],
    images: [
      {
        id: "img_2_1",
        url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85",
        altText: "ZARF 420 GSM Box-Fit Raw Hoodie - Front View",
        viewType: "FRONT",
      },
      {
        id: "img_2_2",
        url: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85",
        altText: "ZARF Box-Fit Raw Hoodie - Rear Angle",
        viewType: "BACK",
      },
    ],
    variants: [
      { id: "var_2_1", sku: "ZRF-HD-420-CHR-S", size: "S", colorName: "Charcoal Grey", colorHex: "#2B2B2B", priceAdjustmentInPaise: 0, stockQuantity: 12 },
      { id: "var_2_2", sku: "ZRF-HD-420-CHR-M", size: "M", colorName: "Charcoal Grey", colorHex: "#2B2B2B", priceAdjustmentInPaise: 0, stockQuantity: 20 },
      { id: "var_2_3", sku: "ZRF-HD-420-CHR-L", size: "L", colorName: "Charcoal Grey", colorHex: "#2B2B2B", priceAdjustmentInPaise: 0, stockQuantity: 15 },
      { id: "var_2_4", sku: "ZRF-HD-420-CHR-XL", size: "XL", colorName: "Charcoal Grey", colorHex: "#2B2B2B", priceAdjustmentInPaise: 0, stockQuantity: 8 },
      { id: "var_2_5", sku: "ZRF-HD-420-SND-M", size: "M", colorName: "Raw Sand", colorHex: "#D8CFBC", priceAdjustmentInPaise: 0, stockQuantity: 16 },
    ],
  },
  {
    id: "prod_3",
    slug: "zarf-240gsm-mercerized-pique-polo",
    title: "ZARF 240 GSM Mercerized Pique Polo",
    subtitle: "Contemporary Minimalist Cut",
    description: "A refined redesign of the classic polo. Made with double-mercerized Egyptian long-staple cotton for a subtle sheen and clean drape. Features a hidden magnetic collar closure and tonal matte buttons.",
    fabricDetails: "100% Double-Mercerized Long-Staple Cotton • 240 GSM Honeycomb Weave",
    careInstructions: "Hand wash or gentle cold machine cycle • Low iron if needed",
    basePriceInPaise: 189900, // ₹1,899
    badge: "MERCERIZED",
    isFeatured: true,
    isB2BEligible: true,
    category: CATEGORIES[2],
    images: [
      {
        id: "img_3_1",
        url: "https://images.unsplash.com/photo-1625910513413-74291c953589?auto=format&fit=crop&w=1200&q=85",
        altText: "ZARF Mercerized Pique Polo - Front View",
        viewType: "FRONT",
      },
      {
        id: "img_3_2",
        url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=85",
        altText: "ZARF Mercerized Pique Polo - Back View",
        viewType: "BACK",
      },
    ],
    variants: [
      { id: "var_3_1", sku: "ZRF-PLO-240-NVY-M", size: "M", colorName: "Deep Navy", colorHex: "#141C2B", priceAdjustmentInPaise: 0, stockQuantity: 32 },
      { id: "var_3_2", sku: "ZRF-PLO-240-NVY-L", size: "L", colorName: "Deep Navy", colorHex: "#141C2B", priceAdjustmentInPaise: 0, stockQuantity: 28 },
      { id: "var_3_3", sku: "ZRF-PLO-240-BLK-M", size: "M", colorName: "Onyx Black", colorHex: "#111111", priceAdjustmentInPaise: 0, stockQuantity: 22 },
      { id: "var_3_4", sku: "ZRF-PLO-240-BLK-L", size: "L", colorName: "Onyx Black", colorHex: "#111111", priceAdjustmentInPaise: 0, stockQuantity: 18 },
    ],
  },
  {
    id: "prod_4",
    slug: "zarf-360gsm-minimal-crewneck-sweatshirt",
    title: "ZARF 360 GSM Loopback Crewneck",
    subtitle: "Heavyweight French Terry Everyday Essential",
    description: "Designed with dropped shoulders and ergonomic side gusset ribbing for unrestricted mobility. Perfect blank canvas for custom corporate embroidery or screen printed collections.",
    fabricDetails: "100% Organic Carded Cotton • 360 GSM Loopback Terry",
    careInstructions: "Machine wash cold inside out • Do not bleach",
    basePriceInPaise: 229900, // ₹2,299
    badge: "360 GSM",
    isFeatured: true,
    isB2BEligible: true,
    category: CATEGORIES[3],
    images: [
      {
        id: "img_4_1",
        url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85",
        altText: "ZARF 360 GSM Loopback Crewneck - Front",
        viewType: "FRONT",
      },
      {
        id: "img_4_2",
        url: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85",
        altText: "Back profile view",
        viewType: "BACK",
      },
    ],
    variants: [
      { id: "var_4_1", sku: "ZRF-SWT-360-SGE-S", size: "S", colorName: "Sage Khaki", colorHex: "#4C5B4E", priceAdjustmentInPaise: 0, stockQuantity: 14 },
      { id: "var_4_2", sku: "ZRF-SWT-360-SGE-M", size: "M", colorName: "Sage Khaki", colorHex: "#4C5B4E", priceAdjustmentInPaise: 0, stockQuantity: 25 },
      { id: "var_4_3", sku: "ZRF-SWT-360-SGE-L", size: "L", colorName: "Sage Khaki", colorHex: "#4C5B4E", priceAdjustmentInPaise: 0, stockQuantity: 20 },
      { id: "var_4_4", sku: "ZRF-SWT-360-BLK-M", size: "M", colorName: "Onyx Black", colorHex: "#111111", priceAdjustmentInPaise: 0, stockQuantity: 30 },
    ],
  },
  {
    id: "prod_5",
    slug: "zarf-washed-heavy-twill-dad-cap",
    title: "ZARF Washed Heavy Twill Dad Cap",
    subtitle: "Unstructured 6-Panel Silhouette",
    description: "Heavyweight 380 GSM enzyme-washed cotton twill. Features an unstructured low-profile crown, antiqued brass metal clasp closure, and tonal embroidered eyelets.",
    fabricDetails: "100% Heavy Washed Cotton Twill • Brass slider buckle",
    careInstructions: "Spot clean with damp cloth only",
    basePriceInPaise: 89900, // ₹899
    badge: "ACCESSORY",
    isFeatured: false,
    isB2BEligible: true,
    category: CATEGORIES[4],
    images: [
      {
        id: "img_5_1",
        url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=85",
        altText: "ZARF Washed Heavy Twill Dad Cap - Angle",
        viewType: "FRONT",
      },
      {
        id: "img_5_2",
        url: "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=1200&q=85",
        altText: "Side profile and brass buckle",
        viewType: "DETAIL",
      },
    ],
    variants: [
      { id: "var_5_1", sku: "ZRF-CAP-TWL-BLK-OS", size: "M", colorName: "Washed Black", colorHex: "#1F1F1F", priceAdjustmentInPaise: 0, stockQuantity: 45 },
      { id: "var_5_2", sku: "ZRF-CAP-TWL-KHK-OS", size: "M", colorName: "Washed Khaki", colorHex: "#9E9484", priceAdjustmentInPaise: 0, stockQuantity: 30 },
    ],
  },
  {
    id: "prod_6",
    slug: "zarf-corporate-tech-executive-hoodie",
    title: "ZARF Corporate Tech Executive Hoodie",
    subtitle: "Custom B2B Uniform Standard",
    description: "Tailored specifically for enterprise engineering teams, startup offsites, and corporate merchandise. Premium lint-free combed exterior optimized for high-definition chest embroidery or puff printing.",
    fabricDetails: "80% Combed Cotton, 20% Polyester fleece • 380 GSM • Pill-resistant treatment",
    careInstructions: "Machine wash cold with similar colors",
    basePriceInPaise: 249900, // ₹2,499
    badge: "B2B FAVORITE",
    isFeatured: true,
    isB2BEligible: true,
    category: CATEGORIES[5],
    images: [
      {
        id: "img_6_1",
        url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85",
        altText: "Corporate apparel model shot",
        viewType: "LIFESTYLE",
      },
      {
        id: "img_6_2",
        url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85",
        altText: "Garment front view",
        viewType: "FRONT",
      },
    ],
    variants: [
      { id: "var_6_1", sku: "ZRF-B2B-HD-M", size: "M", colorName: "Dark Slate", colorHex: "#1E232A", priceAdjustmentInPaise: 0, stockQuantity: 100 },
      { id: "var_6_2", sku: "ZRF-B2B-HD-L", size: "L", colorName: "Dark Slate", colorHex: "#1E232A", priceAdjustmentInPaise: 0, stockQuantity: 100 },
      { id: "var_6_3", sku: "ZRF-B2B-HD-XL", size: "XL", colorName: "Dark Slate", colorHex: "#1E232A", priceAdjustmentInPaise: 0, stockQuantity: 75 },
    ],
  },
];

