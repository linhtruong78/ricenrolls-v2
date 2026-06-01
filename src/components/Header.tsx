"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Bike } from "lucide-react";
import { getOpenStatus } from "@/lib/hours";

const ORDER_URL = "https://www.clover.com/online-ordering/rice-n-rolls-dundas";
const UBER_EATS_URL = "https://www.ubereats.com/ca/store/rice-n-rolls/kvPWml5jViCdO630ZKftzA";
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Catering", href: "/catering" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [status, setStatus] = useState({ open: false, label: "Closed" });

  useEffect(() => {
    setStatus(getOpenStatus());
    const t = setInterval(() => setStatus(getOpenStatus()), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl">🍱</span>
            <span className="font-heading font-bold text-xl text-ink leading-none">
              Rice N<span className="text-o-500"> Rolls</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="font-body font-600 text-sm text-body hover:text-o-500 transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Live status pill */}
            <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border-2 border-ink sticker ${status.open ? "bg-y-500" : "bg-gray-100 text-muted"}`}>
              <span className={`w-2 h-2 rounded-full ${status.open ? "bg-green-600" : "bg-gray-400"}`} />
              {status.label}
            </span>
            <a href={UBER_EATS_URL} target="_blank" rel="noopener noreferrer"
              className="comic-btn flex items-center gap-2 bg-[#06C167] hover:bg-[#05a356] text-white font-heading font-600 text-sm px-5 py-2.5 rounded-full">
              <Bike size={15} /> Uber Eats
            </a>
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer"
              className="comic-btn flex items-center gap-2 bg-o-500 hover:bg-o-600 text-white font-heading font-600 text-sm px-5 py-2.5 rounded-full">
              <ShoppingBag size={15} /> Order Online
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-ink" aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-96" : "max-h-0"} bg-white border-t-2 border-ink`}>
        <nav className="flex flex-col px-4 py-3 gap-1">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              className="font-body font-600 py-3 px-3 rounded-xl hover:bg-y-100 text-body transition-colors">
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-y-200">
            <span className={`self-start flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border-2 border-ink sticker ${status.open ? "bg-y-500" : "bg-gray-100 text-muted"}`}>
              <span className={`w-2 h-2 rounded-full ${status.open ? "bg-green-600" : "bg-gray-400"}`} />
              {status.label}
            </span>
            <div className="flex gap-2">
              <a href={UBER_EATS_URL} target="_blank" rel="noopener noreferrer"
                className="comic-btn flex-1 flex items-center justify-center gap-2 bg-[#06C167] hover:bg-[#05a356] text-white font-heading font-600 py-2.5 rounded-full text-sm">
                <Bike size={15} /> Uber Eats
              </a>
              <a href={ORDER_URL} target="_blank" rel="noopener noreferrer"
                className="comic-btn flex-1 flex items-center justify-center gap-2 bg-o-500 text-white font-heading font-600 py-2.5 rounded-full text-sm">
                <ShoppingBag size={15} /> Order Online
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
