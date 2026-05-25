import Link from "next/link";
import WaveDivider from "@/components/WaveDivider";

const pillars = [
  { emoji: "🥬", title: "Fresh Every Day", desc: "Made from scratch each morning — no shortcuts, just honest ingredients." },
  { emoji: "🌶️", title: "Bold Korean Flavours", desc: "Authentic Korean recipes with our own tasty twists and housemade sauces." },
  { emoji: "📦", title: "Easy Pickup & Delivery", desc: "Order online for quick pickup or get it delivered via Uber Eats." },
];

const dishes = [
  { emoji: "🌯", name: "Beef Bulgogi Gimbap", price: "$11.99", badge: "⭐ Best Seller", bg: "bg-y-100" },
  { emoji: "🍗", name: "K-Pop Chicken", price: "$13.99", badge: "🔥 Fan Fave", bg: "bg-o-100" },
  { emoji: "🍚", name: "Beef Bulgogi Bibimbap", price: "$15.99", badge: null, bg: "bg-y-100" },
  { emoji: "🍜", name: "Japchae (Vegan · GF)", price: "$14.99", badge: "🌿 Vegan", bg: "bg-o-100" },
];

export default function BentoSection() {
  return (
    <section className="bg-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="sticker bg-y-500 text-ink text-xs font-heading font-600 px-3 py-1 rounded-full rotate-[-1deg] inline-block mb-3">
            Why Rice N Rolls? 🤔
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-700 text-ink">We Make It Easy to Eat Great</h2>
        </div>

        {/* Pillars row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {pillars.map((p) => (
            <div key={p.title} className="comic-card bg-white p-6 text-center">
              <div className="text-4xl mb-3">{p.emoji}</div>
              <h3 className="font-heading font-600 text-xl text-ink mb-2">{p.title}</h3>
              <p className="font-body text-muted text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Featured dishes row */}
        <div className="mb-8">
          <h3 className="font-heading text-2xl font-700 text-ink mb-5 flex items-center gap-2">
            🍽️ Customer Favourites
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {dishes.map((d) => (
              <div key={d.name} className={`comic-card ${d.bg} p-5 flex flex-col items-center text-center relative`}>
                {d.badge && (
                  <span className="sticker absolute -top-3 left-1/2 -translate-x-1/2 bg-y-500 text-ink text-xs font-heading font-600 px-2.5 py-0.5 rounded-full rotate-[-2deg] whitespace-nowrap">
                    {d.badge}
                  </span>
                )}
                <span className="text-5xl mt-2 mb-3">{d.emoji}</span>
                <h4 className="font-heading font-600 text-base text-ink leading-snug mb-1">{d.name}</h4>
                <p className="font-heading font-700 text-o-500 text-lg">{d.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/menu"
            className="comic-btn inline-flex items-center gap-2 bg-o-500 hover:bg-o-600 text-white font-heading font-600 text-base px-8 py-3.5 rounded-full">
            See Full Menu 🍱
          </Link>
        </div>
      </div>

      <WaveDivider color="#FF6B35" />
    </section>
  );
}
