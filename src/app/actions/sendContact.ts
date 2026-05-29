"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState = { success: true } | { success: false; error: string } | null;

export async function sendContactAction(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name    = (formData.get("name")    as string)?.trim();
  const email   = (formData.get("email")   as string)?.trim();
  const topic   = (formData.get("topic")   as string)?.trim() || "General Inquiry";
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  try {
    await resend.emails.send({
      from:    "Rice N Rolls <onboarding@resend.dev>",
      to:      "contact@ricenrolls.ca",
      replyTo: email,
      subject: `[Website] ${topic} — from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Topic:</strong> ${topic}</p>
        <hr/>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });
    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please email us directly at contact@ricenrolls.ca" };
  }
}
