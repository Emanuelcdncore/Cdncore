"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function StatsSection() {
  const { t } = useTranslation();
  const stats = [
    { number: 16, label: t("stats.years") },
    { number: 27, label: t("stats.clients") },
    { number: 30, label: t("stats.projects") },
    { number: 12, label: t("stats.countries") },
  ];

  return (
    <section className="py-20 bg-black border-t border-border">
      <div className="section-container">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2
            className="text-3xl md:text-4xl text-foreground mb-4"
            style={{ fontFamily: "Depot, Inter, sans-serif" }}
          >
            {t("stats.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("stats.subtitle")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat }: { stat: { number: number; label: string } }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = stat.number / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCount(stat.number);
        clearInterval(timer);
      } else {
        setCount(Math.floor(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, stat.number]);

  return (
    <div
      ref={cardRef}
      className="group text-center p-8 rounded-lg glass border hover:border-primary/50 transition-smooth"
    >
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-smooth" />
        <p className="relative text-5xl md:text-6xl font-bold text-gradient">
          {count}
        </p>
      </div>
      <p className="text-muted-foreground text-sm uppercase tracking-wide">
        {stat.label}
      </p>
    </div>
  );
}
