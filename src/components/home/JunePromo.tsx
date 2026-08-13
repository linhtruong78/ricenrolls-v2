"use client";
import { useState } from "react";
import { X } from "lucide-react";

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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="sticker bg-o-500 text-white text-xs font-heading font-600 px-3 py-1 rounded-full inline-block mb-3 rotate-[-1deg]">August Only 🗓️</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-700 text-ink leading-tight">🎊 August Platter Deals</h2>
          <p className="font-body text-ink/70 mt-2 text-base">Great for groups — save all month long</p>
        </div>

        {/* $5 Off Platters */}
        <div className="comic-card bg-white p-6 max-w-md mx-auto">
          <div className="flex gap-5 items-center">
            <img
              src="/images/menu/platters/large-rolls-platter.jpg"
              alt="Platters"
              className="w-28 h-28 object-cover rounded-xl border-2 border-ink shadow-[3px_3px_0px_0px_#1a1a1a] flex-shrink-0"
            />
            <div className="flex-1">
              <div className="inline-block bg-o-500 text-white font-heading font-700 text-2xl px-4 py-1 rounded-xl border-2 border-ink mb-3 shadow-[3px_3px_0px_0px_#1a1a1a]">
                $5 OFF
              </div>
              <h3 className="font-heading font-700 text-xl text-ink leading-tight">Selected Platters</h3>
              <p className="font-body text-muted text-xs mt-1 leading-relaxed">Meat Lovers, Family Favorite, Veggie Crunch, Opposites Attract & Surf &amp; Seoul</p>
            </div>
          </div>
          <a href="/menu?cat=platters" className="mt-5 inline-block w-full text-center bg-o-500 text-white font-heading font-700 text-sm px-5 py-2.5 rounded-full border-2 border-ink shadow-[3px_3px_0px_0px_#1a1a1a] hover:translate-y-[-1px] transition-transform">
            View Platters →
          </a>
        </div>

      </div>
    </section>
  );
}
