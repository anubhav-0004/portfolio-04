import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return Response.json(
        {
          success: false,
          error: result.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // Send notification email to you
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.RESEND_TO_EMAIL || "your@email.com",
      subject: `New Portfolio Contact from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0D1320; color: #F1F5F9; padding: 32px; border-radius: 12px; border: 1px solid rgba(99,102,241,0.3);">
          <div style="margin-bottom: 24px;">
            <h1 style="font-size: 22px; font-weight: 700; margin: 0; color: #6366F1;">
              New Contact Message
            </h1>
            <p style="color: #94A3B8; margin: 6px 0 0; font-size: 14px;">
              From your portfolio contact form
            </p>
          </div>
          <div style="background: #121B2E; border-radius: 10px; padding: 20px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.06);">
            <p style="margin: 0 0 8px; font-size: 13px; color: #94A3B8;">Name</p>
            <p style="margin: 0; font-size: 16px; font-weight: 600; color: #F1F5F9;">${name}</p>
          </div>
          <div style="background: #121B2E; border-radius: 10px; padding: 20px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.06);">
            <p style="margin: 0 0 8px; font-size: 13px; color: #94A3B8;">Email</p>
            <a href="mailto:${email}" style="margin: 0; font-size: 16px; font-weight: 600; color: #6366F1; text-decoration: none;">${email}</a>
          </div>
          <div style="background: #121B2E; border-radius: 10px; padding: 20px; border: 1px solid rgba(255,255,255,0.06);">
            <p style="margin: 0 0 8px; font-size: 13px; color: #94A3B8;">Message</p>
            <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #F1F5F9; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.06);">
            <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #6366F1, #22D3EE); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
              Reply to ${name} →
            </a>
          </div>
        </div>
      `,
    });

    // Send confirmation email to sender
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: email,
      subject: "Got your message! — Anubhav Kumar",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0D1320; color: #F1F5F9; padding: 32px; border-radius: 12px; border: 1px solid rgba(99,102,241,0.3);">
          <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 12px; color: #F1F5F9;">
            Thanks for reaching out, ${name}! 👋
          </h1>
          <p style="color: #94A3B8; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
            I received your message and will get back to you within 24–48 hours.
          </p>
          <div style="background: #121B2E; border-radius: 10px; padding: 20px; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.06);">
            <p style="margin: 0 0 8px; font-size: 12px; color: #475569; text-transform: uppercase; letter-spacing: 0.08em;">Your message</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #94A3B8; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #475569; font-size: 13px; margin: 0;">
            — Anubhav Mishra · Full-Stack Engineer
          </p>
        </div>
      `,
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return Response.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}