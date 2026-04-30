"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { BRAND_MARK_SRC, brandMarkFrame } from "@/lib/brand-mark";
import { TEAM_LINKEDIN } from "@/lib/team-links";

const POSTER_HREF = "/Colorful%20Heart-Healthy%20Diet%20Poster.pdf";

export function FooterSection() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <button
        type="button"
        onClick={scrollTop}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 bg-[#FF85A1] hover:bg-[#ff6b8a] text-white rounded-full shadow-2xl shadow-[#FF85A1]/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40"
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      <footer className="bg-[#f9fbfc] py-10 sm:py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="space-y-3 max-w-lg">
              <a href="#hero" className="flex items-center gap-2.5">
                <Image
                  src={BRAND_MARK_SRC}
                  alt="EatSmart"
                  width={36}
                  height={36}
                  className={brandMarkFrame.footer}
                />
                <span className="font-playfair text-xl font-semibold text-[#0b1c30]">EatSmart</span>
              </a>
              <p className="text-sm text-slate-600 leading-relaxed font-sans font-light">
                Heart-healthy nutrition guidance for the Global Society of Medicine and Health. Content reflects the EatSmart
                poster; always pair these ideas with advice from your licensed clinician when managing a
                medical condition.
              </p>
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} EatSmart. All rights reserved.
              </p>
              <p className="text-xs text-slate-500">
                <span className="font-semibold text-slate-600">Creators & Developers</span>
                {": "}
                <a
                  href={TEAM_LINKEDIN.mansoorGabali}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF85A1] font-medium hover:underline underline-offset-2"
                >
                  Mansoor Gabali
                </a>
                <span className="text-slate-400 mx-1.5" aria-hidden>
                  ·
                </span>
                <a
                  href={TEAM_LINKEDIN.abdullahMohamed}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF85A1] font-medium hover:underline underline-offset-2"
                >
                  Abdallah Mohamed
                </a>
                <span className="sr-only"> (LinkedIn opens in a new tab)</span>
              </p>
              <p className="text-xs text-slate-400">
                Resources:{" "}
                <a
                  href={POSTER_HREF}
                  className="text-[#FF85A1] font-semibold hover:underline"
                  download
                >
                  Download PDF poster
                </a>
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:min-w-[220px]">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Legal
              </span>
              <div className="flex flex-col gap-2">
                <a href="/privacy" className="text-sm text-slate-600 hover:text-[#FF85A1]">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-sm text-slate-600 hover:text-[#FF85A1]">
                  Terms of Use
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
