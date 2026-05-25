import PromoBanner from "@/components/home/PromoBanner";
import HeroSection from "@/components/home/HeroSection";
import BentoSection from "@/components/home/BentoSection";
import LunchStrip from "@/components/home/LunchStrip";
import HoursReviews from "@/components/home/HoursReviews";

export default function HomePage() {
  return (
    <>
      <PromoBanner />
      <HeroSection />
      <BentoSection />
      <LunchStrip />
      <HoursReviews />
    </>
  );
}
