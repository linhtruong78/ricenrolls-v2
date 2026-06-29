import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ORDER_URL = "https://www.clover.com/online-ordering/rice-n-rolls-hamilton";

export default function Footer() {
  return (
    <footer className="bg-ink text-white border-t-4 border-[#ffd93d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/images/ricenroll.png" alt="Rice N Rolls logo" className="h-10 w-auto" />
              <span className="font-heading font-bold text-xl">Rice N<span className="text-y-500"> Rolls</span></span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">Fresh Korean-inspired food made daily in Hamilton, Ontario. Gimbap, bowls & more!</p>
            <div className="flex gap-2">
              <a href="https://www.instagram.com/ricenrollsdundas/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-y-500 hover:text-ink flex items-center justify-center transition-colors text-sm font-bold border border-white/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61561324612315" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-y-500 hover:text-ink flex items-center justify-center transition-colors border border-white/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Links + Hours */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-heading font-600 text-y-500 mb-3">Pages</h4>
              <ul className="space-y-1.5 text-sm text-white/60">
                {[{l:"Home",h:"/"},{l:"Menu",h:"/menu"},{l:"Catering",h:"/catering"},{l:"About",h:"/about"},{l:"Contact",h:"/contact"}].map(({l,h})=>(
                  <li key={h}><Link href={h} className="hover:text-y-500 transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-600 text-y-500 mb-3 flex items-center gap-1"><Clock size={14}/> Hours</h4>
              <ul className="space-y-1 text-xs text-white/60">
                <li><span className="text-white/80">Mon–Sat</span> 12–8pm</li>
                <li><span className="text-white/80">Sun</span> Closed</li>
              </ul>
              <p className="text-y-400 text-xs mt-2">🥢 Lunch: Mon–Fri 11–3pm</p>
            </div>
          </div>

          {/* Contact + CTA */}
          <div>
            <h4 className="font-heading font-600 text-y-500 mb-3">Visit Us</h4>
            <ul className="space-y-2 text-sm text-white/60 mb-4">
              <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 flex-shrink-0 text-y-400"/><span>#3 2 Castlewood Blvd, Hamilton, ON L9H 7M8</span></li>
              <li className="flex items-center gap-2"><Phone size={14} className="text-y-400"/><a href="tel:+12892388868" className="hover:text-y-500 transition-colors">(289) 238-8868</a></li>
              <li className="flex items-center gap-2"><Mail size={14} className="text-y-400"/><a href="mailto:contact@ricenrolls.ca" className="hover:text-y-500 transition-colors">contact@ricenrolls.ca</a></li>
            </ul>
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer"
              className="comic-btn inline-block bg-y-500 text-ink font-heading font-600 text-sm px-5 py-2 rounded-full hover:bg-y-400 transition-colors">
              Order Online 🍱
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Rice N Rolls. All rights reserved.</p>
          <p>#3 2 Castlewood Blvd, Hamilton, ON · (289) 238-8868</p>
        </div>
      </div>
    </footer>
  );
}
