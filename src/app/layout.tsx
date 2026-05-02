import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import ClientShell from "./components/ClientShell";
import "./globals.css";

// ─── FONTS ────────────────────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets:  ["latin"],
  weight:   ["400", "700", "900"],
  style:    ["normal", "italic"],   // italic needed for accent words
  variable: "--font-playfair",
  display:  "swap",                 // SRS §4.1 performance — no FOIT
});

const dmSans = DM_Sans({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600"], // added 600 — used in buttons
  variable: "--font-dm-sans",
  display:  "swap",
});

// ─── METADATA — SRS §4.2 SEO ──────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default:  "Saqafat Bakery & Cafe",
    template: "%s | Saqafat Bakery",   // e.g. "Menu | Saqafat Bakery"
  },
  description:
    "Authentic Pakistani flavors, baked with love since 2009. Order online from your nearest Saqafat branch.",
  keywords: ["Saqafat", "Bakery", "Pakistani food", "Sargodha", "Bhalwal", "Cafe"],
  openGraph: {
    title:       "Saqafat Bakery & Cafe",
    description: "Authentic Pakistani flavors, baked with love since 2009.",
    url:         "https://saqafatbakery.com",
    siteName:    "Saqafat",
    type:        "website",
    locale:      "en_PK",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Saqafat Bakery & Cafe",
    description: "Authentic Pakistani flavors, baked with love since 2009.",
  },
  metadataBase: new URL("https://saqafatbakery.com"),
};

// ─── ROOT LAYOUT — Server Component ──────────────────────────────────────────
// Must stay a Server Component (no 'use client') so metadata export works.
// All client logic (animation, funnel, header, footer) lives in ClientShell.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <body
        style={{
          margin:     0,
          padding:    0,
          background: "#FFFBF3",   // cream — consistent with all sections
          color:      "#1E0F06",   // espresso — default text
          minHeight:  "100vh",
        }}
      >
        {/*
          ClientShell handles:
            1. LoadingAnimation  (SRS §3.1)
            2. SelectionFunnel   (SRS §3.2)
            3. Header            (SRS §3.3)
            4. Page content
            5. Footer            (SRS §3.12)
        */}
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}