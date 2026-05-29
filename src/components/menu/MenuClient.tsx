"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { menuCategories, type DietaryTag } from "@/lib/menuData";

const tagStyle: Record<DietaryTag, string> = {
  vegan: "bg-green-100 text-green-800 border-green-400",
  gf:    "bg-sky-100 text-sky-800 border-sky-400",
  spicy: "bg-red-100 text-red-700 border-red-400",
};
const tagLabel: Record<DietaryTag, string> = { vegan: "🌿 Vegan", gf: "🌾 GF", spicy: "🌶️ Spicy" };
type Filter = DietaryTag | "all";

export default function MenuClient() {
  const [cat, setCat] = useState("lunch-special");
  const [filter, setFilter] = useState<Filter>("all");

  // Drag-to-scroll for category tabs on mouse devices
  const tabsRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function updateArrows() {
    const el = tabsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, []);

  function onMouseDown(e: React.MouseEvent) {
    drag.current = { active: true, startX: e.pageX - (tabsRef.current?.offsetLeft ?? 0), scrollLeft: tabsRef.current?.scrollLeft ?? 0 };
  }
  function onMouseUp() { drag.current.active = false; }
  function onMouseMove(e: React.MouseEvent) {
    if (!drag.current.active || !tabsRef.current) return;
    e.preventDefault();
    const x = e.pageX - (tabsRef.current.offsetLeft ?? 0);
    tabsRef.current.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX);
    updateArrows();
  }

  function scrollTabs(dir: "left" | "right") {
    if (!tabsRef.current) return;
    tabsRef.current.scrollBy({ left: dir === "left" ? -160 : 160, behavior: "smooth" });
    setTimeout(updateArrows, 300);
  }

  const current = menuCategories.find(c => c.id === cat)!;
  const items = filter === "all" ? current.items : current.items.filter(i => i.tags.includes(filter as DietaryTag));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

      {/* Category tabs */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm pt-4 pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 border-b-2 border-ink">
        <div className="relative flex items-center">
          {/* Left arrow */}
          <button
            onClick={() => scrollTabs("left")}
            aria-label="Scroll left"
            className={`flex-shrink-0 mr-1 text-muted transition-opacity ${
              canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}>
            <ChevronLeft size={18} />
          </button>

          <div
            ref={tabsRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onMouseMove={onMouseMove}
            onScroll={updateArrows}
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 select-none flex-1"
          >
            {menuCategories.map(c => (
              <button key={c.id} onClick={() => { setCat(c.id); setFilter("all"); }}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-700 transition-all whitespace-nowrap border-2 border-ink ${
                  cat === c.id ? "bg-y-500 text-ink shadow-[3px_3px_0px_0px_#1a1a1a]" : "bg-white text-muted hover:bg-y-100"
                }`}>
                {c.emoji} {c.label}
              </button>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scrollTabs("right")}
            aria-label="Scroll right"
            className={`flex-shrink-0 ml-1 text-muted transition-opacity ${
              canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Category header + filters */}
      <div className="mt-8 mb-5 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-heading text-3xl sm:text-4xl font-700 text-ink">{current.emoji} {current.label}</h2>
          {current.subtitle && <p className="text-muted text-sm mt-0.5 font-body">{current.subtitle}</p>}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-body font-700 text-muted">Filter:</span>
          {(["all","vegan","gf","spicy"] as Filter[]).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full font-body font-700 border-2 transition-all ${
                filter === f ? "bg-ink text-white border-ink" : "bg-white text-muted border-ink/30 hover:border-ink"
              }`}>
              {f === "all" ? "All" : tagLabel[f as DietaryTag]}
            </button>
          ))}
        </div>
      </div>

      {/* Items grid */}
      {items.length === 0 ? (
        <div className="text-center py-16"><p className="text-4xl mb-3">🔍</p><p className="font-body text-muted">No items match that filter here!</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.name} className={`comic-card-sm bg-white flex flex-col relative ${item.comingSoon ? "opacity-60" : ""}`}>
              {/* Food image */}
              {item.image ? (
                <div className="h-36 px-3 pt-3">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="h-1.5 bg-y-500 rounded-t-[10px]" />
              )}

              <div className="px-3 pb-3 pt-1 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-1 mb-0.5">
                  <h3 className="font-heading font-600 text-sm text-ink leading-snug">{item.name}</h3>
                  <span className="font-heading font-700 text-o-500 text-sm flex-shrink-0 ml-1">{item.price}</span>
                </div>
                <p className="font-body text-muted text-xs leading-relaxed flex-1 mb-2">{item.description}</p>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {item.badge && (
                    <span className="sticker bg-y-500 text-ink text-xs font-heading font-600 px-2 py-0.5 rounded-full rotate-[-1deg]">{item.badge}</span>
                  )}
                  {item.tags.map(t => (
                    <span key={t} className={`text-xs font-body font-700 px-2 py-0.5 rounded-full border ${tagStyle[t]}`}>{tagLabel[t]}</span>
                  ))}
                  {item.comingSoon && <span className="text-xs font-body font-700 px-2 py-0.5 rounded-full bg-gray-100 text-muted border border-gray-300">Coming Soon</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
