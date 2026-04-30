import { mealPhotoUrls } from "@/data/meal-content";

/**
 * EatSmart — site-wide imagery. Meal photos are defined in `data/meal-content.ts` (`mealPhotoUrls`).
 * https://www.pexels.com/license/
 */
export const siteImages = {
  heroBg:
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920",
  heroFeatured:
    "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1200",
  bmiHeart:
    "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1200",

  /** @deprecated Prefer `mealPhotoUrls` in `data/meal-content.ts` — kept for imports expecting these keys */
  dashBreakfast: mealPhotoUrls.oatsBreakfastBowl,
  dashLunch: mealPhotoUrls.chickenGrainLunch,
  dashDinner: mealPhotoUrls.lentilSoupStyleDinner,

  fasting:
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1600",

  deficit: mealPhotoUrls.deficitSectionHero,
  deficitDinnerOmelet: mealPhotoUrls.veggieOmeletPlate,
  deficitDinnerSoup: mealPhotoUrls.soupWithBreadBowl,

  calculator:
    "https://images.pexels.com/photos/4397810/pexels-photo-4397810.jpeg?auto=compress&cs=tinysrgb&w=1000",
  carbCycling:
    "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1600",
  snacks:
    "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=1200",
  team:
    "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200",
} as const;

export type SiteImageKey = keyof typeof siteImages;
