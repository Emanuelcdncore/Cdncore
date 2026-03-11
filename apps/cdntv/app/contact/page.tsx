'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@cdn/email/schema";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";
import CTASection from "@/components/CTASection";

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');

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
    setSubmitError('');
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
      setTimeout(() => setSubmitStatus('idle'), 4000);
    } catch (err) {
      setSubmitStatus('error');
      setSubmitError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
      setTimeout(() => setSubmitStatus('idle'), 4000);
    }
  };

  return (
    <>
      <main className="relative min-h-screen bg-black py-28 px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_top,#f28e12_0%,rgba(242,142,18,0)_70%)] blur-3xl opacity-60" />
          <div className="absolute top-1/2 right-0 h-80 w-80 translate-x-1/3 rounded-full bg-[radial-gradient(circle_at_center,#da1d5d_0%,rgba(218,29,93,0)_65%)] blur-3xl opacity-50" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-14">
          <header className="flex flex-col gap-6 text-center md:text-left">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Connect With Our Team
              </h1>
              <p className="max-w-xl text-base text-white/70">
                Parkurbis · Parque da Ciencia e Tecnologia da Covilha · 6200-865 Covilha. Monday to Friday, 09:00-18:00.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr]">
            {/* Info column - KEEP EXACTLY AS IS */}
            <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-10 backdrop-blur-xl pointer-events-auto">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(242,142,18,0.35),rgba(242,142,18,0))]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(218,29,93,0.25),rgba(218,29,93,0))]" />
              <div className="relative flex h-full flex-col justify-between gap-12">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm uppercase tracking-[0.3em] text-white/50">Headquarters</span>
                    <h2 className="text-3xl font-semibold tracking-tight text-white">Contact Information</h2>
                    <p className="max-w-md text-sm leading-relaxed text-white/70">
                      Reach out to our team directly. We respond to every inquiry with the same attention to detail that defines our productions.
                    </p>
                  </div>

                  <dl className="grid grid-cols-1 gap-6 text-sm text-white/80">
                    <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
                      <dt className="text-xs uppercase tracking-[0.3em] text-white/40">Address</dt>
                      <dd className="text-base text-white/85">
                        Parkurbis · Parque da Ciencia e Tecnologia da Covilha<br />
                        6200-865 Covilha
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
                      <dt className="text-xs uppercase tracking-[0.3em] text-white/40">Opening Hours</dt>
                      <dd className="text-base text-white/85">
                        Monday - Friday · 09:00 - 18:00<br />
                        Saturday - Sunday · Closed
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
                      <dt className="text-xs uppercase tracking-[0.3em] text-white/40">Call Support</dt>
                      <dd className="text-base text-white/85">+351 275 959 168</dd>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/40">Social Media</span>
                  <div className="flex items-center gap-3 text-white/70">
                    <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:-translate-y-1 hover:text-white">
                      <FaFacebookF size={18} />
                    </a>
                    <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:-translate-y-1 hover:text-white">
                      <FaLinkedinIn size={18} />
                    </a>
                    <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:-translate-y-1 hover:text-white">
                      <FaInstagram size={18} />
                    </a>
                    <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:-translate-y-1 hover:text-white">
                      <FaTwitter size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Form column - REWRITTEN */}
            <section className="relative rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl pointer-events-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" autoComplete="on">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.25em] text-white/40">First Name</label>
                    <input
                      type="text"
                      {...register('firstName')}
                      className={`rounded-xl border ${errors.firstName ? 'border-red-500' : 'border-white/10'} bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0`}
                      placeholder="First name"
                    />
                    {errors.firstName && <span className="text-xs text-red-400">{errors.firstName.message}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.25em] text-white/40">Last Name</label>
                    <input
                      type="text"
                      {...register('lastName')}
                      className={`rounded-xl border ${errors.lastName ? 'border-red-500' : 'border-white/10'} bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0`}
                      placeholder="Last name"
                    />
                    {errors.lastName && <span className="text-xs text-red-400">{errors.lastName.message}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-[0.25em] text-white/40">Company <span className="text-white/20">(Optional)</span></label>
                  <input
                    type="text"
                    {...register('company')}
                    className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0"
                    placeholder="Company name"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.25em] text-white/40">Email</label>
                    <input
                      type="email"
                      {...register('email')}
                      className={`rounded-xl border ${errors.email ? 'border-red-500' : 'border-white/10'} bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0`}
                      placeholder="Email"
                    />
                    {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.25em] text-white/40">Subject</label>
                    <input
                      type="text"
                      {...register('subject')}
                      className={`rounded-xl border ${errors.subject ? 'border-red-500' : 'border-white/10'} bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0`}
                      placeholder="Subject"
                    />
                    {errors.subject && <span className="text-xs text-red-400">{errors.subject.message}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-[0.25em] text-white/40">Message</label>
                  <textarea
                    {...register('message')}
                    className={`h-32 rounded-xl border ${errors.message ? 'border-red-500' : 'border-white/10'} bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0`}
                    placeholder="Tell us what we can help you with"
                  />
                  {errors.message && <span className="text-xs text-red-400">{errors.message.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-xs text-white/50">
                    By submitting this form, you agree to our{' '}
                    <Link href="/privacy-policy" className="text-pink-300 underline">Privacy Policy</Link>.
                  </p>
                </div>

                {submitError && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className={`group relative mt-2 inline-flex items-center justify-center overflow-hidden rounded-2xl px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition ${submitStatus === 'success'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-not-allowed'
                      : isSubmitting
                        ? 'bg-gradient-to-r from-orange-500/50 to-pink-500/50 text-black/50 cursor-wait'
                        : 'bg-gradient-to-r from-orange-500/80 to-pink-500/80 text-black hover:scale-[1.02]'
                    }`}
                >
                  <span className="absolute inset-0 bg-white/0 transition duration-300 group-hover:bg-white/10" />
                  <span className="relative flex items-center gap-2">
                    {isSubmitting && (
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                        <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                      </svg>
                    )}
                    {submitStatus === 'success' ? 'Message sent successfully!' : isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
      <CTASection />
    </>
  );
}
