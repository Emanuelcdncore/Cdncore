'use client';

import React, { useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";
import CTASection from "@/components/CTASection";
import { FloatingNav } from "@/components/ui/floating-nav";
import { sendContactForm } from "@/lib/contactApi";

export default function ContactPage() {
  // Form field values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    privacyAccepted: false
  });

  // Validation error messages per field
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    privacyAccepted: ''
  });

  // Submission state flags
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  /**
   * Handles form field changes and clears existing errors on that field.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear field error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear general submit error when user interacts
    if (submitError) {
      setSubmitError('');
    }
  };

  /**
   * Validates all form fields before submission.
   * Returns true if all fields pass validation.
   */
  const validateForm = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      phone: '',
      message: '',
      privacyAccepted: ''
    };

    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Please enter your first name';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Please enter your last name';
      isValid = false;
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Please enter your company name';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
      isValid = false;
    }

    if (!formData.privacyAccepted) {
      newErrors.privacyAccepted = 'You must accept the privacy policy';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handles form submission:
   * 1. Validates all fields
   * 2. Sends data to backend API via sendContactForm()
   * 3. Shows success/error feedback to the user
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) return;

    // Set loading state
    setIsSubmitting(true);

    // Send data to backend API (Nodemailer SMTP endpoint)
    const result = await sendContactForm({
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });

    setIsSubmitting(false);

    if (result.success) {
      // Show success state
      setIsSubmitted(true);

      // Reset form fields
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        privacyAccepted: false
      });

      // Return button to normal after 4 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    } else {
      // Show error message to the user
      setSubmitError(result.error || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      <FloatingNav navItems={[
        { name: "About", link: "/about/" },
        { name: "Services", link: "/services/" },
        { name: "Contact", link: "/contact/" },
      ]} />
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
                Parkurbis · Parque da Ciência e Tecnologia da Covilhã · 6200-865 Covilhã. Monday to Friday, 09:00–18:00.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr]">
            {/* Info column */}
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
                        Parkurbis · Parque da Ciência e Tecnologia da Covilhã<br />
                        6200-865 Covilhã
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
                      <dt className="text-xs uppercase tracking-[0.3em] text-white/40">Opening Hours</dt>
                      <dd className="text-base text-white/85">
                        Monday – Friday · 09:00 – 18:00<br />
                        Saturday – Sunday · Closed
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

            {/* Form column */}
            <section className="relative rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl pointer-events-auto">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6" autoComplete="on">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.25em] text-white/40">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`rounded-xl border ${errors.firstName ? 'border-red-500' : 'border-white/10'} bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0`}
                      placeholder={errors.firstName || "First name"}
                    />
                    {errors.firstName && <span className="text-xs text-red-400">{errors.firstName}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.25em] text-white/40">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`rounded-xl border ${errors.lastName ? 'border-red-500' : 'border-white/10'} bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0`}
                      placeholder={errors.lastName || "Last name"}
                    />
                    {errors.lastName && <span className="text-xs text-red-400">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-[0.25em] text-white/40">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`rounded-xl border ${errors.company ? 'border-red-500' : 'border-white/10'} bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0`}
                    placeholder={errors.company || "Company name"}
                  />
                  {errors.company && <span className="text-xs text-red-400">{errors.company}</span>}
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.25em] text-white/40">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`rounded-xl border ${errors.email ? 'border-red-500' : 'border-white/10'} bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0`}
                      placeholder={errors.email || "Email"}
                    />
                    {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.25em] text-white/40">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`rounded-xl border ${errors.phone ? 'border-red-500' : 'border-white/10'} bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0`}
                      placeholder={errors.phone || "(+351) 275 959 168"}
                    />
                    {errors.phone && <span className="text-xs text-red-400">{errors.phone}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-[0.25em] text-white/40">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`h-32 rounded-xl border ${errors.message ? 'border-red-500' : 'border-white/10'} bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0`}
                    placeholder={errors.message || "Tell us what we can help you with"}
                  />
                  {errors.message && <span className="text-xs text-red-400">{errors.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="flex items-start gap-3 text-xs text-white/50">
                    <input
                      type="checkbox"
                      name="privacyAccepted"
                      checked={formData.privacyAccepted}
                      onChange={handleChange}
                      className={`mt-1 h-4 w-4 rounded border ${errors.privacyAccepted ? 'border-red-500' : 'border-white/20'} bg-transparent text-pink-400 focus:ring-pink-400`}
                    />
                    <span>
                      I&apos;d like to receive more information about company. I understand and agree to the{' '}
                      <Link href="/privacy-policy" className="text-pink-300 underline">Privacy Policy</Link>.
                    </span>
                  </label>
                  {errors.privacyAccepted && <span className="text-xs text-red-400 ml-7">{errors.privacyAccepted}</span>}
                </div>

                {/* Error message banner - shows when API call fails */}
                {submitError && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`group relative mt-2 inline-flex items-center justify-center overflow-hidden rounded-2xl px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition ${isSubmitted
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-not-allowed'
                      : isSubmitting
                        ? 'bg-gradient-to-r from-orange-500/50 to-pink-500/50 text-black/50 cursor-wait'
                        : 'bg-gradient-to-r from-orange-500/80 to-pink-500/80 text-black hover:scale-[1.02]'
                    }`}
                >
                  <span className="absolute inset-0 bg-white/0 transition duration-300 group-hover:bg-white/10" />
                  <span className="relative flex items-center gap-2">
                    {/* Loading spinner - visible only during submission */}
                    {isSubmitting && (
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                        <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                      </svg>
                    )}
                    {isSubmitted ? 'Message sent successfully!' : isSubmitting ? 'Sending...' : 'Send Message'}
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
