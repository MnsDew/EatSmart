import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteJsonLd } from "@/components/site-json-ld";
import { HERO_VIDEO_MP4_SRC } from "@/lib/hero-video";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://eatsmart.health";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const viewport: Viewport = {
  themeColor: "#f8f9ff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EatSmart | Heart-healthy nutrition — Global Society of Medicine and Health",
    template: "%s | EatSmart",
  },
  description:
    "EatSmart translates the Colorful Heart-Healthy Diet poster into a fast guide: DASH meals, intermittent fasting, calorie deficits, carb cycling, and student-friendly grocery lists.",
  keywords: [
    "EatSmart",
    "DASH diet",
    "heart health",
    "intermittent fasting",
    "calorie deficit",
    "carb cycling",
    "Global Society of Medicine and Health",
    "nutrition education",
  ],
  authors: [{ name: "Mansoor Gabali" }, { name: "Abdallah Mohamed" }],
  creator: "EatSmart",
  publisher: "EatSmart",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/icon.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "EatSmart",
    title: "EatSmart | Heart-healthy nutrition — Global Society of Medicine and Health",
    description:
      "Explore DASH meals, fasting windows, calorie-deficit examples, carb cycling, and mindful snacks—aligned with the EatSmart heart-health poster.",
    images: [
      {
        url: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 630,
        alt: "Fresh heart-healthy vegetables",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EatSmart | Heart-healthy nutrition — Global Society of Medicine and Health",
    description:
      "Student-friendly DASH, fasting, deficit, and carb-cycling guidance rooted in the EatSmart poster.",
    images: [
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  category: "health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#f8f9ff]">
      <head>
        <link
          rel="preconnect"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com"
          crossOrigin="anonymous"
        />
        <link rel="preload" href={HERO_VIDEO_MP4_SRC} as="video" type="video/mp4" />
      </head>
      <body
        className={`${manrope.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#f8f9ff] text-[#0b1c30]`}
      >
        <SiteJsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
