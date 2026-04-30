"use client";

import { useEffect, useRef, useState } from "react";
import { UtensilsCrossed, Clock, Scale, TrendingUp, ArrowRight } from "lucide-react";

const paths = [
  {
    icon: UtensilsCrossed,
    title: "DASH diet",
    description:
      "A heart-friendly eating style designed to lower blood pressure and protect the cardiovascular system. Real, simple foods—fruits, vegetables, whole grains, lean protein—with less salt and fewer ultra-processed choices.",
    color: "#FF85A1",
    bgColor: "#ffd9df",
    link: "#meals",
  },
  {
    icon: Clock,
    title: "Intermittent fasting",
    description:
      "An eating pattern that alternates between eating windows and fasting (for example, 16:8). It focuses on when you eat, giving your metabolism and digestion predictable rhythm.",
    color: "#3b6476",
    bgColor: "#bce6fb",
    link: "#fasting",
  },
  {
    icon: Scale,
    title: "Calorie deficit",
    description:
      "A simple energy balance approach: eat fewer calories than your body burns so stored energy can be used wisely—paired with the protein, fiber, and hydration your heart loves.",
    color: "#516161",
    bgColor: "#d4e6e5",
    link: "#deficit",
  },
  {
    icon: TrendingUp,
    title: "Carb cycling",
    description:
      "Alternate higher- and lower-carb days around activity and recovery. Fuel busy days, scale back on rest days—without eliminating carbs entirely.",
    color: "#ea580c",
    bgColor: "#fed7aa",
    link: "#carb",
  },
];

export function DietPathsSection() {
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
      id="paths"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-[#f8f9ff]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30] mb-4">
            Different methods, one goal
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Choose your path to a healthy heart—language and structure aligned with the EatSmart
            Colorful Heart-Healthy Diet poster for the Global Society of Medicine and Health.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {paths.map((path, index) => (
            <a
              key={path.title}
              href={path.link}
              className={`glass-card p-6 sm:p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer border-transparent hover:border-[#FF85A1]/30 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors"
                style={{
                  backgroundColor: path.bgColor,
                  color: path.color,
                }}
              >
                <path.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>

              <h3 className="font-bold text-base sm:text-lg mb-2 text-[#0b1c30]">
                {path.title}
              </h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">{path.description}</p>

              <span
                className="text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
                style={{ color: path.color }}
              >
                Explore path
                <ArrowRight className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
