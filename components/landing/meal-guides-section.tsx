"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChefHat } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dashFullDayMeals, dashGrocerySections } from "@/data/meal-content";

export function MealGuidesSection() {
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
      id="meals"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-[#f8f9ff]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div
            className={`lg:col-span-5 space-y-6 sm:space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30] leading-tight">
                DASH diet:{" "}
                <span className="text-[#FF85A1]">grocery essentials</span>
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                Everything on the EatSmart poster grocery list—budget-friendly building blocks for
                heart-friendly meals.
              </p>
            </div>

            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
              {dashGrocerySections.map((section, si) => (
                <div
                  key={section.title}
                  className={`rounded-xl border border-slate-100 bg-white/80 p-4 shadow-sm transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${si * 80}ms` }}
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF85A1] mb-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {section.items.map((item, itemIdx) => (
                      <li
                        key={`${section.title}-${itemIdx}-${item}`}
                        className="flex gap-2 text-sm text-[#0b1c30] leading-snug"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF85A1] shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`lg:col-span-7 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="glass-card rounded-2xl overflow-hidden p-6 sm:p-8 border border-white/40">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-3 text-[#0b1c30]">
                <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF85A1]" />
                A full DASH day
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Let’s see what a full day of eating on DASH can look like—choose Option 1 or 2 for
                each meal.
              </p>

              <Tabs defaultValue="breakfast" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-slate-100/80 rounded-xl mb-6">
                  <TabsTrigger
                    value="breakfast"
                    className="rounded-lg py-2.5 text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Breakfast
                  </TabsTrigger>
                  <TabsTrigger
                    value="lunch"
                    className="rounded-lg py-2.5 text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Lunch
                  </TabsTrigger>
                  <TabsTrigger
                    value="dinner"
                    className="rounded-lg py-2.5 text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Dinner
                  </TabsTrigger>
                </TabsList>

                {(
                  ["breakfast", "lunch", "dinner"] as const
                ).map((slot) => (
                  <TabsContent key={slot} value={slot} className="mt-0">
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue="opt-0"
                      className="w-full"
                    >
                      {dashFullDayMeals[slot].map((meal, idx) => (
                        <AccordionItem
                          key={meal.name}
                          value={`opt-${idx}`}
                          className="border-slate-200"
                        >
                          <AccordionTrigger className="text-left font-bold text-[#0b1c30] hover:no-underline py-4">
                            {meal.name}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              {"tagline" in meal && meal.tagline ? (
                                <p className="text-sm font-medium text-[#FF85A1]">
                                  {meal.tagline}
                                </p>
                              ) : null}
                              <div className="grid sm:grid-cols-2 gap-4">
                                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100">
                                  <Image
                                    src={meal.image}
                                    alt={meal.imageAlt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, 400px"
                                    loading="lazy"
                                  />
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  {meal.detail}
                                </p>
                              </div>
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
      </div>
    </section>
  );
}
