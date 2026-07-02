"use client";
import { useState } from "react";
import { X } from "lucide-react";

const occasions = [
  { emoji: "🇨🇦", label: "Canada Day Celebrations" },
  { emoji: "🎂", label: "Birthdays" },
  { emoji: "🎓", label: "Graduations" },
  { emoji: "🏡", label: "Family Gatherings" },
];

export default function JunePromo() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <section className="relative bg-y-500 border-b-2 border-ink overflow-hidden">
      {/* Dismiss */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 z-10 text-ink/40 hover:text-ink transition-colors"
        aria-label="Dismiss promotion"
      >
        <X size={18} />
      </button>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="sticker bg-o-500 text-white text-xs font-heading font-600 px-3 py-1 rounded-full inline-block mb-3 rotate-[-1deg]">July Only 🗓️</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-700 text-ink leading-tight">🌞 July Summer Deals</h2>
          <p className="font-body text-ink/70 mt-2 text-base">Two ways to save this month</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Free Japchae */}
          <div className="comic-card bg-white p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="sticker bg-o-500 text-white text-sm font-heading font-700 px-3 py-1 rounded-full rotate-[-1deg]">🎉 July Promo</span>
              <span className="font-body text-muted text-xs">on orders $40+</span>
            </div>

            <div className="flex gap-5 items-start">
              {/* Image with crossed-out price tag at top-right */}
              <div className="relative flex-shrink-0">
                <img
                  src="/images/menu/signature/japchae.jpg"
                  alt="Japchae"
                  className="w-32 h-32 object-cover rounded-xl border-2 border-ink shadow-[3px_3px_0px_0px_#1a1a1a]"
                />
                {/* Crossed-out price tag — top-right corner */}
                <div className="absolute -top-6 -right-6 rotate-[8deg]">
                  <div className="relative bg-white border-2 border-ink rounded-xl px-3 py-2 shadow-[4px_4px_0px_0px_#1a1a1a]">
                    <div className="relative inline-block">
                      <span className="font-heading font-700 text-2xl text-ink/70">$6.99</span>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[110%] h-[1.5px] bg-red-500 rotate-[-15deg] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <div className="inline-block bg-o-500 text-white font-heading font-700 text-2xl px-4 py-1 rounded-xl border-2 border-ink mb-3 shadow-[3px_3px_0px_0px_#1a1a1a]">
                  FREE!
                </div>
                <h3 className="font-heading font-700 text-xl text-ink leading-tight">Japchae</h3>
                <p className="font-body text-muted text-xs mt-1 leading-relaxed">Glass noodles, carrot, peppers, mushroom — vegan &amp; GF</p>
                <div className="mt-4 bg-o-500 rounded-xl px-3 py-2.5 border-2 border-ink shadow-[2px_2px_0px_0px_#1a1a1a]">
                  <p className="font-body font-700 text-white text-sm">🛒 With any order <strong>$40 or more</strong></p>
                </div>
              </div>
            </div>
          </div>

          {/* Party Package */}
          <div className="comic-card bg-white p-6">
            {/* FREE offer — top */}
            <div className="flex items-start gap-2 bg-o-500 rounded-xl px-3 py-3 border-2 border-ink mb-5 shadow-[3px_3px_0px_0px_#1a1a1a]">
              <span className="text-xl mt-0.5">🥟🍗</span>
              <p className="font-body font-700 text-white text-sm"><strong>FREE 10 Dumplings or K-Pop Chicken</strong> with any Medium or Large Party Package</p>
            </div>

            <h3 className="font-heading font-700 text-lg text-ink mb-4">Perfect for:</h3>
            <ul className="space-y-2.5 mb-5">
              {occasions.map(o => (
                <li key={o.label} className="flex items-center gap-3 font-body font-700 text-ink text-sm">
                  <span className="text-2xl">{o.emoji}</span>
                  {o.label}
                </li>
              ))}
            </ul>
            <a href="/catering" className="inline-block bg-o-500 text-white font-heading font-700 text-sm px-5 py-2.5 rounded-full border-2 border-ink shadow-[3px_3px_0px_0px_#1a1a1a] hover:translate-y-[-1px] transition-transform">
              View Party Packages →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
