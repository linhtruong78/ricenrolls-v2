import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
export const metadata: Metadata = { title: "Contact", description: "Find Rice N Rolls in Dundas, ON. Address, hours, phone number, and contact form." };

const hours = [
  { d: "Mon – Thu", t: "11:00 AM – 7:00 PM" },
  { d: "Friday",    t: "11:00 AM – 8:00 PM" },
  { d: "Saturday",  t: "12:00 PM – 7:00 PM" },
  { d: "Sunday",    t: "3:00 PM – 7:00 PM" },
];

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-y-500 border-b-2 border-ink pt-8 pb-10 px-4 text-center">
        <span className="sticker bg-white text-ink text-xs font-heading font-600 px-3 py-1 rounded-full inline-block mb-3 rotate-[-1deg]">Reach Out 💬</span>
        <h1 className="font-heading text-5xl font-700 text-ink">Contact Us</h1>
        <p className="font-body text-body/70 mt-2">Questions, feedback, or just want to say hi? We&apos;re here!</p>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Info + Map */}
          <div className="space-y-6">
            <div className="comic-card bg-y-100 p-6">
              <h2 className="font-heading font-700 text-2xl text-ink mb-5">Find Us 📍</h2>
              <ul className="space-y-4 text-sm font-body">
                <li className="flex items-start gap-3"><div className="w-9 h-9 comic-card-sm bg-y-500 flex items-center justify-center flex-shrink-0"><MapPin size={15}/></div><div><p className="font-700 text-ink">#3 2 Castlewood Blvd</p><p className="text-muted">Dundas, ON L9H 7M8</p><a href="https://maps.google.com/?q=2+Castlewood+Blvd+Dundas+ON" target="_blank" rel="noopener noreferrer" className="text-o-500 hover:underline text-xs mt-0.5 inline-block">Get directions →</a></div></li>
                <li className="flex items-center gap-3"><div className="w-9 h-9 comic-card-sm bg-y-500 flex items-center justify-center flex-shrink-0"><Phone size={15}/></div><a href="tel:+12892388868" className="font-700 text-ink hover:text-o-500 transition-colors">(289) 238-8868</a></li>
                <li className="flex items-center gap-3"><div className="w-9 h-9 comic-card-sm bg-y-500 flex items-center justify-center flex-shrink-0"><Mail size={15}/></div><a href="mailto:contact@ricenrolls.ca" className="font-700 text-ink hover:text-o-500 transition-colors">contact@ricenrolls.ca</a></li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 comic-card-sm bg-y-500 flex items-center justify-center flex-shrink-0"><Clock size={15}/></div>
                  <div>
                    {hours.map(({ d, t }) => (
                      <div key={d} className="flex gap-4 mb-0.5"><span className="text-muted w-28">{d}</span><span className="font-700 text-ink">{t}</span></div>
                    ))}
                    <p className="text-o-600 text-xs font-700 mt-1.5">🥢 Lunch Special: Mon–Fri 11AM–2PM (pickup only)</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="comic-card overflow-hidden h-64 p-0">
              <iframe title="Rice N Rolls map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2901.0!2d-79.9569!3d43.2636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c9b3e5c9e2b4d%3A0x123456789abcdef!2s2%20Castlewood%20Blvd%2C%20Dundas%2C%20ON%20L9H%207M8!5e0!3m2!1sen!2sca!4v1716000000000" width="100%" height="100%" style={{ border:0, minHeight:"256px" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
            </div>
          </div>

          {/* Form */}
          <div className="comic-card bg-white p-7">
            <h2 className="font-heading font-700 text-2xl text-ink mb-2">Send a Message 💌</h2>
            <p className="font-body text-muted text-sm mb-6">We reply within one business day.</p>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-heading font-600 text-ink mb-1 uppercase">Name *</label><input type="text" required placeholder="Your name" className="w-full px-3 py-2.5 rounded-xl border-2 border-ink text-sm font-body focus:outline-none focus:border-o-500 bg-warm"/></div>
                <div><label className="block text-xs font-heading font-600 text-ink mb-1 uppercase">Email *</label><input type="email" required placeholder="you@email.com" className="w-full px-3 py-2.5 rounded-xl border-2 border-ink text-sm font-body focus:outline-none focus:border-o-500 bg-warm"/></div>
              </div>
              <div><label className="block text-xs font-heading font-600 text-ink mb-1 uppercase">Topic</label>
                <select className="w-full px-3 py-2.5 rounded-xl border-2 border-ink text-sm font-body focus:outline-none focus:border-o-500 bg-warm">
                  <option value="">Select a topic</option>
                  {["General Inquiry","Catering Request","Feedback","Allergy Question","Other"].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div><label className="block text-xs font-heading font-600 text-ink mb-1 uppercase">Message *</label><textarea required rows={5} placeholder="How can we help?" className="w-full px-3 py-2.5 rounded-xl border-2 border-ink text-sm font-body focus:outline-none focus:border-o-500 bg-warm resize-none"/></div>
              <button type="submit" className="comic-btn w-full flex items-center justify-center gap-2 bg-o-500 hover:bg-o-600 text-white font-heading font-600 py-3.5 rounded-full"><Send size={16}/>Send Message 💌</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
