"use client";
import { useState } from "react";
import { X } from "lucide-react";
export default function PromoBanner() {
  const [on, setOn] = useState(true);
  if (!on) return null;
  return (
    <div className="bg-y-500 border-b-2 border-ink py-2.5 px-4 text-center text-sm relative font-body font-700">
      <span>🎉 <strong>Family Month Sale</strong> — Combos from <strong>$40.99</strong>!{" "}
        <a href="/menu#platters" className="underline underline-offset-2 hover:text-o-600 transition-colors">Shop platters →</a>
      </span>
      <button onClick={() => setOn(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink" aria-label="Dismiss">
        <X size={16}/>
      </button>
    </div>
  );
}
