"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Scale } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  deficitGrocerySections,
  deficitSampleDayMeals,
  mealPhotoUrls,
} from "@/data/meal-content";

const deficitDay = deficitSampleDayMeals;

export function CalorieDeficitSection() {
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
      id="deficit"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-[#f8f9ff]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div
          className={`grid lg:grid-cols-2 gap-10 lg:gap-14 items-start transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-[#FF85A1]/30 rounded-full shadow-sm mb-6">
              <Scale className="w-4 h-4 text-[#FF85A1]" />
              <span className="text-[#FF85A1] font-bold text-xs uppercase tracking-wider">
                Calorie deficit
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30] mb-4">
              Smarter portions, same foods you enjoy
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Think you need to give up favorite foods to lose weight? Think again. This calorie
              deficit guide—pulled from the EatSmart poster—show how to eat what you enjoy in
              smarter portions, plus a full day plan to make it easy.
            </p>
            <div className="glass-card p-5 rounded-2xl mb-6 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#ffd9df] flex items-center justify-center shrink-0">
                <Flame className="w-6 h-6 text-[#FF85A1]" />
              </div>
              <div>
                <p className="font-bold text-[#0b1c30] mb-1">Example: ~1,400 kcal day</p>
                <p className="text-sm text-slate-600">
                  Breakfast <strong>400</strong> kcal · Lunch <strong>600</strong> kcal · Dinner{" "}
                  <strong>400</strong> kcal. Everyone&apos;s needs differ—use the{" "}
                  <Link
                    href="#calculator"
                    className="text-[#FF85A1] font-semibold underline underline-offset-2"
                  >
                    EatSmart calculator
                  </Link>{" "}
                  to estimate your deficit, just like the poster suggests.
                </p>
              </div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 bg-slate-100">
              <Image
                src={mealPhotoUrls.deficitSectionHero}
                alt="Balanced portions of healthy foods"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
                loading="lazy"
              />
            </div>

            <h3 className="font-bold text-[#0b1c30] mb-3">Poster grocery list (deficit edition)</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {deficitGrocerySections.map((s) => (
                <div key={s.title} className="rounded-xl border border-slate-100 bg-white p-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#FF85A1] mb-1">
                    {s.title}
                  </p>
                  <ul className="text-xs text-slate-600 space-y-0.5">
                    {s.items.map((i, idx) => (
                      <li key={`${s.title}-${idx}`}>• {i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/50">
            <h3 className="text-xl font-bold text-[#0b1c30] mb-2">Sample day (~1,400 kcal)</h3>
            <p className="text-sm text-slate-500 mb-6">
              Pick Option 1 or 2 for each block—totals follow the poster layout.
            </p>

            <Tabs defaultValue="breakfast">
              <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-slate-100/90 rounded-xl mb-4">
                <TabsTrigger value="breakfast" className="text-xs sm:text-sm rounded-lg">
                  Breakfast
                </TabsTrigger>
                <TabsTrigger value="lunch" className="text-xs sm:text-sm rounded-lg">
                  Lunch
                </TabsTrigger>
                <TabsTrigger value="dinner" className="text-xs sm:text-sm rounded-lg">
                  Dinner
                </TabsTrigger>
              </TabsList>
              {(["breakfast", "lunch", "dinner"] as const).map((slot) => (
                <TabsContent key={slot} value={slot}>
                  <Accordion type="single" collapsible defaultValue="d0">
                    {deficitDay[slot].map((meal, idx) => (
                      <AccordionItem key={meal.name} value={`d${idx}`} className="border-slate-200">
                        <AccordionTrigger className="text-left text-sm font-semibold py-3 hover:no-underline">
                          {meal.name}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid sm:grid-cols-2 gap-4 pt-1">
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100">
                              <Image
                                src={meal.image}
                                alt={meal.imageAlt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, 340px"
                                loading="lazy"
                              />
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">{meal.detail}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
