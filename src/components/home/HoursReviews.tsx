import { MapPin, Phone, Clock } from "lucide-react";

const hours = [
  { d: "Every day", t: "11:00 AM – 7:30 PM" },
];

const reviews = [
  { name: "Sarah M.", stars: 5, text: "The Beef Bulgogi Gimbap is incredible. Fresh, flavourful and generous portions. Our family's go-to spot! 🙌", date: "Mar 2025" },
  { name: "James K.", stars: 5, text: "K-Pop Chicken is a must-try — crispy, juicy and that sauce is addictive. Online ordering was super easy too!", date: "Feb 2025" },
];

function Stars({ n }: { n: number }) {
  return <span>{"⭐".repeat(n)}</span>;
}

export default function HoursReviews() {
  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-heading text-4xl sm:text-5xl font-700 text-ink">Find Us & What People Say</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Hours + Contact */}
          <div className="comic-card bg-y-100 p-6">
            <h3 className="font-heading font-700 text-xl text-ink mb-4 flex items-center gap-2"><Clock size={18}/> Hours</h3>
            <ul className="space-y-2 mb-4">
              {hours.map(({ d, t }) => (
                <li key={d} className="flex justify-between text-sm font-body">
                  <span className="text-muted">{d}</span>
                  <span className="font-700 text-ink">{t}</span>
                </li>
              ))}
            </ul>
            <div className="bg-y-500 border-2 border-ink sticker rounded-xl px-3 py-2 text-xs font-body font-700 text-ink mb-4">
              🥢 Lunch Special: Mon–Fri 12 PM–3 PM
            </div>
            <div className="space-y-2 text-sm font-body text-muted">
              <div className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 flex-shrink-0 text-o-500"/><span>#3 2 Castlewood Blvd, Hamilton, ON</span></div>
              <div className="flex items-center gap-2"><Phone size={14} className="text-o-500"/><a href="tel:+12892388868" className="hover:text-o-500 transition-colors">(289) 238-8868</a></div>
            </div>
          </div>

          {/* Reviews */}
          <div className="flex flex-col gap-4">
            {reviews.map((r) => (
              <div key={r.name} className="comic-card bg-white p-5">
                <div className="flex items-center justify-between mb-2">
                  <Stars n={r.stars} />
                  <span className="text-xs font-body text-muted">{r.date}</span>
                </div>
                <p className="font-body text-sm text-body leading-relaxed mb-3">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-y-500 border-2 border-ink flex items-center justify-center text-xs font-heading font-700">{r.name[0]}</div>
                  <span className="text-sm font-body font-700 text-ink">{r.name}</span>
                </div>
              </div>
            ))}
            <a href="https://www.google.com/search?q=Rice+N+Rolls+Dundas+reviews" target="_blank" rel="noopener noreferrer"
              className="text-center text-sm font-body font-700 text-o-500 hover:underline transition-colors">
              Read all Google reviews →
            </a>
          </div>

          {/* Map */}
          <div className="comic-card overflow-hidden h-72 lg:h-full min-h-[280px] p-0">
            <iframe
              title="Rice N Rolls map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2901.0!2d-79.9569!3d43.2636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c9b3e5c9e2b4d%3A0x123456789abcdef!2s2%20Castlewood%20Blvd%2C%20Hamilton%2C%20ON%20L9H%207M8!5e0!3m2!1sen!2sca!4v1716000000000"
              width="100%" height="100%" style={{ border: 0, minHeight: "280px" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
