"use client";

import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { randomHealthyApproxBeatsPerDay } from "@/lib/random-daily-heartbeats";

export function BmiSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [beatsTarget, setBeatsTarget] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const beats = useCountUp(beatsTarget ?? 0, {
    durationMs: 2800,
    enabled: isVisible && beatsTarget != null,
  });

  useEffect(() => {
    setBeatsTarget(randomHealthyApproxBeatsPerDay());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="bmi"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-[#eff4ff] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid md:grid-cols-5 gap-8 sm:gap-16 items-center">
          <div
            className={`md:col-span-2 relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full border-[10px] sm:border-[12px] border-slate-200 relative flex items-center justify-center mx-auto">
              <svg
                className="absolute inset-0 w-full h-full progress-ring"
                viewBox="0 0 100 100"
                aria-hidden
              >
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#FF85A1"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${isVisible ? 200 : 0} 276`}
                  className="transition-all duration-[2000ms] ease-out"
                />
              </svg>
              <div className="text-center">
                <Heart className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-[#FF85A1] mx-auto mb-2 pulse-heart" />
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30] tabular-nums tracking-tight">
                  {beatsTarget == null ? "…" : `${beats.toLocaleString("en-US")}+`}
                </h3>
                <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                  beats per day
                </p>
              </div>
            </div>
          </div>

          <div
            className={`md:col-span-3 space-y-4 sm:space-y-6 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="inline-flex items-center px-3 py-1.5 bg-white/80 border border-[#FF85A1]/20 rounded-full text-xs font-bold text-[#FF85A1] uppercase tracking-wider">
              Save your heart for another day
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30] leading-tight">
              Your heart, your BMI, your future
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Your heart beats over{" "}
              <span className="text-[#FF85A1] font-bold">100,000 times every day</span>, working
              non-stop to keep you alive. Modern lifestyles—unhealthy diets, stress, and inactivity—put
              it under constant strain. Cardiovascular diseases remain a leading cause of death
              worldwide, yet many risk factors are preventable.
            </p>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              One of the strongest predictors of heart health is your{" "}
              <span className="font-bold text-[#0b1c30]">Body Mass Index (BMI)</span>. As BMI
              increases—especially with excess abdominal fat—the risk of hypertension, diabetes, and
              heart disease rises because of increased vascular resistance. Maintaining a healthy
              weight is not just about appearance; it is essential for protecting cardiovascular
              function.
            </p>
            <ul className="space-y-2 text-slate-700 text-sm sm:text-base leading-relaxed">
              <li className="flex gap-2">
                <span className="text-[#FF85A1] font-bold shrink-0">•</span>
                <span>
                  EatSmart mirrors our heart-healthy poster: practical, student-friendly ways to
                  support weight and heart health using the <strong>DASH diet</strong> and{" "}
                  <strong>intermittent fasting</strong>, building sustainable habits.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF85A1] font-bold shrink-0">•</span>
                <span>
                  <strong>Improve overall well-being</strong>—explore the paths below at your own
                  pace.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
