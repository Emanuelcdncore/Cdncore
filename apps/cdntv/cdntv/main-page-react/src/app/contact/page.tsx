import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";
import CTASection from "@/components/CTASection";
import { FloatingNav } from "@/components/ui/floating-nav";

export default function ContactPage() {
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
              <form className="flex flex-col gap-6" autoComplete="on">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.25em] text-white/40">First Name</label>
                    <input
                      type="text"
                      className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0"
                      placeholder="First name"
                    />
              </div>
              <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.25em] text-white/40">Last Name</label>
                    <input
                      type="text"
                      className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0"
                      placeholder="Last name"
                    />
              </div>
            </div>

            <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-[0.25em] text-white/40">Company Name</label>
                  <input
                    type="text"
                    className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0"
                    placeholder="Company name"
                  />
            </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.25em] text-white/40">Email</label>
                    <input
                      type="email"
                      className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0"
                      placeholder="Email"
                    />
            </div>
            <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.25em] text-white/40">Phone Number</label>
                    <input
                      type="tel"
                      className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0"
                      placeholder="(+351) 275 959 168"
                    />
                  </div>
            </div>

            <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-[0.25em] text-white/40">Message</label>
                  <textarea
                    className="h-32 rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/40 focus:outline-none focus:ring-0"
                    placeholder="Tell us what we can help you with"
                  />
            </div>

                <label className="flex items-start gap-3 text-xs text-white/50">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border border-white/20 bg-transparent text-pink-400 focus:ring-pink-400" />
                  <span>
                    I&apos;d like to receive more information about company. I understand and agree to the{' '}
                    <a href="#" className="text-pink-300 underline">Privacy Policy</a>.
                  </span>
                </label>

                <button
                  type="submit"
                  className="group relative mt-2 inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500/80 to-pink-500/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:scale-[1.02]" 
                >
                  <span className="absolute inset-0 bg-white/0 transition duration-300 group-hover:bg-white/10" />
                  <span className="relative">Send Message</span>
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
