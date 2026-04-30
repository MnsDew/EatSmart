/**
 * EatSmart — DASH “full day” + calorie-deficit sample day content.
 *
 * **Swap all meal photos here** (`mealPhotoUrls`). Copy a Pexels “Download” link or keep the
 * `images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=1200` pattern.
 * Allowed hosts must stay in `next.config.mjs` → `images.remotePatterns`.
 *
 * https://www.pexels.com/license/
 */export const mealPhotoUrls = {
  /** Oats / light energy breakfast — DASH breakfast Option 1 & deficit Option 1 */
  oatsBreakfastBowl:
  "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1600",

/** Savory eggs + bread — DASH breakfast Option 2 & deficit breakfast Option 2 */
savoryEggsBreakfastPlate:
  "https://images.pexels.com/photos/4397261/pexels-photo-4397261.jpeg?auto=compress&cs=tinysrgb&w=1600",
/** Chicken + grains + salad — DASH lunch Option 1 & deficit lunch Option 1 */
chickenGrainLunch:
  "https://images.pexels.com/photos/8051852/pexels-photo-8051852.jpeg",

/** Legumes + grains — DASH lunch Option 2 & deficit lunch Option 2 */
plantLentilLunch:
  "https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg?auto=compress&cs=tinysrgb&w=1600",

/** Lentil soup–style dinner — DASH dinner Option 1 */
lentilSoupStyleDinner:
  "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=1600",

/** Vegetable omelet + salad — DASH dinner Option 2 & deficit dinner Option 1 */
veggieOmeletPlate:
  "https://images.pexels.com/photos/35652674/pexels-photo-35652674.jpeg",

/** Soup + bread — deficit dinner Option 2 */
soupWithBreadBowl:
  "https://images.pexels.com/photos/14774457/pexels-photo-14774457.jpeg",

/** Hero image in the calorie-deficit section (left column) */
deficitSectionHero:
  "https://images.pexels.com/photos/35386565/pexels-photo-35386565.jpeg",
} as const;
export type MealPhotoKey = keyof typeof mealPhotoUrls;

export const dashGrocerySections: { title: string; items: string[] }[] = [
  {
    title: "Grains & bread",
    items: [
      "Oats (500 g)",
      "Rice (1 kg)",
      "Buckwheat (500 g)",
      "Whole grain / Arabic bread",
    ],
  },
  {
    title: "Vegetables",
    items: [
      "Tomatoes (2 kg)",
      "Cucumbers (1 kg)",
      "Cabbage (1)",
      "Carrots (0.5 kg)",
      "Eggplant (1 kg)",
      "Zucchini (1 kg)",
      "Onions (1 kg)",
      "Garlic (1 bulb)",
    ],
  },
  {
    title: "Fruits",
    items: [
      "Apples (1.5 kg)",
      "Bananas (1.5 kg)",
      "Seasonal fruits (1 kg)",
      "Seasonal fruits (1 kg)",
      "Dates (300 g)",
    ],
  },
  {
    title: "Protein & legumes",
    items: [
      "Eggs (30 pc)",
      "Chicken (1 kg)",
      "Lentils (700 g)",
      "Chickpeas (500 g)",
      "Beans (500 g)",
    ],
  },
  {
    title: "Dairy & oils",
    items: [
      "Yogurt (2 L)",
      "Milk (1.5 L)",
      "Sunflower oil (500 ml)",
      "Olive oil (250 ml)",
      "Nuts (200 g)",
    ],
  },
];

export type MealSlot = "breakfast" | "lunch" | "dinner";

export type DayMealOption = {
  name: string;
  detail: string;
  /** Optional accent line under the title (e.g. DASH dinner Option 2) */
  tagline?: string;
  image: string;
  imageAlt: string;
};

