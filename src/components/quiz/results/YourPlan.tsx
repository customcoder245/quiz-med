import { motion } from "framer-motion";
import {
  ArrowRight, BarChart3, Utensils, CheckCircle2, Check,
  ShoppingCart, Clock, UtensilsCrossed, Heart, MessageCircle, Activity, BookOpen, Gift,
} from "lucide-react";
import { HormoneResult } from "@/lib/hormonePatterns";
import mdLogoWhite from "@/assets/md-white-logo.webp";
import coachKimberly from "@/assets/coach-kimberly.webp";
import femalePcMockup from "@/assets/female-pc-min.webp";


interface Props {
  answers: Record<string, string | string[] | number>;
  hormoneResult: HormoneResult;
  onContinue: () => void;
}

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

/* ─── Macro Ring ─── */
const MacroRing = ({ label, value, color }: { label: string; value: number; color: string }) => {
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" strokeWidth="6" className="stroke-white/15" />
          <motion.circle
            cx="40" cy="40" r="36" fill="none" strokeWidth="6"
            stroke={color} strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-base font-display font-bold text-primary-foreground">{value}%</span>
      </div>
      <span className="mt-2 text-xs font-body font-medium text-primary-foreground/70">{label}</span>
    </div>
  );
};

const YourPlan = ({ answers, hormoneResult, onContinue }: Props) => {
  const weight = (answers.weight as number) || 180;
  const goalWeight = (answers.goalWeight as number) || 150;
  const heightInches = (answers.height as number) || 66;
  const ageRaw = (answers.age as string) || "40–49";
  const age = ageRaw.includes("Under") ? 35 : ageRaw.includes("70") ? 72 : parseInt(ageRaw) + 4 || 45;
  const gender = (answers.gender as string) || "Female";
  const dietary = (answers.dietary as string) || (answers.currentDiet as string) || "Everything";
  const proteins = (answers.proteins as string[]) || [];
  const vegetables = (answers.vegetables as string[]) || [];

  const unit: "lbs" | "kg" = (answers.weightUnit as string) === "kg" ? "kg" : "lbs";
  const toUnit = (lbs: number) => (unit === "kg" ? Math.round(lbs / 2.205) : Math.round(lbs));
  const heightCm = Math.round(heightInches * 2.54);
  const weightKg = Math.round(weight * 0.4536);
  const weightToLose = Math.max(0, weight - goalWeight);
  const weightToLoseDisplay = Math.max(0, toUnit(weight) - toUnit(goalWeight));

  // Calorie estimates
  const isMale = gender?.toLowerCase().includes("male") && !gender?.toLowerCase().includes("female");
  const bmr = isMale
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  const dailyCal = Math.round(bmr * 1.2);
  const calLow = Math.round((dailyCal * 0.8) / 50) * 50;
  const calHigh = Math.round((dailyCal * 0.95) / 50) * 50;

  // Macros
  const frustration = (answers.frustration as string) || "";
  const macros = frustration.includes("energy") || frustration.includes("Energy")
    ? { protein: 25, carbs: 45, fat: 30 }
    : frustration.includes("Weight") || frustration.includes("belly")
    ? { protein: 30, carbs: 35, fat: 35 }
    : { protein: 25, carbs: 40, fat: 35 };

  // Dress sizes
  const dressSizes = weightToLose >= 30 ? "3–4" : weightToLose >= 20 ? "2–3" : "1–2";

  // Dynamic meals
  const getMealSuggestions = () => {
    const hasProtein = (k: string) => proteins.some((p) => p.toLowerCase().includes(k));
    const hasVeg = (k: string) => vegetables.some((v) => v.toLowerCase().includes(k));
    const isVegan = dietary === "Vegan";
    const isVegetarian = dietary === "Vegetarian" || isVegan;
    const isPescatarian = dietary === "Pescatarian";
    const isDairyFree = dietary === "Dairy Free";

    let breakfast = "Greek yogurt bowl with honey, walnuts & berries";
    if (isVegan) breakfast = "Overnight oats with almond butter, chia & berries";
    else if (isDairyFree) breakfast = "Overnight oats with coconut yogurt & berries";
    else if (hasProtein("egg")) breakfast = "Shakshuka with crusty whole grain bread";

    let lunch = "Mediterranean chickpea salad with feta & lemon";
    if (isVegan) lunch = "Roasted chickpea & quinoa bowl with tahini";
    else if (isVegetarian) lunch = "Mediterranean farro bowl with roasted vegetables & feta";
    else if (hasProtein("chicken")) lunch = "Grilled chicken souvlaki bowl with tzatziki & greens";
    else if (hasProtein("fish") || isPescatarian) lunch = "Tuna niçoise salad with olives & lemon vinaigrette";

    let snack = "Hummus with cucumber & bell pepper sticks";
    if (isVegan) snack = "Marinated olives with sun-dried tomatoes & almonds";

    let dinner = "Grilled sea bass with olive tapenade & roasted vegetables";
    if (isVegan) dinner = "Stuffed bell peppers with lentils, rice & herbs";
    else if (isVegetarian) dinner = "Stuffed peppers with feta, rice & herbs";
    else if (hasProtein("fish") || isPescatarian) {
      const side = hasVeg("zucchini") ? "grilled zucchini" : "roasted vegetables";
      dinner = `Herb-crusted salmon with ${side} & quinoa`;
    } else if (hasProtein("chicken")) {
      dinner = "Lemon herb chicken with sweet potatoes & greens";
    }

    // Sweet tooth → swap snack for a Mediterranean dessert
    const sweetTooth = answers.sweetTooth as string | undefined;
    if (sweetTooth === "Yes" || sweetTooth === "Occasionally") {
      snack = "Greek yogurt with honey, pistachios & dark chocolate shavings";
    }
    // Alcohol → pair dinner with a glass of red wine
    const alcohol = answers.alcohol as string | undefined;
    if (alcohol && alcohol !== "Rarely or never") {
      dinner = `${dinner} + a glass of red wine 🍷`;
    }

    return [
      { meal: "Breakfast", description: breakfast },
      { meal: "Lunch", description: lunch },
      { meal: "Snack", description: snack },
      { meal: "Dinner", description: dinner },
    ];
  };
  const dynamicMeals = getMealSuggestions();
  const todayFormatted = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  // Tips for Your plan card (matches PDF)
  const tips = [
    "Simple meals that fit your routine",
    "Stay consistent without feeling restricted",
    "Reduce cravings without strict dieting",
    "Feel more consistent energy throughout the day",
  ];

  const includedItems: { icon: typeof Utensils; title: string; text: string }[] = [
    { icon: Utensils, title: "Daily meals", text: "Breakfast, lunch, dinner & snacks." },
    { icon: UtensilsCrossed, title: "Personalized to you", text: "Built around your goals, BMI & food preferences." },
    { icon: BookOpen, title: "Simple recipes", text: "Easy meals with swap options." },
    { icon: Heart, title: "Eating out guidance", text: "Smart picks for busy days." },
    { icon: MessageCircle, title: "24/7 nutritionist support", text: "Expert help, anytime." },
    { icon: CheckCircle2, title: "Weekly meal updates", text: "Fresh plans every week." },
    { icon: Gift, title: "Auto shopping lists", text: "Done for you each week." },
    { icon: Heart, title: "Progress tracking", text: "Quick daily check-ins." },
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
          Get My Plan
        </button>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* HEADER */}
        <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="text-center">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
            Your Plan
          </h1>
          <p className="text-sm font-body text-muted-foreground mt-1.5">
            Built around your goal to lose <span className="font-bold text-foreground">{weightToLoseDisplay} {unit}</span>.
          </p>
        </motion.div>

        {/* DARK YOUR-PLAN DASHBOARD */}
        <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="bg-footer rounded-2xl p-5 md:p-6 text-primary-foreground overflow-hidden">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-lg font-display font-bold">Your plan</h2>
          </div>

          {/* Calories + Macro rings */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <div className="text-center">
              <span className="text-3xl font-display font-bold text-primary">{calLow}–{calHigh}</span>
              <p className="text-xs text-primary-foreground/60 font-body mt-1">Daily Calories</p>
            </div>
            <div className="flex gap-6">
              <MacroRing label="Protein" value={macros.protein} color="hsl(340, 80%, 58%)" />
              <MacroRing label="Carbs" value={macros.carbs} color="hsl(38, 85%, 55%)" />
              <MacroRing label="Fats" value={macros.fat} color="hsl(30, 25%, 70%)" />
            </div>
          </div>

          {/* Custom meal plan */}
          <div className="border-t border-primary-foreground/10 pt-5">
            <div className="flex items-center gap-2 mb-1">
              <Utensils className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-display font-bold text-primary-foreground">Your Custom Meal Plan</h3>
            </div>
            <p className="text-xs text-primary-foreground/60 font-body mb-1">
              Example for <span className="font-semibold text-primary-foreground">{todayFormatted}</span> only
            </p>
            <p className="text-xs text-primary font-body font-semibold mb-4">+ 1,000+ meal plan combinations</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {dynamicMeals.map((item) => (
                <div key={item.meal} className="bg-primary-foreground/10 rounded-lg p-3">
                  <span className="text-[10px] font-body font-semibold text-primary block mb-1">{item.meal}</span>
                  <span className="text-xs font-body text-primary-foreground/70">{item.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coach */}
          <div className="border-t border-primary-foreground/10 pt-5 mt-5">
            <div className="flex items-center gap-4">
              <img src={coachKimberly} alt="Kimberly RDN" className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 flex-shrink-0" width={56} height={56} loading="lazy" decoding="async" />
              <div>
                <p className="text-sm font-display font-bold text-primary-foreground">Created by Kimberly R., RDN</p>
                <p className="text-xs font-body text-primary-foreground/70">Registered Dietitian Nutritionist with 12+ years in Mediterranean nutrition.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* WHAT'S INCLUDED */}
        <motion.div {...fadeUp} transition={{ delay: 0.4 }} className="bg-card rounded-2xl border border-border shadow-card p-5 md:p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-lg font-display font-bold text-foreground">What's included?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {includedItems.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-background p-4 hover:border-primary/20 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <f.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-foreground mb-1">{f.title}</h3>
                    <p className="text-xs text-muted-foreground font-body leading-relaxed">{f.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* PRODUCT MOCKUP — moved to under What's Included */}
        <motion.div {...fadeUp} transition={{ delay: 0.5 }} className="flex justify-center">
          <img
            src={femalePcMockup}
            alt="Mediterranean Diet plan shown on laptop, tablet, and mobile devices"
            className="w-full h-auto max-w-xl"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        {/* CTA */}
        <motion.button
          {...fadeUp}
          transition={{ delay: 0.55 }}
          onClick={onContinue}
          className="w-full py-4 rounded-xl bg-gradient-hero text-primary-foreground font-body font-semibold text-lg shadow-medium hover:shadow-glow transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          See My Projection & Pricing
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default YourPlan;
