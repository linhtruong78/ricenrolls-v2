import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "About Us", description: "Learn the story behind Rice N Rolls — fresh Korean-inspired food in Hamilton, Ontario." };

const values = [
  { emoji:"🥬", title:"Fresh Every Day", desc:"We prep everything fresh each morning — quality ingredients, no shortcuts." },
  { emoji:"❤️", title:"Made with Love", desc:"Every dish blends Korean tradition with our own creative touch." },
  { emoji:"🤝", title:"Community First", desc:"We're proud to be part of Hamilton. Something for everyone on the menu!" },
];
const stats = [{ n:"50+", l:"Menu Items" }, { n:"Vegan", l:"Friendly" }, { n:"Daily", l:"Fresh Prep" }, { n:"5★", l:"Google" }];

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-y-500 border-b-2 border-ink pt-8 pb-10 px-4 text-center">
        <span className="sticker bg-white text-ink text-xs font-heading font-600 px-3 py-1 rounded-full inline-block mb-3 rotate-[-1deg]">Our Story 📖</span>
        <h1 className="font-heading text-5xl font-700 text-ink">About Rice N Rolls</h1>
        <p className="font-body text-body/70 mt-2">A little Korean kitchen with a big love for flavour 🍱</p>
      </div>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl font-700 text-ink mb-5">Korean Comfort Food, Hamilton Home</h2>
            {/* TODO: Replace with your real restaurant story */}
            <div className="space-y-3 font-body text-muted leading-relaxed">
              <p>Rice N Rolls was born from a love of Korean food and a belief that everyone deserves access to fresh, flavourful, and honestly made meals — without the fancy price tag.</p>
              <p>Nestled in Hamilton, Ontario, we bring hand-rolled gimbap, sizzling K-pop chicken, hearty bibimbap, and more to the community — made fresh every single day.</p>
              <p>We&apos;re for everyone: students grabbing lunch, families picking up dinner, or groups ordering a catering platter. If you love good food, you&apos;re welcome here!</p>
            </div>
          </div>
          {/* Stats card */}
          <div className="comic-card bg-y-500 p-8 text-center">
            <div className="text-6xl mb-4">🍱</div>
            <h3 className="font-heading font-700 text-2xl text-ink mb-1">Rice N Rolls</h3>
            <p className="font-body text-body/60 text-sm mb-6">#3 2 Castlewood Blvd, Hamilton, ON</p>
            <div className="grid grid-cols-2 gap-3">
              {stats.map(({ n, l }) => (
                <div key={l} className="comic-card-sm bg-white p-3">
                  <p className="font-heading font-700 text-2xl text-o-500">{n}</p>
                  <p className="font-body text-muted text-xs">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-warm border-t-2 border-y-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-700 text-ink text-center mb-8">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map(v => (
              <div key={v.title} className="comic-card bg-white p-6 text-center">
                <div className="text-4xl mb-3">{v.emoji}</div>
                <h3 className="font-heading font-600 text-xl text-ink mb-2">{v.title}</h3>
                <p className="font-body text-muted text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 text-center">
        <h2 className="font-heading text-3xl font-700 text-ink mb-3">Come Say Hi! 👋</h2>
        <p className="font-body text-muted mb-7 max-w-md mx-auto">Stop by or order online — we&apos;re in Hamilton and ready to serve you something delicious!</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://www.clover.com/online-ordering/rice-n-rolls-dundas" target="_blank" rel="noopener noreferrer"
            className="comic-btn bg-o-500 hover:bg-o-600 text-white font-heading font-600 px-8 py-3.5 rounded-full transition-colors">Order Online 🍱</a>
          <Link href="/contact" className="comic-btn bg-y-500 hover:bg-y-400 text-ink font-heading font-600 px-8 py-3.5 rounded-full transition-colors">Get Directions 📍</Link>
        </div>
      </section>
    </div>
  );
}
