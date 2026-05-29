"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type CateringState = { success: true } | { success: false; error: string } | null;

export async function sendCateringAction(
  _prev: CateringState,
  formData: FormData
): Promise<CateringState> {
  const name      = (formData.get("name")      as string)?.trim();
  const email     = (formData.get("email")     as string)?.trim();
  const eventDate = (formData.get("eventDate") as string)?.trim();
  const groupSize = (formData.get("groupSize") as string)?.trim();
  const message   = (formData.get("message")   as string)?.trim();

  if (!name || !email || !eventDate || !groupSize) {
    return { success: false, error: "Please fill in all required fields." };
  }

  try {
    await resend.emails.send({
      from:    "Rice N Rolls <onboarding@resend.dev>",
      to:      "contact@ricenrolls.ca",
      replyTo: email,
      subject: `[Catering Request] ${name} — ${eventDate} (${groupSize})`,
      text: `Name: ${name}\nEmail: ${email}\nEvent Date: ${eventDate}\nGroup Size: ${groupSize}\n\nDetails:\n${message || "N/A"}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Event Date:</strong> ${eventDate}</p>
        <p><strong>Group Size:</strong> ${groupSize}</p>
        <hr/>
        <p><strong>Details:</strong><br/>${(message || "N/A").replace(/\n/g, "<br/>")}</p>
      `,
    });
    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please email us directly at contact@ricenrolls.ca" };
  }
}
