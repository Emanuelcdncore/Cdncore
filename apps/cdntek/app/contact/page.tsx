"use client";

import Footer from "@/components/Footer";
import MapSection from "@/components/MapSection";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@cdn/email/schema";
import { toast } from "sonner";

export default function Contact() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsVisible(true), 50);
  }, []);

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
      toast.success("Mensagem enviada!", {
        description: "Agradecemos o seu contacto. Responderemos em breve.",
      });
      reset();
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch {
      setSubmitStatus('error');
      toast.error("Erro ao enviar mensagem. Tente novamente.");
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="relative isolate overflow-hidden bg-black">
          <div className="absolute inset-0 bg-black" aria-hidden="true" />

          <div
            className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 pt-28 pb-16 space-y-12 transition-opacity duration-1000 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex flex-col md:flex-row md:items-end gap-8">
              <div className="flex-1">
                <h1 className="text-[3rem] md:text-[3.5rem] leading-tight font-semibold">
                  {t("contact.title")}
                  <br />& {t("contact.subtitle")}
                </h1>
              </div>
              <div className="flex-1 text-left md:text-right">
                <p className="text-lg text-white/70 uppercase tracking-[0.15em] mb-2">
                  {t("contact.dedicated")}
                </p>
                <h2 className="text-2xl md:text-3xl font-medium">
                  {t("contact.help")}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left card - company info (keep exactly as is) */}
              <div className="rounded-[28px] bg-gradient-to-b from-[#222] to-[#111] p-8 shadow-[0_25px_70px_rgba(0,0,0,0.65)] border border-white/5">
                <div className="space-y-10">
                  {[
                    {
                      title: t("contact.design"),
                      linkedin:
                        "https://www.linkedin.com/company/cdncore/posts/?feedView=all",
                    },
                    {
                      title: t("contact.digital"),
                      linkedin:
                        "https://www.linkedin.com/company/cdntv/posts/?feedView=all",
                    },
                  ].map(({ title, linkedin }) => (
                    <div key={title} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold tracking-wide">
                          {title}
                        </h3>
                        <div className="text-sm text-gray-300 leading-relaxed mt-3 space-y-1">
                          <p>{t("contact.address.parkurbis")}</p>
                          <p>{t("contact.address.park")}</p>
                          <p>{t("contact.address.postal")}</p>
                        </div>
                        <div className="mt-5 text-xs text-gray-400 tracking-[0.2em] uppercase">
                          {t("contact.schedule")}
                        </div>
                        <div className="text-sm text-gray-200">
                          <p>{t("contact.weekdays")}</p>
                          <p>{t("contact.weekend")}</p>
                        </div>
                      </div>
                      <a
                        className="inline-flex w-full justify-center rounded-full py-3 text-sm font-semibold uppercase tracking-wide transition hover:opacity-90"
                        style={{
                          backgroundColor: "#037A94",
                          boxShadow: "0 12px 40px rgba(3, 122, 148, 0.35)",
                        }}
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("contact.linkedin")}
                      </a>
                      {title === t("contact.design") && (
                        <div className="border-t border-white/5 pt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right card - contact form */}
              <div className="rounded-[28px] bg-gradient-to-b from-[#222] to-[#111] p-8 shadow-[0_25px_70px_rgba(0,0,0,0.65)] border border-white/5">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold tracking-[0.3em]">
                        {t("contact.form.firstName")}
                      </label>
                      <input
                        className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-base text-white focus:border-white/30 focus:outline-none"
                        {...register('firstName')}
                      />
                      {errors.firstName && <span className="text-xs text-red-400 mt-1">{errors.firstName.message}</span>}
                    </div>
                    <div>
                      <label className="text-xs font-semibold tracking-[0.3em]">
                        {t("contact.form.lastName")}
                      </label>
                      <input
                        className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-base text-white focus:border-white/30 focus:outline-none"
                        {...register('lastName')}
                      />
                      {errors.lastName && <span className="text-xs text-red-400 mt-1">{errors.lastName.message}</span>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold tracking-[0.3em]">
                      {t("contact.form.email")}
                    </label>
                    <input
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-base text-white focus:border-white/30 focus:outline-none"
                      {...register('email')}
                    />
                    {errors.email && <span className="text-xs text-red-400 mt-1">{errors.email.message}</span>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold tracking-[0.3em]">
                      EMPRESA <span className="text-white/40">(Opcional)</span>
                    </label>
                    <input
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-base text-white focus:border-white/30 focus:outline-none"
                      {...register('company')}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold tracking-[0.3em]">
                      ASSUNTO
                    </label>
                    <input
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-base text-white focus:border-white/30 focus:outline-none"
                      {...register('subject')}
                    />
                    {errors.subject && <span className="text-xs text-red-400 mt-1">{errors.subject.message}</span>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold tracking-[0.3em]">
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-base text-white min-h-[120px] focus:border-white/30 focus:outline-none"
                      {...register('message')}
                    />
                    {errors.message && <span className="text-xs text-red-400 mt-1">{errors.message.message}</span>}
                  </div>

                  <div className="flex justify-start">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-full bg-gradient-to-b from-[#2ecc40] to-[#27ae60] py-2 px-8 text-sm font-semibold uppercase tracking-wide shadow-[0_15px_45px_rgba(39,174,96,0.45)] transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting
                        ? "Enviando..."
                        : submitStatus === 'success'
                        ? "Enviado!"
                        : t("contact.form.submit")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <div
          className={`max-w-7xl mx-auto px-6 w-full pb-10 transition-opacity duration-1000 ease-in-out delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className="w-full"
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg,#15471c 0%,#2da84c 50%,#15471c 100%)",
              borderRadius: 0,
            }}
            aria-hidden="true"
          />
        </div>

        <div
          className={`max-w-7xl mx-auto px-6 pb-16 transition-opacity duration-1000 ease-in-out delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <MapSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
