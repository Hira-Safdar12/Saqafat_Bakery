import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Amatic_SC } from "next/font/google";
import "./globals.css";
import ClientShell from "./components/ClientShell";

// ─── FONTS ────────────────────────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const amatic = Amatic_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-amatic",
});

// ─── METADATA ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Saqafat Bakery & Cafe",
    template: "%s | Saqafat Bakery",
  },
  description:
    "Authentic Pakistani flavors, baked with love since 2009. Order online from your nearest Saqafat branch.",
  keywords: ["Saqafat", "Bakery", "Pakistani food", "Sargodha", "Bhalwal", "Cafe"],
  openGraph: {
    title: "Saqafat Bakery & Cafe",
    description: "Authentic Pakistani flavors, baked with love since 2009.",
    url: "https://saqafatbakery.com",
    siteName: "Saqafat",
    type: "website",
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saqafat Bakery & Cafe",
    description: "Authentic Pakistani flavors, baked with love since 2009.",
  },
  metadataBase: new URL("https://saqafatbakery.com"),
};

// ─── ROOT LAYOUT ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${amatic.variable}`}
    >
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#FFFBF3",
          color: "#1E0F06",
          minHeight: "100vh",
        }}
      >
        {/* All app UI handled here */}
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}