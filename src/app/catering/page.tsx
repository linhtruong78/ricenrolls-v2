import type { Metadata } from "next";
import { Users, Check, Phone, Mail } from "lucide-react";
import CateringForm from "@/components/catering/CateringForm";
export const metadata: Metadata = { title: "Catering", description: "Korean-inspired catering for events in the Hamilton area. Fresh platters and custom orders." };

const platters = [
  { section:"🌯 Kimbap Platters", items:[
    { emoji:"🌯", name:"Small",     serves:"3–4 people",   price:"$42.99",  details:["5 rolls, your choice","Freshly made","Extra cost on selected rolls"] },
    { emoji:"🌯", name:"Medium",    serves:"6–8 people",   price:"$82.99",  details:["10 rolls, your choice","Freshly made","Extra cost on selected rolls"] },
    { emoji:"🌯", name:"Large",     serves:"10–15 people", price:"$121.99", details:["15 rolls, your choice","Freshly made","Extra cost on selected rolls"] },
  ]},
  { section:"🥟 Dumpling Platters", items:[
    { emoji:"🥟", name:"Small",     serves:"3–4 people",   price:"$31.99",  details:["25 pcs mixed dumplings","Chicken & veggie"] },
    { emoji:"🥟", name:"Medium",    serves:"6–8 people",   price:"$62.99",  details:["50 pcs mixed dumplings","Chicken & veggie"] },
    { emoji:"🥟", name:"Large",     serves:"10–15 people", price:"$121.99", details:["100 pcs mixed dumplings","Chicken & veggie"] },
  ]},
  { section:"🍗 Chicken Platters", items:[
    { emoji:"🍗", name:"Small",     serves:"3–4 people",   price:"$32.99",  details:["30 pcs K-Pop Chicken"] },
    { emoji:"🍗", name:"Medium",    serves:"6–8 people",   price:"$63.99",  details:["60 pcs K-Pop Chicken"] },
    { emoji:"🍗", name:"Large",     serves:"10–15 people", price:"$102.99", details:["100 pcs K-Pop Chicken"] },
  ]},
  { section:"🍜 Japchae Platters", items:[
    { emoji:"🍜", name:"Half Tray", serves:"~2–3 people",  price:"$31.99",  details:["Glass noodles, carrot, peppers, mushroom","Vegan & GF"] },
    { emoji:"🍜", name:"Full Tray", serves:"~5–6 people",  price:"$62.99",  details:["Glass noodles, carrot, peppers, mushroom","Vegan & GF"] },
  ]},
];

const partyPackages = [
  { emoji:"🎉", name:"Small Party",  serves:"10–15 people", price:"$107.97", hot:false, items:["Kimbap Platter Small (5 rolls)","Dumpling Platter Small (25 pcs)","Chicken Platter Small (30 pcs)"] },
  { emoji:"🎊", name:"Medium Party", serves:"20–30 people", price:"$241.96", hot:true,  items:["Kimbap Platter Medium (10 rolls)","Chicken Platter Medium (60 pcs)","Dumpling Platter Medium (50 pcs)","Japchae Half Tray"] },
  { emoji:"🥳", name:"Large Party",  serves:"40–60 people", price:"$409.96", hot:false, items:["Kimbap Platter Large (15 rolls)","Chicken Platter Large (100 pcs)","Dumpling Platter Large (100 pcs)","Japchae Full Tray"] },
];

