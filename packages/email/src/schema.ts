import { z } from 'zod';

export const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
  company: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type Website = 'cdncore' | 'cdntek' | 'cdntv';
