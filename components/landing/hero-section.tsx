"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { siteImages } from "@/lib/site-images";
import { BRAND_MARK_SRC, brandMarkFrame } from "@/lib/brand-mark";
import { HERO_VIDEO_MP4_SRC } from "@/lib/hero-video";
import { useCountUp } from "@/hooks/use-count-up";
import { randomHealthyApproxBeatsPerDay } from "@/lib/random-daily-heartbeats";

const POSTER_HREF = "/Colorful%20Heart-Healthy%20Diet%20Poster.pdf";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [beatsTarget, setBeatsTarget] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const beats = useCountUp(beatsTarget ?? 0, {
    durationMs: 2800,
    enabled: isVisible && beatsTarget != null,
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setBeatsTarget(randomHealthyApproxBeatsPerDay());
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduceMotion(mq.matches);
    updateMotion();
    mq.addEventListener("change", updateMotion);
    return () => mq.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduceMotion) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (mq.matches) el.pause();
      else void el.play()?.catch(() => {});
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduceMotion]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden lg:min-h-[min(92vh,900px)]"
    >
      {/* Background: video (or still) + readability scrims */}
      <div className="absolute inset-0 z-0">
        {reduceMotion ? (
          <Image
            src={siteImages.heroFeatured}
            alt=""
            fill
            className="object-cover object-[center_70%]"
            sizes="100vw"
            priority
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
              className="absolute inset-0 h-[122%] w-full translate-y-[8%] object-cover object-[center_70%] sm:h-[118%] sm:translate-y-[7%] sm:object-[center_70%] lg:h-[112%] lg:translate-y-[5%] lg:object-[center_70%] lg:scale-100 scale-[1.1] sm:scale-[1.08]"
            aria-hidden
          >
            <source src={HERO_VIDEO_MP4_SRC} type="video/mp4" />
          </video>
        )}
        {/* Minimal tint — video-forward; text stays on frosted card */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#f8f9ff]/20 via-[#f8f9ff]/06 to-transparent sm:from-[#f8f9ff]/15 sm:via-transparent lg:from-[#f8f9ff]/12"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(ellipse 75% 55% at 72% 32%, rgba(255,133,161,0.08), transparent 50%)`,
          }}
          aria-hidden
        />
      </div>

      <div
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[calc(5rem+env(safe-area-inset-top))] sm:px-8 sm:pt-28 lg:pb-16 lg:pt-36"
      >
        <div className="grid w-full items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Main copy — frosted panel */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div
              className={`rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_50px_-20px_rgba(11,28,48,0.2)] backdrop-blur-xl sm:p-8 lg:bg-white/75 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              } transition-all duration-700`}
            > 
              <div className="flex flex-wrap items-center gap-3">
                <Image
                  src={BRAND_MARK_SRC}
                  alt="EatSmart"
                  width={48}
                  height={48}
                  className={brandMarkFrame.hero}
                  priority
                />
                <div className="min-w-0">
                  <p className="font-playfair text-lg font-semibold text-[#0b1c30] tracking-tight sm:text-xl">
                    EatSmart
                  </p>
                  <p className="mt-0.5 max-w-[18rem] text-[11px] font-light leading-snug tracking-wide text-slate-600 sm:max-w-none sm:text-sm">
                    Global Society of Medicine and Health · 2026
                  </p>
                </div>
              </div>

              <div
                className={`mt-5 transition-all duration-700 delay-75 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              >
                <div className="inline-flex items-center rounded-full border border-[#FF85A1]/35 bg-white/90 px-3.5 py-2 shadow-sm shadow-[#FF85A1]/10 backdrop-blur-md">
                  <span className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-slate-600 sm:text-xs sm:tracking-[0.2em]">
                    Heart-health guide
                  </span>
                </div>
              </div>

              <div
                className={`mt-6 space-y-4 transition-all delay-100 duration-1000 sm:mt-7 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <h1 className="font-playfair text-[2.15rem] leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-[3rem] lg:text-[3.25rem] lg:leading-[1.05]">
                  <span className="font-bold text-[#0b1c30]">Heart-healthy nutrition,</span>
                  <span className="mt-1.5 block font-playfair text-[1.88rem] font-bold text-[#FF85A1] sm:mt-2 sm:text-[2.65rem] md:text-[3rem] lg:text-[3.15rem]">
                    made practical.
                  </span>
                </h1>
                <p className="max-w-xl font-sans text-[15px] font-light leading-relaxed text-slate-700 sm:text-base md:text-lg">
                  Eat Smart, Move More, Live Better—your heart will thank you. Explore DASH meals,
                  intermittent fasting, calorie deficits, and carb cycling from our educational
                  poster, built for students and packed schedules.
                </p>
              </div>

              <div
                className={`mt-7 flex flex-col gap-3 transition-all delay-150 duration-1000 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <Button
                  asChild
                  className="h-auto w-full justify-center rounded-full bg-[#FF85A1] px-7 py-6 font-sans text-sm font-semibold text-white shadow-lg shadow-[#FF85A1]/28 transition-all hover:scale-[1.02] hover:bg-[#ff6b8a] hover:shadow-xl active:scale-[0.98] sm:w-auto sm:px-9 sm:text-base"
                >
                  <Link href="#paths">Explore eating paths</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto w-full justify-center gap-2 rounded-full border-slate-200/90 bg-white/90 px-7 py-6 font-sans text-sm font-medium text-[#0b1c30] shadow-md backdrop-blur-md hover:bg-white sm:w-auto sm:px-9 sm:text-base"
                >
                  <a href={POSTER_HREF} download>
                    <Download className="h-4 w-4 shrink-0" aria-hidden />
                    Download poster (PDF)
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Stats card — sits on video; aligned bottom on large screens */}
          <div className="flex items-end lg:col-span-5 xl:col-span-4">
            <div
              className={`w-full rounded-2xl border border-white/80 bg-white/90 p-4 shadow-[0_16px_40px_-16px_rgba(11,28,48,0.25)] backdrop-blur-xl sm:p-5 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } transition-all delay-200 duration-1000`}
            >
              <div className="flex items-start gap-3">
                <div className={`relative h-11 w-11 shrink-0 overflow-hidden ${brandMarkFrame.card}`}>
                  <Image
                    src={BRAND_MARK_SRC}
                    alt=""
                    fill
                    className="object-contain p-0.5"
                    sizes="44px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-[11px]">
                    Every day (approx.)
                  </p>
                  <p className="mt-1 font-playfair text-xl font-semibold tabular-nums leading-tight text-[#0b1c30] sm:text-2xl md:text-3xl">
                    <span className="text-[#FF85A1]">
                      {beatsTarget == null ? "…" : beats.toLocaleString("en-US")}
                    </span>
                    <span className="text-[#0b1c30]">+ </span>
                    <span className="font-sans text-sm font-medium text-slate-600 sm:text-base">
                      beats / day
                    </span>
                  </p>
                  <p className="mt-1.5 font-sans text-[10px] font-light leading-snug text-slate-500 sm:text-[11px]">
                    Average adult heart—educational illustration, not vital-signs monitoring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-20 bg-gradient-to-t from-[#f8f9ff]/45 to-transparent sm:h-24 lg:h-28"
        aria-hidden
      />
    </section>
  );
}
