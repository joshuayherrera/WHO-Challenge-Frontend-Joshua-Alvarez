import { HeroSection } from "@/components/sections/HeroSection";
import FeaturedProductSection  from "@/components/sections/FeaturedProductSection";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

export default async function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedProductSection />
      <Footer />
    </div>
  );
}
