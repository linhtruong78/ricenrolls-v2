import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
export const metadata: Metadata = { title: "Contact", description: "Find Rice N Rolls in Hamilton, ON. Address, hours, phone number, and contact form." };

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
                <li className="flex items-start gap-3"><div className="w-9 h-9 comic-card-sm bg-y-500 flex items-center justify-center flex-shrink-0"><MapPin size={15}/></div><div><p className="font-700 text-ink">#3 2 Castlewood Blvd</p><p className="text-muted">Hamilton, ON L9H 7M8</p><a href="https://maps.google.com/?q=2+Castlewood+Blvd+Hamilton+ON" target="_blank" rel="noopener noreferrer" className="text-o-500 hover:underline text-xs mt-0.5 inline-block">Get directions →</a></div></li>
                <li className="flex items-center gap-3"><div className="w-9 h-9 comic-card-sm bg-y-500 flex items-center justify-center flex-shrink-0"><Phone size={15}/></div><a href="tel:+12892388868" className="font-700 text-ink hover:text-o-500 transition-colors">(289) 238-8868</a></li>
                <li className="flex items-center gap-3"><div className="w-9 h-9 comic-card-sm bg-y-500 flex items-center justify-center flex-shrink-0"><Mail size={15}/></div><a href="mailto:contact@ricenrolls.ca" className="font-700 text-ink hover:text-o-500 transition-colors">contact@ricenrolls.ca</a></li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 comic-card-sm bg-y-500 flex items-center justify-center flex-shrink-0"><Clock size={15}/></div>
                  <div>
                    {hours.map(({ d, t }) => (
                      <div key={d} className="flex gap-4 mb-0.5"><span className="text-muted w-28">{d}</span><span className="font-700 text-ink">{t}</span></div>
                    ))}
                    <p className="text-o-600 text-xs font-700 mt-1.5">🥢 Lunch Special: Mon–Fri 11AM–3PM (pickup only)</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="comic-card overflow-hidden h-64 p-0">
              <iframe title="Rice N Rolls map" src="https://maps.google.com/maps?q=2+Castlewood+Blvd+Hamilton+ON+L9H+7M8&output=embed" width="100%" height="100%" style={{ border:0, minHeight:"256px" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
