import type { Metadata } from "next";
import { EB_Garamond, Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-luxe",
  style: ["italic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zoren.agency"),
  title: "ZOREN | Agence de Branding Premium",
  description:
    "Nous créons des marques qui inspirent confiance, attirent plus de clients et accélèrent votre croissance.",
  openGraph: {
    title: "ZOREN | Agence de Branding Premium",
    description:
      "Construisons une marque qui vous positionne comme la référence de votre secteur.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${interTight.variable} ${inter.variable} ${ebGaramond.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
