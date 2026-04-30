"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Menu, X } from "lucide-react";
import { BRAND_MARK_SRC, brandMarkFrame } from "@/lib/brand-mark";

const navLinks = [
  { name: "Overview", href: "#hero" },
  { name: "Heart health", href: "#bmi" },
  { name: "Paths", href: "#paths" },
  { name: "DASH & meals", href: "#meals" },
  { name: "Fasting", href: "#fasting" },
  { name: "Deficit", href: "#deficit" },
  { name: "BMR calculator", href: "#calculator" },
  { name: "Carb cycle", href: "#carb" },
  { name: "Snacks", href: "#snacks" },
];

const POSTER_HREF = "/Colorful%20Heart-Healthy%20Diet%20Poster.pdf";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "glass-nav"
            : "bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_8px_32px_0_rgba(255,133,161,0.1)]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
            <a href="#hero" className="flex items-center gap-2.5 group min-w-0">
              <Image
                src={BRAND_MARK_SRC}
                alt="EatSmart"
                width={40}
                height={40}
                className={brandMarkFrame.nav}
                priority
              />
              <span className="font-playfair font-semibold text-[#0b1c30] text-lg sm:text-xl tracking-tight truncate">
                EatSmart
              </span>
            </a>

            <div className="hidden xl:flex items-center gap-4 2xl:gap-5 flex-wrap justify-end">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs font-sans font-medium text-slate-600 hover:text-[#FF85A1] transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden xl:flex items-center shrink-0">
              <Button
                asChild
                className="bg-[#FF85A1] hover:bg-[#ff6b8a] text-white px-5 py-2.5 rounded-full font-sans font-semibold text-xs shadow-lg shadow-[#FF85A1]/20 transition-all active:scale-95 gap-2"
              >
                <a href={POSTER_HREF} download>
                  <Download className="w-4 h-4" />
                  Poster PDF
                </a>
              </Button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:text-[#FF85A1] transition-colors shrink-0"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`xl:hidden fixed inset-0 bg-[#f8f9ff] z-40 transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-6 pt-24 pb-8 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-playfair text-2xl sm:text-3xl font-medium text-[#0b1c30] hover:text-[#FF85A1] transition-all duration-500 py-2.5 border-b border-slate-100/80 ${
                  isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 40}ms` : "0ms" }}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div
            className={`mt-8 transition-all duration-500 ${
              isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "240ms" : "0ms" }}
          >
            <Button
              asChild
              className="w-full bg-[#FF85A1] hover:bg-[#ff6b8a] text-white rounded-full h-14 text-base font-sans font-semibold shadow-lg shadow-[#FF85A1]/20 gap-2"
            >
              <a href={POSTER_HREF} download onClick={() => setIsMobileMenuOpen(false)}>
                <Download className="w-5 h-5" />
                Download poster PDF
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
