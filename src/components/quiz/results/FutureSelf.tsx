import { motion } from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import { HormoneResult } from "@/lib/hormonePatterns";
import mdLogoWhite from "@/assets/md-white-logo.webp";

import futureFemale30 from "@/assets/future-self-female-30.webp";
import futureFemale40 from "@/assets/future-self-female-40.webp";
import futureFemale50 from "@/assets/future-self-female-50.webp";
import futureFemale60 from "@/assets/future-self-female-60.webp";
import futureMale30 from "@/assets/future-self-male-30.webp";
import futureMale40 from "@/assets/future-self-male-40.webp";
import futureMale50 from "@/assets/future-self-male-50.webp";
import futureMale60 from "@/assets/future-self-male-60.webp";

interface Props {
  answers: Record<string, string | string[] | number>;
  hormoneResult: HormoneResult;
  onContinue: () => void;
}

function getFutureSelfImage(age: number, gender: string): string {
  const isMale = gender?.toLowerCase().includes("male") && !gender?.toLowerCase().includes("female");
  if (isMale) {
    if (age >= 60) return futureMale60;
    if (age >= 50) return futureMale50;
    if (age >= 40) return futureMale40;
    return futureMale30;
  }
  if (age >= 60) return futureFemale60;
  if (age >= 50) return futureFemale50;
  if (age >= 40) return futureFemale40;
  return futureFemale30;
}

function getBmiCategory(bmi: number): string {
  if (bmi < 18.5) return "below healthy range";
  if (bmi < 25) return "healthy range";
  if (bmi < 30) return "above healthy range";
  return "above healthy range";
}

function getMetabolismTitle(hormone: HormoneResult): string {
  const map: Record<string, string> = {
    Cortisol: "Stress-Driven Metabolic Slowdown",
    Insulin: "Blood-Sugar-Driven Metabolic Slowdown",
    Estrogen: "Hormone-Driven Metabolic Slowdown",
  };
  return map[hormone.primary] || "Hormone-Driven Metabolic Slowdown";
}

