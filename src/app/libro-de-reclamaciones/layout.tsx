import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones Virtual",
  description:
    "Libro de Reclamaciones virtual de CREDILLAQTA (RUC: 20615326926). Registra tus quejas o reclamos conforme a la normativa de INDECOPI.",
  alternates: { canonical: "/libro-de-reclamaciones" },
  openGraph: {
    title: "Libro de Reclamaciones Virtual | CREDILLAQTA",
    description:
      "Registro virtual de quejas y reclamos conforme al Código de Protección y Defensa del Consumidor. RUC: 20615326926.",
    url: "/libro-de-reclamaciones",
    siteName: "CREDILLAQTA",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Libro de Reclamaciones — CREDILLAQTA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Libro de Reclamaciones | CREDILLAQTA",
    description:
      "Canal oficial de atención conforme a disposiciones de INDECOPI. RUC: 20615326926.",
    images: ["/og-image.jpg"],
  },
};

export default function LibroDeReclamacionesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
