"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Clock,
  Smartphone,
  Timer,
  Bell,
  BarChart3,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteImages } from "@/lib/site-images";

const ifIntro =
  "Ready to take control of your routine? This intermittent fasting guide shows you how to structure your day, what to eat during your eating window, and includes a full day example—including grocery staples aligned with the DASH list—to help you stay consistent.";

const ifMeals = {
  first: {
    label: "First meal — 12:00 PM",
    options: [
      {
        name: "Option 1: Gentle start bowl",
        detail:
          "Lentil soup, bread, yogurt, cucumber + tomato. Easy digestion; avoids stomach overload after fasting.",
      },
      {
        name: "Option 2: Protein start plate",
        detail:
          "2–3 boiled eggs, whole grain / Arabic bread, tomato + cucumber, small yogurt. Stabilizes blood sugar after fasting.",
      },
    ],
  },
  second: {
    label: "Second meal — 3:00–5:00 PM",
    options: [
      {
        name: "Option 1: Chicken power plate",
        detail:
          "Grilled chicken (100–150 g), rice or buckwheat, salad (tomato, cucumber, cabbage), olive oil drizzle. Largest, most balanced meal of the day.",
      },
      {
        name: "Option 2: Plant-based energy meal",
        detail:
          "Lentils or chickpeas, rice or bread, onion + tomato salad, yogurt.",
      },
    ],
  },
};

const apps = [
  {
    name: "Zero",
    description: "Popular fasting tracker with guided programs",
    icon: Timer,
    color: "#FF85A1",
  },
  {
    name: "Fastic",
    description: "Personalized fasting plans with meal suggestions",
    icon: Bell,
    color: "#3b6476",
  },
  {
    name: "LIFE Fasting",
    description: "Science-based fasting with community features",
    icon: BarChart3,
    color: "#516161",
  },
  {
    name: "Simple",
    description: "Easy-to-use tracker with health insights",
    icon: Zap,
    color: "#ea580c",
  },
];

const benefits = [
  "Improved insulin sensitivity",
  "Enhanced cellular repair (autophagy)",
  "Reduced inflammation",
  "Better brain function",
  "Heart health support",
];

export function FastingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="fasting"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-[#eff4ff]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-[#3b6476]/30 rounded-full shadow-sm mb-6">
                <Clock className="w-4 h-4 text-[#3b6476]" />
                <span className="text-[#3b6476] font-bold text-xs uppercase tracking-wider">
                  Intermittent fasting
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30] mb-4">
                Structure your eating window
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">{ifIntro}</p>
            </div>

            <div
              className={`relative rounded-2xl overflow-hidden aspect-[4/3] mb-8 transition-all duration-1000 delay-100 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={siteImages.fasting}
                alt="Balanced meal planning and mindful eating"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 576px"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/40 to-transparent" />
            </div>

            <div
              className={`glass-card p-6 rounded-2xl mb-6 transition-all duration-1000 delay-150 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h3 className="text-lg font-bold text-[#0b1c30] mb-3">
                Poster timing (example day)
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Because of a long fasting period,{" "}
                <strong>two meals and a snack</strong> is a practical rhythm. Times below match the
                Colorful Heart-Healthy Diet poster.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-[#3b6476] rounded-xl text-white text-center">
                  <p className="text-lg font-extrabold">12:00 PM</p>
                  <p className="text-xs opacity-90">First meal</p>
                </div>
                <div className="p-4 bg-[#FF85A1] rounded-xl text-white text-center">
                  <p className="text-lg font-extrabold">3:00–5:00 PM</p>
                  <p className="text-xs opacity-90">Second meal</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                A 16:8-style pattern fits many students: fast through the morning, eat within an
                8-hour window. Adjust with a clinician if you have medical conditions.
              </p>
            </div>

            <div
              className={`glass-card p-6 rounded-2xl transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <h4 className="font-bold text-[#0b1c30] mb-3">Pantry overlap</h4>
              <p className="text-sm text-slate-600 mb-3">
                The poster uses the same grocery foundation as DASH—whole grains, vegetables, lean
                protein, legumes, yogurt, and healthy oils. See the full list in{" "}
                <a href="#meals" className="text-[#FF85A1] font-semibold underline underline-offset-2">
                  DASH grocery essentials
                </a>
                .
              </p>
              <h4 className="font-bold text-[#0b1c30] mb-3">Key benefits</h4>
              <ul className="space-y-2">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b6476] shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`space-y-6 transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="glass-card p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-[#0b1c30] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#3b6476]" />
                Meal ideas from the poster
              </h3>
              {(["first", "second"] as const).map((block) => (
                <div key={block} className="mb-6 last:mb-0">
                  <p className="text-sm font-bold text-[#FF85A1] mb-2">
                    {ifMeals[block].label}
                  </p>
                  <Accordion type="single" collapsible defaultValue="a-0" className="w-full">
                    {ifMeals[block].options.map((opt, idx) => (
                      <AccordionItem key={opt.name} value={`a-${idx}`} className="border-slate-200">
                        <AccordionTrigger className="text-left text-sm font-semibold text-[#0b1c30] py-3 hover:no-underline">
                          {opt.name}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm text-slate-600 leading-relaxed">{opt.detail}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>

            <div className="glass-card p-6 rounded-2xl border border-dashed border-slate-200">
              <h3 className="text-lg font-bold text-[#0b1c30] mb-3 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#3b6476]" />
                Optional: fasting apps
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Not on the printed poster—these are optional digital helpers if you want reminders
                and timers.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {apps.map((app) => (
                  <div
                    key={app.name}
                    className="p-4 rounded-xl bg-white/60 border border-slate-100"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center mb-2"
                      style={{ backgroundColor: `${app.color}18`, color: app.color }}
                    >
                      <app.icon className="w-4 h-4" />
                    </div>
                    <p className="font-bold text-sm text-[#0b1c30]">{app.name}</p>
                    <p className="text-xs text-slate-500">{app.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
