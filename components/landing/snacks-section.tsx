"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { siteImages } from "@/lib/site-images";

export function SnacksSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section id="snacks" ref={sectionRef} className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0b1c30] p-8 sm:p-12 lg:p-24 text-white">
          <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full">
            <Image
              src={siteImages.snacks}
              alt="Dark chocolate and mindful treats in moderation"
              fill
              className="object-cover opacity-60"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0b1c30]/50 to-[#0b1c30]" />
          </div>

          <div
            className={`relative z-10 max-w-xl space-y-4 sm:space-y-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-[#FF85A1] font-bold tracking-widest text-xs sm:text-sm uppercase">
              From the poster
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
              Snacks without the guilt trip
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Did we say you can&apos;t enjoy a midday snack while eating for heart health? Absolutely
              not—EatSmart is about balance, not punishment.
            </p>

            <div className="grid gap-3 sm:gap-4 pt-2">
              <div className="p-3 sm:p-4 bg-white/10 rounded-xl border border-white/10 backdrop-blur">
                <p className="text-lg sm:text-xl font-extrabold text-[#FF85A1]">
                  1 scoop ice cream (~100 g)
                </p>
                <p className="text-xs font-medium text-slate-400">
                  ≈ 180–220 kcal (poster range)
                </p>
              </div>
              <div className="p-3 sm:p-4 bg-white/10 rounded-xl border border-white/10 backdrop-blur">
                <p className="text-lg sm:text-xl font-extrabold text-[#FF85A1]">
                  3 cubes dark chocolate (~15–20 g)
                </p>
                <p className="text-xs font-medium text-slate-400">≈ 80–120 kcal</p>
              </div>
              <div className="p-3 sm:p-4 bg-white/10 rounded-xl border border-white/10 backdrop-blur">
                <p className="text-lg sm:text-xl font-extrabold text-[#FF85A1]">30 g chips</p>
                <p className="text-xs font-medium text-slate-400">≈ 150–170 kcal</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm italic text-slate-400 pt-2">
              &quot;Everything in moderation, including moderation.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
