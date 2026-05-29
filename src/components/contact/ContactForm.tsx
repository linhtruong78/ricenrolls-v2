"use client";

import { useActionState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { sendContactAction } from "@/app/actions/sendContact";

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendContactAction, null);

  if (state?.success) {
    return (
      <div className="comic-card bg-white p-7 flex flex-col items-center justify-center text-center gap-4 min-h-[320px]">
        <CheckCircle size={48} className="text-green-500" />
        <h3 className="font-heading font-700 text-2xl text-ink">Message Sent! 🎉</h3>
        <p className="font-body text-muted text-sm">Thanks for reaching out — we&apos;ll reply within one business day.</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm font-body text-o-500 underline underline-offset-2 hover:text-o-600"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="comic-card bg-white p-7">
      <h2 className="font-heading font-700 text-2xl text-ink mb-2">Send a Message 💌</h2>
      <p className="font-body text-muted text-sm mb-6">We reply within one business day.</p>

      <form action={action} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-heading font-600 text-ink mb-1 uppercase">Name *</label>
            <input name="name" type="text" required placeholder="Your name"
              className="w-full px-3 py-2.5 rounded-xl border-2 border-ink text-sm font-body focus:outline-none focus:border-o-500 bg-warm" />
          </div>
          <div>
            <label className="block text-xs font-heading font-600 text-ink mb-1 uppercase">Email *</label>
            <input name="email" type="email" required placeholder="you@email.com"
              className="w-full px-3 py-2.5 rounded-xl border-2 border-ink text-sm font-body focus:outline-none focus:border-o-500 bg-warm" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-heading font-600 text-ink mb-1 uppercase">Topic</label>
          <select name="topic"
            className="w-full px-3 py-2.5 rounded-xl border-2 border-ink text-sm font-body focus:outline-none focus:border-o-500 bg-warm">
            <option value="">Select a topic</option>
            {["General Inquiry", "Catering Request", "Feedback", "Allergy Question", "Other"].map(t =>
              <option key={t}>{t}</option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-xs font-heading font-600 text-ink mb-1 uppercase">Message *</label>
          <textarea name="message" required rows={5} placeholder="How can we help?"
            className="w-full px-3 py-2.5 rounded-xl border-2 border-ink text-sm font-body focus:outline-none focus:border-o-500 bg-warm resize-none" />
        </div>

        {state?.success === false && (
          <div className="flex items-center gap-2 text-red-600 text-sm font-body bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
            <AlertCircle size={16} className="flex-shrink-0" />
            {state.error}
          </div>
        )}

        <button type="submit" disabled={pending}
          className={`comic-btn w-full flex items-center justify-center gap-2 bg-o-500 hover:bg-o-600 text-white font-heading font-600 py-3.5 rounded-full transition-opacity ${pending ? "opacity-60 cursor-not-allowed" : ""}`}>
          <Send size={16} />
          {pending ? "Sending…" : "Send Message 💌"}
        </button>
      </form>
    </div>
  );
}
