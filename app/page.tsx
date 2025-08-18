import { SiteNavbar } from "@/components/features/SiteNavbar";
import { Hero } from "@/components/features/Hero";
import { Gallery } from "@/components/features/Gallery";
import { Testimonials } from "@/components/features/Testimonials";
import { Footer } from "@/components/features/Footer";
import { Specs } from "@/components/features/Specs";

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <Hero />
      <Specs />
      <Gallery />
      <Testimonials />
      <Footer />
    </>
  );
}
