"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "", subject: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, consent: true, consentTimestamp: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ firstName: "", lastName: "", email: "", company: "", subject: "", message: "" });
      setConsent(false);
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-black/40 hover:text-black/70 transition-colors mb-8">
            <span className="material-icons-round text-base">arrow_back</span>
            Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-base text-black/55 font-normal mb-10">
            Have a question or feedback? Our team is ready to help.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="firstName" className="text-xs font-medium text-black/40 uppercase">First name</label>
                <input id="firstName" type="text" required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="John" className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-black/30 transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="lastName" className="text-xs font-medium text-black/40 uppercase">Last name</label>
                <input id="lastName" type="text" required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="Doe" className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-black/30 transition-colors" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-medium text-black/40 uppercase">Email</label>
              <input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="john@company.com" className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-black/30 transition-colors" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="company" className="text-xs font-medium text-black/40 uppercase">Company <span className="opacity-50">(optional)</span></label>
              <input id="company" type="text" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Company name" className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-black/30 transition-colors" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="subject" className="text-xs font-medium text-black/40 uppercase">Subject</label>
              <input id="subject" type="text" required value={form.subject} onChange={(e) => update("subject", e.target.value)} placeholder="What is this about?" className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-black/30 transition-colors" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-medium text-black/40 uppercase">Message</label>
              <textarea id="message" required rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="How can we help?" className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-black/30 transition-colors resize-none" />
            </div>

            <label htmlFor="consent" className="flex items-start gap-3 cursor-pointer select-none">
              <input
                id="consent"
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-black/20 text-black focus:ring-black/30"
              />
              <span className="text-xs text-black/55 leading-relaxed">
                I have read and accept the{" "}
                <Link href="/privacy-policy" className="underline hover:text-black">Privacy Policy</Link>{" "}
                and the{" "}
                <Link href="/terms-of-service" className="underline hover:text-black">Terms of Service</Link>.
                I consent to CDN Core Technologies processing the personal data submitted above (name, email, company, message) to respond to my enquiry, in accordance with GDPR (Art. 6(1)(a)) and LGPD (Art. 7, I). I understand I can withdraw this consent at any time by emailing info@lori-talk.eu, without affecting the lawfulness of prior processing.
              </span>
            </label>

            <button
              type="submit"
              disabled={status === "sending" || !consent}
              className="w-full py-3.5 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: status === "success" ? "#94BF5C" : status === "error" ? "#E54013" : "#5D92E8" }}
            >
              {status === "sending" && <><span className="material-icons-round text-base animate-spin">autorenew</span> Sending...</>}
              {status === "success" && <><span className="material-icons-round text-base">check_circle</span> Message sent!</>}
              {status === "error" && <><span className="material-icons-round text-base">error</span> Failed — try again</>}
              {status === "idle" && "Send message"}
            </button>

            <p className="text-xs text-black/35 text-center">
              Data retention: 24 months after last interaction. You can request access, correction or deletion at any time via info@lori-talk.eu.
            </p>
          </form>

          <div className="mt-12 rounded-xl bg-black/[0.03] p-6 flex flex-col gap-2">
            <p className="text-sm font-medium text-black/70">Other ways to reach us</p>
            <p className="text-sm text-black/50">Email: info@lori-talk.eu</p>
            <p className="text-sm text-black/50">Phone: +351 275 959 168</p>
            <p className="text-sm text-black/50">Parkurbis, 6200-865 Covilh&atilde;, Portugal</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
