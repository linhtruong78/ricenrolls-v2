"use client";
import { useEffect, useState } from "react";
import { ShoppingBag, Bike } from "lucide-react";

const CLOVER_URL = "https://www.clover.com/online-ordering/rice-n-rolls-hamilton";
const UBER_EATS_URL = "https://www.ubereats.com/ca/store/rice-n-rolls/kvPWml5jViCdO630ZKftzA";

export default function FloatingOrderButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base = [
    "comic-btn flex items-center justify-center",
    "w-12 h-12 rounded-full text-white",
    "transition-all duration-300",
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
  ].join(" ");

  return (
    <div className={`fixed bottom-6 right-4 z-50 lg:hidden flex flex-col gap-3 items-center transition-all duration-300 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      {/* Uber Eats */}
      <a
        href={UBER_EATS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on Uber Eats"
        className={`${base} bg-[#06C167] hover:bg-[#05a356]`}
      >
        <Bike size={20} />
      </a>

      {/* Clover / direct order */}
      <a
        href={CLOVER_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order Online"
        className={`${base} bg-o-500 hover:bg-o-600`}
      >
        <ShoppingBag size={20} />
      </a>
    </div>
  );
}
