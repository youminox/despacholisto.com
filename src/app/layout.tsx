import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  SITE_NAME,
  SITE_URL,
  OG_DEFAULT,
  organizationLd,
  personLd,
} from "@/lib/content";
import DespachoListoChatWidget from "@/components/DespachoListoChatWidget";
import SmoothScroll from "@/components/SmoothScroll";
import { JsonLd } from "@/components/Breadcrumbs";

const outfit = localFont({
  src: "../fonts/Outfit-Variable-latin.woff2",
  variable: "--font-outfit",
  weight: "500 800",
  display: "swap",
});
const inter = localFont({
  src: "../fonts/Inter-Variable-latin.woff2",
  variable: "--font-inter",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "DespachoListo.com: Guía de Impresoras Térmicas 4×6 (Rollo, MUNBYN y KNAON), Etiquetas y Balanzas en Amazon",
    template: "%s",
  },
  description:
    "Guía en español para emprendedores y tiendas online sobre impresoras térmicas de etiquetas 4×6 pulgadas (Rollo, MUNBYN, KNAON): compara volumen de pedidos, conexión celular o PC, etiquetas en rollo o plegadas, costo cada 100 paquetes, portarrollos y balanzas en Amazon EE. UU.",
  applicationName: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    locale: "es_US",
    siteName: SITE_NAME,
    url: `${SITE_URL}/`,
    images: [
      {
        url: OG_DEFAULT(),
        width: 1200,
        height: 675,
        alt: "DespachoListo.com – Guía en Español de Impresoras Térmicas 4×6, Etiquetas y Embalaje en Amazon EE. UU.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased selection:bg-[#F59E0B] selection:text-[#0F172A]">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: `${SITE_URL}/`,
                name: SITE_NAME,
                inLanguage: "es",
                publisher: { "@id": `${SITE_URL}/#org` },
              },
              organizationLd,
              personLd,
            ],
          }}
        />
        {children}
        <DespachoListoChatWidget />
        <SmoothScroll />
      </body>
    </html>
  );
}
