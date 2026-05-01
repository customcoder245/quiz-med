import { QuizQuestion } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  // Q2 — Weight Loss Goal (intent — per PDF)
  {
    id: "weightLossGoal",
    slug: "weight-goal",
    type: "single",
    title: "What is your weight loss goal?",
    options: [
      { label: "Lose 1-20 lbs for good" },
      { label: "Lose 21-40 lbs for good" },
      { label: "Lose over 40 lbs for good" },
      { label: "Maintain weight and get fit" },
      { label: "I haven't decided yet" },
    ],
  },
  // Q2 — Main goal right now
  {
    id: "biggestDifference",
    slug: "difference",
    type: "single",
    title: "What would make the biggest difference to you right now?",
    subtitle: "Choose the one that matters most to you",
    options: [
      { label: "Improve my health", description: "Better overall wellness", icon: "❤️" },
      { label: "Feel more confident", description: "Build self-confidence", icon: "💪" },
      { label: "Look better", description: "Transform your appearance", icon: "✨" },
      { label: "Increase energy", description: "Power through your day", icon: "⚡" },
      { label: "Set a good example for my family", description: "Lead by example", icon: "👨‍👩‍👧" },
      { label: "Feel better day to day", description: "Everyday wellbeing", icon: "🌞" },
    ],
  },
  // BREAK 1 — Trusted Hands (existing)
  {
    id: "break_trustedHands",
    slug: "trusted",
    type: "break",
    breakType: "trustedHands",
    title: "You're in trusted hands",
  },
  // Q3 — Age
  {
    id: "age",
    slug: "age",
    type: "single",
    title: "How old are you?",
    subtitle: "Your metabolism shifts with age — we'll tailor your plan to your stage of life.",
    options: [
      { label: "Under 30" },
      { label: "30–39" },
      { label: "40–49" },
      { label: "50–59" },
      { label: "60–69" },
      { label: "70+" },
    ],
  },
  // Q4 — Height
  {
    id: "height",
    slug: "height",
    type: "height",
    title: "What is your height?",
  },
  // Q5 — Current Weight
  {
    id: "weight",
    slug: "weight",
    type: "weight",
    title: "What is your current weight?",
    sliderConfig: { min: 80, max: 400, step: 1, unit: "lbs", defaultValue: 180 },
  },
  // Q6 — Goal Weight
  {
    id: "goalWeight",
    slug: "target",
    type: "weight",
    title: "What is your goal weight?",
    sliderConfig: { min: 80, max: 400, step: 1, unit: "lbs", defaultValue: 150 },
  },
  // Q7 — Activity Level (moved earlier)
  {
    id: "activity",
    slug: "activity",
    type: "single",
    title: "How active are you right now?",
    options: [
      { label: "Exercise several times per week", icon: "🏋️" },
      { label: "Moderate activity", icon: "🚶" },
      { label: "Light activity (walking etc.)", icon: "🌳" },
      { label: "Mostly sedentary", icon: "🪑" },
    ],
  },
  // BREAK 2 — Personal Profile (NEW, replaces bmi position)
  {
    id: "break_personalProfile",
    slug: "profile",
    type: "break",
    breakType: "personalProfile",
    title: "Your starting point",
  },
  // Q8 — Past Results Pattern (NEW)
  {
    id: "pastResults",
    slug: "past-results",
    type: "single",
    title: "Have you successfully lost weight but failed to keep results?",
    options: [
      { label: "Yes, multiple times", icon: "🔁" },
      { label: "Yes, once or twice", icon: "↩️" },
      { label: "I lose weight, but it never lasts", icon: "📉" },
      { label: "I struggle to lose weight in the first place", icon: "🧗" },
    ],
  },
  // Q9 — Past Diet Attempts
  {
    id: "pastDiets",
    slug: "past-diets",
    type: "multi-select",
    title: "Have you tried any of these other diets in the past 18 months?",
    options: [
      { label: "Keto", icon: "🥓" },
      { label: "Intermittent fasting", icon: "⏰" },
      { label: "Low-carb", icon: "🥗" },
      { label: "Carnivore", icon: "🥩" },
      { label: "Other", icon: "📋" },
      { label: "None", icon: "✅" },
    ],
  },
  // Q10 — Mediterranean Diet familiarity
  {
    id: "medFamiliarity",
    slug: "familiarity",
    type: "single",
    title: "How familiar are you with the Mediterranean Diet?",
    options: [
      { label: "Very familiar — I've tried it", icon: "🫒" },
      { label: "I know a bit about it", icon: "📖" },
      { label: "I've heard of it but don't know much", icon: "🤔" },
      { label: "Not familiar at all", icon: "🆕" },
    ],
  },
  // BREAK 3 — What is the Mediterranean Diet? (existing whatIsGlp1)
  {
    id: "break_whatIsGlp1",
    slug: "glp1",
    type: "break",
    breakType: "whatIsGlp1",
    title: "What is the Mediterranean Diet?",
  },
  // Q11 — Name (NEW text input)
  {
    id: "name",
    slug: "name",
    type: "text-input",
    title: "What is your name?",
    placeholder: "Enter your first name",
  },
  // BREAK 4 — Weight Projection (moved here)
  {
    id: "break_projection",
    slug: "projection-preview",
    type: "break",
    breakType: "projectionInline",
    title: "Your 3-Month Weight Projection",
  },
  // Q12 — Target Zones (NEW body-image-select)
  {
    id: "targetZones",
    slug: "zones",
    type: "body-image-select",
    title: "What are your target zones?",
    options: [
      { label: "Legs" },
      { label: "Belly" },
      { label: "Arms" },
      { label: "Butt" },
      { label: "Face and neck" },
    ],
  },
  // BREAK 5 — 80% of users (NEW personalised)
  {
    id: "break_eightyPercent",
    slug: "eighty",
    type: "break",
    breakType: "eightyPercent",
    title: "80% of users have reduced their weight",
  },
  // Q13 — Dietary Preferences
  {
    id: "currentDiet",
    slug: "diet",
    type: "single",
    title: "Any dietary preferences or restrictions?",
    options: [
      { label: "No restrictions", icon: "🍽️" },
      { label: "Vegetarian", icon: "🥕" },
      { label: "Vegan", icon: "🌱" },
      { label: "Gluten-free", icon: "📦" },
      { label: "Dairy-free", icon: "🥛" },
      { label: "Pescatarian", icon: "🐟" },
      { label: "Low-carb preference", icon: "🥩" },
    ],
  },
  // Q14 — Meals per day
  {
    id: "mealsPerDay",
    slug: "meals",
    type: "single",
    title: "How many meals a day do you prefer?",
    options: [
      { label: "2 meals" },
      { label: "3 meals" },
      { label: "4 meals" },
      { label: "5 meals" },
    ],
  },
  // Q15 — Diet balance (NEW)
  {
    id: "dietBalance",
    slug: "balance",
    type: "single",
    title: "How balanced would you say your current diet is?",
    options: [
      { label: "Not very balanced", icon: "⚠️" },
      { label: "Somewhat balanced, but inconsistent", icon: "🔄" },
      { label: "Fairly balanced, with a few weak spots", icon: "🟡" },
      { label: "Quite balanced, but not getting the results I want", icon: "🟢" },
    ],
  },
  // BREAK 6 — Mediterranean stabilises (NEW)
  {
    id: "break_mediterraneanStabilises",
    slug: "stabilises",
    type: "break",
    breakType: "mediterraneanStabilises",
    title: "Mediterranean stabilises hunger & energy",
  },
  // Q16 — Proteins
  {
    id: "proteins",
    slug: "proteins",
    type: "multi-select",
    title: "Which proteins do you enjoy?",
    options: [
      { label: "Chicken", icon: "🍗" },
      { label: "Beef", icon: "🥩" },
      { label: "Lamb", icon: "🍖" },
      { label: "Pork", icon: "🐷" },
      { label: "Wild game (venison, bison etc.)", icon: "🦌" },
      { label: "Fish (salmon, tuna etc.)", icon: "🐟" },
      { label: "Seafood (prawns, shellfish)", icon: "🦐" },
      { label: "Eggs", icon: "🥚" },
      { label: "Greek yogurt", icon: "🥛" },
      { label: "Cheese", icon: "🧀" },
      { label: "Tofu / tempeh", icon: "🫘" },
      { label: "Beans / lentils", icon: "🫘" },
      { label: "Other", icon: "📋" },
      { label: "None of the above", icon: "🚫" },
    ],
  },
  // Q17 — Vegetables
  {
    id: "vegetables",
    slug: "vegetables",
    type: "multi-select",
    title: "Which vegetables do you enjoy?",
    options: [
      { label: "Broccoli", icon: "🥦" },
      { label: "Spinach", icon: "🥬" },
      { label: "Kale", icon: "🥬" },
      { label: "Zucchini", icon: "🥒" },
      { label: "Eggplant", icon: "🍆" },
      { label: "Tomatoes", icon: "🍅" },
      { label: "Capsicum (peppers)", icon: "🌶️" },
      { label: "Cucumber", icon: "🥒" },
      { label: "Carrots", icon: "🥕" },
      { label: "Green beans", icon: "🫛" },
      { label: "Mushrooms", icon: "🍄" },
      { label: "Onions", icon: "🧅" },
      { label: "Other", icon: "📋" },
      { label: "None of the above", icon: "🚫" },
    ],
  },
  // Q18 — Carbs
  {
    id: "carbs",
    slug: "carbs",
    type: "multi-select",
    title: "And what are your preferred carbs?",
    options: [
      { label: "Bread", icon: "🍞" },
      { label: "Pasta", icon: "🍝" },
      { label: "Rice", icon: "🍚" },
      { label: "Potatoes", icon: "🥔" },
      { label: "Sweet potatoes", icon: "🍠" },
      { label: "Quinoa", icon: "🌾" },
      { label: "Couscous", icon: "🥣" },
      { label: "Oats", icon: "🥣" },
      { label: "Fruit", icon: "🍎" },
      { label: "Legumes (chickpeas, lentils)", icon: "🫘" },
      { label: "Other", icon: "📋" },
      { label: "None of the above", icon: "🚫" },
    ],
  },
  // BREAK 7 — Calculating (existing analysingInputs)
  {
    id: "break_analysingInputs",
    slug: "analysing",
    type: "break",
    breakType: "analysingInputs",
    title: "We're analysing your inputs",
  },
  // BREAK 8 — Before/After
  {
    id: "break_beforeAfter",
    slug: "transformation",
    type: "break",
    breakType: "beforeAfter",
    title: "Get visible results in 6 weeks",
  },
  // Q19 — Sweet Tooth
  {
    id: "sweetTooth",
    slug: "sweet-tooth",
    type: "single",
    title: "Do you have a sweet tooth?",
    options: [
      { label: "Yes", icon: "🍰" },
      { label: "Occasionally", icon: "🍫" },
      { label: "No", icon: "🙂" },
    ],
  },
  // Q20 — Eating Out
  {
    id: "eatingOut",
    slug: "eating-out",
    type: "single",
    title: "How often do you eat out?",
    options: [
      { label: "Rarely", icon: "🏠" },
      { label: "1–2 times per week", icon: "🍽️" },
      { label: "3–5 times per week", icon: "🍕" },
      { label: "Frequently", icon: "🍴" },
    ],
  },
  // Q21 — Alcohol
  {
    id: "alcohol",
    slug: "alcohol",
    type: "single",
    title: "Do you drink alcohol?",
    options: [
      { label: "Rarely or never", icon: "🚫" },
      { label: "Weekends", icon: "🍷" },
      { label: "A few times per week", icon: "🥂" },
      { label: "Most days", icon: "🍺" },
    ],
  },
  // Q22 — Water intake (NEW)
  {
    id: "waterIntake",
    slug: "water",
    type: "single",
    title: "How much water do you drink a day?",
    options: [
      { label: "Less than 32 oz", icon: "💧" },
      { label: "32–64 oz", icon: "💦" },
      { label: "64–96 oz", icon: "🚰" },
      { label: "100 oz+", icon: "🌊" },
    ],
  },
  // BREAK 9 — Building plan (NEW)
  {
    id: "break_buildingPlan",
    slug: "building-preview",
    type: "break",
    breakType: "buildingPlan",
    title: "We're building you the perfect plan",
  },
  // Q23 — Energy Levels
  {
    id: "energyLevels",
    slug: "energy",
    type: "single",
    title: "What are your energy levels throughout the day?",
    options: [
      { label: "Low most of the day", icon: "📉" },
      { label: "Drop in the afternoon", icon: "☀️" },
      { label: "Low before meals", icon: "🍽️" },
      { label: "High and steady", icon: "⚡" },
    ],
  },
  // Q24 — Hunger Patterns
  {
    id: "hungerPattern",
    slug: "hunger",
    type: "single",
    title: "How does your hunger feel throughout the day?",
    options: [
      { label: "Regular and predictable", icon: "🕐" },
      { label: "Not hungry early, hungry at night", icon: "🌙" },
      { label: "Grazing/snacking all day", icon: "🍿" },
      { label: "Changes depending on stress or sleep", icon: "😰" },
    ],
  },
  // Q25 — Sleep Quality
  {
    id: "sleepQuality",
    slug: "sleep",
    type: "single",
    title: "How is your sleep, on average?",
    options: [
      { label: "Very poor", icon: "🤮" },
      { label: "Broken or inconsistent", icon: "😣" },
      { label: "Mostly okay", icon: "😐" },
      { label: "Consistent and restful", icon: "😴" },
    ],
  },
  // Q26 — Activity check-in (per PDF, asked again after sleep)
  {
    id: "activityCheckIn",
    slug: "activity-check",
    type: "single",
    title: "How active have you been lately?",
    options: [
      { label: "More active than usual", icon: "🏃" },
      { label: "About the same", icon: "🚶" },
      { label: "Less active than usual", icon: "🛋️" },
      { label: "Barely moving at all", icon: "😔" },
    ],
  },
  // BREAK 10 — Weight Loss Blockers (NEW, was healthSnapshot)
  {
    id: "break_weightLossBlockers",
    slug: "blockers",
    type: "break",
    breakType: "weightLossBlockers",
    title: "Your weight loss blockers",
  },
  // Q27 — Other health conditions (moved later)
  {
    id: "healthConcerns",
    slug: "concerns",
    type: "multi-select",
    title: "Do you have any other relevant health concerns?",
    options: [
      { label: "High cholesterol", icon: "🫀" },
      { label: "Blood sugar", icon: "🩸" },
      { label: "Blood pressure", icon: "💉" },
      { label: "Digestive issues", icon: "🫧" },
      { label: "Inflammation", icon: "🔥" },
      { label: "None", icon: "✅" },
    ],
  },
  // Q28 — GLP-1 Medication (moved later)
  {
    id: "glp1Medication",
    slug: "glp1-medication",
    type: "single",
    title: "Are you currently using any weight loss medications like Ozempic or Wegovy?",
    options: [
      { label: "Yes" },
      { label: "I have a prescription but have not yet started taking it" },
      { label: "No, but I am considering" },
      { label: "No" },
    ],
  },
  // BREAK 11 — Thanks for sharing (NEW)
  {
    id: "break_thanksForSharing",
    slug: "thanks",
    type: "break",
    breakType: "thanksForSharing",
    title: "Thanks for sharing",
  },
  // Q29 — Confidence (NEW agree-disagree)
  {
    id: "agreeConfidence",
    slug: "confidence",
    type: "agree-disagree",
    title: "My weight is affecting my confidence",
  },
  // Q30 — Stuck (NEW agree-disagree)
  {
    id: "agreeStuck",
    slug: "stuck",
    type: "agree-disagree",
    title: "I feel stuck and don't know what works anymore",
  },
  // Q31 — Ready (NEW agree-disagree)
  {
    id: "agreeReady",
    slug: "ready",
    type: "agree-disagree",
    title: "I'm ready to make a real change",
  },
  // Q32 — Likelihood to follow (NEW scale 1-5)
  {
    id: "followLikelihood",
    slug: "follow-likelihood",
    type: "scale-1-5",
    title: "How likely are you to follow a simple, personalized plan designed for you?",
    subtitle: "Tap the number that best describes you",
  },
];

// Helper to get slug-to-index map
export const slugToIndex = new Map(quizQuestions.map((q, i) => [q.slug, i]));

export const analysisQuestions = [
  {
    id: "commitment",
    title: "How likely are you to finish what you start when it comes to health goals?",
    options: [
      "Very likely — I follow through",
      "I start strong but lose momentum",
      "I struggle to stay consistent",
      "I usually stop once life gets busy",
    ],
  },
  {
    id: "blocker",
    title: "What usually gets in the way when things don't stick?",
    options: [
      "Plans are too complicated",
      "I don't see results quickly enough",
      "My routine changes week to week",
      "I lose motivation over time",
    ],
  },
];
