import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1C1917",
};

export const metadata: Metadata = {
  title: {
    default: "Unión El Progreso — Préstamos Personales y Garantía Vehicular en Perú",
    template: "%s | Unión El Progreso",
  },
  description:
    "Tu solución financiera fácil, rápida y segura. Préstamos personales al instante y préstamos con garantía vehicular sin dejar de usar tu auto. Grupo El Progreso Perú S.A.C. (RUC: 20612539066).",
  keywords: [
    "préstamos personales",
    "préstamo vehicular",
    "crédito rápido Perú",
    "garantía de auto",
    "Procustodia",
    "financiera Perú",
    "Unión El Progreso",
    "Grupo El Progreso Perú",
    "crédito al instante",
    "dinero rápido",
    "RUC 20612539066",
  ],
  authors: [{ name: "Grupo El Progreso Perú S.A.C." }],
  metadataBase: new URL("https://unionelprogreso.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Unión El Progreso — Tu Solución Financiera de Confianza",
    description:
      "Préstamos personales al instante y préstamos con garantía vehicular. Tu aliado financiero confiable en Perú.",
    url: "https://unionelprogreso.com",
    siteName: "Unión El Progreso",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unión El Progreso — Préstamos Rápidos y Seguros",
    description:
      "Consigue tu préstamo en minutos. Préstamos personales y con garantía vehicular.",
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
        <div className="relative flex min-h-screen flex-col">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
