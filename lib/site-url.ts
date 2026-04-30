/** Canonical site origin for metadata, JSON-LD, and env fallback. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://eatsmart.mns70.com";
