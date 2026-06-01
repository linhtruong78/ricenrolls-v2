'use server';

import { Resend } from 'resend';

export type FormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key || key === 're_your_api_key_here') {
    throw new Error('RESEND_API_KEY is not configured in .env.local');
  }
  return new Resend(key);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function contactEmailHtml(name: string, email: string, topic: string, message: string) {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;background:#fffdf5;font-family:sans-serif;">
  <div style="max-width:560px;margin:0 auto;border:2px solid #1a1a1a;border-radius:16px;overflow:hidden;box-shadow:4px 4px 0 #1a1a1a;">
    <div style="background:#ffd93d;padding:16px 24px;border-bottom:2px solid #1a1a1a;">
      <p style="margin:0;font-size:13px;color:#1a1a1a;">🍱 Rice N Rolls — New Contact Message</p>
    </div>
    <div style="padding:24px;background:#fff;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#7a7a7a;width:90px;vertical-align:top;">Name</td><td style="padding:6px 0;font-weight:700;color:#1a1a1a;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#7a7a7a;vertical-align:top;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#ff6b35;font-weight:700;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#7a7a7a;vertical-align:top;">Topic</td><td style="padding:6px 0;color:#1a1a1a;">${escapeHtml(topic)}</td></tr>
      </table>
      <hr style="border:none;border-top:2px solid #fff3b0;margin:16px 0;"/>
      <p style="margin:0 0 8px;color:#7a7a7a;font-size:13px;">Message</p>
      <p style="margin:0;color:#1a1a1a;font-size:14px;white-space:pre-wrap;line-height:1.6;">${escapeHtml(message)}</p>
    </div>
    <div style="background:#fffdf5;padding:12px 24px;border-top:2px solid #fff3b0;font-size:12px;color:#7a7a7a;">
      Reply to this email to respond directly to ${escapeHtml(name)}.
    </div>
  </div>
</body>
</html>`;
}

function cateringEmailHtml(
  name: string,
  email: string,
  eventDate: string,
  groupSize: string,
  message: string
) {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;background:#fffdf5;font-family:sans-serif;">
  <div style="max-width:560px;margin:0 auto;border:2px solid #1a1a1a;border-radius:16px;overflow:hidden;box-shadow:4px 4px 0 #1a1a1a;">
    <div style="background:#ffd93d;padding:16px 24px;border-bottom:2px solid #1a1a1a;">
      <p style="margin:0;font-size:13px;color:#1a1a1a;">🎉 Rice N Rolls — New Catering Request</p>
    </div>
    <div style="padding:24px;background:#fff;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#7a7a7a;width:110px;vertical-align:top;">Name</td><td style="padding:6px 0;font-weight:700;color:#1a1a1a;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#7a7a7a;vertical-align:top;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#ff6b35;font-weight:700;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#7a7a7a;vertical-align:top;">Event Date</td><td style="padding:6px 0;color:#1a1a1a;">${escapeHtml(eventDate)}</td></tr>
        <tr><td style="padding:6px 0;color:#7a7a7a;vertical-align:top;">Group Size</td><td style="padding:6px 0;color:#1a1a1a;">${escapeHtml(groupSize)}</td></tr>
      </table>
      ${message ? `
      <hr style="border:none;border-top:2px solid #fff3b0;margin:16px 0;"/>
      <p style="margin:0 0 8px;color:#7a7a7a;font-size:13px;">Details / Special Requests</p>
      <p style="margin:0;color:#1a1a1a;font-size:14px;white-space:pre-wrap;line-height:1.6;">${escapeHtml(message)}</p>
      ` : ''}
    </div>
    <div style="background:#fffdf5;padding:12px 24px;border-top:2px solid #fff3b0;font-size:12px;color:#7a7a7a;">
      Reply to this email to respond directly to ${escapeHtml(name)}.
    </div>
  </div>
</body>
</html>`;
}

export async function sendContactEmail(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name')?.toString().trim() ?? '';
  const email = formData.get('email')?.toString().trim() ?? '';
  const topic = formData.get('topic')?.toString().trim() || 'General Inquiry';
  const message = formData.get('message')?.toString().trim() ?? '';

  if (!name || name.length < 2) {
    return { status: 'error', message: 'Please enter your name (at least 2 characters).' };
  }
  if (!email || !isValidEmail(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' };
  }
  if (!message || message.length < 10) {
    return { status: 'error', message: 'Message is too short — please give us a bit more detail.' };
  }

  try {
    const resend = getResend();
    await resend.emails.send({
      from: 'Rice N Rolls <noreply@ricenrolls.ca>',
      to: 'contact@ricenrolls.ca',
      replyTo: email,
      subject: `New Message: ${topic} from ${name}`,
      html: contactEmailHtml(name, email, topic, message),
    });
    return {
      status: 'success',
      message: "Thanks for reaching out! We'll get back to you within one business day.",
    };
  } catch (err) {
    console.error('[sendContactEmail]', err);
    return {
      status: 'error',
      message: 'Something went wrong on our end. Please try again or call us at (289) 238-8868.',
    };
  }
}

export async function sendCateringEmail(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name')?.toString().trim() ?? '';
  const email = formData.get('email')?.toString().trim() ?? '';
  const eventDate = formData.get('eventDate')?.toString().trim() ?? '';
  const groupSize = formData.get('groupSize')?.toString().trim() ?? '';
  const message = formData.get('message')?.toString().trim() ?? '';

  if (!name || name.length < 2) {
    return { status: 'error', message: 'Please enter your name (at least 2 characters).' };
  }
  if (!email || !isValidEmail(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' };
  }
  if (!eventDate) {
    return { status: 'error', message: 'Please select your event date.' };
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (new Date(eventDate) < today) {
    return { status: 'error', message: 'Event date must be today or in the future.' };
  }
  if (!groupSize) {
    return { status: 'error', message: 'Please select your group size.' };
  }

  try {
    const resend = getResend();
    await resend.emails.send({
      from: 'Rice N Rolls <noreply@ricenrolls.ca>',
      to: 'contact@ricenrolls.ca',
      replyTo: email,
      subject: `Catering Request from ${name} — ${groupSize} on ${eventDate}`,
      html: cateringEmailHtml(name, email, eventDate, groupSize, message),
    });
    return {
      status: 'success',
      message: "Thanks for your catering request! We'll be in touch within one business day to confirm the details.",
    };
  } catch (err) {
    console.error('[sendCateringEmail]', err);
    return {
      status: 'error',
      message: 'Something went wrong on our end. Please try again or call us at (289) 238-8868.',
    };
  }
}