/** “A full DASH day” — tabs + accordions in `MealGuidesSection`. */
export const dashFullDayMeals: Record<MealSlot, DayMealOption[]> = {
  breakfast: [
    {
      name: "Option 1: Oats bowl",
      detail:
        "Oats cooked with milk, banana slices, small handful of nuts (optional: a few dates). High fiber; keeps you full longer.",
      image: mealPhotoUrls.oatsBreakfastBowl,
      imageAlt: "Healthy oatmeal breakfast bowl with fruit",
    },
    {
      name: "Option 2: Savory breakfast plate",
      detail: "2 boiled eggs, whole grain / Arabic bread, tomato + cucumber, yogurt.",
      image: mealPhotoUrls.savoryEggsBreakfastPlate,
      imageAlt: "Savory breakfast plate with eggs and vegetables",
    },
  ],
  lunch: [
    {
      name: "Option 1: Chicken DASH plate",
      detail:
        "Grilled chicken (100–150 g), rice or buckwheat, tomato + cucumber + cabbage salad, yogurt on the side.",
      image: mealPhotoUrls.chickenGrainLunch,
      imageAlt: "Grilled chicken with grains and salad",
    },
    {
      name: "Option 2: Plant-based power meal",
      detail:
        "Lentils or chickpeas, rice or whole grain bread, onion + tomato salad, small amount of olive oil.",
      image: mealPhotoUrls.plantLentilLunch,
      imageAlt: "Plant-based lentil and vegetable plate",
    },
  ],
  dinner: [
    {
      name: "Option 1: Lentil soup meal",
      detail:
        "Lentil soup (lentils + onion + garlic + cumin + lemon), small piece of bread, cucumber or tomato on the side. Light but filling.",
      image: mealPhotoUrls.lentilSoupStyleDinner,
      imageAlt: "Hearty lentil soup with vegetables",
    },
    {
      name: "Option 2: Veggie omelet plate",
      tagline: "Vegetable omelet with side salad",
      detail:
        "Omelet (eggs + tomato + onion + zucchini), cucumber + tomato salad, yogurt.",
      image: mealPhotoUrls.veggieOmeletPlate,
      imageAlt: "Vegetable omelet with side salad",
    },
  ],
};

export const deficitGrocerySections: { title: string; items: string[] }[] = [
  {
    title: "Grains & starches",
    items: [
      "Oats (500 g)",
      "Rice (1 kg)",
      "Buckwheat (500 g)",
      "Whole grain / Arabic bread",
      "Potatoes (1 kg)",
    ],
  },
  {
    title: "Vegetables",
    items: [
      "Tomatoes (2 kg)",
      "Cucumbers (1 kg)",
      "Cabbage (1)",
      "Carrots (0.5 kg)",
      "Eggplant (1 kg)",
      "Zucchini (1 kg)",
      "Onions (1 kg)",
      "Garlic (1 bulb)",
    ],
  },
  {
    title: "Fruits",
    items: [
      "Apples (1.5 kg)",
      "Bananas (1.5 kg)",
      "Seasonal fruits (1 kg)",
      "Seasonal fruits (1 kg)",
    ],
  },
  {
    title: "Protein & legumes",
    items: [
      "Eggs (30 pc)",
      "Chicken (1 kg)",
      "Lentils (700 g)",
      "Chickpeas (500 g)",
      "Beans (500 g)",
      "Yogurt (2 L)",
    ],
  },
  {
    title: "Oils & nuts",
    items: [
      "Sunflower oil (500 ml)",
      "Olive oil (250 ml)",
      "Nuts (150 g)",
    ],
  },
];

/** Sample day (~1,400 kcal) in `CalorieDeficitSection`. */
export const deficitSampleDayMeals: Record<MealSlot, DayMealOption[]> = {
  breakfast: [
    {
      name: "Option 1: Light energy bowl (~400 kcal)",
      detail: "Oats (small portion), milk or yogurt, banana (½–1).",
      image: mealPhotoUrls.oatsBreakfastBowl,
      imageAlt: "Oatmeal bowl with fruit and yogurt",
    },
    {
      name: "Option 2: Protein breakfast (~400 kcal)",
      detail: "2 boiled eggs, tomato + cucumber, 1 slice whole grain bread.",
      image: mealPhotoUrls.savoryEggsBreakfastPlate,
      imageAlt: "Savory breakfast with eggs, vegetables, and whole grain bread",
    },
  ],
  lunch: [
    {
      name: "Option 1: Chicken control plate (~600 kcal)",
      detail:
        "Chicken (100–120 g), rice or buckwheat (small portion), large salad (tomato, cucumber, cabbage).",
      image: mealPhotoUrls.chickenGrainLunch,
      imageAlt: "Grilled chicken with grains and fresh salad",
    },
    {
      name: "Option 2: Plant-based fat loss meal (~600 kcal)",
      detail:
        "Lentils or chickpeas, small rice or bread portion, onion + tomato salad, yogurt (small portion).",
      image: mealPhotoUrls.plantLentilLunch,
      imageAlt: "Plant-based plate with legumes, grains, and salad",
    },
  ],
  dinner: [
    {
      name: "Option 1: Veggie omelet (~400 kcal)",
      detail: "2 eggs, tomato + onion + zucchini, cucumber salad.",
      image: mealPhotoUrls.veggieOmeletPlate,
      imageAlt: "Vegetable omelet with tomatoes and fresh salad on the side",
    },
    {
      name: "Option 2: Soup-based dinner (~400 kcal)",
      detail: "Lentil soup, small piece of bread, apple or yogurt.",
      image: mealPhotoUrls.soupWithBreadBowl,
      imageAlt: "Warm vegetable soup in a bowl with bread",
    },
  ],
};
