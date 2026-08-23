import type { Metadata } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://youmnaeidh.github.io/portfolio/"),
  title: "Yomna Alhejaili | Data & BI Portfolio",
  description: "Portfolio of Yomna Alhejaili — Data and Business Intelligence Analyst.",
  openGraph: {
    title: "Yomna Alhejaili | Data, BI & Applied AI Portfolio",
    description: "Selected work in data analytics, business intelligence, applied AI, and operations.",
    type: "website",
    images: [{ url: "https://youmnaeidh.github.io/portfolio/og.png", width: 1536, height: 904, alt: "Yomna Alhejaili — Data, BI, Applied AI and Operations" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yomna Alhejaili | Data, BI & Applied AI Portfolio",
    description: "Selected work in data analytics, business intelligence, applied AI, and operations.",
    images: ["https://youmnaeidh.github.io/portfolio/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} ${fraunces.variable}`}>
        {children}
      </body>
    </html>
  );
}

