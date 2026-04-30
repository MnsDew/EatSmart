import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { BmiSection } from "@/components/landing/bmi-section";
import { DietPathsSection } from "@/components/landing/diet-paths-section";
import { MealGuidesSection } from "@/components/landing/meal-guides-section";
import { FastingSection } from "@/components/landing/fasting-section";
import { CalorieDeficitSection } from "@/components/landing/calorie-deficit-section";
import { CalculatorSection } from "@/components/landing/calculator-section";
import { CarbCyclingSection } from "@/components/landing/carb-cycling-section";
import { SnacksSection } from "@/components/landing/snacks-section";
import { FooterSection } from "@/components/landing/footer-section";
import { AddToHomeScreenFab, InstallPromptProvider } from "@/components/landing/add-to-home-screen";

export default function Home() {
  return (
    <InstallPromptProvider>
      <main className="relative min-h-screen overflow-x-hidden bg-[#f8f9ff]">
        <Navigation />
        <HeroSection />
        <BmiSection />
        <DietPathsSection />
        <MealGuidesSection />
        <FastingSection />
        <CalorieDeficitSection />
        <CalculatorSection />
        <CarbCyclingSection />
        <SnacksSection />
        <FooterSection />
        <AddToHomeScreenFab />
      </main>
    </InstallPromptProvider>
  );
}