function getMetabolismExplanations(answers: Record<string, string | string[] | number>): string[] {
  const out: string[] = [];
  const sleep = (answers.sleepPattern as string) || "";
  const metab = (answers.metabolismFeel as string) || "";
  const frust = (answers.frustration as string) || "";
  const energy = (answers.energyDrop as string) || "";
  const stress = (answers.stressEating as string) || "";

  if (sleep.includes("3am") || sleep.includes("wake") || sleep.includes("Wake") || sleep.includes("broken")) {
    out.push("Broken sleep or frequent 3am wake-ups");
  }
  if (metab.includes("slower") || metab.includes("Much")) {
    out.push("Slower metabolism compared to before");
  }
  if (frust.toLowerCase().includes("belly") || frust.toLowerCase().includes("midsection")) {
    out.push("Increased belly fat despite dieting");
  }
  if (energy.toLowerCase().includes("afternoon") || energy.toLowerCase().includes("morning") || energy.toLowerCase().includes("unstable")) {
    out.push("Energy crashes throughout the day");
  }
  if (stress.toLowerCase().includes("sugar") || stress.toLowerCase().includes("snack") || stress.toLowerCase().includes("sweet")) {
    out.push("Cravings that feel hard to control");
  }
  // Fallbacks
  const fallbacks = [
    "Stubborn weight around the midsection",
    "Slow metabolism compared to before",
    "Cravings that feel harder to control",
    "Energy crashes throughout the day",
  ];
  for (const f of fallbacks) {
    if (out.length >= 4) break;
    if (!out.includes(f)) out.push(f);
  }
  return out.slice(0, 4);
}

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const FutureSelf = ({ answers, hormoneResult, onContinue }: Props) => {
  const weight = (answers.weight as number) || 180;
  const goalWeight = (answers.goalWeight as number) || 150;
  const heightInches = (answers.height as number) || 66;
  const unit: "lbs" | "kg" = (answers.weightUnit as string) === "kg" ? "kg" : "lbs";
  const toUnit = (lbs: number) => (unit === "kg" ? Math.round(lbs / 2.205) : Math.round(lbs));
  const weightDisplay = toUnit(weight);
  const goalWeightDisplay = toUnit(goalWeight);
  const ageRaw = (answers.age as string) || "40–49";
  const age = ageRaw.includes("Under") ? 35 : ageRaw.includes("70") ? 72 : parseInt(ageRaw) + 4 || 45;
  const gender = (answers.gender as string) || "Female";
  const dietary = (answers.dietary as string) || (answers.currentDiet as string) || "Everything";
  const name = ((answers.name as string) || "").trim();

  const heightM = heightInches * 0.0254;
  const weightKg = weight * 0.4536;
  const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10;
  const bmiCat = getBmiCategory(bmi);
  const heightFeet = Math.floor(heightInches / 12);
  const heightRem = Math.round(heightInches % 12);

  const futureImg = getFutureSelfImage(age, gender);
  const metabolismTitle = getMetabolismTitle(hormoneResult);
  const explanations = getMetabolismExplanations(answers);

  // Body fat estimates
  const bodyFatNow = bmi >= 30 ? "32%+" : bmi >= 27 ? "28–32%" : bmi >= 25 ? "25–28%" : "22–25%";
  const bodyFatGoal = gender?.toLowerCase().includes("male") && !gender?.toLowerCase().includes("female")
    ? "12–18%"
    : "20–24%";

  // Build a meal preference label that reflects the user's actual quiz inputs
  const proteins = (answers.proteins as string[]) || [];
  const vegetables = (answers.vegetables as string[]) || [];
  const buildPreferenceLabel = (): string => {
    if (dietary && dietary !== "Everything" && dietary !== "No preference") return dietary;
    const topProtein = proteins[0];
    const topVeg = vegetables[0];
    if (topProtein && topVeg) return `${topProtein} & ${topVeg}`;
    if (topProtein) return `${topProtein}-forward`;
    if (topVeg) return `${topVeg}-forward`;
    return "Balanced Mediterranean";
  };

  const profileRows: { label: string; value: string }[] = [
    { label: "Age Group", value: ageRaw },
    { label: "Height", value: `${heightFeet}'${heightRem}"` },
    { label: "BMI", value: `${bmi} — ${bmiCat}` },
    { label: "Meal Preference", value: buildPreferenceLabel() },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Sticky top */}
      <header className="sticky top-0 z-50 bg-footer text-primary-foreground py-3.5 px-4 flex items-center justify-between">
        <img src={mdLogoWhite} alt="Mediterranean Diet" className="h-8" loading="lazy" decoding="async" />
        <button
          onClick={onContinue}
          className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity">
          See My Plan
        </button>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* HERO HEADLINE */}
        <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="text-center">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight leading-snug">
            {name ? `${name}, meet your future self.` : "Meet your future self."}
            <br className="hidden sm:block" />
            <span className="text-foreground"> Leaner, healthier, and </span>
            <span className="text-primary">at your goal weight</span>
            <span className="text-foreground">.</span>
          </h1>
        </motion.div>

        {/* BEFORE / AFTER CARD */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.2 }}
          className="bg-emerald-50 rounded-2xl border border-emerald-100 p-4 md:p-6 shadow-card overflow-hidden"
        >
          {/* Tab pill */}
          <div className="bg-background rounded-full grid grid-cols-2 mb-4 max-w-md mx-auto shadow-sm">
            <div className="text-center py-2 text-sm font-display font-bold text-foreground">Now</div>
            <div className="text-center py-2 text-sm font-display font-bold text-emerald-600">Goal</div>
          </div>

          {/* Image */}
          <img
            src={futureImg}
            alt="Before and after transformation visual"
            className="w-full h-auto rounded-xl object-cover"
            width={1024}
            height={1024}
            loading="eager"
            decoding="async"
          />

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-5 px-1">
            <div>
              <p className="text-xs font-display font-bold text-foreground">Weight</p>
              <p className="text-lg font-display font-bold text-foreground mt-0.5">{weightDisplay} {unit}</p>
            </div>
            <div>
              <p className="text-xs font-display font-bold text-foreground">Goal weight</p>
              <p className="text-lg font-display font-bold text-emerald-600 mt-0.5">{goalWeightDisplay} {unit}</p>
            </div>

            <div>
              <p className="text-xs font-display font-bold text-foreground">Body fat</p>
              <p className="text-base font-body text-muted-foreground mt-0.5">{bodyFatNow}</p>
            </div>
            <div>
              <p className="text-xs font-display font-bold text-foreground">Body fat</p>
              <p className="text-base font-body text-emerald-600 mt-0.5">{bodyFatGoal}</p>
            </div>

            <div>
              <p className="text-xs font-display font-bold text-foreground mb-1.5">Energy level</p>
              <div className="flex gap-1">
                {[true, false, false, false, false].map((on, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-7 rounded-full ${on ? "bg-emerald-500" : "bg-muted-foreground/20"}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-display font-bold text-foreground mb-1.5">Energy level</p>
              <div className="flex gap-1">
                {[true, true, true, true, true].map((on, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-7 rounded-full ${on ? "bg-emerald-500" : "bg-muted-foreground/20"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* PROFILE SUMMARY */}
        <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="bg-card rounded-2xl border border-border shadow-card p-5 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-lg font-display font-bold text-foreground">Your profile summary</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {profileRows.map((row) => (
              <div key={row.label} className="rounded-xl border border-border bg-background p-3">
                <p className="text-[11px] font-body text-muted-foreground uppercase tracking-wide">{row.label}</p>
                <p className="text-sm md:text-base font-display font-bold text-foreground mt-1">{row.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.button
          {...fadeUp}
          transition={{ delay: 0.5 }}
          onClick={onContinue}
          className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          See My Personalized Plan
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FutureSelf;
