import { NextResponse } from 'next/server';
import { contactFormSchema, sendContactEmail } from '@cdn/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactFormSchema.parse(body);
    await sendContactEmail(data, 'cdncore');
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED') {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
