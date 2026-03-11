'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@cdn/email/schema';
import './css/Contact.css';

const Contact: React.FC = () => {
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
    <section className="contact-page-centered">
      <div className="contact-centered-wrapper">
        <div className="contact-form-card">
          <h1 className="contact-form-heading">Get in Touch</h1>
          <p className="contact-form-subheading">
            Have a question about our services? Our team is ready to help.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="contact-form-inner">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">FIRST NAME</label>
                <input
                  type="text"
                  id="firstName"
                  {...register('firstName')}
                  placeholder="Jonathan"
                  className="form-input"
                />
                {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">LAST NAME</label>
                <input
                  type="text"
                  id="lastName"
                  {...register('lastName')}
                  placeholder="Telstar"
                  className="form-input"
                />
                {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                {...register('email')}
                placeholder="Email address"
                className="form-input"
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="company">COMPANY <span style={{ opacity: 0.5 }}>(Optional)</span></label>
              <input
                type="text"
                id="company"
                {...register('company')}
                placeholder="Company name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">SUBJECT</label>
              <input
                type="text"
                id="subject"
                {...register('subject')}
                placeholder="What is this about?"
                className="form-input"
              />
              {errors.subject && <span className="error-message">{errors.subject.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">MESSAGE</label>
              <textarea
                id="message"
                {...register('message')}
                className="form-textarea"
                rows={4}
                placeholder="How can we help?"
              />
              {errors.message && <span className="error-message">{errors.message.message}</span>}
            </div>

            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? 'submitting' : ''} ${submitStatus === 'success' ? 'success' : ''} ${submitStatus === 'error' ? 'error' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <><span className="loading-spinner"></span>SENDING...</>
              ) : submitStatus === 'success' ? (
                <>MESSAGE SENT</>
              ) : submitStatus === 'error' ? (
                <>TRY AGAIN</>
              ) : (
                <>SUBMIT <span className="plus-icon">+</span></>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="success-message">Your message has been sent successfully!</div>
            )}
            {submitStatus === 'error' && (
              <div className="error-message">There was an error sending your message. Please try again.</div>
            )}

            <p className="form-disclaimer">
              By submitting, I have read, and I understand and agree
              <br />
              to our Terms of Use and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
