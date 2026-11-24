import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";
import ArticleCard from "@/components/ArticleCard";
import ReadingProgress from "@/components/ReadingProgress";
import SplitHeading from "@/components/SplitHeading";
import OpenChatButton from "@/components/OpenChatButton";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import { JsonLd } from "@/components/Breadcrumbs";
import Hero from "@/components/home/Hero";
import ScrollStory from "@/components/home/ScrollStory";
import ThermalPrinterAnatomySvg from "@/components/home/ThermalPrinterAnatomySvg";
import FulfillmentOrbit, {
  type OrbitItem,
} from "@/components/home/FulfillmentOrbit";
import CostPer100Counters, {
  type MetricItem,
} from "@/components/home/CostPer100Counters";
import InkjetVsThermalSlider from "@/components/home/InkjetVsThermalSlider";
import MomentsCarousel, {
  type Moment,
} from "@/components/home/MomentsCarousel";
import PrinterFinderBlock, {
  type PrinterTier,
} from "@/components/home/PrinterFinderBlock";
import { getContextualAmazonProducts } from "@/lib/amazon";
import {
  SITE_URL,
  OG_DEFAULT,
  SHIPPING_DISCLAIMER,
  ambient,
  getAllContent,
  getArticlesIn,
  getByPath,
  getCategories,
  safeHref,
  type Article,
} from "@/lib/content";

export const metadata: Metadata = {
  title:
    "DespachoListo.com: Guía de Impresoras Térmicas 4×6 (Rollo, MUNBYN y KNAON), Etiquetas y Balanzas en Amazon EE. UU.",
  description:
    "Guía en español para emprendedores y tiendas online sobre impresoras térmicas de etiquetas 4×6 pulgadas (Rollo, MUNBYN y KNAON). Compara volumen de pedidos, conexión desde celular o computadora, etiquetas en rollo o plegadas, costo por 100 paquetes, portarrollos y balanzas en Amazon.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    title:
      "DespachoListo.com: Impresoras Térmicas 4×6, Etiquetas, Portarrollos y Balanzas en Amazon EE. UU.",
    description:
      "Compara Rollo, MUNBYN y KNAON por volumen, conexión Wi-Fi/Bluetooth/USB, impresión móvil y costo cada 100 paquetes.",
    images: [
      {
        url: OG_DEFAULT(),
        width: 1200,
        height: 675,
        alt: "DespachoListo.com – Guía de impresoras térmicas 4×6 y embalaje en Amazon EE. UU.",
      },
    ],
  },
};

const FAQ = [
  {
    q: "¿Qué impresora térmica 4×6 elegir: Rollo, MUNBYN o KNAON?",
    a: "Depende del volumen y cómo imprimes: KNAON Y812BT (< US$ 75) es perfecta para empezar con 1 a 35 paquetes diarios por Bluetooth o USB; MUNBYN RealWriter 941 USB y RW130B Bluetooth lideran en calidad-precio de 10 a 120 envíos diarios; y Rollo (X1038 USB o X1040 Wireless Wi-Fi AirPrint) destaca en velocidad continua y facilidad nativa sin apps en iPhone y Mac.",
  },
  {
    q: "¿Cuál es más fácil para imprimir desde el celular: Wi-Fi AirPrint o Bluetooth?",
    a: "Wi-Fi con Apple AirPrint (como Rollo Wireless X1040 o MUNBYN RW401AP) permite tocar 'Imprimir' directo desde Safari, Shopify, Etsy o PDF en iPhone/Mac sin abrir aplicaciones puente. El Bluetooth (MUNBYN RW130B, KNAON Y812BT) es más económico y funciona muy bien en iPhone y Android, aunque envía el PDF a través de una app gratuita (MUNBYN Print o FlashLabel).",
  },
  {
    q: "¿Aceptan etiquetas en rollo o etiquetas plegadas (fan-fold)?",
    a: "Casi todas las impresoras térmicas de escritorio 4×6 (Rollo X1038/X1040, MUNBYN ITPP941/RW130B y KNAON Y812BT) tienen ranura de alimentación trasera: aceptan directamente pilas plegadas fan-fold colocadas detrás sobre la mesa y también admiten rollos de 1\" de núcleo si añades un portarrollos externo dual. Modelos como MUNBYN ITPP129 incorporan compartimento interno para el rollo.",
  },
  {
    q: "¿Cuánto cuesta realmente etiquetar 100 paquetes con impresora térmica 4×6?",
    a: "Al no gastar cartuchos de tinta ni tóner ni cinta adhesiva para pegar papel, tu único consumible es la etiqueta térmica directa 4×6: entre US$ 2.10 y US$ 2.60 cada 100 paquetes comprando packs de 500 unidades, y tan solo US$ 1.30–1.70 cada 100 paquetes en cajas mayoristas de 4,000 etiquetas en Amazon EE. UU. (frente a US$ 10–18 en impresión tradicional de tinta).",
  },
  {
    q: "¿Puedo usar etiquetas genéricas en Rollo, MUNBYN o KNAON?",
    a: "Sí, al 100 %. Ninguna de estas tres marcas bloquea etiquetas mediante chip DRM (a diferencia de la DYMO LabelWriter 5XL). Solo asegúrate de calibrar la etiqueta manteniendo presionado el botón Feed al cambiar de tamaño o marca.",
  },
  {
    q: "¿Cuándo necesito 300 DPI en lugar de 203 DPI?",
    a: "Para guías de envío estándar 4×6 (USPS, UPS, FedEx, DHL, Mercado Envíos), 203 DPI es el estándar comercial que escanean todos los couriers sin problema. El salto a 300 DPI (como MUNBYN ITPP941P) solo aporta ventaja visible al imprimir códigos FNSKU muy pequeños para Amazon FBA, códigos QR densos o tipografía inferior a 7 puntos.",
  },
  {
    q: "¿Qué balanza digital conviene para evitar ajustes de tarifa postal?",
    a: "Elige una balanza digital con pantalla LCD externa con cable o inalámbrica y funciones Tare + Hold, como la Accuteck ShipPro W-8580 (110 lb) o la MUNBYN Shipping Scale. Así puedes leer el peso exacto incluso cuando apoyas cajas anchas que tapan la plataforma.",
  },
];

