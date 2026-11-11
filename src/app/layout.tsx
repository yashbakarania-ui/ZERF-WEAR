import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/context";
import { CartProvider } from "@/lib/cart-store";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "ZARF WEAR | Premium Heavyweight Apparel & Custom Manufacturing",
  description: "Pan-India luxury custom apparel and ready-to-wear streetwear atelier. 240-420 GSM French Terry, bespoke screen printing, puff prints, and corporate bulk manufacturing.",
  keywords: [
    "custom apparel India",
    "heavyweight oversized t-shirts",
    "280 GSM t-shirts",
    "400 GSM hoodies",
    "corporate uniforms Mumbai Bengaluru",
    "bespoke merchandise printing",
    "ZARF Wear",
  ],
  authors: [{ name: "ZARF Wear Design Studio" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-brand-black text-brand-offwhite selection:bg-brand-lime selection:text-brand-black">
        <LanguageProvider>
          <CartProvider>
            <AnnouncementBar />
            <Header />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
