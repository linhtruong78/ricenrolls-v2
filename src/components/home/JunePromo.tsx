"use client";
import { useState } from "react";
import { X } from "lucide-react";

const occasions = [
  { emoji: "⚽", label: "World Cup Watch Parties" },
  { emoji: "🎂", label: "Birthdays" },
  { emoji: "🎓", label: "Graduations" },
  { emoji: "🏡", label: "Family Gatherings" },
];

const combos = [
  {
    label: "Combo A",
    items: ["2 Kimbap Rolls", "20 pcs K-Pop Chicken"],
  },
  {
    label: "Combo B",
    items: ["2 Kimbap Rolls", "10 pcs K-Pop Chicken", "10 pcs Dumplings"],
  },
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
          <span className="sticker bg-o-500 text-white text-xs font-heading font-600 px-3 py-1 rounded-full inline-block mb-3 rotate-[-1deg]">June Only 🗓️</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-700 text-ink leading-tight">🎉 June Catering Month</h2>
          <p className="font-body text-ink/70 mt-2 text-base">Book any Party Package and <strong>save up to 9%</strong></p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Perfect For */}
          <div className="comic-card bg-white p-6">
            <h3 className="font-heading font-700 text-lg text-ink mb-4">Perfect for:</h3>
            <ul className="space-y-2.5">
              {occasions.map(o => (
                <li key={o.label} className="flex items-center gap-3 font-body font-700 text-ink text-sm">
                  <span className="text-2xl">{o.emoji}</span>
                  {o.label}
                </li>
              ))}
            </ul>
            <a href="/catering" className="mt-5 inline-block bg-o-500 text-white font-heading font-700 text-sm px-5 py-2.5 rounded-full border-2 border-ink shadow-[3px_3px_0px_0px_#1a1a1a] hover:translate-y-[-1px] transition-transform">
              View Party Packages →
            </a>
          </div>

          {/* Watch Party Combos */}
          <div className="comic-card bg-white p-6">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-heading font-700 text-lg text-ink">⚽ Watch Party Combos</h3>
              <span className="sticker bg-o-500 text-white text-xs font-heading font-600 px-2 py-0.5 rounded-full rotate-[1deg] whitespace-nowrap flex-shrink-0">From $39.99</span>
            </div>
            <p className="font-body text-muted text-xs mb-4">World Cup special — June only</p>

            <div className="space-y-3 mb-4">
              {combos.map(c => (
                <div key={c.label} className="bg-y-100 rounded-xl p-3 border-2 [border-color:var(--color-y-500)]">
                  <p className="font-heading font-700 text-xs text-o-500 mb-1.5">{c.label}</p>
                  <ul className="space-y-0.5">
                    {c.items.map(item => (
                      <li key={item} className="font-body text-sm text-ink flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-o-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-o-500 rounded-xl p-3 text-white">
              <p className="font-heading font-700 text-sm">🥟 Free Dumpling Upgrade!</p>
              <p className="font-body text-xs mt-0.5 text-white/80">+10 free dumplings on any selected catering order</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