const CLAIMS = [
  "Rollo X1038 USB & X1040 Wireless",
  "MUNBYN 941 · RW130B · RW401AP",
  "KNAON Bluetooth Económica",
  "Etiquetas 4×6 Pulgadas (101×152 mm)",
  "Rollo vs Plegadas (Fan-Fold)",
  "~$1.80 por cada 100 Paquetes",
  "Portarrollos y Balanzas Postales",
  "Stock en Amazon EE. UU.",
];

const CLAIMS_2 = [
  "AirPrint iPhone y Mac",
  "Bluetooth Android e iOS",
  "Shopify · Amazon FBA · Etsy",
  "Mercado Envíos · USPS · UPS",
  "Cero Tinta y Cero Tóner",
  "Sin Chip DRM Propietario",
  "203 DPI vs 300 DPI",
  "Guía 100 % en Español",
];

const ICONS: Record<string, string> = {
  printer: "🖨️",
  scale: "⚖️",
  wifi: "📶",
  tag: "🏷️",
  weight: "⏲️",
  box: "📦",
  phone: "📱",
  roll: "🧻",
  dollar: "💵",
  shopify: "🛍️",
  barcode: "🔬",
  wrench: "🧰",
  tape: "📏",
  desk: "🏢",
};

export default function Home() {
  const cats = getCategories();
  const all = getAllContent();
  const amzHome = getContextualAmazonProducts(
    "home",
    "resenas-impresoras-termicas-4x6",
    "Top Impresoras Térmicas 4×6, Etiquetas y Balanzas en Amazon EE. UU."
  );

  const orbit: OrbitItem[] = [
    {
      k: "rollo",
      name: "Rollo (X1040 / X1038)",
      img: null,
      icon: "⚡",
      role: "Estabilidad comercial + AirPrint nativo en Amazon EE. UU.",
      d: "Desde la veterana Rollo USB X1038 hasta la Wireless X1040 con Wi-Fi AirPrint sin apps. Velocidad de 150 mm/s para 30 a +400 paquetes diarios sin chip DRM.",
      href: safeHref(
        "/resenas-impresoras-termicas-4x6/rollo-wireless-x1040-impresora-termica-wifi-airprint-resena/"
      ),
    },
    {
      k: "munbyn",
      name: "MUNBYN RealWriter",
      img: null,
      icon: "🖨️",
      role: "Reina en variedad: USB 941, Bluetooth 130B y 300 DPI",
      d: "Cubre cada necesidad de tienda online con cabezal ROHM de larga vida, opciones Bluetooth para celular (RW130B), Wi-Fi AirPrint (RW401AP) y alta resolución 300 DPI.",
      href: safeHref(
        "/resenas-impresoras-termicas-4x6/munbyn-realwriter-941-itpp941-impresora-termica-usb-resena/"
      ),
    },
    {
      k: "knaon",
      name: "KNAON Bluetooth",
      img: null,
      icon: "📱",
      role: "Mejor entrada económica Bluetooth + USB (< US$ 75)",
      d: "La opción más rentable para emprendedores que despachan de 1 a 45 paquetes/día desde iPhone, Android, Mac o PC usando etiquetas estándar 4×6.",
      href: safeHref(
        "/resenas-impresoras-termicas-4x6/knaon-y812bt-bluetooth-impresora-termica-economica-resena/"
      ),
    },
    {
      k: "etiquetas",
      name: "Etiquetas 4×6\"",
      img: null,
      icon: "🏷️",
      role: "Rollo vs Plegadas (Fan-Fold) BPA-Free e impermeables",
      d: "Aprende a elegir entre pilas fan-fold para alimentación trasera limpia o rollos de 1\" de núcleo, reduciendo tu costo a US$ 1.30–2.40 cada 100 paquetes.",
      href: safeHref(
        "/etiquetas-en-rollo-vs-plegadas-fanfold/etiquetas-en-rollo-vs-plegadas-fanfold-que-acepta-cada-impresora/"
      ),
    },
    {
      k: "portarrollos",
      name: "Portarrollos Dual",
      img: null,
      icon: "🏗️",
      role: "Indispensable para impresoras con ranura trasera",
      d: "Un soporte externo 2-en-1 mantiene alineados tanto rollos de 500 etiquetas como pilas plegadas fan-fold detrás de Rollo, MUNBYN o KNAON.",
      href: safeHref(
        "/etiquetas-termicas-y-portarrollos/mejores-portarrollos-externos-para-rollo-munbyn-y-knaon/"
      ),
    },
    {
      k: "balanzas",
      name: "Balanzas Digitales",
      img: null,
      icon: "⚖️",
      role: "Visor LCD externo + Tara y Hold hasta 110 / 440 lb",
      d: "Equipos como Accuteck ShipPro W-8580 y MUNBYN evitan sobrecostos de correo o ajustes postales por onzas mal declaradas en USPS, UPS y DHL.",
      href: safeHref(
        "/balanzas-digitales-para-envios/accuteck-shippro-w8580-balanza-digital-110-lb-resena/"
      ),
    },
    {
      k: "embalaje",
      name: "Sobres y Embalaje",
      img: null,
      icon: "📦",
      role: "Poly Mailers, Bubble Mailers, cinta y papel honeycomb",
      d: "Combina bolsas impermeables ligeras y pistolas dispensadoras de 2\" para bajar el peso volumétrico y armar pedidos en segundos.",
      href: safeHref(
        "/accesorios-y-suministros-de-embalaje/mejores-sobres-poly-mailers-y-embalaje-para-tiendas-online/"
      ),
    },
    {
      k: "cabezal",
      name: "Cero Tinta & Cuidado",
      img: null,
      icon: "🧼",
      role: "Limpieza con IPA 99% y calibración de salto de etiqueta",
      d: "Mantén códigos de barras nítidos sin rayas blancas limpiando el cabezal cada 1,500 etiquetas y calibrando el sensor de hueco con 1 botón.",
      href: safeHref(
        "/calibracion-mantenimiento-y-fallas/como-limpiar-el-cabezal-de-impresora-termica-lineas-blancas/"
      ),
    },
  ];

  const metrics: MetricItem[] = [
    {
      v: 1514,
      dec: 0,
      u: "guías",
      l: "1,000 SEO + 500 Amazon",
      pct: 100,
      note: "Cero canibalización por silo",
    },
    {
      v: 1.85,
      dec: 2,
      u: "USD",
      l: "Costo × 100 Paquetes",
      pct: 95,
      note: "Sin cartuchos ni tóner",
    },
    {
      v: 150,
      dec: 0,
      u: "mm/s",
      l: "Velocidad Térmica Real",
      pct: 90,
      note: "~1 etiqueta 4×6 por segundo",
    },
    {
      v: 300,
      dec: 0,
      u: "DPI",
      l: "Máx. Definición FNSKU",
      pct: 88,
      note: "203 DPI envíos vs 300 DPI fino",
    },
    {
      v: 0,
      dec: 0,
      u: "USD",
      l: "Gasto en Tinta / Tóner",
      pct: 100,
      note: "Reacción química térmica directa",
    },
    {
      v: 100,
      dec: 0,
      u: "%",
      l: "Etiquetas Sin DRM",
      pct: 100,
      note: "Rollo, MUNBYN y KNAON abiertas",
    },
  ];

  const moments: Moment[] = [
    {
      img: ambient("home-imprimir-celular"),
      t: "Imprimir desde celular",
      d: "AirPrint nativo en iPhone sin apps frente a Bluetooth en Android e iOS.",
      href: safeHref(
        "/imprimir-etiquetas-desde-celular-y-pc/como-imprimir-etiquetas-4x6-desde-iphone-y-android/"
      ),
      alt: "Emprendedora enviando una etiqueta 4×6 desde un smartphone hacia impresora térmica inalámbrica",
    },
    {
      img: ambient("home-rollo-fanfold"),
      t: "Rollo vs Fan-Fold",
      d: "Qué formato acepta cada impresora y cuándo necesitas un portarrollos externo.",
      href: safeHref(
        "/etiquetas-en-rollo-vs-plegadas-fanfold/etiquetas-en-rollo-vs-plegadas-fanfold-que-acepta-cada-impresora/"
      ),
      alt: "Pila de etiquetas térmicas plegadas fan-fold y rollo montado en portarrollos externo",
    },
    {
      img: ambient("home-costo-100-paquetes"),
      t: "Costo cada 100 envíos",
      d: "Desglose exacto de US$ 1.80 frente a US$ 13.50 imprimiendo en hojas carta.",
      href: safeHref(
        "/costos-y-rentabilidad-por-100-paquetes/cuanto-cuesta-etiquetar-100-paquetes-termica-4x6-vs-tinta/"
      ),
      alt: "Cálculo comparativo de paquetes listos con etiquetas térmicas autoadhesivas 4×6",
    },
    {
      img: ambient("home-impresora-wifi"),
      t: "Rollo vs MUNBYN vs KNAON",
      d: "Cuál comprar según envíes 10, 40 o +150 paquetes diarios.",
      href: safeHref(
        "/comparativas-impresoras-de-etiquetas/rollo-vs-munbyn-vs-knaon-cual-elegir-segun-volumen-y-conexion/"
      ),
      alt: "Comparativa de tres impresoras térmicas de etiquetas 4×6 sobre escritorio de e-commerce",
    },
    {
      img: ambient("home-shopify-despacho"),
      t: "Shopify, Amazon y Couriers",
      d: "Configura PDF 4×6 exacto en Shopify, Amazon FBA, Mercado Envíos y USPS.",
      href: safeHref(
        "/configuracion-shopify-amazon-y-couriers/configurar-etiquetas-4x6-en-shopify-amazon-y-mercado-envios/"
      ),
      alt: "Laptop configurando formato de etiqueta térmica 4×6 para tienda online",
    },
    {
      img: ambient("home-balanza-envios"),
      t: "Balanzas pantalla externa",
      d: "Cómo pesar cajas grandes con Tare y Hold sin tapar el visor digital.",
      href: safeHref(
        "/balanzas-digitales-para-envios/accuteck-shippro-w8580-balanza-digital-110-lb-resena/"
      ),
      alt: "Balanza postal digital pesando una caja de cartón con pantalla LCD externa",
    },
    {
      img: ambient("home-embalaje-mailers"),
      t: "Estación en 1.20 metros",
      d: "Organiza sobres poly mailers, pistola de cinta e impresora para despachar en minutos.",
      href: safeHref(
        "/organizacion-estacion-de-despacho-y-amazon-usa/como-armar-estacion-de-despacho-en-casa-menos-de-un-metro/"
      ),
      alt: "Estación compacta de despacho con sobres poly mailers, dispensador de cinta y cajas",
    },
  ];

  const POPULAR_PATHS = [
    "/comparativas-impresoras-de-etiquetas/rollo-vs-munbyn-vs-knaon-cual-elegir-segun-volumen-y-conexion/",
    "/resenas-impresoras-termicas-4x6/rollo-wireless-x1040-impresora-termica-wifi-airprint-resena/",
    "/resenas-impresoras-termicas-4x6/munbyn-realwriter-941-itpp941-impresora-termica-usb-resena/",
    "/costos-y-rentabilidad-por-100-paquetes/cuanto-cuesta-etiquetar-100-paquetes-termica-4x6-vs-tinta/",
    "/etiquetas-en-rollo-vs-plegadas-fanfold/etiquetas-en-rollo-vs-plegadas-fanfold-que-acepta-cada-impresora/",
    "/balanzas-digitales-para-envios/accuteck-shippro-w8580-balanza-digital-110-lb-resena/",
  ];
  const popular: Article[] = POPULAR_PATHS.map((p) => getByPath(p)).filter(
    Boolean
  ) as Article[];
  for (const a of all) {
    if (popular.length >= 6) break;
    if (!a.isPillar && !popular.includes(a)) popular.push(a);
  }

  const finderOptions: PrinterTier[] = [
    {
      key: "wifi-pro",
      label: "📶 Wi-Fi AirPrint (+30/día)",
      volumeSpec: "30 a +300 paquetes diarios",
      connectionCompat: "Wi-Fi AirPrint nativo (iPhone/Mac) + USB",
      labelCompat: "Fan-Fold trasero y Rollos con portarrollos externo",
      img: ambient("home-impresora-wifi"),
      alt: "Impresora térmica inalámbrica Rollo Wireless 4×6 con conexión Wi-Fi AirPrint",
      idealFor:
        "Imprimes desde iPhone, iPad o MacBook sin apps puente y buscas velocidad continua de 150 mm/s.",
      reviewHref: safeHref(
        "/resenas-impresoras-termicas-4x6/rollo-wireless-x1040-impresora-termica-wifi-airprint-resena/"
      ),
      productKey: "ROLLO_WIRELESS_X1040",
    },
    {
      key: "bt-versatil",
      label: "📱 Bluetooth + USB (10–100/día)",
      volumeSpec: "10 a 120 paquetes diarios",
      connectionCompat: "Bluetooth (App iPhone/Android) + USB (PC/Mac)",
      labelCompat: "Fan-Fold trasero y Rollos externos 4×6",
      img: ambient("home-imprimir-celular"),
      alt: "Impresora térmica MUNBYN Bluetooth imprimiendo desde celular y computadora",
      idealFor:
        "Quieres flexibilidad total para sacar guías desde el celular con app MUNBYN Print o por cable en computadora.",
      reviewHref: safeHref(
        "/resenas-impresoras-termicas-4x6/munbyn-rw130b-bluetooth-impresora-termica-resena/"
      ),
      productKey: "MUNBYN_RW130B_BLUETOOTH",
    },
    {
      key: "economica",
      label: "💵 Económica Inicio (< US$ 75)",
      volumeSpec: "1 a 45 paquetes diarios",
      connectionCompat: "Bluetooth móvil + USB / USB-C en Mac y PC",
      labelCompat: "Pila Fan-Fold trasera y Rollos con soporte",
      img: ambient("home-hero-impresoras"),
      alt: "Impresora térmica económica KNAON Bluetooth 4×6 para emprendedores",
      idealFor:
        "Empiezas tu tienda online y quieres dejar de cortar hojas carta con la mínima inversión inicial.",
      reviewHref: safeHref(
        "/resenas-impresoras-termicas-4x6/knaon-y812bt-bluetooth-impresora-termica-economica-resena/"
      ),
      productKey: "KNAON_Y812BT_BLUETOOTH",
    },
    {
      key: "alta-def",
      label: "🔬 300 DPI / FBA FNSKU",
      volumeSpec: "15 a 150 paquetes + códigos FBA",
      connectionCompat: "USB directo Windows, Mac y Linux",
      labelCompat: "4×6\", FNSKU 2.25×1.25\" y circulares 2\"",
      img: ambient("home-rollo-fanfold"),
      alt: "Impresora térmica MUNBYN 300 DPI con etiquetas FBA y 4×6",
      idealFor:
        "Imprimes etiquetas pequeñas FNSKU para Amazon FBA, códigos QR densos o logos finos de marca.",
      reviewHref: safeHref(
        "/resenas-impresoras-termicas-4x6/munbyn-941p-itpp941p-300-dpi-impresora-termica-resena/"
      ),
      productKey: "MUNBYN_300DPI_ITPP941P",
    },
  ];

  return (
    <>
      <ReadingProgress />
      <Header variant="dark" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}/#webpage`,
              url: `${SITE_URL}/`,
              name: "DespachoListo.com — Guía de Impresoras Térmicas 4×6, Etiquetas y Balanzas en Amazon EE. UU.",
              inLanguage: "es",
              isPartOf: { "@id": `${SITE_URL}/#website` },
              primaryImageOfPage: `${SITE_URL}${ambient("home-hero-impresoras")}`,
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/#faq`,
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />
      <main>
        {/* 1–2. Hero 3D Tilt + Partículas + Buscador sobre 1,514 Guías */}
        <Hero heroImage={ambient("home-hero-impresoras")} />

        {/* 3. Doble Cinta Marquee en Sentidos Opuestos */}
        <div className="relative border-b border-[var(--line)] bg-white py-5">
          <div className="marquee">
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track font-display text-lg font-bold text-fxink/85"
                aria-hidden={k === 1}
              >
                {CLAIMS.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-gradient-to-br from-fxlime to-prune" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="marquee reverse mt-3" aria-hidden>
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track text-sm font-semibold uppercase tracking-[0.14em] text-prune/80"
              >
                {CLAIMS_2.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-fxblue" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Los 4 criterios reales + Mosaico Spotlight (.spot) */}
        <section id="criterios" className="wrap py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Compra Inteligente en Amazon EE. UU.
              </span>
              <SplitHeading
                text="Compara Rollo, MUNBYN y KNAON"
                accent={{
                  text: "según tu operación real",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                Elegir mal una impresora térmica en{" "}
                <strong className="text-fxink">Amazon Estados Unidos</strong>{" "}
                termina en modelos con chip que solo aceptan rollos caros, apps
                móviles lentas o cajas de etiquetas que no caben en la mesa. Aquí
                comparamos <strong className="text-fxink">Rollo, MUNBYN y KNAON</strong>{" "}
                con datos verificados de volumen, conectividad y costo por 100
                envíos.
              </p>
              <div
                className="mt-6 rounded-2xl border border-amber-300/70 bg-amber-50/80 p-5"
                data-reveal
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-800">
                  ⚠️ 3 claves antes de comprar tu impresora 4×6
                </p>
                <ul className="mt-2 space-y-1.5 text-[0.95rem] text-fxink">
                  <li>
                    • <strong>Bandeja interna vs ranura trasera:</strong>{" "}
                    Rollo, MUNBYN 941/130B y KNAON alimentan por atrás: usa pilas{" "}
                    <em>fan-fold</em> directo o añade un portarrollos para rollos.
                  </li>
                  <li>
                    • <strong>Celular iPhone/Android vs PC:</strong> AirPrint
                    Wi-Fi imprime directo; Bluetooth usa app puente; USB es cero
                    latencia en escritorio.
                  </li>
                  <li>
                    • <strong>Cero DRM de etiquetas:</strong> huye de equipos
                    que exigen rollos con chip (como DYMO 5XL); gasta{" "}
                    <strong>~US$ 1.80 por cada 100 envíos</strong>.
                  </li>
                </ul>
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/etiquetas-en-rollo-vs-plegadas-fanfold/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  🏷️ Rollo vs Fan-Fold
                </Link>
                <Link
                  href="/costos-y-rentabilidad-por-100-paquetes/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  💵 Costo por 100 Paquetes
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="relative col-span-2 aspect-[16/8] overflow-hidden rounded-3xl shadow-[0_30px_60px_-35px_rgba(15,23,42,0.6)]"
                data-reveal
              >
                <Image
                  src={ambient("og-default")}
                  alt="Estación de despacho e-commerce con impresoras térmicas 4×6, etiquetas fan-fold, portarrollos y balanza digital"
                  fill
                  sizes="(max-width:1024px) 100vw, 600px"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-fxink">
                  Rollo · MUNBYN · KNAON · Balanzas
                </span>
              </div>
              {[
                [
                  "📦",
                  "Volumen de Pedidos",
                  "Modelos optimizados para 1–15, 20–80 y +100 paquetes al día.",
                ],
                [
                  "📱",
                  "Conexión Celular / PC",
                  "USB directo, Bluetooth con app móvil o Wi-Fi AirPrint nativo.",
                ],
                [
                  "🏷️",
                  "Rollo vs Plegadas",
                  "Compatibilidad exacta de ranura trasera, núcleo 1\" y portarrollos.",
                ],
                [
                  "💵",
                  "Costo × 100 Paquetes",
                  "De US$ 1.30 a US$ 2.60 por cada 100 guías con cero gasto en tinta.",
                ],
              ].map(([e, t, d], i) => (
                <div
                  key={t}
                  className="card spot p-5"
                  data-reveal
                  data-reveal-delay={String(i)}
                >
                  <p className="text-2xl" aria-hidden>
                    {e}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold leading-tight">
                    {t}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ScrollStory Fijada con GSAP ScrollTrigger */}
        <ScrollStory />

        {/* 6. Ingeniería de Impresión Térmica + Diagrama SVG Animado */}
        <section className="relative isolate overflow-hidden bg-[#090e1a] py-24 text-white">
          <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-fxblue/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-prune/35 blur-3xl" />
          <div className="hero-grid opacity-50" />
          <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="eyebrow !text-fxlime" data-reveal>
                Tecnología Direct Thermal sin humo
              </span>
              <SplitHeading
                text="Por qué no usan tinta"
                accent={{
                  text: "y qué etiquetas acepta cada modelo",
                  className: "text-gradient",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-white/75" data-reveal>
                Las impresoras{" "}
                <strong className="text-white">térmicas directas 4×6</strong>{" "}
                aplican calor preciso sobre papel químico termosensible: el
                resultado son{" "}
                <strong className="text-amber-300">
                  códigos de barras impermeables que nunca se corren ni gastan
                  tinta
                </strong>
                . Solo eliges si alimentar atrás con{" "}
                <strong className="text-emerald-300">
                  pilas plegadas fan-fold o con un portarrollos externo
                </strong>
                .
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3" data-reveal>
                {[
                  ["203 DPI", "Guías USPS/UPS/ML"],
                  ["300 DPI", "FBA FNSKU y QR"],
                  ["~$1.80", "100 etiquetas 4×6"],
                ].map(([e, t]) => (
                  <div key={t} className="glass p-4 text-center">
                    <p className="font-display text-lg font-extrabold text-amber-300">
                      {e}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-white/80">
                      {t}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href={safeHref(
                    "/resolucion-dpi-codigos-de-barras-y-formatos/203-dpi-vs-300-dpi-en-impresoras-termicas-cual-necesitas/"
                  )}
                  className="btn btn-glass"
                  data-magnetic
                >
                  203 DPI vs 300 DPI: ¿cuál conviene?
                </Link>
                <Link
                  href={safeHref(
                    "/etiquetas-termicas-y-portarrollos/mejores-portarrollos-externos-para-rollo-munbyn-y-knaon/"
                  )}
                  className="btn btn-glass"
                  data-magnetic
                >
                  Portarrollos externos compatibles
                </Link>
              </div>
            </div>
            <div data-reveal>
              <ThermalPrinterAnatomySvg />
            </div>
          </div>
        </section>

        {/* 7. Órbita Interactiva de 8 Nodos */}
        <section className="wrap py-24">
          <FulfillmentOrbit
            items={orbit}
            center={ambient("home-rollo-fanfold")}
          />
        </section>

        {/* 8. Contadores Animados + Tabla Comparativa Rollo vs MUNBYN vs KNAON */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#090e1a] via-[#0f172a] to-[#0c4a6e] py-24 text-white">
          <div className="hero-aurora opacity-35" />
          <div className="wrap relative grid items-start gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <span className="eyebrow !text-fxlime" data-reveal>
                Cifras reales de despacho
              </span>
              <SplitHeading
                text="Rollo, MUNBYN y KNAON,"
                accent={{
                  text: "comparadas dato a dato",
                  className: "text-gradient",
                }}
                className="section-title mt-3"
              />
              <p className="mt-4 max-w-xl text-white/75" data-reveal>
                Contrastamos velocidad real, impresión desde celular (AirPrint vs
                Bluetooth), alimentación de rollo o fan-fold y costo operativo
                para ayudarte a comprar en Amazon EE. UU. con certeza.
              </p>
              <div className="mt-8">
                <CostPer100Counters data={metrics} />
              </div>
            </div>

            <div
              className="overflow-hidden rounded-3xl bg-white p-5 text-slate-900 shadow-2xl"
              data-reveal
            >
              <p className="text-xs font-extrabold uppercase tracking-wider text-orange-700">
                Comparativa Estrella 4×6 en Amazon EE. UU.
              </p>
              <h3 className="mt-1 font-display text-xl font-extrabold">
                Modelos Top por Volumen, Conexión y Etiquetas
              </h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 font-display font-bold">
                      <th className="p-2.5">Modelo</th>
                      <th className="p-2.5">Conexión</th>
                      <th className="p-2.5">Etiquetas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-2.5 font-bold">Rollo X1040 Wireless</td>
                      <td className="p-2.5">Wi-Fi AirPrint + USB</td>
                      <td className="p-2.5">Fan-Fold / Rollo ext.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Rollo X1038 USB</td>
                      <td className="p-2.5">USB (PC / Mac)</td>
                      <td className="p-2.5">Fan-Fold / Rollo ext.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">MUNBYN RW130B / 941</td>
                      <td className="p-2.5">Bluetooth App + USB</td>
                      <td className="p-2.5">Fan-Fold / Rollo ext.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">MUNBYN ITPP941P 300 DPI</td>
                      <td className="p-2.5">USB (FNSKU fino)</td>
                      <td className="p-2.5">4×6, 2.25×1.25, 2&quot;</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">KNAON Y812BT</td>
                      <td className="p-2.5">Bluetooth + USB-C</td>
                      <td className="p-2.5">Fan-Fold / Rollo ext.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Link
                href={safeHref(
                  "/comparativas-impresoras-de-etiquetas/rollo-vs-munbyn-vs-knaon-cual-elegir-segun-volumen-y-conexion/"
                )}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 py-3 font-display text-xs font-extrabold text-amber-300 hover:bg-slate-800 transition"
              >
                Ver tabla comparativa completa Rollo vs MUNBYN vs KNAON →
              </Link>
            </div>
          </div>
        </section>

        {/* 9. Comparador Deslizante: Inkjet + Tijeras ↔ Térmica 4×6 */}
        <section className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Impacto directo en tu margen por envío
              </span>
              <SplitHeading
                text="Tinta y tijeras vs Térmica 4×6:"
                accent={{
                  text: "cuánto cuesta etiquetar 100 paquetes",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
            </div>
            <p className="text-lg text-[var(--muted)]" data-reveal>
              Arrastra el control interactivo. Imprimir en{" "}
              <strong className="text-fxink">tinta y hoja carta</strong> cuesta
              entre US$ 10 y US$ 18 cada 100 envíos; con{" "}
              <strong className="text-fxink">etiquetas térmicas 4×6</strong>{" "}
              bajas a US$ 1.80 y despachas en 1 segundo por paquete.
            </p>
          </div>
          <div data-reveal>
            <InkjetVsThermalSlider />
          </div>
        </section>

        {/* 10. Carrusel 4:5 de Escenarios Reales de E-Commerce */}
        <section className="overflow-hidden bg-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Flujo de trabajo real en tiendas online
              </span>
              <SplitHeading
                text="Tu operación de envíos"
                accent={{
                  text: "resuelta paso a paso",
                  className: "text-fxbluedeep",
                }}
                className="section-title mt-3"
              />
            </div>
            <MomentsCarousel items={moments} />
          </div>
        </section>

        {/* 11. Recomendador Interactivo + Calculadora Costo/Ahorro */}
        <section id="recomendador" className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Selector Interactivo Amazon EE. UU.
              </span>
              <SplitHeading
                text="Encuentra tu impresora 4×6 ideal"
                accent={{
                  text: "y calcula tu ahorro mensual",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
            </div>
            <p className="text-[var(--muted)]" data-reveal>
              Selecciona tu volumen de pedidos y conexión preferida para ver el
              equipo exacto en Amazon Estados Unidos junto a su compatibilidad
              de etiquetas y costo estimado.
            </p>
          </div>
          <div data-reveal>
            <PrinterFinderBlock options={finderOptions} />
          </div>
        </section>

        {/* 12. Bento Grid Asimétrico de los 14 Silos + Vitrina Amazon + Lo Más Consultado */}
        <section className="bg-gradient-to-b from-white to-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                1,514 Guías Sin Canibalización
              </span>
              <SplitHeading
                text="Todo organizado en"
                accent={{
                  text: "14 silos especializados",
                  className: "text-fxbluedeep",
                }}
                className="section-title mt-3"
              />
            </div>

            <div className="grid auto-rows-[minmax(185px,auto)] gap-5 md:grid-cols-2 lg:grid-cols-4">
              {cats.map((c, i) => {
                const count = getArticlesIn(c.slug).length;
                const big = i === 0;
                const wide = i === 2 || i === 4 || i === 8;
                return (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}/`}
                    className={`card spot group flex flex-col p-6 ${
                      big
                        ? "spot-dark border-transparent bg-gradient-to-br from-[#090e1a] via-[#0f172a] to-[#0369a1] text-white md:col-span-2 lg:row-span-2"
                        : ""
                    } ${wide ? "lg:col-span-2" : ""}`}
                    data-reveal
                    data-reveal-delay={String(i % 4)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${
                          big ? "bg-white/15" : "bg-fxsky"
                        }`}
                        aria-hidden
                      >
                        {ICONS[c.icon] || "📦"}
                      </span>
                      {count > 0 && (
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            big ? "text-fxlime" : "text-fxbluedeep"
                          }`}
                        >
                          {count} guías
                        </span>
                      )}
                    </div>
                    <h3
                      className={`mt-4 font-display font-extrabold ${
                        big ? "text-3xl sm:text-4xl" : "text-xl"
                      }`}
                    >
                      {c.name}
                    </h3>
                    <p
                      className={`mt-2 text-sm ${
                        big ? "text-white/80" : "text-[var(--muted)]"
                      }`}
                    >
                      {c.description}
                    </p>
                    {big && (
                      <ul className="mt-6 space-y-2 text-sm text-white/85">
                        {getArticlesIn(c.slug)
                          .slice(0, 5)
                          .map((a) => (
                            <li key={a.path} className="truncate">
                              → {a.title}
                            </li>
                          ))}
                      </ul>
                    )}
                    <span
                      className={`mt-auto pt-4 text-sm font-semibold ${
                        big ? "text-fxlime" : "text-fxbluedeep"
                      }`}
                    >
                      Explorar silo →
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Vitrina Amazon Showcase en la Home */}
            <AmazonAffiliateBox
              variant="showcase"
              sectionTitle={amzHome.sectionTitle}
              sectionSubtitle={amzHome.sectionSubtitle}
              products={amzHome.products}
              source="home-showcase"
            />

            {popular.length > 0 && (
              <div className="mt-16">
                <h3
                  className="font-display text-2xl font-extrabold sm:text-3xl"
                  data-reveal
                >
                  Las 6 guías de impresoras 4×6, costos y balanzas más consultadas
                </h3>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {popular.slice(0, 6).map((a) => (
                    <div key={a.path} data-reveal>
                      <ArticleCard a={a} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 13. Transparencia Técnica vs Mitos Comerciales */}
        <section className="wrap py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Metodología Editorial Independiente
              </span>
              <SplitHeading
                text="Datos reales de despacho,"
                accent={{
                  text: "sin bloqueos ni letra pequeña",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                Muchas fichas en internet ocultan si una impresora usa{" "}
                <em>Bluetooth con app</em> o <em>AirPrint nativo</em>, si exige
                rollos con chip propietario o si requiere portarrollos externo.
                En <strong className="text-fxink">DespachoListo.com</strong>{" "}
                verificamos cada especificación práctica. En este portal{" "}
                {SHIPPING_DISCLAIMER}.
              </p>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/politica-editorial/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Nuestra política editorial
                </Link>
                <Link
                  href="/divulgacion-de-afiliados/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Divulgación de afiliados Amazon
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card spot p-6" data-reveal>
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900">
                  ✓ Lo que verificamos en cada modelo
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Volumen real diario sin recalentamiento del cabezal</li>
                  <li>• Impresión móvil real (AirPrint nativo vs app Bluetooth)</li>
                  <li>• Aceptación de rollo interno vs ranura fan-fold trasera</li>
                  <li>• Costo matemático real por cada 100 paquetes enviados</li>
                </ul>
              </div>
              <div className="card spot p-6" data-reveal data-reveal-delay="1">
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                  ⚠️ Errores costosos que te ahorramos
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Comprar impresoras con chip DRM (rollos 3× más caros)</li>
                  <li>• Pegar cinta transparente encima de la etiqueta térmica</li>
                  <li>• Imprimir guías PDF carta 8.5×11 sin recortar a 4×6</li>
                  <li>• Pesar cajas grandes en balanzas sin pantalla externa</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 14. Preguntas Frecuentes (FAQ JSON-LD) */}
        <section className="wrap pb-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Preguntas frecuentes
              </span>
              <SplitHeading
                text="Respuestas claras antes de comprar"
                className="section-title mt-3"
              />
              <p className="mt-4 text-[var(--muted)]" data-reveal>
                ¿Tienes dudas sobre Rollo, MUNBYN o KNAON según tu teléfono,
                computadora o plataforma (Shopify, Amazon, Mercado Envíos)?
                Nuestro Asesor IA te responde al instante.
              </p>
              <div className="mt-6 flex flex-wrap gap-3" data-reveal>
                <OpenChatButton
                  label="Preguntar al Asesor IA"
                  className="btn btn-buy shine"
                />
                <Link
                  href="/etiquetas-termicas-y-portarrollos/"
                  className="btn btn-ghost"
                >
                  Etiquetas y portarrollos
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="card card-static group p-5 open:shadow-lg"
                  data-reveal
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fxsky text-fxbluedeep transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[var(--muted)]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 15. CTA Final Aurora */}
        <section className="wrap pb-6">
          <div className="relative isolate overflow-hidden rounded-[36px] bg-gradient-to-br from-[#090e1a] via-[#0f172a] to-[#0284c7] px-6 py-14 text-white sm:px-14 sm:py-20">
            <div className="hero-grid opacity-60" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-fxlime/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
              <div className="text-center lg:text-left">
                <SplitHeading
                  text="Despacha 100 paquetes en minutos,"
                  accent={{
                    text: "al menor costo en Amazon EE. UU.",
                    className: "text-fxlime",
                  }}
                  className="text-3xl font-extrabold sm:text-5xl"
                />
                <p className="mt-4 text-lg text-white/85">
                  Explora nuestras 1,514 guías sobre Rollo, MUNBYN, KNAON,
                  etiquetas 4×6, portarrollos y balanzas digitales o consulta
                  gratis al Asesor IA.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link
                    href="/impresoras-por-volumen-y-conexion/"
                    className="btn btn-lime shine text-base"
                    data-magnetic
                  >
                    Ver Impresoras 4×6 Recomendadas
                  </Link>
                  <OpenChatButton
                    label="Hablar con el Asesor IA"
                    className="btn btn-glass text-base"
                    magnetic
                  />
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[380px]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border-2 border-white/20 shadow-2xl float-y">
                  <Image
                    src={ambient("home-embalaje-mailers")}
                    alt="Estación de despacho lista con impresora térmica 4×6, etiquetas fan-fold, balanza y sobres poly mailers"
                    fill
                    sizes="380px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ClientEffects stickySource="home-sticky" />
    </>
  );
}
