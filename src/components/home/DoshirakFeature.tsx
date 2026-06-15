import Link from "next/link";

const SETS = [
  {
    name: "Korean Single Protein Box",
    price: "$15.99",
    desc: "1 protein + steamed rice + japchae",
    emoji: "🍱",
    badge: "💎 Best Value",
    bg: "bg-y-100",
  },
  {
    name: "Korean Double Protein Box",
    price: "$17.99",
    desc: "2 proteins + rice + kimchi + japchae + side",
    emoji: "🍱",
    badge: "🏆 Top Pick",
    bg: "bg-o-100",
  },
  {
    name: "Donkatsu Set",
    price: "$21.99",
    desc: "Crispy pork cutlet + rice + kimchi + coleslaw",
    emoji: "🥩",
    badge: "❤️ Fan Fave",
    bg: "bg-y-100",
  },
];

export default function DoshirakFeature() {
  return (
    <section className="bg-o-500 py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="sticker bg-y-500 text-ink text-xs font-heading font-600 px-3 py-1 rounded-full rotate-[-1deg] inline-block mb-3">
            🏆 Best Value on the Menu
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-700 text-white">
            Korean Doshirak Set Meals
          </h2>
          <p className="font-body text-white/80 mt-3 text-base max-w-xl mx-auto leading-relaxed">
            Complete Korean meals in one box — protein, rice & all the sides. Nothing missing, nothing extra to order.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {SETS.map((s) => (
            <div key={s.name} className={`comic-card ${s.bg} p-6 flex flex-col items-center text-center relative`}>
              {s.badge && (
                <span className="sticker absolute -top-3 left-1/2 -translate-x-1/2 bg-y-500 text-ink text-xs font-heading font-600 px-2.5 py-0.5 rounded-full rotate-[-2deg] whitespace-nowrap">
                  {s.badge}
                </span>
              )}
              <span className="text-5xl mt-2 mb-3">{s.emoji}</span>
              <h3 className="font-heading font-600 text-base text-ink leading-snug mb-1">{s.name}</h3>
              <p className="font-body text-muted text-sm mb-4 leading-relaxed">{s.desc}</p>
              <p className="font-heading font-700 text-o-500 text-2xl mt-auto">{s.price}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/menu?cat=doshirak"
            className="comic-btn inline-flex items-center gap-2 bg-y-500 hover:bg-y-600 text-ink font-heading font-600 text-base px-8 py-3.5 rounded-full"
          >
            Order Doshirak Now 🍱
          </Link>
        </div>

      </div>
    </section>
  );
}
