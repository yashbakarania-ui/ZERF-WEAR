import Hero from "@/components/storefront/Hero";
import BrandStatement from "@/components/storefront/BrandStatement";
import CollectionsGrid from "@/components/storefront/CollectionsGrid";
import FeaturedProducts from "@/components/storefront/FeaturedProducts";
import CustomShowcase from "@/components/storefront/CustomShowcase";
import CorporateSpotlight from "@/components/storefront/CorporateSpotlight";
import Newsletter from "@/components/storefront/Newsletter";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <BrandStatement />
      <CollectionsGrid />
      <FeaturedProducts />
      <CustomShowcase />
      <CorporateSpotlight />
      <Newsletter />
    </div>
  );
}

