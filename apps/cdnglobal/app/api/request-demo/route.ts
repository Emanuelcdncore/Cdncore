import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const PRODUCTS = ['CDNMonitor'] as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, company, products, message } = body;

    if (!firstName || !lastName || !email || !products?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const invalidProducts = products.filter((p: string) => !PRODUCTS.includes(p as typeof PRODUCTS[number]));
    if (invalidProducts.length) {
      return NextResponse.json({ error: 'Invalid product selection' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'mail.cdnglobal.eu',
      port: 587,
      secure: false,
      auth: {
        user: 'no-reply@cdnglobal.eu',
        pass: 'NkxF5@FLa0gTl^&Az',
      },
    });

    await transporter.sendMail({
      from: 'no-reply@cdnglobal.eu',
      to: 'no-reply@cdnglobal.eu',
      replyTo: email,
      subject: `[DEMO REQUEST] ${products.join(', ')} - ${firstName} ${lastName}`,
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Products:</strong> ${products.join(', ')}</p>
        ${message ? `<hr /><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br />')}</p>` : ''}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Demo request email error:', err);
    return NextResponse.json({ error: 'Failed to send request' }, { status: 500 });
  }
}
