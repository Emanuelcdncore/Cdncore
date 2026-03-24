import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";
import CTASection from "@/components/CTASection";
import { FloatingNav } from "@/components/ui/floating-nav";

export default function ContactPage() {
  return (
    <>
      <FloatingNav navItems={[
        { name: "About", link: "/about" },
        { name: "Services", link: "/services" },
        { name: "Contact", link: "/contact" },
      ]} />
  <main className="min-h-screen bg-black flex items-center justify-center py-28 px-4">
        <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left: Contact Info Card */}
          <div className="rounded-2xl p-10 flex flex-col justify-between shadow-lg" style={{background: "linear-gradient(270deg, rgba(255,129,75,0.1) 0%, rgba(218,29,93,0.6) 70.13%)"}}>
            <div className="flex flex-col gap-10">
              <h2 className="text-white text-2xl font-semibold">Contact Information</h2>
              <div>
                <div className="text-white text-sm font-medium mb-1">Parkurbis</div>
                <div className="text-white/80 text-sm">Parque da Ciência e Tecnologia da Covilhã<br/>6200-865 Covilhã</div>
              </div>
              <div>
                <div className="text-white text-sm font-medium mb-1">Opening Hours</div>
                <div className="text-white/80 text-sm">Monday - Friday 09:00 AM - 06:00 PM<br/>Saturday - Sunday Closed</div>
              </div>
              <div>
                <div className="text-white text-sm font-medium mb-1">Call Support</div>
                <div className="text-white/80 text-sm">+351 275 959 168</div>
              </div>
              <div>
                <div className="text-white text-sm font-medium mb-1">Social media</div>
                <div className="flex gap-4 mt-2">
                  <a href="#" className="text-white hover:text-blue-200"><FaFacebookF size={20}/></a>
                  <a href="#" className="text-white hover:text-blue-200"><FaLinkedinIn size={20}/></a>
                  <a href="#" className="text-white hover:text-blue-200"><FaInstagram size={20}/></a>
                  <a href="#" className="text-white hover:text-blue-200"><FaTwitter size={20}/></a>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Contact Form */}
          <form className="bg-black rounded-2xl p-10 flex flex-col gap-6 shadow-lg border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-white text-sm">First Name</label>
                <input type="text" className="bg-transparent border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none" placeholder="First name" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white text-sm">Last Name</label>
                <input type="text" className="bg-transparent border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none" placeholder="Last name" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm">Company Name</label>
              <input type="text" className="bg-transparent border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none" placeholder="Company name" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm">Email</label>
              <input type="email" className="bg-transparent border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none" placeholder="Email" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm">Phone Number</label>
              <input type="tel" className="bg-transparent border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none w-full" placeholder="(+351) 275-959-168" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm">Message</label>
              <textarea className="bg-transparent border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none min-h-[80px]" placeholder="Tell us what we can help you with" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="privacy" className="accent-blue-500" />
              <label htmlFor="privacy" className="text-gray-400 text-xs">I&apos;d like to receive more information about company. I understand and agree to the <a href="#" className="text-blue-400 underline">Privacy Policy</a></label>
            </div>
            <button type="submit" className="bg-gradient-to-r from-[rgba(255,129,75,0.2)] to-[rgba(218,79,93,0.7)] hover:opacity-90 text-white font-semibold py-3 rounded-lg mt-2 transition-all">Send Message</button>
          </form>
        </div>
      </main>
      <CTASection />
    </>
  );
}
