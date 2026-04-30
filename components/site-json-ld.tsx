const defaultOrigin =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://eatsmart.health";

export function SiteJsonLd() {
  const payload = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${defaultOrigin}/#website`,
        name: "EatSmart",
        url: `${defaultOrigin}/`,
        description:
          "EatSmart brings the Colorful Heart-Healthy Diet poster to life—DASH meals, intermittent fasting, calorie deficits, and carb cycling for the Global Society of Medicine and Health.",
        inLanguage: "en",
        publisher: { "@id": `${defaultOrigin}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${defaultOrigin}/#organization`,
        name: "EatSmart",
        url: `${defaultOrigin}/`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
