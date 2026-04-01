import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const PRODUCTS = ['CDNMonitor'] as const;

const demoRequestSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().regex(/^[\d\s\-+().]{7,20}$/),
  company: z.string().max(200).optional().default(''),
  message: z.string().max(5000).optional().default(''),
  products: z.array(z.enum(PRODUCTS)).min(1),
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
    const parsed = demoRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }

    const { name, email, phone, company, message, products } = parsed.data;

    const transporter = nodemailer.createTransport({
      host: 'mail.cdnglobal.eu',
      port: 587,
      secure: false,
      auth: {
        user: 'no-reply@cdnglobal.eu',
        pass: 'NkxF5@FLa0gTl^&Az',
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeCompany = company ? escapeHtml(company) : '';
    const safeMessage = message ? escapeHtml(message).replace(/\n/g, '<br />') : '';
    const safeProducts = products.map((p) => escapeHtml(p)).join(', ');

    await transporter.sendMail({
      from: 'no-reply@cdnglobal.eu',
      to: 'info@cdnglobal.eu',
      replyTo: email,
      subject: `[DEMO REQUEST] ${products.join(', ')} - ${name.slice(0, 100)}`,
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        ${safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ''}
        <p><strong>Products:</strong> ${safeProducts}</p>
        ${safeMessage ? `<hr /><p><strong>Message:</strong></p><p>${safeMessage}</p>` : ''}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Demo request email error:', err);
    return NextResponse.json({ error: 'Failed to send request' }, { status: 500 });
  }
}
