import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield, Lock, Check, Users, Star, ChevronDown, RefreshCw, ArrowRight
} from "lucide-react";
import { HormoneResult, patternDescriptions } from "@/lib/hormonePatterns";
import { track } from "@/lib/tracking";
import mdLogoWhite from "@/assets/md-white-logo.webp";
import productMockup from "@/assets/product-mockup-med.webp";
import bestDietBadge from "@/assets/badge-best-diets-2026.svg";
import logoNYT from "@/assets/logo-nyt.webp";
import logoWomensHealth from "@/assets/logo-womens-health.webp";
import logoHealthline from "@/assets/logo-healthline.png";
import sammiBA from "@/assets/before-after-new.webp";
import jasmineBA from "@/assets/jasmine-ba.webp";
import tiffanyBA from "@/assets/tiffany-before-after.webp";
import destinyBA from "@/assets/destiny-before-after.webp";
import femaleBA2 from "@/assets/female-ba-2.webp";
import maleBA2 from "@/assets/male-ba-2.webp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FacebookComments from "./FacebookComments";

interface Props {
  hormoneResult: HormoneResult;
  userEmail: string;
}

/* ═══ PAYMENT LOGOS ═══ */
const PaymentLogos = () => (
  <div className="space-y-4 mt-5">
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <div className="h-px flex-1 max-w-[80px] bg-border" />
        <span className="text-xs font-body font-semibold text-muted-foreground tracking-wide">Secure Payment By:</span>
        <div className="h-px flex-1 max-w-[80px] bg-border" />
      </div>
      <div className="flex items-center justify-center gap-1.5">
        <div className="bg-card rounded-md px-2 py-1.5 border border-border shadow-sm">
          <span className="font-display font-bold text-[11px]" style={{ color: '#003087' }}>Pay<span style={{ color: '#009cde' }}>Pal</span></span>
        </div>
        <div className="bg-card rounded-md px-2 py-1.5 border border-border shadow-sm flex items-center gap-0.5">
          <svg width="18" height="12" viewBox="0 0 24 16"><circle cx="9" cy="8" r="7" fill="#EB001B" /><circle cx="15" cy="8" r="7" fill="#F79E1B" /><path d="M12 2.4a7 7 0 0 1 0 11.2A7 7 0 0 1 12 2.4Z" fill="#FF5F00" /></svg>
        </div>
        <div className="bg-card rounded-md px-2 py-1.5 border border-border shadow-sm">
          <span className="font-display font-bold text-[11px] tracking-tight" style={{ color: '#1A1F71' }}>VISA</span>
        </div>
        <div className="rounded-md px-2 py-1.5 border border-border shadow-sm" style={{ backgroundColor: '#006FCF' }}>
          <span className="font-display font-bold text-[8px] text-white tracking-tight leading-none block">AMEX</span>
        </div>
        <div className="bg-card rounded-md px-2 py-1.5 border border-border shadow-sm">
          <span className="font-display font-bold text-[10px] tracking-tight text-foreground">DISC<span style={{ color: '#FF6600' }}>●</span>VER</span>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-center gap-2">
      {[
        { icon: Shield, label: "McAfee®", color: '#C1272D' },
        { icon: Check, label: "TrustedSite", color: undefined },
        { icon: Lock, label: "Norton", color: '#FFCD00' },
        { icon: Check, label: "VeriSign", color: '#C1272D' },
      ].map(({ icon: Icon, label, color }) => (
        <div key={label} className="flex items-center gap-1 border border-border rounded-md px-2 py-1.5 bg-card shadow-sm">
          <Icon className="w-3.5 h-3.5" style={color ? { color } : undefined} />
          <span className="text-[9px] font-display font-bold text-foreground">{label}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ═══ PRICING SECTION (reusable) ═══ */
const PricingSection = ({
  selectedPlan,
  setSelectedPlan,
  handleClaim,
  minutes,
  seconds,
}: {
  selectedPlan: string;
  setSelectedPlan: (p: "1month" | "3month" | "6month") => void;
  handleClaim: () => void;
  minutes: number;
  seconds: number;
}) => {
  const plans = {
    "1month": { label: "1-Month Plan", subtitle: "1 Month", perDay: "$1.20", total: "$36", originalTotal: "$60", recommended: false },
    "3month": { label: "3-Month Plan", subtitle: "Best results. Better value.", perDay: "$0.60", total: "$54", originalTotal: "$108", recommended: true },
    "6month": { label: "6-Month Plan", subtitle: "6 Months", perDay: "$0.40", total: "$72", originalTotal: "$144", recommended: false },
  };
  const planOrder: (keyof typeof plans)[] = ["1month", "3month", "6month"];

  return (
    <div className="py-10 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-6">
          <h2 className="text-lg md:text-xl font-display font-bold text-foreground leading-tight">
            Choose the option that works best for you
          </h2>
        </div>

        {/* Stars row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 mb-6">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-primary fill-primary" />
            ))}
          </div>
          <span className="text-sm font-body text-muted-foreground sm:ml-2">
            4.8 from <span className="font-bold text-foreground">25K+</span> reviews · <span className="font-bold text-foreground">527K+</span> members
          </span>
        </div>

        {/* Pricing cards - 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {planOrder.map((key) => {
            const plan = plans[key];
            const isSelected = selectedPlan === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedPlan(key)}
                className={`relative rounded-xl border-2 transition-all duration-200 text-center p-6 flex flex-col items-center ${
                  plan.recommended
                    ? "border-primary bg-primary/5 shadow-glow"
                    : isSelected
                    ? "border-primary shadow-glow"
                    : "border-border/60 hover:border-primary/40 bg-card"
                } ${plan.recommended ? "md:-mt-2 md:pb-8" : ""}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-0 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-display font-bold rounded-b-lg whitespace-nowrap uppercase">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`${plan.recommended ? "mt-4" : ""}`}>
                  <h3 className="text-lg font-display font-bold text-foreground">{plan.label}</h3>
                  <p className="text-sm font-body text-muted-foreground mt-0.5">{plan.subtitle}</p>
                </div>

                <div className="mt-4">
                  <span className="text-3xl md:text-4xl font-display font-bold text-foreground">{plan.perDay}</span>
                  <span className="text-sm font-body text-muted-foreground ml-1">/day</span>
                </div>
                <p className="text-sm font-body text-muted-foreground mt-1">
                  <span className="line-through opacity-70 mr-1.5">{plan.originalTotal}</span>
                  <span className="text-foreground font-semibold">{plan.total} total</span>
                </p>

                {/* Radio circle */}
                <div className={`mt-5 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="flex flex-col items-center text-center gap-1.5 px-2 py-3 rounded-xl bg-muted/30">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs font-display font-bold text-foreground">60-Day</p>
              <p className="text-xs font-display font-bold text-foreground">Money-Back Guarantee</p>
              <p className="text-[10px] font-body text-muted-foreground">Not happy? Get a full refund.</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-1.5 px-2 py-3 rounded-xl bg-muted/30">
            <RefreshCw className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs font-display font-bold text-foreground">Cancel Anytime</p>
              <p className="text-[10px] font-body text-muted-foreground">No lock-ins. You're in control.</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-1.5 px-2 py-3 rounded-xl bg-muted/30">
            <Lock className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs font-display font-bold text-foreground">Secure Checkout</p>
              <p className="text-[10px] font-body text-muted-foreground">Your payment information is always protected.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.button
          onClick={handleClaim}
          className="group w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-gradient-hero text-primary-foreground font-body font-bold text-xl shadow-medium hover:shadow-glow transition-all"
          whileHover={{ opacity: 0.9 }}
          whileTap={{ scale: 0.98 }}
        >
          Select Plan
          <ArrowRight className="w-5 h-5" />
        </motion.button>
        <PaymentLogos />
      </div>
    </div>
  );
};

/* ═══ AS FEATURED IN ═══ */
const AsFeaturedIn = () => (
  <div className="py-8 px-6">
    <div className="mx-auto max-w-xl text-center">
      <p className="text-sm font-body text-muted-foreground mb-6">Our diet featured in:</p>
      <div className="flex items-center justify-center gap-8 flex-wrap">
        <img src={logoNYT} alt="The New York Times" className="h-6 md:h-7 object-contain opacity-70" loading="lazy" decoding="async" />
        <img src={logoWomensHealth} alt="Women's Health" className="h-5 md:h-6 object-contain opacity-70" loading="lazy" decoding="async" />
        <img src={logoHealthline} alt="Healthline" className="h-5 md:h-6 object-contain opacity-70" loading="lazy" decoding="async" />
      </div>
    </div>
  </div>
);

/* ═══ TESTIMONIALS ═══ */
const testimonials = [
  {
    name: "Jasmine F.",
    age: 68,
    image: jasmineBA,
    title: "27 lbs in 8 weeks — and I actually have energy now",
    text: "Everyone says the Mediterranean Diet helps you shed excess weight - and I have to say they're right! I've already lost 27 lbs in just 8 weeks! The feeling of great health and fresh food is giving me new strong bursts of energy!",
    featured: true,
  },
  {
    name: "Tiffany W.",
    age: 48,
    image: tiffanyBA,
    title: "I didn't feel like I was dieting once",
    text: "The plan was not difficult to follow. The foods were pretty easy to find and with consistency, I found myself dropping pounds of fat each week. My friends are astounded by how different I look!",
    featured: false,
  },
  {
    name: "Destiny O.",
    age: 54,
    image: destinyBA,
    title: "I've tried everything. This is the only thing that actually stuck",
    text: "Feels really good to be shedding stubborn weight finally after years of trying every other diet under the sun with no success. This REALLY works!",
    featured: false,
  },
];

const extraTestimonials = [
  {
    name: "Rachel M.",
    age: 42,
    image: femaleBA2,
    title: "Delicious Fat-Shredding Solution!",
    text: "So, I'm a big fan of The Mediterranean Diet now. Tastes really really good. I've had to make a few adjustments with some of the food but that hasn't changed the overall outcome of the diet. Feels really good to be shedding stubborn weight finally after years of trying every other diet under the sun with no success. This REALLY works!",
  },
  {
    name: "Marcus D.",
    age: 29,
    image: maleBA2,
    title: "Got Rid Of My Fat Fast!",
    text: "I used to hit the gym four times a week just to try to lose weight. But I never got any results until I started the Mediterranean Diet. I'm currently down 32 lbs since I started a month ago! For me, a really great outcome! My friends and family say they barely recognize me now!",
  },
];

const TestimonialsSection = () => {
  const isMale = (() => { try { const a = JSON.parse(sessionStorage.getItem("quizAnswers") || "{}"); return (a.gender || a.sex) === "Male"; } catch { return false; } })();
  const featured = testimonials.find((t) => t.featured)!;
  const rest = testimonials.filter((t) => !t.featured);

  return (
    <div className="py-10 px-6">
      <div className="mx-auto max-w-xl">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-8">
          Real people. Real results.
        </h2>
        {/* Featured testimonial */}
        <div className="rounded-xl border border-border bg-card p-4 mb-4">
          <img src={featured.image} alt={featured.name} className="w-full aspect-[4/3] rounded-lg mb-3 object-cover object-top" width={400} height={300} loading="lazy" decoding="async" />
          <h3 className="text-sm font-display font-bold text-foreground mb-1">{featured.title}</h3>
          <div className="flex gap-0.5 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <p className="text-xs font-body text-muted-foreground leading-relaxed mb-2">{featured.text}</p>
          <p className="text-xs font-body text-muted-foreground">
            {featured.name}, {featured.age} <span className="text-primary font-medium">✓ Verified</span>
          </p>
        </div>
        {/* Remaining testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-card p-4">
              <img src={t.image} alt={t.name} className="w-full aspect-[4/3] rounded-lg mb-3 object-cover object-top" width={400} height={300} loading="lazy" decoding="async" />
              <h3 className="text-sm font-display font-bold text-foreground mb-1">{t.title}</h3>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs font-body text-muted-foreground leading-relaxed mb-2">{t.text}</p>
              <p className="text-xs font-body text-muted-foreground">
                {t.name}, {t.age} <span className="text-primary font-medium">✓ Verified</span>
              </p>
            </div>
          ))}
        </div>
        {/* Extra testimonials row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {extraTestimonials.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-card p-4">
              <img src={t.image} alt={t.name} className="w-full aspect-[4/3] rounded-lg mb-3 object-cover object-top" width={400} height={300} loading="lazy" decoding="async" />
              <h3 className="text-sm font-display font-bold text-foreground mb-1">{t.title}</h3>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs font-body text-muted-foreground leading-relaxed mb-2">{t.text}</p>
              <p className="text-xs font-body text-muted-foreground">
                {t.name}, {t.age} <span className="text-primary font-medium">✓ Verified</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══ GUARANTEE ═══ */
const GuaranteeBlock = () => (
  <div className="px-6 py-6">
    <div className="mx-auto max-w-xl rounded-xl p-6 border border-emerald-200 bg-emerald-50 text-center">
      <Shield className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
      <h3 className="text-lg font-display font-bold text-foreground mb-2">60-Day Money-Back Guarantee</h3>
      <p className="text-sm text-muted-foreground font-body max-w-md mx-auto">
        If you follow the plan for 60 days and don't see results, we'll refund every cent. No forms to fill out. No questions asked. Just email us and your refund is processed within 24 hours.
      </p>
    </div>
  </div>
);

/* ═══ FAQ ═══ */
const faqs = [
  { q: "What is your money-back guarantee?", a: "If you follow the plan for 60 days and don't see results, we'll refund every cent — no questions asked. Just email us and your refund is processed within 24 hours." },
  { q: "How much weight can I expect to lose?", a: "Many of our members achieve incredible results of over 7 pounds in their first week. Your commitment and determination will affect your overall weight loss. If you are committed and follow the plan diligently, you can definitely achieve your goal weight." },
  { q: "Will this help with my cholesterol?", a: "Yes! The Mediterranean diet is clinically shown to support healthy cholesterol levels. Many members report improved lipid panels within 8–12 weeks." },
  { q: "Will this help with my blood sugar levels?", a: "Absolutely. The meals are designed to stabilize blood sugar by balancing proteins, healthy fats, and complex carbs — reducing spikes and crashes throughout the day." },
];

const FAQSection = () => (
  <div className="py-10 px-6">
    <div className="mx-auto max-w-xl">
      <h2 className="text-2xl font-display font-bold text-foreground text-center mb-6">
        People <span className="text-primary">often</span> ask
      </h2>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-4 bg-card">
            <AccordionTrigger className="text-sm font-body font-medium text-foreground py-4 hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm font-body text-muted-foreground pb-4">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </div>
);

/* ═══ MAIN COMPONENT ═══ */
const PersonalizedPlan = ({ hormoneResult, userEmail }: Props) => {
  const [selectedPlan, setSelectedPlan] = useState<"1month" | "3month" | "6month">("3month");
  const [minutes, setMinutes] = useState(8);
  const [seconds, setSeconds] = useState(17);
  const isMale = (() => { try { const a = JSON.parse(sessionStorage.getItem("quizAnswers") || "{}"); return (a.gender || a.sex) === "Male"; } catch { return false; } })();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s === 0) {
          setMinutes((m) => (m === 0 ? 0 : m - 1));
          return 59;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const sessionId = typeof window !== "undefined" ? localStorage.getItem("md_session_id") || "" : "";
  const emailParam = userEmail ? `&email=${encodeURIComponent(userEmail)}` : "";

  // Map hormone pattern to link code
  const hormoneCode: Record<string, string> = { Cortisol: "c", Estrogen: "e", Insulin: "i" };
  const hCode = hormoneCode[hormoneResult.primary] || "c";

  // Map diet preference from quiz answers to link code
  const answersRaw = typeof window !== "undefined" ? sessionStorage.getItem("quizAnswers") : null;
  const quizAnswers = answersRaw ? JSON.parse(answersRaw) : {};
  const dietAnswer = (quizAnswers.currentDiet || "Everything") as string;
  const dietMap: Record<string, { code: string }> = {
    "Dairy Free": { code: "df" },
    "Gluten Free": { code: "gf" },
    "Vegan": { code: "pb" },
    "Vegetarian": { code: "pb" },
    "Plant Based": { code: "pb" },
    "Pescatarian": { code: "s" },
    "Everything": { code: "s" },
  };
  const dCode = dietMap[dietAnswer]?.code || "s";

  // TID lookup: hormone -> diet -> tid
  const tidMap: Record<string, Record<string, string>> = {
    c: { df: "62005", gf: "62006", pb: "62007", s: "62008" },
    e: { df: "62011", gf: "62010", pb: "62009", s: "62012" },
    i: { df: "62013", gf: "62014", pb: "62015", s: "62016" },
  };
  const tid = tidMap[hCode]?.[dCode] || "62008";

  const baseUrl = "https://jackalbany_mediterr.pay.clickbank.net/";
  const paymentLinks: Record<string, string> = {
    "1month": `${baseUrl}?cbitems=med-30-b&template=new2026-c&exitoffer=exit&cbfid=61378${emailParam}`,
    "3month": `${baseUrl}?cbitems=med-54-b&template=new2026-c&exitoffer=exit&cbfid=61378${emailParam}`,
    "6month": `${baseUrl}?cbitems=med1p-r-72&template=new2026-c&exitoffer=exit&cbfid=61378${emailParam}`,
  };

  const [redirecting, setRedirecting] = useState(false);
  const handleClaim = () => {
    const link = paymentLinks[selectedPlan];
    if (!link) return;
    setRedirecting(true);
    // Tracking is fire-and-forget (idle callback) — won't delay the redirect.
    track("order_form_view", "/results/order", { answer_value: selectedPlan });
    // Redirect on next tick so the overlay paints first → click feels instant.
    setTimeout(() => { window.location.href = link; }, 0);
  };

  const scrollToPricing = () => document.getElementById("results-pricing")?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* REDIRECTING OVERLAY — paints instantly on click so the wait for ClickBank doesn't feel like a frozen page */}
      {redirecting && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <p className="font-body text-base font-semibold text-foreground">Securing your plan…</p>
          <p className="font-body text-xs text-muted-foreground">Redirecting to secure checkout</p>
        </div>
      )}
      {/* STICKY TOP BAR */}
      <header className="sticky top-0 z-50 bg-footer text-primary-foreground py-3.5 px-4 flex items-center justify-between">
        <img src={mdLogoWhite} alt="Mediterranean Diet" className="h-8" loading="lazy" decoding="async" />
        <nav className="flex items-center gap-3" aria-label="Plan navigation">
          <span className="font-body text-sm font-medium hidden sm:inline">
            Your plan is reserved for{" "}
            <span className="font-bold text-honey">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
          </span>
          <button
            onClick={scrollToPricing}
            className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Get Your Plan
          </button>
        </nav>
      </header>

      {/* PROJECTION HERO */}
      {(() => {
        const currentWeight = (quizAnswers.weight as number) || 180;
        const goalWeight = (quizAnswers.goalWeight as number) || 150;
        const unit: "lbs" | "kg" = (quizAnswers.weightUnit as string) === "kg" ? "kg" : "lbs";
        const toUnit = (lbs: number) => (unit === "kg" ? Math.round(lbs / 2.205) : Math.round(lbs));
        const now = new Date();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        // Use the same +85 day projection as the in-quiz break for consistency
        const target = new Date(now.getTime() + 85 * 24 * 60 * 60 * 1000);
        const m1Date = new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000);
        const m2Date = new Date(now.getTime() + 56 * 24 * 60 * 60 * 1000);
        const targetMonth = monthsLong[target.getMonth()];
        const targetDay = target.getDate();
        const ordinal = (n: number) => {
          const s = ["th", "st", "nd", "rd"];
          const v = n % 100;
          return n + (s[(v - 20) % 10] || s[v] || s[0]);
        };
        const m1 = months[m1Date.getMonth()];
        const m2 = months[m2Date.getMonth()];
        const m3 = months[target.getMonth()];
        // Cap total loss over 3 months at 50 lbs, then space evenly across months
        const totalLoss = Math.min(Math.max(0, currentWeight - goalWeight), 50);
        const monthlyLoss = totalLoss / 3;
        const w1 = Math.round(currentWeight - monthlyLoss);
        const w2 = Math.round(currentWeight - monthlyLoss * 2);
        const w3 = Math.round(currentWeight - totalLoss);

        const points = [
          { x: 50, y: 40, w: currentWeight, label: "Now" },
          { x: 175, y: 90, w: w1, label: m1 },
          { x: 300, y: 130, w: w2, label: m2 },
          { x: 425, y: 175, w: w3, label: m3 },
        ];
        // Wobbly path matching the in-quiz projection break — smooth bezier between every pair of points
        const pathD = points.map((p, i) => {
          if (i === 0) return `M ${p.x} ${p.y}`;
          const prev = points[i - 1];
          const cx = (prev.x + p.x) / 2;
          return `C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
        }).join(" ");

        return (
          <section className="px-5 pt-8 pb-2" aria-label="Weight projection">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight">
                Your Personalized Mediterranean Plan is Ready!
              </h1>
              <p className="text-sm md:text-base font-body text-muted-foreground mt-2 max-w-md mx-auto">
                We estimate you will reach <span className="font-bold text-foreground">{toUnit(w3)}{unit}</span> by {targetMonth} {ordinal(targetDay)}
              </p>

              <div className="mt-5 bg-card rounded-2xl border border-border shadow-card p-4 md:p-6">
                <svg viewBox="0 0 500 220" className="w-full">
                  <defs>
                    <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(15 85% 55%)" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="hsl(150 60% 50%)" stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient id="projLine" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="hsl(15 85% 55%)" />
                      <stop offset="50%" stopColor="hsl(38 90% 55%)" />
                      <stop offset="100%" stopColor="hsl(150 60% 45%)" />
                    </linearGradient>
                  </defs>
                  <path d={`${pathD} L 425 195 L 50 195 Z`} fill="url(#projGrad)" />
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke="url(#projLine)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                  />
                  {points.map((p, i) => {
                    const colors = ["hsl(15 85% 55%)", "hsl(28 90% 55%)", "hsl(45 90% 55%)", "hsl(150 60% 45%)"];
                    const isLast = i === points.length - 1;
                    return (
                      <g key={i}>
                        <motion.circle
                          cx={p.x} cy={p.y} r="7"
                          fill={colors[i]} stroke="hsl(var(--card))" strokeWidth="2"
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.2, duration: 0.3 }}
                        />
                        {!isLast && (
                          <text x={p.x} y={p.y - 14} textAnchor="middle" className="text-[12px] font-display font-bold" fill="hsl(var(--foreground))">
                            {toUnit(p.w)}{unit}
                          </text>
                        )}
                        <text x={p.x} y={213} textAnchor="middle" className="text-[11px] font-body" fill="hsl(var(--muted-foreground))">
                          {p.label}
                        </text>
                      </g>
                    );
                  })}
                  {/* Estimated target callout */}
                  <g>
                    <rect x={350} y={140} width={120} height={36} rx={8} fill="hsl(150 60% 95%)" stroke="hsl(150 60% 75%)" strokeWidth="1" />
                    <text x={410} y={155} textAnchor="middle" className="text-[10px] font-body" fill="hsl(150 40% 35%)">
                      Estimated target
                    </text>
                    <text x={410} y={170} textAnchor="middle" className="text-[14px] font-display font-bold" fill="hsl(150 60% 30%)">
                      {toUnit(goalWeight)}{unit}
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </section>
        );
      })()}

      <section id="results-pricing" aria-label="Pricing plans">
        <h1 className="sr-only">Your Personalized Mediterranean Diet Plan</h1>
        <PricingSection
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          handleClaim={handleClaim}
          minutes={minutes}
          seconds={seconds}
        />
      </section>


      {/* AS FEATURED IN */}
      <AsFeaturedIn />

      {/* BEST DIET */}
      <section className="px-6 pb-4" aria-label="Best diet award">
        <div className="mx-auto max-w-3xl rounded-2xl border border-emerald-200 bg-emerald-50 p-5 md:p-6 flex items-center gap-4">
          <img src={bestDietBadge} alt="Best diets badge" className="w-16 h-auto flex-shrink-0" width={64} height={66} loading="lazy" decoding="async" />
          <div>
            <h2 className="text-base md:text-lg font-display font-bold text-foreground leading-snug">
              Our Mediterranean Diet has been voted the World's Best Diet 8 years in a row
            </h2>
            <p className="text-xs text-muted-foreground font-body mt-1">Based on rankings by leading global health publications</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />


      {/* FACEBOOK COMMENTS */}
      <FacebookComments />

      {/* CTA before FAQ */}
      <div className="px-6 py-6">
        <div className="mx-auto max-w-3xl">
          <motion.button
            onClick={handleClaim}
            className="group w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-gradient-hero text-primary-foreground font-body font-bold text-xl shadow-medium hover:shadow-glow transition-all"
            whileHover={{ opacity: 0.9 }}
            whileTap={{ scale: 0.98 }}
          >
            Select Plan
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <PaymentLogos />
        </div>
      </div>

      {/* FAQ */}
      <FAQSection />

      <footer className="bg-footer mt-8">
        <div className="mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <span className="text-sm font-body font-medium text-white/70">Dietitian-Backed Plans</span>
            <span className="text-sm font-body font-medium text-white/70">100% Real Food</span>
            <span className="text-sm font-body font-medium text-white/70">Results in 6 Weeks</span>
          </div>
        </div>
        <div className="border-t border-white/10 px-6 py-3 mb-16 md:mb-0">
          <p className="text-center text-xs text-white/40 font-body mb-2">
            © 2026 <a href="https://mediterraneanplan.com" className="underline hover:text-white/60 transition-colors">mediterraneanplan.com</a>. All rights reserved. Results may vary.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-white/40 font-body">
            <a href="https://mediterraneanplan.com/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="https://mediterraneanplan.com/terms" className="hover:text-white/60 transition-colors">Terms</a>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t border-border px-4 py-3 shadow-medium">
        <motion.button
          onClick={handleClaim}
          className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-hero text-primary-foreground font-body font-bold text-lg shadow-medium"
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-display text-primary-foreground/90 border-r border-primary-foreground/30 pr-3">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          Select Plan
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PersonalizedPlan;
