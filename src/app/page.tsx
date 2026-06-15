import JunePromo from "@/components/home/JunePromo";
import HeroSection from "@/components/home/HeroSection";
import BentoSection from "@/components/home/BentoSection";
import DoshirakFeature from "@/components/home/DoshirakFeature";
import LunchStrip from "@/components/home/LunchStrip";
import HoursReviews from "@/components/home/HoursReviews";

export default function HomePage() {
  return (
    <>
      <JunePromo />
      <HeroSection />
      <BentoSection />
      <DoshirakFeature />
      <LunchStrip />
      <HoursReviews />
    </>
  );
}
