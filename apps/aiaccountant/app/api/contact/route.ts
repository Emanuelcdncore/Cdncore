import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  type: z.enum(['investor', 'beta']),
  message: z.string().max(5000).optional().default(''),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }

    const { name, email, type, message } = parsed.data;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.cdnglobal.eu',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'no-reply@cdnglobal.eu',
        pass: process.env.SMTP_PASS || '',
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeType = type === 'investor' ? 'Investor' : 'Beta Tester';
    const safeMessage = message ? escapeHtml(message).replace(/\n/g, '<br />') : '';

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'no-reply@cdnglobal.eu',
      to: process.env.SMTP_TO || 'info@cdnglobal.eu',
      replyTo: email,
      subject: `[AI-ACCOUNTANT] ${safeType} - ${name.slice(0, 100)}`,
      html: `
        <h2>New Ai-Accountant Contact</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Interest:</strong> ${safeType}</p>
        ${safeMessage ? `<hr /><p><strong>Message:</strong></p><p>${safeMessage}</p>` : ''}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact email error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
