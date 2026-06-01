import WaveDivider from "@/components/WaveDivider";

export default function LunchStrip() {
  return (
    <>
      <section className="bg-o-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-4">
              <span className="text-5xl">🥢</span>
              <div>
                <h2 className="font-heading font-700 text-2xl sm:text-3xl leading-tight">Lunch Special!</h2>
                <p className="font-body text-white/80 text-sm">Mon – Fri · 11:00 AM – 3:00 PM · Pickup Only</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a href="/menu?cat=lunch-special"
                className="comic-btn bg-y-500 text-ink font-heading font-600 px-6 py-2.5 rounded-full hover:bg-y-400 transition-colors">
                See Lunch Menu
              </a>
              <a href="tel:+12892388868"
                className="comic-btn bg-white text-o-600 font-heading font-600 px-6 py-2.5 rounded-full hover:bg-y-100 transition-colors">
                📞 Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
      <WaveDivider color="#ffffff" flip />
    </>
  );
}
