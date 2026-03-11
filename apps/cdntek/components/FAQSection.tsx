"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function FAQSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: t("faq.items.business.question"),
      answer: t("faq.items.business.answer"),
    },
    {
      question: t("faq.items.contact.question"),
      answer: t("faq.items.contact.answer"),
    },
    {
      question: t("faq.items.support.question"),
      answer: t("faq.items.support.answer"),
    },
    {
      question: t("faq.items.smallBusiness.question"),
      answer: t("faq.items.smallBusiness.answer"),
    },
    {
      question: t("faq.items.implementation.question"),
      answer: t("faq.items.implementation.answer"),
    },
  ];

  return (
    <section
      id="faq"
      className="py-20 bg-black border-t border-border scroll-mt-16 md:scroll-mt-20"
    >
      <div className="section-container max-w-3xl">
        {/* Header */}
        <h2
          className="text-3xl md:text-4xl text-foreground text-center mb-16"
          style={{ fontFamily: "Depot, Inter, sans-serif" }}
        >
          {t("faq.title")}
        </h2>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg glass overflow-hidden transition-smooth"
            >
              {/* Question Button */}
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-card/50 transition-smooth"
              >
                <span className="text-left font-semibold text-foreground text-lg">
                  {faq.question}
                </span>
                <span className="text-3xl text-primary flex-shrink-0 transition-transform font-light">
                  {openIndex === index ? "\u2212" : "+"}
                </span>
              </button>

              {/* Answer - Animated */}
              {openIndex === index && (
                <div className="px-6 pt-6 pb-4 border-t border-border/50 bg-card/30">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
