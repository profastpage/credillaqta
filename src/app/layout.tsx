import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionPreloader from "@/components/SessionPreloader";
import BottomNav from "@/components/BottomNav";
import GoldProgressBar from "@/components/GoldProgressBar";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#060503",
};

export const metadata: Metadata = {
  title: {
    default: "MANDI CORP — Préstamos Personales y Garantía Vehicular en Perú",
    template: "%s | MANDI CORP",
  },
  description:
    "Tu solución financiera fácil, rápida y segura. Préstamos personales al instante y préstamos con garantía vehicular sin dejar de usar tu auto. CORPORACIÓN MANDI SAC (RUC: 20615991938).",
  keywords: [
    "préstamos personales",
    "préstamo vehicular",
    "crédito rápido Perú",
    "garantía de auto",
    "Procustodia",
    "financiera Perú",
    "MANDI CORP",
    "CORPORACIÓN MANDI SAC",
    "crédito al instante",
    "dinero rápido",
    "RUC 20615991938",
  ],
  authors: [{ name: "CORPORACIÓN MANDI SAC" }],
  metadataBase: new URL("https://mandi-corp.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MANDI CORP — Tu Solución Financiera de Confianza",
    description:
      "Préstamos personales al instante y préstamos con garantía vehicular. Tu aliado financiero confiable en Perú.",
    url: "https://mandi-corp.vercel.app",
    siteName: "MANDI CORP",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "MANDI CORP — Préstamos Personales y Garantía Vehicular",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MANDI CORP — Préstamos Rápidos y Seguros",
    description:
      "Consigue tu préstamo en minutos. Préstamos personales y con garantía vehicular.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    maxImagePreview: "large",
    maxSnippet: -1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionPreloader>
          <div className="relative flex min-h-screen flex-col">{children}</div>
          {/* Bottom Navigation Mobile — aparece en todas las páginas, solo <1024px */}
          <GoldProgressBar />
          <BottomNav />
        </SessionPreloader>
      </body>
    </html>
  );
}
