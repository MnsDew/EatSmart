"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Scale, Flame, Activity, ChevronRight } from "lucide-react";

type Gender = "male" | "female";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const activityLabels: Record<ActivityLevel, string> = {
  sedentary: "Sedentary (little or no exercise)",
  light: "Light (1-3 days/week)",
  moderate: "Moderate (3-5 days/week)",
  active: "Active (6-7 days/week)",
  very_active: "Very Active (intense daily)",
};

export function CalculatorSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Form state
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [weight, setWeight] = useState(""); // kg
  const [heightCm, setHeightCm] = useState(""); // cm
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  
  // Results
  const [results, setResults] = useState<{
    bmr: number;
    tdee: number;
    deficit: number;
    bmi: number;
    bmiCategory: string;
  } | null>(null);

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

  const calculateAll = () => {
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(heightCm);

    if (!ageNum || !weightNum || !heightNum) return;

    // BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    // TDEE
    const tdee = bmr * activityMultipliers[activityLevel];

    // Recommended deficit (500 cal for safe weight loss)
    const deficit = tdee - 500;

    // BMI
    const heightM = heightNum / 100;
    const bmi = weightNum / (heightM * heightM);
    
    // BMI Category
    let bmiCategory: string;
    if (bmi < 18.5) bmiCategory = "Underweight";
    else if (bmi < 25) bmiCategory = "Normal";
    else if (bmi < 30) bmiCategory = "Overweight";
    else bmiCategory = "Obese";

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      deficit: Math.round(deficit),
      bmi: Math.round(bmi * 10) / 10,
      bmiCategory,
    });
  };

  return (
    <section 
      id="calculator" 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-gradient-to-b from-[#f8f9ff] to-[#eff4ff]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-[#FF85A1]/30 rounded-full shadow-sm mb-6">
            <Calculator className="w-4 h-4 text-[#FF85A1]" />
            <span className="text-[#FF85A1] font-bold text-xs uppercase tracking-wider">
              Health Tools
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0b1c30] mb-4">
            BMR & calorie deficit calculator
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The EatSmart poster uses a sample <strong>~1,400 kcal</strong> day to illustrate portion
            ideas—your real target should match your body size, activity, and care team guidance. Use
            this calculator to estimate BMR, TDEE, and a moderate daily intake after a safe deficit.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Calculator Form */}
          <div className={`glass-card p-6 sm:p-8 rounded-2xl transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}>
            <h3 className="text-xl font-bold text-[#0b1c30] mb-6 flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#FF85A1]" />
              Enter Your Details
            </h3>
            
            <div className="space-y-5">
              {/* Gender Selection */}
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Gender</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setGender("male")}
                    className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                      gender === "male"
                        ? "bg-[#528BFF] text-white shadow-lg shadow-[#528BFF]/30 hover:bg-[#3d76f5]"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-[#528BFF]"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender("female")}
                    className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                      gender === "female"
                        ? "bg-[#FF85A1] text-white shadow-lg shadow-[#FF85A1]/20"
                        : "bg-white border border-slate-200 text-slate-600 hover:border-[#FF85A1]"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Age */}
              <div>
                <Label htmlFor="age" className="text-sm font-medium text-slate-700 mb-2 block">
                  Age (years)
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="h-12 rounded-xl border-slate-200 focus:border-[#FF85A1] focus:ring-[#FF85A1]"
                />
              </div>

              {/* Weight */}
              <div>
                <Label htmlFor="weight" className="text-sm font-medium text-slate-700 mb-2 block">
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="h-12 rounded-xl border-slate-200 focus:border-[#FF85A1] focus:ring-[#FF85A1]"
                />
              </div>

              {/* Height */}
              <div>
                <Label htmlFor="height" className="text-sm font-medium text-slate-700 mb-2 block">
                  Height (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="h-12 rounded-xl border-slate-200 focus:border-[#FF85A1] focus:ring-[#FF85A1]"
                />
              </div>

              {/* Activity Level */}
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">
                  Activity Level
                </Label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 focus:border-[#FF85A1] focus:ring-[#FF85A1] focus:outline-none"
                >
                  {Object.entries(activityLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={calculateAll}
                className="w-full h-14 bg-[#FF85A1] hover:bg-[#ff6b8a] text-white font-bold rounded-xl shadow-lg shadow-[#FF85A1]/20 text-base mt-4"
              >
                Calculate
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}>
            {results ? (
              <div className="space-y-4">
                {/* BMI Card */}
                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-slate-700">Your BMI</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      results.bmiCategory === "Normal" 
                        ? "bg-green-100 text-green-700"
                        : results.bmiCategory === "Underweight"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-orange-100 text-orange-700"
                    }`}>
                      {results.bmiCategory}
                    </span>
                  </div>
                  <p className="text-4xl font-extrabold text-[#0b1c30]">{results.bmi}</p>
                  <p className="text-sm text-slate-500 mt-1">Body Mass Index</p>
                </div>

                {/* BMR Card */}
                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#ffd9df] flex items-center justify-center">
                      <Flame className="w-5 h-5 text-[#FF85A1]" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Basal Metabolic Rate</p>
                      <p className="text-2xl font-extrabold text-[#0b1c30]">{results.bmr.toLocaleString()} cal</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">Calories your body burns at rest</p>
                </div>

                {/* TDEE Card */}
                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#bce6fb] flex items-center justify-center">
                      <Activity className="w-5 h-5 text-[#3b6476]" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Total Daily Energy Expenditure</p>
                      <p className="text-2xl font-extrabold text-[#0b1c30]">{results.tdee.toLocaleString()} cal</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">Total calories you burn per day with activity</p>
                </div>

                {/* Deficit Card */}
                <div className="bg-[#0b1c30] text-white p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FF85A1] flex items-center justify-center">
                      <Scale className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Recommended Daily Intake</p>
                      <p className="text-2xl font-extrabold">{results.deficit.toLocaleString()} cal</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">For healthy weight loss (-500 cal deficit)</p>
                </div>
              </div>
            ) : (
              <div className="glass-card p-8 sm:p-12 rounded-2xl flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <div className="w-20 h-20 rounded-full bg-[#ffd9df] flex items-center justify-center mb-6">
                  <Calculator className="w-10 h-10 text-[#FF85A1]" />
                </div>
                <h4 className="text-xl font-bold text-[#0b1c30] mb-2">Enter Your Details</h4>
                <p className="text-slate-500 max-w-sm">
                  Fill in the calculator to get your personalized BMR, TDEE, and recommended calorie intake.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
