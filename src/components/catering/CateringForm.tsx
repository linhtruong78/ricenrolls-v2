"use client";

import { useActionState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { sendCateringAction } from "@/app/actions/sendCatering";

export default function CateringForm() {
  const [state, action, pending] = useActionState(sendCateringAction, null);

  if (state?.success) {
    return (
      <div className="comic-card bg-white p-7 flex flex-col items-center justify-center text-center gap-4 min-h-[320px]">
        <CheckCircle size={48} className="text-green-500" />
        <h3 className="font-heading font-700 text-2xl text-ink">Request Sent! 🎉</h3>
        <p className="font-body text-muted text-sm">We&apos;ll get back to you within one business day to plan your event.</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm font-body text-o-500 underline underline-offset-2 hover:text-o-600"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="comic-card bg-white p-7">
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

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-heading font-600 text-ink mb-1 uppercase">Event Date *</label>
            <input name="eventDate" type="date" required
              className="w-full px-3 py-2.5 rounded-xl border-2 border-ink text-sm font-body focus:outline-none focus:border-o-500 bg-warm" />
          </div>
          <div>
            <label className="block text-xs font-heading font-600 text-ink mb-1 uppercase">Group Size *</label>
            <select name="groupSize" required
              className="w-full px-3 py-2.5 rounded-xl border-2 border-ink text-sm font-body focus:outline-none focus:border-o-500 bg-warm">
              <option value="">Select</option>
              {["2–4", "5–10", "11–20", "21–50", "50+"].map(s =>
                <option key={s}>{s} people</option>
              )}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-heading font-600 text-ink mb-1 uppercase">Message</label>
          <textarea name="message" rows={4}
            placeholder="Tell us about your event, dietary needs, preferred packages…"
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
          {pending ? "Sending…" : "Send Request 🎉"}
        </button>
      </form>
    </div>
  );
}
