import { forwardRef } from "react";
import { motion } from "framer-motion";
import mdLogo from "@/assets/md-color-logo.webp";
import heroMeal from "@/assets/hero-meal.webp";
import logoNYT from "@/assets/logo-nyt.webp";
import logoWomensHealth from "@/assets/logo-womens-health.webp";
import logoHealthline from "@/assets/logo-healthline.png";

// Inline tiny SVG instead of importing the whole lucide-react module on the
// landing page. Avoids pulling the icon library into the landing chunk.
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

interface LandingSectionProps {
  onStart: (sex: string) => void;
  liveCount: number;
}

const LandingSection = forwardRef<HTMLElement, LandingSectionProps>(({ onStart, liveCount }, ref) => {
  return (
    <>
      <section className="min-h-screen md:h-screen flex flex-col bg-white overflow-visible relative" aria-label="Mediterranean Diet Quiz">
        <header className="pt-4 pb-2">
          <nav className="px-6 md:px-16 lg:px-24 flex items-start justify-between" aria-label="Main navigation">
            <motion.img
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              src={mdLogo}
              alt="The Mediterranean Diet"
              className="h-10 md:h-12 w-auto [filter:brightness(0)_saturate(100%)]"
              width={245}
              height={67}
              decoding="async"
              loading="eager"
            />
          </nav>
        </header>

        <div className="flex-1 relative min-h-0 flex flex-col lg:flex-row overflow-x-hidden">
          {/* Mobile Hero Image */}
          <div className="lg:hidden w-full px-6 pt-6 mb-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <img
                src={heroMeal}
                alt="Mediterranean diet meal"
                className="w-full max-w-[300px] mx-auto h-auto object-contain drop-shadow-xl rounded-full"
                width={600}
                height={600}
                decoding="async"
                loading="eager"
              />
            </motion.div>
          </div>

          {/* Desktop Hero Image */}
          <div className="hidden lg:flex absolute inset-y-0 -right-16 w-[38%] z-0 items-center">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="w-full"
            >
              <img
                src={heroMeal}
                alt="Mediterranean diet meal with salmon, vegetables, and whole grains"
                className="w-full h-auto object-contain drop-shadow-2xl rounded-full pointer-events-none select-none"
                width={760}
                height={760}
                decoding="async"
                loading="eager"
                fetchPriority="high"
              />
            </motion.div>
          </div>

          <div className="flex-1 px-6 sm:px-4 md:px-12 lg:px-24 py-4 sm:pt-16 sm:pb-20 lg:py-0 relative z-10 w-full h-full flex flex-col justify-center">
            <div className="w-full max-w-md sm:max-w-[36rem] lg:max-w-5xl text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-[2.25rem] sm:text-[2.5rem] lg:text-6xl font-display font-bold text-foreground leading-[1.08] mb-5 sm:mb-4">
                  <span className="sm:hidden">Lose weight<br />without giving up<br />the foods you love</span>
                  <span className="hidden sm:inline">Lose weight without giving<br />up the foods you love</span>
                </h1>
                <p className="text-base sm:text-lg text-foreground/60 font-body mb-8 sm:mb-12 lg:mb-8 max-w-lg lg:max-w-none lg:whitespace-nowrap select-none cursor-default">See how fast you can hit your weight loss goals with Mediterranean Plan.</p>
                <p className="text-lg sm:text-2xl font-display font-bold text-foreground mb-4">Select your gender to start</p>
                <div className="grid grid-cols-2 gap-3 max-w-sm sm:max-w-[28.8rem] w-full">
                  <button
                    onClick={() => onStart("Female")}
                    className="py-4 px-6 rounded-full bg-primary text-primary-foreground font-body font-semibold text-base shadow-medium hover:shadow-glow active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
                  >
                    Female
                  </button>
                  <button
                    onClick={() => onStart("Male")}
                    className="py-4 px-6 rounded-full bg-footer text-white font-body font-semibold text-base shadow-medium hover:opacity-90 active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
                  >
                    Male
                  </button>
                </div>

                <div className="mt-6 sm:mt-8 max-w-sm sm:max-w-[28.8rem]">
                  <p className="text-[10px] sm:text-xs font-body text-foreground/50 mb-2 sm:mb-3 uppercase tracking-wider">Our diet featured in</p>
                  <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-6 flex-nowrap">
                    <img src={logoNYT} alt="The New York Times" className="h-3.5 sm:h-5 md:h-6 object-contain opacity-60 sm:opacity-70 shrink" loading="lazy" decoding="async" />
                    <img src={logoWomensHealth} alt="Women's Health" className="h-3 sm:h-4 md:h-5 object-contain opacity-60 sm:opacity-70 shrink" loading="lazy" decoding="async" />
                    <img src={logoHealthline} alt="Healthline" className="h-3 sm:h-4 md:h-5 object-contain opacity-60 sm:opacity-70 shrink" loading="lazy" decoding="async" />
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Trust bar hidden for now */}

        <footer className="bg-[rgb(32,36,44)] border-t border-white/10 px-6 py-4">
          <div className="flex items-center justify-center gap-1.5 mb-3 flex-wrap select-none pointer-events-none" aria-hidden="true">
            {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-3.5 h-3.5 text-honey" />)}
            <span className="text-xs font-display font-semibold text-white/80 ml-1">4.85</span>
            <span className="text-xs text-white/50 font-body">stars</span>
            <span className="text-xs text-white/30 font-body">·</span>
            <span className="text-xs font-display font-semibold text-white/80">25K+</span>
            <span className="text-xs text-white/50 font-body">reviews</span>
            <span className="text-xs text-white/30 font-body">·</span>
            <span className="text-xs font-display font-semibold text-white/80">527K+</span>
            <span className="text-xs text-white/50 font-body">members</span>
          </div>
          <p className="text-center text-xs text-white/40 font-body mb-2">
            © 2026 <a href="https://mediterraneanplan.com" className="underline hover:text-white/60 transition-colors">mediterraneanplan.com</a>. All rights reserved. Results may vary depending on the individual.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-white/40 font-body mb-3">
            <a href="https://mediterraneanplan.com/privacy" className="hover:text-white/60 transition-colors" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            <span>|</span>
            <a href="https://mediterraneanplan.com/terms" className="hover:text-white/60 transition-colors" target="_blank" rel="noopener noreferrer">Product Support</a>
            <span>|</span>
            <a href="https://mediterraneanplan.com/order-support" className="hover:text-white/60 transition-colors" target="_blank" rel="noopener noreferrer">Order Support</a>
          </div>
          <div className="flex items-center justify-center gap-4">
            <a href="https://instagram.com/mediterraneanplan" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/70 transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a href="https://x.com/themedplan/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/70 transition-colors" aria-label="X">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
          </div>
        </footer>
      </section>

      {/* SEO text block hidden for now */}
    </>
  );
});

LandingSection.displayName = "LandingSection";

export default LandingSection;