export default function CateringPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-y-500 border-b-2 border-ink pt-8 pb-10 px-4 text-center">
        <span className="sticker bg-white text-ink text-xs font-heading font-600 px-3 py-1 rounded-full inline-block mb-3 rotate-[-1deg]">Feed a Crowd 🎉</span>
        <h1 className="font-heading text-5xl font-700 text-ink">Catering & Platters</h1>
        <p className="font-body text-body/70 mt-2 max-w-xl mx-auto">Office lunches, family celebrations, events big or small — we&apos;ve got you covered!</p>
      </div>

      {/* Platters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="font-heading text-3xl font-700 text-ink mb-2 text-center">Pick Your Platter</h2>
        <p className="font-body text-muted text-center mb-10 text-sm">Please order at least 24 hours in advance.</p>

        {platters.map(group => (
          <div key={group.section} className="mb-10">
            <h3 className="font-heading text-xl font-700 text-ink mb-4 pb-2 border-b-2 [border-bottom-color:var(--color-y-500)]">{group.section}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.items.map(p => (
                <div key={p.name} className="comic-card bg-white flex flex-col">
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-4xl mb-3">{p.emoji}</div>
                    <h4 className="font-heading font-700 text-xl text-ink mb-1">{p.name}</h4>
                    <div className="flex items-center gap-1.5 text-sm font-body text-muted mb-4"><Users size={14}/>{p.serves}</div>
                    <ul className="space-y-1.5 flex-1 mb-5">
                      {p.details.map(d => (
                        <li key={d} className="flex items-start gap-2 text-sm font-body text-body">
                          <Check size={13} className="mt-0.5 flex-shrink-0 text-o-500"/>{d}
                        </li>
                      ))}
                    </ul>
                    <p className="font-heading font-700 text-3xl text-o-500 mt-auto">{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Party Packages */}
        <div className="mt-4 mb-10">
          <h3 className="font-heading text-xl font-700 text-ink mb-4 pb-2 border-b-2 [border-bottom-color:var(--color-y-500)]">🎉 Party Packages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {partyPackages.map(p => (
              <div key={p.name} className={`comic-card flex flex-col relative ${p.hot ? "bg-y-100 ring-2 ring-o-500" : "bg-white"}`}>
                {p.hot && <span className="sticker absolute -top-4 left-1/2 -translate-x-1/2 bg-o-500 text-white text-xs font-heading font-600 px-3 py-1 rounded-full rotate-[-2deg] whitespace-nowrap">🔥 Most Popular</span>}
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-4xl mb-3">{p.emoji}</div>
                  <h4 className="font-heading font-700 text-xl text-ink mb-1">{p.name}</h4>
                  <div className="flex items-center gap-1.5 text-sm font-body text-muted mb-4"><Users size={14}/>{p.serves}</div>
                  <ul className="space-y-1.5 flex-1 mb-5">
                    {p.items.map(i => (
                      <li key={i} className="flex items-start gap-2 text-sm font-body text-body">
                        <Check size={13} className="mt-0.5 flex-shrink-0 text-o-500"/>{i}
                      </li>
                    ))}
                  </ul>
                  <p className="font-heading font-700 text-3xl text-o-500 mt-auto">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="comic-card bg-y-100 p-5 text-center">
          <p className="font-body font-700 text-ink">Need something custom? <a href="#form" className="text-o-500 underline underline-offset-2">Get in touch below →</a></p>
        </div>
      </div>

      {/* Form */}
      <div id="form" className="bg-warm border-t-2 [border-top-color:var(--color-y-200)] py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <span className="sticker bg-y-500 text-ink text-xs font-heading font-600 px-3 py-1 rounded-full inline-block mb-4 rotate-[-1deg]">Custom Orders 🙌</span>
            <h2 className="font-heading text-3xl font-700 text-ink mb-4">Let&apos;s Plan Your Event!</h2>
            <p className="font-body text-muted leading-relaxed mb-6">Tell us about your event and we&apos;ll make it delicious. We reply within one business day.</p>
            <div className="space-y-3 text-sm font-body">
              <div className="flex items-center gap-3"><div className="w-9 h-9 comic-card-sm bg-y-500 flex items-center justify-center flex-shrink-0"><Phone size={15}/></div><a href="tel:+12892388868" className="font-700 text-ink hover:text-o-500 transition-colors">(289) 238-8868</a></div>
              <div className="flex items-center gap-3"><div className="w-9 h-9 comic-card-sm bg-y-500 flex items-center justify-center flex-shrink-0"><Mail size={15}/></div><a href="mailto:contact@ricenrolls.ca" className="font-700 text-ink hover:text-o-500 transition-colors">contact@ricenrolls.ca</a></div>
            </div>
          </div>
          <CateringForm />
        </div>
      </div>
    </div>
  );
}
