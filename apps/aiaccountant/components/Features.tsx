"use client";

import { motion } from "framer-motion";
import { Zap, Search, Lock, FileCheck } from "lucide-react";

const basePath = process.env.BASE_PATH || "";

const features = [
  {
    icon: Zap,
    title: "Instant Processing",
    description:
      "Our AI analyzes and processes thousands of invoices in seconds, not hours.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: Search,
    title: "Optical Recognition (OCR)",
    description:
      "Data extraction with 99.8% accuracy, automatically recognizing vendors and amounts.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description:
      "End-to-end encryption to ensure your financial data is always protected.",
    color: "bg-purple-100 text-purple-600",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wide mb-4"
          >
            <Zap className="w-3 h-3" />
            Cutting-Edge Technology
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Autonomous accounting, <br /> finally within your reach.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            We combine advanced artificial intelligence with intuitive design to
            create a platform that works for you.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Large Visual Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden bg-gray-900 shadow-2xl ring-1 ring-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-800 to-gray-500 z-0 pointer-events-none" />

          <div className="grid lg:grid-cols-2 items-center">
            <div className="p-8 lg:p-16 text-white z-20">
              <h3 className="text-3xl font-bold mb-6">Total Flow Control</h3>
              <ul className="space-y-6">
                {[
                  {
                    title: "Centralized Dashboard",
                    desc: "All your companies in a single view.",
                  },
                  {
                    title: "Automatic Audit",
                    desc: "Complete history of every change and access.",
                  },
                  {
                    title: "Smart Reports",
                    desc: "One-click export to PDF, Excel, or ERP.",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1 border border-emerald-500/30">
                      <FileCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative h-full bg-transparent lg:rounded-l-none lg:rounded-r-3xl overflow-hidden group" style={{ minHeight: 400 }}>
              <img
                src={`${basePath}/images/invoice-dashboard.png`}
                alt="System Interface"
                className="absolute top-8 left-8 max-w-none rounded-tl-2xl shadow-2xl transition-transform duration-700 hover:-translate-x-2 hover:-translate-y-2 border border-gray-700"
                style={{ width: "150%" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
