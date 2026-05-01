import { useMemo, useEffect, useCallback, lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingSection from "@/components/quiz/LandingSection";
import { captureAttribution, trackVirtualPageview } from "@/lib/tracking";

// Defer SEO (react-helmet-async) until after first paint. The static <head>
// in index.html already covers the canonical title/description for this route,
// so deferring only delays JSON-LD injection — crawlers still pick it up after
// render.
const SEO = lazy(() => import("@/components/SEO"));

const Index = () => {
  const navigate = useNavigate();
  const [seoReady, setSeoReady] = useState(false);

  useEffect(() => {
    captureAttribution();
    trackVirtualPageview("/");
    const w = window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(() => setSeoReady(true), { timeout: 1500 });
    } else {
      setTimeout(() => setSeoReady(true), 800);
    }
  }, []);

  const handleStart = useCallback((sex: string) => {
    // Store sex answer in sessionStorage alongside other quiz answers
    try {
      const stored = sessionStorage.getItem("quizAnswers");
      const answers = stored ? JSON.parse(stored) : {};
      answers.sex = sex;
      answers.gender = sex;
      sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
    } catch {
      sessionStorage.setItem("quizAnswers", JSON.stringify({ sex }));
    }
    navigate("/weight-goal");
  }, [navigate]);

  const liveCount = useMemo(() => Math.floor(Math.random() * 810) + 200, []);

  return (
    <main>
      {seoReady && (
        <Suspense fallback={null}>
          <SEO
            title="Mediterranean Diet – Personalized Meal Plan Quiz"
            description="Take our 60-second Mediterranean Diet quiz and get a personalized meal plan tailored to your body, goals, and lifestyle. Trusted by 527K+ users."
            path="/"
            jsonLd={[
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Mediterranean Diet",
                "url": "https://mediterraneanplan.com",
                "logo": "https://mediterraneanplan.com/favicon.png",
                "description": "Personalized Mediterranean diet meal plans backed by dietitians. Take our 60-second quiz to get a personalized Mediterranean diet plan.",
                "sameAs": []
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Mediterranean Diet",
                "url": "https://mediterraneanplan.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://mediterraneanplan.com/?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is the Mediterranean Diet plan?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The Mediterranean Diet plan is a personalized meal plan based on the scientifically-proven Mediterranean eating pattern. It's tailored to your body, lifestyle, and weight goals to help you lose weight naturally through whole, nutrient-rich foods."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How does the Mediterranean Diet quiz work?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our 60-second quiz analyzes your age, dietary habits, activity level, and weight goals to create a personalized Mediterranean diet meal plan designed for your specific needs and preferences."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is the Mediterranean Diet backed by science?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. The Mediterranean Diet is one of the most researched diets in the world, consistently ranked #1 by experts. Our plans are dietitian-backed and designed around peer-reviewed nutritional science."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How quickly will I see results?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Most users report increased energy and fewer cravings within the first week. Visible weight loss results typically appear within 4-6 weeks of following the personalized meal plan consistently."
                    }
                  }
                ]
              }
            ]}
          />
        </Suspense>
      )}
      <LandingSection onStart={handleStart} liveCount={liveCount} />
    </main>
  );
};

export default Index;
