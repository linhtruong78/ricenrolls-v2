import Link from "next/link";
import { ShoppingBag, Bike } from "lucide-react";
import WaveDivider from "@/components/WaveDivider";

const ORDER_URL = "https://www.clover.com/online-ordering/rice-n-rolls-dundas";
const UBER_EATS_URL = "https://www.ubereats.com/ca/store/rice-n-rolls/kvPWml5jViCdO630ZKftzA";

const floatingItems = [
  { emoji: "🌯", label: "Gimbap", bg: "#FFD93D", rot: "-rotate-3", top: "top-4", left: "left-0" },
  { emoji: "🍗", label: "K-Pop Chicken", bg: "#FF6B35", rot: "rotate-3", top: "top-0", left: "left-36" },
  { emoji: "🍚", label: "Bibimbap", bg: "#fff3b0", rot: "-rotate-2", top: "top-24", left: "left-16" },
  { emoji: "🍜", label: "Japchae", bg: "#ffe8df", rot: "rotate-2", top: "top-28", left: "left-52" },
  { emoji: "🥟", label: "Dumplings", bg: "#FFD93D", rot: "rotate-6", top: "top-52", left: "left-4" },
  { emoji: "🥡", label: "Dinner Box", bg: "#FF6B35", rot: "-rotate-6", top: "top-48", left: "left-44" },
];

export default function HeroSection() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[520px]">

          {/* Left — text */}
          <div className="py-8 lg:py-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-y-100 border-2 border-ink sticker rounded-full px-4 py-1.5 text-sm font-body font-700 text-ink mb-5 rotate-[-1deg]">
              🍱 Korean Food · Hamilton, ON
            </div>

            {/* Heading */}
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-700 text-ink leading-tight mb-4">
              Fresh Rolls,<br />
              <span className="text-o-500">Bold</span>{" "}
              <span className="relative inline-block">
                Flavours
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,8 Q50,0 100,8 Q150,16 200,8" stroke="#FFD93D" strokeWidth="4" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="font-body text-muted text-lg mb-8 max-w-md leading-relaxed">
              Handcrafted gimbap, rice bowls & signature Korean dishes — made fresh daily in Hamilton. Quick, tasty & easy to order!
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a href={ORDER_URL} target="_blank" rel="noopener noreferrer"
                className="comic-btn flex items-center gap-2 bg-o-500 hover:bg-o-600 text-white font-heading font-600 text-base px-7 py-3.5 rounded-full">
                <ShoppingBag size={18}/> Order Online Now
              </a>
              <a href={UBER_EATS_URL} target="_blank" rel="noopener noreferrer"
                className="comic-btn flex items-center gap-2 bg-[#06C167] hover:bg-[#05a356] text-white font-heading font-600 text-base px-7 py-3.5 rounded-full">
                <Bike size={18}/> Uber Eats
              </a>
              <Link href="/menu"
                className="comic-btn flex items-center gap-2 bg-y-500 hover:bg-y-400 text-ink font-heading font-600 text-base px-7 py-3.5 rounded-full">
                View Menu 👀
              </Link>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-2 text-xs font-body font-700">
              {["✅ Pickup", "🛵 Uber Eats Delivery", "🌿 Vegan Options", "🎉 Catering"].map(t => (
                <span key={t} className="bg-y-100 border-2 border-ink sticker rounded-full px-3 py-1">{t}</span>
              ))}
            </div>
          </div>

          {/* Right — floating food cards */}
          <div className="hidden lg:block relative h-[480px]">
            {floatingItems.map((item) => (
              <div key={item.label}
                className={`absolute ${item.top} ${item.left} ${item.rot} comic-card-sm flex flex-col items-center justify-center w-28 h-28 cursor-default`}
                style={{ background: item.bg }}>
                <span className="text-4xl">{item.emoji}</span>
                <span className="text-xs font-body font-700 text-ink mt-1 text-center leading-tight px-1">{item.label}</span>
              </div>
            ))}
            {/* Big decorative circle */}
            <div className="absolute top-8 right-8 w-64 h-64 rounded-full bg-y-100 border-2 border-y-200 -z-10" />
          </div>
        </div>
      </div>

      {/* Wave into next section */}
      <WaveDivider color="#fffdf5" />
    </section>
  );
}
