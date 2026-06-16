'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { contactFormSchema, type ContactFormData } from '@cdn/email/schema';
import './css/Contact.css';

const Antigravity = dynamic(() => import('./ReactBits/Antigravity'), { ssr: false });

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
      company: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('idle');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to send');
      }

      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <section className="contact-page-centered" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <Antigravity
          count={120}
          autoAnimate={true}
          color="#9945ff"
          particleSize={1}
          waveAmplitude={1.2}
          waveSpeed={0.3}
          ringRadius={6}
          magnetRadius={6}
          lerpSpeed={0.04}
        />
      </div>
      <div className="contact-centered-wrapper" style={{ position: 'relative', zIndex: 1 }}>
        <div className="contact-form-card">
          <h1 className="contact-form-heading">{t('contact.heading', 'Get in Touch')}</h1>
          <p className="contact-form-subheading">
            {t('contact.subheading', 'Have a question about our services? Our team is ready to help.')}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="contact-form-inner">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">{t('contact.first_name', 'FIRST NAME')}</label>
                <input
                  type="text"
                  id="firstName"
                  {...register('firstName')}
                  placeholder={t('contact.placeholder_first', 'Jonathan')}
                  className="form-input"
                />
                {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">{t('contact.last_name', 'LAST NAME')}</label>
                <input
                  type="text"
                  id="lastName"
                  {...register('lastName')}
                  placeholder={t('contact.placeholder_last', 'Telstar')}
                  className="form-input"
                />
                {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('contact.email', 'EMAIL')}</label>
              <input
                type="email"
                id="email"
                {...register('email')}
                placeholder={t('contact.placeholder_email', 'Email address')}
                className="form-input"
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="company">
                {t('contact.company', 'COMPANY')}{' '}
                <span style={{ opacity: 0.5 }}>{t('contact.optional', '(Optional)')}</span>
              </label>
              <input
                type="text"
                id="company"
                {...register('company')}
                placeholder={t('contact.placeholder_company', 'Company name')}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">{t('contact.subject', 'SUBJECT')}</label>
              <input
                type="text"
                id="subject"
                {...register('subject')}
                placeholder={t('contact.placeholder_subject', 'What is this about?')}
                className="form-input"
              />
              {errors.subject && <span className="error-message">{errors.subject.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">{t('contact.message', 'MESSAGE')}</label>
              <textarea
                id="message"
                {...register('message')}
                className="form-textarea"
                rows={4}
                placeholder={t('contact.placeholder_message', 'How can we help?')}
              />
              {errors.message && <span className="error-message">{errors.message.message}</span>}
            </div>

            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? 'submitting' : ''} ${submitStatus === 'success' ? 'success' : ''} ${submitStatus === 'error' ? 'error' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <><span className="loading-spinner"></span>{t('contact.sending', 'SENDING...')}</>
              ) : submitStatus === 'success' ? (
                <>{t('contact.sent', 'MESSAGE SENT')}</>
              ) : submitStatus === 'error' ? (
                <>{t('contact.try_again', 'TRY AGAIN')}</>
              ) : (
                <>{t('contact.submit', 'SUBMIT')} <span className="plus-icon">+</span></>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="success-message">{t('contact.success_msg', 'Your message has been sent successfully!')}</div>
            )}
            {submitStatus === 'error' && (
              <div className="error-message">{t('contact.error_msg', 'There was an error sending your message. Please try again.')}</div>
            )}

            <p className="form-disclaimer">
              {t('contact.disclaimer1', 'By submitting, I have read, and I understand and agree')}
              <br />
              {t('contact.disclaimer2', 'to our Terms of Use and Privacy Policy.')}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
