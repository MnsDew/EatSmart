"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRightLeft } from "lucide-react";
import { siteImages } from "@/lib/site-images";

const carbGrocerySections: { title: string; items: string[] }[] = [
  {
    title: "Grains & bread",
    items: [
      "Oats (500 g)",
      "Rice (1 kg)",
      "Buckwheat (500 g)",
      "Whole grain / Arabic bread",
    ],
  },
  {
    title: "Vegetables",
    items: [
      "Tomatoes (2 kg)",
      "Cucumbers (1 kg)",
      "Cabbage (1)",
      "Carrots (0.5 kg)",
      "Eggplant (1 kg)",
      "Zucchini (1 kg)",
      "Onions (1 kg)",
      "Garlic (1 bulb)",
    ],
  },
  {
    title: "Fruits",
    items: [
      "Apples (1.5 kg)",
      "Bananas (1.5 kg)",
      "Seasonal fruits (1 kg)",
      "Seasonal fruits (1 kg)",
      "Dates (300 g)",
    ],
  },
  {
    title: "Protein & legumes",
    items: [
      "Eggs (30 pc)",
      "Chicken (1 kg)",
      "Lentils (700 g)",
      "Chickpeas (500 g)",
      "Beans (500 g)",
    ],
  },
  {
    title: "Dairy & oils",
    items: [
      "Yogurt (2 L)",
      "Sunflower oil (500 ml)",
      "Olive oil (250 ml)",
      "Nuts (200 g)",
    ],
  },
];

const highCarbDay = {
  breakfast: ["Oats + milk + banana", "Bread + yogurt + dates"],
  lunch: [
    "Chicken + rice + salad",
    "Lentils or beans + rice + yogurt",
  ],
  dinner: [
    "Lentil soup + bread",
    "Omelet + small bread + vegetables",
  ],
};

const lowCarbDay = {
  breakfast: [
    "2–3 eggs + tomato + cucumber",
    "Yogurt + nuts + small fruit",
  ],
  lunch: [
    "Chicken + large salad (no rice)",
    "Lentils or chickpeas + vegetables (no bread / rice)",
  ],
  dinner: [
    "Vegetable omelet",
    "Yogurt + salad + nuts",
  ],
};

export function CarbCyclingSection() {
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
      id="carb"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-[#eff4ff]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div
          className={`text-center mb-10 sm:mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-[#ea580c]/30 rounded-full shadow-sm mb-5">
            <ArrowRightLeft className="w-4 h-4 text-[#ea580c]" />
            <span className="text-[#c2410c] font-bold text-xs uppercase tracking-wider">
              Carb cycling
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30] mb-3">
            Carbs? Yes. Every day? Not necessarily.
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The poster&apos;s carb cycling guide shows how to fuel busy days, scale back on rest
            days, and follow a simple daily rhythm—we don&apos;t cut carbs; we adjust them around
            training, study blocks, and recovery.
          </p>
        </div>

        <div className="flex flex-col gap-12 sm:gap-14">
          {/* 1 — Hero image (burger / higher-carb visual) */}
          <div
            className={`w-full max-w-4xl mx-auto transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-full aspect-[16/10] sm:aspect-[2/1] rounded-2xl overflow-hidden border border-slate-200/60 bg-slate-100 shadow-[0_8px_32px_-8px_rgba(11,28,48,0.15)] ring-1 ring-white/80">
              <Image
                src={siteImages.carbCycling}
                alt="Fully plated meal with burger and sides—an example of a higher-carb refuel"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 896px"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/40 via-transparent to-[#0b1c30]/10 pointer-events-none" />
            </div>
            <p className="text-center text-sm text-slate-500 mt-3 max-w-2xl mx-auto leading-relaxed">
              Visual for a <strong className="text-slate-600 font-semibold">higher-carb</strong> day:
              you still build from the same poster staples—just shift portions toward grains, bread,
              or a hearty plate when you need the fuel.
            </p>
          </div>

          {/* 2 — Grocery foundation */}
          <div
            className={`transition-all duration-700 delay-75 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="max-w-3xl">
              <h3 className="font-bold text-lg text-[#0b1c30]">Grocery foundation</h3>
              <p className="text-sm text-slate-600 mt-1">
                Same staples as on the poster—see{" "}
                <a href="#meals" className="text-[#FF85A1] font-semibold underline underline-offset-2">
                  DASH groceries
                </a>{" "}
                for quantities. Highlights below:
              </p>
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {carbGrocerySections.map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl bg-white/90 border border-slate-100 p-3 shadow-sm"
                >
                  <p className="text-[11px] font-bold uppercase text-[#ea580c] mb-1">{s.title}</p>
                  <ul className="text-xs text-slate-600 space-y-0.5">
                    {s.items.map((i, idx) => (
                      <li key={`${s.title}-${idx}`}>• {i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 3 — Day plans (stacked: high, then low) */}
          <div
            className={`space-y-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-wider text-[#3b6476]">Day plans</p>
              <p className="text-sm text-slate-600 mt-1">
                Compare a higher-carb day with a lower-carb day—same grocery list, different emphasis.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-[#FF85A1]/20">
              <span className="inline-flex px-3 py-1 rounded-full bg-[#FF85A1] text-white text-xs font-bold uppercase mb-4">
                High-carb day
              </span>
              <div className="space-y-3">
                {(["breakfast", "lunch", "dinner"] as const).map((slot) => (
                  <div key={slot}>
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">{slot}</p>
                    <ul className="space-y-1.5">
                      {highCarbDay[slot].map((line, idx) => (
                        <li
                          key={`high-${slot}-${idx}`}
                          className="text-sm text-[#0b1c30] flex gap-2 bg-white/60 rounded-lg px-3 py-2 border border-slate-100"
                        >
                          <span className="text-[#FF85A1] shrink-0">•</span>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-[#3b6476]/25">
              <span className="inline-flex px-3 py-1 rounded-full bg-[#3b6476] text-white text-xs font-bold uppercase mb-4">
                Low-carb day
              </span>
              <div className="space-y-3">
                {(["breakfast", "lunch", "dinner"] as const).map((slot) => (
                  <div key={slot}>
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">{slot}</p>
                    <ul className="space-y-1.5">
                      {lowCarbDay[slot].map((line, idx) => (
                        <li
                          key={`low-${slot}-${idx}`}
                          className="text-sm text-[#0b1c30] flex gap-2 bg-white/60 rounded-lg px-3 py-2 border border-slate-100"
                        >
                          <span className="text-[#3b6476] shrink-0">•</span>
                          {line}
                        </li>
                      ))}
                    </ul>
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
