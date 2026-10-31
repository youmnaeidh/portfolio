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
  alternates: { canonical: "https://youmnaeidh.github.io/portfolio/" },
  description: "Yomna Alhejaili builds data analytics, BI, and applied AI case studies grounded in operations and full-stack engineering.",
  openGraph: {
    title: "Yomna Alhejaili | Data, BI & Applied AI Portfolio",
    description: "Selected work in data analytics, business intelligence, applied AI, and operations.",
    type: "website",
    images: [{ url: "https://youmnaeidh.github.io/portfolio/og.png", width: 1736, height: 906, alt: "Yomna Alhejaili — Data, BI, Applied AI and Operations" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yomna Alhejaili | Data, BI & Applied AI Portfolio",
    description: "Selected work in data analytics, business intelligence, applied AI, and operations.",
    images: ["https://youmnaeidh.github.io/portfolio/og.png"],
  },
  icons: {
    icon: [{ url: "/portfolio/favicon.svg", type: "image/svg+xml" }],
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

