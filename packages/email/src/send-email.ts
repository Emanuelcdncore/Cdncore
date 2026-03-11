import nodemailer from 'nodemailer';
import { getPool } from './db';
import { contactFormSchema, type ContactFormData, type Website } from './schema';

async function checkRateLimit(website: Website): Promise<boolean> {
  const pool = getPool();
  const result = await pool.query(
    `SELECT COUNT(*)::int AS count FROM contact_emails_send
     WHERE website = $1 AND sent_at > NOW() - INTERVAL '10 minutes'`,
    [website]
  );
  return result.rows[0].count < 100;
}

async function recordEmailSend(website: Website): Promise<void> {
  const pool = getPool();
  await pool.query(
    'INSERT INTO contact_emails_send (website, sent_at) VALUES ($1, NOW())',
    [website]
  );
}

export async function sendContactEmail(
  data: ContactFormData,
  website: Website
): Promise<void> {
  const parsed = contactFormSchema.parse(data);

  const allowed = await checkRateLimit(website);
  if (!allowed) {
    throw new Error('RATE_LIMIT_EXCEEDED');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.cdnglobal.eu',
    port: 587,
    secure: false,
    auth: {
      user: 'noreply@cdnglobal.eu',
      pass: 'CDNGlobal2024!',
    },
  });

  await transporter.sendMail({
    from: 'noreply@cdnglobal.eu',
    to: 'social@cdnglobal.eu',
    replyTo: parsed.email,
    subject: `[${website.toUpperCase()}] ${parsed.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Website:</strong> ${website.toUpperCase()}</p>
      <p><strong>Name:</strong> ${parsed.firstName} ${parsed.lastName}</p>
      <p><strong>Email:</strong> ${parsed.email}</p>
      ${parsed.company ? `<p><strong>Company:</strong> ${parsed.company}</p>` : ''}
      <p><strong>Subject:</strong> ${parsed.subject}</p>
      <hr />
      <p>${parsed.message.replace(/\n/g, '<br />')}</p>
    `,
  });

  await recordEmailSend(website);
}
