export const AMAZON_TAG_US = "despacholisto-20";
export const AMAZON_TAG_ES = "despacholisto-21";

export type AmazonStoreRegion = "US" | "ES";

export type AmazonCategoryType =
  | "thermal-printer-wifi"
  | "thermal-printer-bt"
  | "thermal-printer-usb"
  | "labels-holders"
  | "shipping-scale"
  | "packing-supplies";

export interface AmazonProductRecommendation {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  features: string[];
  rating: string;
  reviewsCount: string;
  categoryType: AmazonCategoryType;
  specs?: {
    orderVolume: string;
    connectionDevices: string;
    labelTypeAccepted: string;
    costPer100Packages: string;
  };
  asinUS?: string;
  asinES?: string;
  queryUS: string;
  queryES: string;
  ctaLabel: string;
}

export function buildAmazonUrl(
  product: AmazonProductRecommendation,
  region: AmazonStoreRegion
): string {
  if (region === "ES") {
    if (product.asinES) {
      return `https://www.amazon.es/dp/${product.asinES}?tag=${AMAZON_TAG_ES}`;
    }
    const q = encodeURIComponent(product.queryES);
    return `https://www.amazon.es/s?k=${q}&tag=${AMAZON_TAG_ES}`;
  }

  if (product.asinUS) {
    return `https://www.amazon.com/dp/${product.asinUS}?tag=${AMAZON_TAG_US}`;
  }
  const q = encodeURIComponent(product.queryUS);
  return `https://www.amazon.com/s?k=${q}&tag=${AMAZON_TAG_US}`;
}

export function detectUserAmazonRegion(): AmazonStoreRegion {
  if (typeof window === "undefined") {
    return "US";
  }
  try {
    const saved = window.localStorage.getItem("dl_amazon_region");
    if (saved === "US" || saved === "ES") return saved;
  } catch {
    // ignore
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = (navigator.language || "").toLowerCase();
    if (
      tz === "Europe/Madrid" ||
      tz === "Atlantic/Canary" ||
      tz === "Europe/Ceuta" ||
      tz.startsWith("Europe/") ||
      lang === "es-es"
    ) {
      return "ES";
    }
    return "US";
  } catch {
    return "US";
  }
}

export const CATALOG: Record<string, AmazonProductRecommendation> = {
  // ===== 1. IMPRESORAS TÉRMICAS ROLLO =====
  ROLLO_WIRELESS_X1040: {
    id: "rollo-wireless-x1040",
    badge: "🏆 #1 Mejor Impresora Wi-Fi & AirPrint para Tiendas Online",
    title:
      "Rollo Wireless Shipping Label Printer (X1040) — Impresora Térmica 4×6 Wi-Fi AirPrint + USB",
    subtitle:
      "Imprime directo desde iPhone, iPad, Mac y Android vía AirPrint o Wi-Fi sin instalar apps propietarias ni pagar tinta. Velocidad industrial de 150 mm/s (1 etiqueta por segundo).",
    features: [
      "Impresión nativa Apple AirPrint y Wi-Fi desde celular o computadora, más puerto USB de respaldo",
      "Compatible al 100 % con Shopify, Amazon FBA, Etsy, eBay, ShipStation, USPS, UPS y FedEx",
      "Sin chip DRM: acepta cualquier marca de etiquetas térmicas 4×6 en pila fan-fold o rollo externo",
    ],
    rating: "4.7",
    reviewsCount: "11.400+",
    categoryType: "thermal-printer-wifi",
    specs: {
      orderVolume: "30 a +300 paquetes/día (Uso intensivo)",
      connectionDevices: "Wi-Fi AirPrint nativo + USB · iPhone, Android, Mac, PC",
      labelTypeAccepted: "Plegadas Fan-Fold y Rollo (1\"–3\" con portarrollos externo)",
      costPer100Packages: "US$ 1.50 – US$ 2.40 (sin tinta, solo etiqueta)",
    },
    queryUS: "Rollo Wireless Shipping Label Printer Wi-Fi AirPrint X1040",
    queryES: "Rollo impresora termica etiquetas WiFi 4x6 X1040",
    ctaLabel: "Consultar Precio de Rollo Wireless en Amazon",
  },

  ROLLO_USB_X1038: {
    id: "rollo-usb-x1038",
    badge: "⚡ Impresora USB Grado Comercial Más Vendida en EE. UU.",
    title:
      "Rollo USB Commercial Grade Shipping Label Printer (X1038) — Alta Velocidad 4×6",
    subtitle:
      "Diseñada para estaciones fijas de empaque con PC, Mac o Chromebook: detección automática de tamaño de etiqueta y cabezal térmico pensado para jornadas continuas sin recalentarse.",
    features: [
      "Conexión USB plug-and-play ultra estable para Windows, macOS y ChromeOS (150 mm/s)",
      "Ranura trasera abierta compatible con pilas fan-fold de 500–4,000 etiquetas o rollos externos",
      "Ajuste automático inteligente de ancho desde 1.57\" hasta 4.1\" (4×6\", FBA FNSKU y códigos de barra)",
    ],
    rating: "4.7",
    reviewsCount: "16.800+",
    categoryType: "thermal-printer-usb",
    specs: {
      orderVolume: "25 a +400 paquetes/día en escritorio fijo",
      connectionDevices: "USB 2.0 directo · Mac, Windows, Chromebook",
      labelTypeAccepted: "Fan-Fold trasero y Rollos externos (con soporte)",
      costPer100Packages: "US$ 1.40 – US$ 2.30 (según pack de etiquetas)",
    },
    queryUS: "Rollo USB Commercial Grade Direct Thermal Label Printer X1038",
    queryES: "Rollo impresora etiquetas envio USB 4x6 comercial",
    ctaLabel: "Ver Precio de Rollo USB X1038 en Amazon",
  },

  // ===== 2. IMPRESORAS TÉRMICAS MUNBYN =====
  MUNBYN_ITPP941_USB: {
    id: "munbyn-itpp941-usb",
    badge: "💵 Mejor Calidad-Precio USB en Amazon EE. UU. (RealWriter 941)",
    title:
      "MUNBYN RealWriter 941 (ITPP941) — Impresora Térmica Directa 4×6 USB 203 DPI",
    subtitle:
      "La favorita de emprendedores con computadora Windows o Mac que buscan calidad sólida y cero tinta por menos inversión. Equipa cabezal japonés ROHM duradero y diseño compacto.",
    features: [
      "Calibración automática de etiquetas con 1 pulsación y velocidad de 150 mm/s (72 etiquetas/min)",
      "Ahorro enorme frente a inyección de tinta: imprime guías USPS, UPS, DHL y Mercado Envíos nítidas",
      "Compatible con etiquetas térmicas estándar 4×6 en rollo (soporte externo) y plegadas fan-fold",
    ],
    rating: "4.6",
    reviewsCount: "9.800+",
    categoryType: "thermal-printer-usb",
    specs: {
      orderVolume: "10 a 150 paquetes/día",
      connectionDevices: "USB · Windows, Mac, Chromebook (driver rápido)",
      labelTypeAccepted: "Fan-Fold trasero y Rollos externos 4×6 (1.57\"–4.3\")",
      costPer100Packages: "US$ 1.60 – US$ 2.40 cada 100 envíos",
    },
    queryUS: "MUNBYN RealWriter 941 Thermal Shipping Label Printer ITPP941 USB",
    queryES: "MUNBYN ITPP941 impresora termica etiquetas 4x6 USB",
    ctaLabel: "Consultar Precio de MUNBYN 941 en Amazon",
  },

  MUNBYN_RW130B_BLUETOOTH: {
    id: "munbyn-rw130b-bluetooth",
    badge: "📱 #1 Bluetooth para Imprimir desde Celular + PC (RW130B / RW402B)",
    title:
      "MUNBYN RealWriter 130B / RW402B — Impresora Térmica Bluetooth + USB 4×6",
    subtitle:
      "Ideal si gestionas pedidos desde el celular: imprime por Bluetooth desde iPhone y Android mediante la app MUNBYN Print (sin cables) o por USB directo en Windows y Mac.",
    features: [
      "Doble conectividad Bluetooth 5.0 (iOS/Android) + USB para Mac y Windows en una sola máquina",
      "App MUNBYN Print con recorte automático de etiquetas 8.5×11 a 4×6 y plantillas de diseño",
      "Cabezal térmico de larga vida con protección contra sobrecalentamiento para despachos diarios",
    ],
    rating: "4.6",
    reviewsCount: "5.200+",
    categoryType: "thermal-printer-bt",
    specs: {
      orderVolume: "10 a 120 paquetes/día",
      connectionDevices: "Bluetooth (App iPhone/Android) + USB (PC/Mac)",
      labelTypeAccepted: "Fan-Fold y Rollos externos (soporte incluido/compatible)",
      costPer100Packages: "US$ 1.60 – US$ 2.50 cada 100 envíos",
    },
    queryUS: "MUNBYN Bluetooth Thermal Shipping Label Printer RW130B RW402B 4x6",
    queryES: "MUNBYN RW130B RW402B impresora termica bluetooth 100x150",
    ctaLabel: "Ver Precio de MUNBYN Bluetooth en Amazon",
  },

  MUNBYN_300DPI_ITPP941P: {
    id: "munbyn-300dpi-itpp941p",
    badge: "🔬 Alta Definición 300 DPI (Amazon FBA FNSKU y Logos Finos)",
    title:
      "MUNBYN RealWriter 941P (ITPP941P · 300 DPI) — Nitidez Superior para Etiquetas y Códigos",
    subtitle:
      "Resolución de 300 DPI ideal cuando imprimes etiquetas pequeñas de código de barras FNSKU, códigos QR densos, tablas nutricionales o logotipos detallados junto a tus guías 4×6.",
    features: [
      "300 DPI de alta definición frente a 203 DPI estándar: cero bordes dentados en texto de 6 pt",
      "Escaneo sin rechazos en centros logísticos Amazon FBA, UPS y couriers exigentes",
      "Admite anchos desde 1.57\" hasta 4.3\" tanto en pila fan-fold como en rollo externo",
    ],
    rating: "4.6",
    reviewsCount: "3.100+",
    categoryType: "thermal-printer-usb",
    specs: {
      orderVolume: "15 a 150 paquetes/día + Etiquetado FBA",
      connectionDevices: "USB · Mac, Windows y Linux",
      labelTypeAccepted: "4×6\", 2.25×1.25\" FNSKU, circulares 2\" (Fan-Fold / Rollo)",
      costPer100Packages: "US$ 1.60 – US$ 2.50 (4×6) / US$ 0.45 (FNSKU)",
    },
    queryUS: "MUNBYN 300 DPI Thermal Label Printer ITPP941P 4x6",
    queryES: "MUNBYN 300 DPI ITPP941P impresora termica etiquetas",
    ctaLabel: "Consultar Precio de MUNBYN 300 DPI en Amazon",
  },

  MUNBYN_RW401AP_WIFI: {
    id: "munbyn-rw401ap-wifi",
    badge: "📶 Wi-Fi AirPrint Dual sin Apps Intermedias (MUNBYN RW401AP)",
    title:
      "MUNBYN RealWriter 401AP (RW401AP) — Impresora Térmica Wi-Fi 5 GHz / AirPrint + USB",
    subtitle:
      "Compite directo con Rollo Wireless: imprime desde varios celulares y laptops de tu equipo compartiendo la misma red Wi-Fi mediante AirPrint nativo en iOS/macOS y Windows inalámbrico.",
    features: [
      "Wi-Fi de doble banda (2.4 GHz / 5 GHz) + Apple AirPrint sin cables USB",
      "Permite que 2 o más empacadores envíen etiquetas desde distintas computadoras o teléfonos",
      "Compatible con cualquier etiqueta térmica 4×6 en rollo externo o plegada fan-fold",
    ],
    rating: "4.6",
    reviewsCount: "1.950+",
    categoryType: "thermal-printer-wifi",
    specs: {
      orderVolume: "30 a +250 paquetes/día (Equipo / Bodega)",
      connectionDevices: "Wi-Fi AirPrint + USB · iPhone, iPad, Mac, PC, Android",
      labelTypeAccepted: "Plegadas Fan-Fold y Rollos externos estándar 4×6",
      costPer100Packages: "US$ 1.50 – US$ 2.40 cada 100 paquetes",
    },
    queryUS: "MUNBYN Wi-Fi AirPrint Thermal Label Printer RW401AP 4x6",
    queryES: "MUNBYN WiFi AirPrint impresora termica etiquetas 4x6",
    ctaLabel: "Ver Precio de MUNBYN RW401AP Wi-Fi en Amazon",
  },

  MUNBYN_ITPP129_INTERNAL: {
    id: "munbyn-itpp129-internal",
    badge: "📦 Con Compartimento Interno para Rollo (Todo en Uno Compacto)",
    title:
      "MUNBYN RealWriter 129B / ITPP129 — Impresora Térmica con Bandeja Interna + Bluetooth",
    subtitle:
      "Si tienes un escritorio pequeño y no quieres un portarrollos externo detrás de la impresora, su tapa alberga el rollo de etiquetas dentro del chasis (y también admite fan-fold trasero).",
    features: [
      "Carga interna para rollos 4×6 de 1\" de núcleo + ranura trasera para pilas fan-fold grandes",
      "Conectividad Bluetooth móvil + USB para desktop, ocupando mínimo espacio en mesa",
      "Ideal para departamentos, dormitorios-taller y tiendas boutique",
    ],
    rating: "4.6",
    reviewsCount: "2.400+",
    categoryType: "thermal-printer-bt",
    specs: {
      orderVolume: "5 a 70 paquetes/día (Escritorio reducido)",
      connectionDevices: "Bluetooth (iOS/Android) + USB (Mac/PC)",
      labelTypeAccepted: "Rollo interno (1\" núcleo) y Fan-Fold trasero",
      costPer100Packages: "US$ 1.70 – US$ 2.60 cada 100 paquetes",
    },
    queryUS: "MUNBYN Thermal Label Printer Built-in Roll Holder ITPP129 RW129B",
    queryES: "MUNBYN impresora termica bluetooth compartimento interno rollo",
    ctaLabel: "Ver Precio de MUNBYN Bandeja Interna en Amazon",
  },

  // ===== 3. IMPRESORAS TÉRMICAS KNAON Y ALTERNATIVAS ECONÓMICAS =====
  KNAON_Y812BT_BLUETOOTH: {
    id: "knaon-y812bt-bluetooth",
    badge: "🔥 #1 Más Económica Bluetooth + USB para Empezar (< US$ 75)",
    title:
      "KNAON Bluetooth Thermal Shipping Label Printer (Y812BT / 4×6) — iPhone, Android, Mac y PC",
    subtitle:
      "La puerta de entrada más rentable de Amazon EE. UU. para tiendas nuevas: incluye conectividad Bluetooth para celular y cable USB/adaptador USB-C para laptop, sin bloqueos de etiquetas.",
    features: [
      "Imprime por Bluetooth desde iPhone/Android con la app FlashLabel / KNAON o vía USB en PC/Mac",
      "Cabezal de alta claridad 203 DPI a 150 mm/s compatible con Shopify, Amazon, eBay, Etsy y USPS",
      "Suele incluir soporte/portarrollos o pack inicial de etiquetas en varios bundles de Amazon",
    ],
    rating: "4.6",
    reviewsCount: "4.600+",
    categoryType: "thermal-printer-bt",
    specs: {
      orderVolume: "1 a 45 paquetes/día (Emprendedores iniciando)",
      connectionDevices: "Bluetooth (iOS/Android App) + USB/USB-C (PC/Mac)",
      labelTypeAccepted: "Fan-Fold trasero y Rollos externos 4×6",
      costPer100Packages: "US$ 1.60 – US$ 2.50 cada 100 paquetes",
    },
    queryUS: "KNAON Bluetooth Thermal Shipping Label Printer 4x6 Y812BT",
    queryES: "KNAON impresora termica bluetooth etiquetas 4x6",
    ctaLabel: "Consultar Precio de KNAON Bluetooth en Amazon",
  },

  KNAON_BUNDLE_HOLDER: {
    id: "knaon-bundle-holder",
    badge: "🎁 Combo KNAON Completo (Impresora + Portarrollos + Etiquetas)",
    title:
      "KNAON 4×6 Thermal Label Printer Bundle con Soporte de Etiquetas y Pack Inicial",
    subtitle:
      "Solución lista para desempaquetar y enviar hoy mismo sin comprar accesorios aparte: incluye impresora Bluetooth/USB y soporte dual para rollo o etiquetas plegadas.",
    features: [
      "Incluye portarrollos externo desmontable para usar rollos de 250/500 etiquetas o pilas fan-fold",
      "Adaptador USB-C OTG incluido en paquetes recientes para MacBook modernos",
      "Se amortiza en menos de 450 envíos frente al costo de tinta y cinta de impresora casera",
    ],
    rating: "4.6",
    reviewsCount: "2.100+",
    categoryType: "thermal-printer-bt",
    specs: {
      orderVolume: "5 a 50 paquetes/día",
      connectionDevices: "Bluetooth móvil + USB-A / USB-C en Mac y Windows",
      labelTypeAccepted: "Rollo (con soporte incluido) y Fan-Fold 4×6",
      costPer100Packages: "US$ 1.60 – US$ 2.40 cada 100 paquetes",
    },
    queryUS: "KNAON Bluetooth Thermal Label Printer with Label Holder 4x6",
    queryES: "KNAON impresora termica bluetooth soporte etiquetas 4x6",
    ctaLabel: "Ver Combo KNAON en Amazon",
  },

  JADENS_NELKO_BLUETOOTH: {
    id: "jadens-nelko-bluetooth",
    badge: "⭐ Alternativas Compactas Populares (JADENS JD-268BT / NELKO PL70e-BT)",
    title:
      "JADENS Bluetooth Thermal Printer (JD-268BT) / NELKO PL70e-BT — 4×6 para Móvil y PC",
    subtitle:
      "Opciones ligeras muy populares en Amazon EE. UU. cuando buscas alternativa a KNAON o MUNBYN RW130B en rango económico con soporte Bluetooth iOS/Android.",
    features: [
      "Diseño ultraligero de escritorio con alimentación trasera para etiquetas fan-fold o rollos",
      "Compatibilidad rápida con apps móviles para PDFs de Mercado Libre, Etsy y Shopify",
      "Sin cartuchos ni tóner, compatible con etiquetas térmicas estándar 4×6",
    ],
    rating: "4.6",
    reviewsCount: "8.900+",
    categoryType: "thermal-printer-bt",
    specs: {
      orderVolume: "1 a 40 paquetes/día",
      connectionDevices: "Bluetooth (App iOS/Android) + USB (Windows/Mac)",
      labelTypeAccepted: "Fan-Fold y Rollos externos 4×6",
      costPer100Packages: "US$ 1.60 – US$ 2.50 cada 100 paquetes",
    },
    queryUS: "JADENS Bluetooth Thermal Shipping Label Printer NELKO PL70e-BT 4x6",
    queryES: "JADENS NELKO impresora termica bluetooth 4x6",
    ctaLabel: "Comparar JADENS / NELKO en Amazon",
  },

  BROTHER_ZEBRA_INDUSTRIAL: {
    id: "brother-zebra-industrial",
    badge: "🏭 Gama Corporativa & Bodegas (+300 Envíos/Día: Zebra ZD421 / Brother QL-1110NWB)",
    title:
      "Brother QL-1110NWB (Wi-Fi/AirPrint/Cortador) / Zebra ZD421 — Alto Desempeño Logístico",
    subtitle:
      "Para centros de despacho continuos o equipos que necesitan cortador automático integrado (Brother) o integración ZPL nativa industrial (Zebra).",
    features: [
      "Brother QL-1110NWB incorpora cortador automático y Wi-Fi AirPrint + Bluetooth + Ethernet",
      "Zebra ZD421 ofrece durabilidad industrial de almacén con lenguaje ZPL nativo",
      "Pensadas para operaciones multicanal que superan los 300–1,000 paquetes diarios",
    ],
    rating: "4.7",
    reviewsCount: "4.300+",
    categoryType: "thermal-printer-wifi",
    specs: {
      orderVolume: "150 a +1,000 paquetes/día (Bodega / Operador)",
      connectionDevices: "Wi-Fi + Ethernet + Bluetooth + USB",
      labelTypeAccepted: "Rollos internos Brother DK / Rollos industriales Zebra",
      costPer100Packages: "US$ 1.30 (Zebra estándar) / US$ 4.50+ (Brother DK)",
    },
    queryUS: "Brother QL-1110NWB Zebra ZD421 4x6 Shipping Label Printer",
    queryES: "Brother QL-1110NWB Zebra ZD421 impresora etiquetas 100x150",
    ctaLabel: "Ver Gama Industrial en Amazon",
  },

  // ===== 4. ETIQUETAS TÉRMICAS 4×6 Y PORTARROLLOS =====
  LABELS_FANFOLD_500: {
    id: "labels-fanfold-500",
    badge: "🏷️ #1 Más Vendido: Pack 500 Etiquetas Plegadas Fan-Fold 4×6\"",
    title:
      "Pack 500 Etiquetas Térmicas Directas Plegadas (Fan-Fold) 4×6\" Impermeables BPA-Free",
    subtitle:
      "El formato más cómodo para Rollo, MUNBYN y KNAON: se apilan planas detrás de la impresora sin enrollarse ni necesitar portarrollos. Costo aprox.: US$ 2.10 – US$ 2.60 por 100 paquetes.",
    features: [
      "Perforación limpia entre etiquetas para desprender en medio segundo y pegar al paquete",
      "Recubrimiento resistente a agua, roce y aceite; adhesivo permanente de alto agarre en cartón y poly mailers",
      "100 % libres de BPA/BPS y compatibles con Rollo, MUNBYN, KNAON, JADENS, Zebra y Polono",
    ],
    rating: "4.8",
    reviewsCount: "42.100+",
    categoryType: "labels-holders",
    specs: {
      orderVolume: "Cualquier volumen (500 envíos por caja)",
      connectionDevices: "Compatible con ranura trasera estándar",
      labelTypeAccepted: "Pila Plegada Fan-Fold 4×6\" (101.6 × 152.4 mm)",
      costPer100Packages: "US$ 2.10 – US$ 2.60 cada 100 etiquetas",
    },
    queryUS: "4x6 Thermal Shipping Labels 500 Fanfold Waterproof Perforated Rollo MUNBYN",
    queryES: "etiquetas termicas 100x150 plegadas fanfold 500 unidades",
    ctaLabel: "Ver Pack 500 Fan-Fold 4×6 en Amazon",
  },

  LABELS_BULK_4000_BOX: {
    id: "labels-bulk-4000-box",
    badge: "📉 Máximo Ahorro por Paquete: Caja Mayorista 4,000 Etiquetas 4×6\"",
    title:
      "Caja 4,000 Etiquetas Térmicas 4×6\" Fan-Fold (8 Pilas × 500) — Costo Mínimo por Envío",
    subtitle:
      "Baja tu costo por cada 100 paquetes a apenas ~US$ 1.30–1.70. Ideal para tiendas que despachan más de 30 paquetes diarios y quieren olvidarse de reponer etiquetas por meses.",
    features: [
      "Reduce hasta un 40 % el costo unitario frente a paquetes pequeños de 250 o 500 unidades",
      "Impresión oscura de alto contraste para escáneres láser de USPS, UPS, FedEx y DHL",
      "Caja dispensadora ordenada para colocar directo detrás de Rollo X1038/X1040, MUNBYN o KNAON",
    ],
    rating: "4.8",
    reviewsCount: "14.200+",
    categoryType: "labels-holders",
    specs: {
      orderVolume: "+30 a 500 paquetes/día (4,000 envíos)",
      connectionDevices: "Alimentación continua por ranura trasera",
      labelTypeAccepted: "Fan-Fold 4×6\" estándar sin chip DRM",
      costPer100Packages: "US$ 1.30 – US$ 1.70 cada 100 paquetes",
    },
    queryUS: "4x6 Thermal Shipping Labels 4000 Fanfold Case Bulk Direct Thermal",
    queryES: "etiquetas termicas 100x150 caja 4000 fanfold mayorista",
    ctaLabel: "Ver Caja 4,000 Etiquetas en Amazon",
  },

  LABELS_ROLL_500_2PACK: {
    id: "labels-roll-500-2pack",
    badge: "🧻 Etiquetas en Rollo 4×6\" (Núcleo 1\" · Impermeables y Anti-Rasgado)",
    title:
      "Etiquetas Térmicas en Rollo 4×6\" (Pack 500 o 1,000 · Núcleo 1\") para Portarrollos",
    subtitle:
      "Perfectas si prefieres trabajar con rollos sobre un soporte externo o en impresoras con bandeja interna. Papel térmico grado comercial resistente al agua y rayaduras.",
    features: [
      "Núcleo estándar de 1\" compatible con portarrollos Rollo, MUNBYN, KNAON y bandejas internas",
      "Adhesivo fuerte para bolsas poly mailers, sobres burbuja y cajas recicladas",
      "Sin atascos ni polvo de papel que ensucie prematuramente el rodillo térmico",
    ],
    rating: "4.8",
    reviewsCount: "28.900+",
    categoryType: "labels-holders",
    specs: {
      orderVolume: "10 a 200 paquetes/día",
      connectionDevices: "Requiere soporte externo o bandeja interna",
      labelTypeAccepted: "Rollo 4×6\" · Núcleo 1\" (25 mm)",
      costPer100Packages: "US$ 2.00 – US$ 2.70 cada 100 etiquetas",
    },
    queryUS: "4x6 Thermal Shipping Labels Roll 500 1000 1 inch core Rollo MUNBYN",
    queryES: "rollo etiquetas termicas 100x150 nucleo 25mm 500 unidades",
    ctaLabel: "Ver Rollos 4×6 en Amazon",
  },

  LABEL_HOLDER_DUAL_STAND: {
    id: "label-holder-dual-stand",
    badge: "🏗️ Accesorio Indispensable para Rollo / MUNBYN / KNAON",
    title:
      "Portarrollos Dual Universal 2-en-1 (Label Holder) para Rollos y Etiquetas Fan-Fold",
    subtitle:
      "Evita etiquetas torcidas o jalones en impresoras sin bandeja interna (como Rollo X1038/X1040, MUNBYN 941/RW130B y KNAON). Se arma en 10 segundos y soporta ambos formatos.",
    features: [
      "Alinea la etiqueta exactamente recta hacia la ranura trasera, reduciendo atascos y errores de sensor",
      "Doble uso: barra superior para rollos de hasta 7\" de diámetro y base inferior para pilas fan-fold",
      "Diseño compacto estable que ahorra espacio en la mesa de despacho",
    ],
    rating: "4.8",
    reviewsCount: "19.700+",
    categoryType: "labels-holders",
    specs: {
      orderVolume: "Recomendado en 100 % de impresoras con ranura trasera",
      connectionDevices: "Soporte mecánico universal de escritorio",
      labelTypeAccepted: "Rollos (núcleo 1\"–3\") y Pilas Plegadas Fan-Fold",
      costPer100Packages: "Inversión única (~US$ 12 – US$ 19)",
    },
    queryUS: "Thermal Label Holder for Rolls and Fan-Fold Labels Rollo MUNBYN KNAON",
    queryES: "soporte portarrollos etiquetas termicas rollo fanfold",
    ctaLabel: "Ver Portarrollos Dual en Amazon",
  },

  LABELS_FBA_FNSKU_ROUND: {
    id: "labels-fba-fnsku-round",
    badge: "🔖 Etiquetas FBA FNSKU (2.25×1.25\") y Stickers Circulares 2\" para Marca",
    title:
      "Rollos de Etiquetas Térmicas FNSKU Amazon FBA (2.25×1.25\") y Circulares 2\" de Colores",
    subtitle:
      "Saca provecho total a tu impresora 4×6 imprimiendo también códigos de barras FBA para tus productos, stickers de 'Gracias por tu compra' o códigos de inventario sin gastar tinta.",
    features: [
      "Ancho compatible con el sensor deslizante de Rollo, MUNBYN y KNAON (desde 1.57\")",
      "Etiquetas térmicas circulares y rectangulares para branding rápido en sobres y cajas",
      "Impresión instantánea nítida, especialmente recomendada en modelos de 203/300 DPI",
    ],
    rating: "4.7",
    reviewsCount: "9.400+",
    categoryType: "labels-holders",
    specs: {
      orderVolume: "Tiendas Amazon FBA, cosmética, ropa y branding",
      connectionDevices: "Compatible con Rollo, MUNBYN (941P 300 DPI) y KNAON",
      labelTypeAccepted: "Rollos 2.25×1.25\", 2×1\" o circulares 2\"",
      costPer100Packages: "US$ 0.45 – US$ 1.10 cada 100 stickers",
    },
    queryUS: "MUNBYN 2x1 2.25x1.25 FBA FNSKU Thermal Labels 2 inch Circle Thermal Stickers",
    queryES: "etiquetas termicas FBA FNSKU circulares 50mm impresora",
    ctaLabel: "Ver Etiquetas FBA y Branding en Amazon",
  },

  // ===== 5. BALANZAS DIGITALES PARA ENVÍOS =====
  SCALE_ACCUTECK_110LB: {
    id: "scale-accuteck-110lb",
    badge: "⚖️ #1 Balanza Postal más Vendida en Amazon EE. UU. (110 lb / 50 kg)",
    title:
      "Accuteck ShipPro W-8580 Digital Shipping Postal Scale (110 lb × 0.1 oz) con Pantalla Externa",
    subtitle:
      "La referencia clásica de vendedores en eBay, Shopify y Amazon: su visor LCD con cable extensible permite leer el peso exacto incluso cuando pones una caja ancha encima.",
    features: [
      "Rango amplio desde sobres ligeros de 0.1 oz (2 g) hasta cajas pesadas de 110 lb (50 kg)",
      "Incluye función Tare (tara para restar cajas/bandejas) y Hold (congela la lectura al retirar el bulto)",
      "Funciona con cable USB/adaptador AC (incluido, evita que se apague en medio del despacho) o pilas",
    ],
    rating: "4.7",
    reviewsCount: "31.200+",
    categoryType: "shipping-scale",
    specs: {
      orderVolume: "Sobres de 1 oz hasta cajas de 50 kg",
      connectionDevices: "Visor LCD extensible + USB/AC + Pilas AAA",
      labelTypeAccepted: "Lectura en lb:oz, oz, kg y g para USPS/UPS/DHL",
      costPer100Packages: "Evita multas APV por peso mal declarado (~US$ 25)",
    },
    queryUS: "Accuteck ShipPro 110lbs Digital Shipping Postal Scale W-8580",
    queryES: "Accuteck W-8580 balanza digital paquetes 50kg pantalla externa",
    ctaLabel: "Ver Balanza Accuteck 110 lb en Amazon",
  },

  SCALE_MUNBYN_66LB: {
    id: "scale-munbyn-66lb",
    badge: "🎯 Balanza Compacta de Precisión MUNBYN (66 lb / 110 lb · Hold & Tare)",
    title:
      "MUNBYN Digital Shipping Scale con Pantalla Externa, Hold, Tare y Bandeja Plegable",
    subtitle:
      "Complemento ideal para tu estación MUNBYN/Rollo: incluye soporte lateral plegable para que paquetes tubulares o sobres no rueden fuera de la plataforma.",
    features: [
      "Precisión desde 0.1 oz para sobres First Class / Ground Advantage hasta paquetes de 66–110 lb",
      "Aletas laterales abatibles para sostener tubos o sobres grandes sin alterar la medición",
      "Visor retroiluminado con cable extensible y apagado configurable",
    ],
    rating: "4.7",
    reviewsCount: "6.400+",
    categoryType: "shipping-scale",
    specs: {
      orderVolume: "1 a +200 paquetes/día (Sobres y cajas medianas)",
      connectionDevices: "Visor extensible + Adaptador/Pilas",
      labelTypeAccepted: "Unidades lb/oz, oz, kg, g + Función Tare & Hold",
      costPer100Packages: "Cálculo exacto antes de comprar guía (~US$ 23–29)",
    },
    queryUS: "MUNBYN Digital Shipping Postal Scale 66lb 110lb Hold Tare",
    queryES: "MUNBYN balanza digital paqueteria envios pantalla externa",
    ctaLabel: "Consultar Precio de Balanza MUNBYN en Amazon",
  },

  SCALE_THINKSCALE_440LB: {
    id: "scale-thinkscale-440lb",
    badge: "🏋️ Balanza de Plataforma Heavy Duty (Hasta 440 lb / 200 kg en Acero)",
    title:
      "THINKSCALE / Smart Weigh Plataforma de Acero Inoxidable (86 lb – 440 lb) para Cajas Grandes",
    subtitle:
      "Si despachas cajas pesadas para Amazon FBA, repuestos, electrodomésticos o bultos voluminosos en bodega, su plataforma plana de acero soporta hasta 200 kg con visor en pared.",
    features: [
      "Plataforma amplia de acero inoxidable resistente a golpes y carga continua",
      "Visor LCD inalámbrico o con cable largo montable en pared a la altura de los ojos",
      "Precisión dual para paquetes pequeños y cajas maestras FBA de 50 lb",
    ],
    rating: "4.7",
    reviewsCount: "18.500+",
    categoryType: "shipping-scale",
    specs: {
      orderVolume: "Cajas pesadas, FBA y envíos multibulto hasta 200 kg",
      connectionDevices: "Visor pared/mesa + Cable AC + Batería",
      labelTypeAccepted: "Unidades lb, lb:oz y kg con Tare/Hold",
      costPer100Packages: "Inversión única para almacén (~US$ 35–49)",
    },
    queryUS: "THINKSCALE Smart Weigh Heavy Duty 440lbs Digital Shipping Scale",
    queryES: "balanza plataforma acero inoxidable paquetes 200kg pantalla pared",
    ctaLabel: "Ver Balanza Heavy Duty 440 lb en Amazon",
  },

  // ===== 6. ACCESORIOS Y SUMINISTROS DE EMBALAJE =====
  PACKING_POLY_MAILERS_10X13: {
    id: "packing-poly-mailers-10x13",
    badge: "🛍️ #1 Sobres Impermeables Poly Mailers 10×13\" (Pack 100 / 200)",
    title:
      "Pack 100 Sobres de Envío Impermeables Poly Mailers 10×13\" Autoadhesivos",
    subtitle:
      "El formato estándar para ropa, accesorios y compras online: ligeros para no subir onzas en la balanza, resistentes al desgarro y con tira autoadhesiva rápida donde pega firme la etiqueta 4×6.",
    features: [
      "Tamaño 10×13\" (25 × 33 cm): ideal para camisetas, jeans, cosmética y cajas pequeñas",
      "Opacos con forro interior negro de privacidad, impermeables contra lluvia durante el reparto",
      "Ahorran peso volumétrico y tiempo frente a armar cajas para artículos flexibles",
    ],
    rating: "4.8",
    reviewsCount: "34.700+",
    categoryType: "packing-supplies",
    specs: {
      orderVolume: "Pack de 100 o 200 sobres por lote",
      connectionDevices: "Superficie lisa óptima para etiquetas térmicas 4×6",
      labelTypeAccepted: "Cualquier etiqueta térmica 4×6 adhesiva",
      costPer100Packages: "US$ 8.50 – US$ 11.90 por 100 sobres",
    },
    queryUS: "10x13 Poly Mailers Shipping Envelopes Self Seal 100 Pack",
    queryES: "bolsas envio impermeables autoadhesivas 25x35 pack 100",
    ctaLabel: "Ver Poly Mailers 10×13\" en Amazon",
  },

  PACKING_BUBBLE_MAILERS_MIX: {
    id: "packing-bubble-mailers-mix",
    badge: "🫧 Sobres Acolchados Bubble Mailers (#0 / 6×10\" y 8.5×12\")",
    title:
      "Pack 50 / 100 Sobres Acolchados con Burbuja (Poly / Kraft) para Productos Frágiles",
    subtitle:
      "Protección amortiguada ligera para electrónica, joyería, suplementos, libros y cosmética sin añadir el peso ni el costo de una caja corrugada.",
    features: [
      "Interior de burbuja de aire completo + tira selladora autosellante de alta resistencia",
      "Aceptan perfectamente etiquetas térmicas 4×6 sobre su cara frontal plana",
      "Disponibles en tamaño #0 (6×10\") y #2 (8.5×12\") para cubrir el 80 % de envíos pequeños",
    ],
    rating: "4.8",
    reviewsCount: "21.900+",
    categoryType: "packing-supplies",
    specs: {
      orderVolume: "Packs de 50 a 250 sobres acolchados",
      connectionDevices: "Autosellado sin cinta adicional",
      labelTypeAccepted: "Etiquetas 4×6\" y 4×4\" sobre cara frontal",
      costPer100Packages: "US$ 14.00 – US$ 22.00 cada 100 envíos frágiles",
    },
    queryUS: "Poly Bubble Mailers 6x10 8.5x12 Self Seal Padded Envelopes 100 Pack",
    queryES: "sobres acolchados burbujas autoadhesivos envios pack 100",
    ctaLabel: "Ver Sobres Acolchados en Amazon",
  },

  PACKING_TAPE_GUN_SET: {
    id: "packing-tape-gun-set",
    badge: "📦 Pistola Dispensadora Heavy Duty 2\" + 6 Rollos de Cinta de Embalaje",
    title:
      "Dispensador Metálico Heavy Duty para Cinta de 2\" + Pack de Rollos Transparentes de Alta Adherencia",
    subtitle:
      "Sella cajas corrugadas con una sola mano en 2 segundos sin perder la punta de la cinta ni atascarse. Indispensable en cualquier estación de despacho.",
    features: [
      "Chasis metálico ergonómico con freno de tensión ajustable y cuchilla protegida",
      "Cinta acrílica de 2.7 mil de espesor que no se despega en almacenamiento frío o húmedo",
      "Incluye rollos compatibles de núcleo estándar de 3\" (1.88\" / 48 mm de ancho)",
    ],
    rating: "4.7",
    reviewsCount: "26.300+",
    categoryType: "packing-supplies",
    specs: {
      orderVolume: "10 a +300 cajas/día",
      connectionDevices: "Núcleo estándar 3\" · Cintas de 1.88\" / 2\"",
      labelTypeAccepted: "Nota: NO pegar cinta transparente encima de etiqueta térmica",
      costPer100Packages: "US$ 1.20 – US$ 2.10 en cinta cada 100 cajas",
    },
    queryUS: "Heavy Duty Packing Tape Gun Dispenser 2 inch with 6 Rolls Shipping Tape",
    queryES: "pistola precintadora dispensador cinta embalaje 50mm con rollos",
    ctaLabel: "Ver Dispensador y Cinta en Amazon",
  },

  PACKING_HONEYCOMB_CLEANING: {
    id: "packing-honeycomb-cleaning",
    badge: "🧼 Mantenimiento Cabezal (Lápices IPA 99%) + Papel Honeycomb Amortiguador",
    title:
      "Set de Lápices Limpiadores de Cabezal Térmico (99% IPA) + Dispensador de Papel Honeycomb",
    subtitle:
      "Elimina líneas blancas en tus códigos de barras en 10 segundos con alcohol isopropílico al 99 % y protege envíos delicados con papel kraft alveolar ecológico.",
    features: [
      "Lápices de limpieza seguros para cabezales térmicos Rollo, MUNBYN, KNAON, Brother y Zebra",
      "El papel honeycomb reemplaza al plástico burbuja ocupando 80 % menos espacio en bodega",
      "Prolonga la vida útil del cabezal térmico más allá de 50 kilómetros de impresión",
    ],
    rating: "4.8",
    reviewsCount: "11.500+",
    categoryType: "packing-supplies",
    specs: {
      orderVolume: "Mantenimiento preventivo cada 1,000–2,000 etiquetas",
      connectionDevices: "Universal para todo cabezal térmico directo 4×6",
      labelTypeAccepted: "Elimina residuos de adhesivo y polvo de papel",
      costPer100Packages: "< US$ 0.15 por mantenimiento preventivo",
    },
    queryUS: "Thermal Printhead Cleaning Pen 99 IPA Honeycomb Packing Paper Roll",
    queryES: "lapiz limpiador cabezal termico alcohol isopropilico papel panal embalaje",
    ctaLabel: "Ver Limpiadores y Embalaje en Amazon",
  },
};

export function getContextualAmazonProducts(
  slug: string,
  pillar: string,
  title = ""
): {
  sectionTitle: string;
  sectionSubtitle: string;
  products: [
    AmazonProductRecommendation,
    AmazonProductRecommendation,
    AmazonProductRecommendation,
  ];
  vsCompetitor?: AmazonProductRecommendation;
} {
  const s = `${slug} ${pillar} ${title}`.toLowerCase();

  // 1. Duelos comparativos (VS)
  if (
    pillar === "comparativas-impresoras-de-etiquetas" ||
    s.includes("-vs-")
  ) {
    if (s.includes("rollo") && s.includes("munbyn")) {
      return {
        sectionTitle:
          "Comparativa Directa en Amazon: Rollo vs MUNBYN + Etiquetas 4×6",
        sectionSubtitle:
          "Compara precios actuales según conexión (Wi-Fi AirPrint, Bluetooth o USB), volumen diario y consumibles compatibles sin chip DRM.",
        products: [
          CATALOG.ROLLO_WIRELESS_X1040,
          CATALOG.MUNBYN_RW130B_BLUETOOTH,
          CATALOG.LABELS_FANFOLD_500,
        ],
        vsCompetitor: CATALOG.MUNBYN_RW401AP_WIFI,
      };
    }
    if (s.includes("knaon")) {
      return {
        sectionTitle:
          "Duelo Calidad-Precio en Amazon: KNAON Bluetooth vs MUNBYN",
        sectionSubtitle:
          "Analiza la opción económica de arranque frente a la gama todoterreno junto con etiquetas fan-fold 4×6 compatibles.",
        products: [
          CATALOG.KNAON_Y812BT_BLUETOOTH,
          CATALOG.MUNBYN_RW130B_BLUETOOTH,
          CATALOG.LABELS_FANFOLD_500,
        ],
        vsCompetitor: CATALOG.MUNBYN_RW130B_BLUETOOTH,
      };
    }
    if (s.includes("balanza") || s.includes("accuteck") || s.includes("thinkscale")) {
      return {
        sectionTitle: "Comparativa de Balanzas Digitales para Envíos en Amazon",
        sectionSubtitle:
          "Precisión desde 0.1 oz hasta 440 lb con pantalla externa, función Tare y Hold.",
        products: [
          CATALOG.SCALE_ACCUTECK_110LB,
          CATALOG.SCALE_MUNBYN_66LB,
          CATALOG.LABELS_FANFOLD_500,
        ],
        vsCompetitor: CATALOG.SCALE_THINKSCALE_440LB,
      };
    }
    if (s.includes("rollo") && (s.includes("dymo") || s.includes("brother") || s.includes("zebra"))) {
      return {
        sectionTitle:
          "Impresora Sin Bloqueo de Etiquetas vs Gama Tradicional en Amazon",
        sectionSubtitle:
          "Evita cartuchos propietarios y reduce tu costo cada 100 paquetes a menos de US$ 2.50.",
        products: [
          CATALOG.ROLLO_USB_X1038,
          CATALOG.BROTHER_ZEBRA_INDUSTRIAL,
          CATALOG.LABELS_BULK_4000_BOX,
        ],
        vsCompetitor: CATALOG.ROLLO_WIRELESS_X1040,
      };
    }
    return {
      sectionTitle:
        "Las 3 Impresoras Térmicas 4×6 Más Comparadas en Amazon EE. UU.",
      sectionSubtitle:
        "Rollo, MUNBYN y KNAON ordenadas por volumen diario, conexión Wi-Fi/Bluetooth/USB y costo cada 100 paquetes.",
      products: [
        CATALOG.ROLLO_WIRELESS_X1040,
        CATALOG.MUNBYN_RW130B_BLUETOOTH,
        CATALOG.KNAON_Y812BT_BLUETOOTH,
      ],
      vsCompetitor: CATALOG.MUNBYN_ITPP941_USB,
    };
  }

  // 2. Balanzas digitales y pesaje
  if (
    pillar === "balanzas-digitales-para-envios" ||
    pillar === "pesaje-cubicaje-y-preparacion-de-pedidos" ||
    s.includes("balanza") ||
    s.includes("pesar") ||
    s.includes("peso") ||
    s.includes("accuteck") ||
    s.includes("thinkscale") ||
    s.includes("tara")
  ) {
    const p1 = s.includes("440") || s.includes("heavy") || s.includes("thinkscale")
      ? CATALOG.SCALE_THINKSCALE_440LB
      : s.includes("munbyn")
      ? CATALOG.SCALE_MUNBYN_66LB
      : CATALOG.SCALE_ACCUTECK_110LB;
    return {
      sectionTitle: "Balanzas Digitales de Envíos y Estación Lista en Amazon",
      sectionSubtitle:
        "Pesa con precisión antes de generar tus guías 4×6 para evitar recargos postales y acelerar el despacho.",
      products: [p1, CATALOG.MUNBYN_RW130B_BLUETOOTH, CATALOG.PACKING_POLY_MAILERS_10X13],
    };
  }

  // 3. Etiquetas 4x6, Rollos vs Fan-Fold y Portarrollos
  if (
    pillar === "etiquetas-termicas-y-portarrollos" ||
    pillar === "etiquetas-en-rollo-vs-plegadas-fanfold" ||
    s.includes("portarrollos") ||
    s.includes("fan-fold") ||
    s.includes("fanfold") ||
    s.includes("rollo-vs-plegadas") ||
    s.includes("fnsku") ||
    s.includes("4000")
  ) {
    const p1 = s.includes("portarrollos") || s.includes("holder")
      ? CATALOG.LABEL_HOLDER_DUAL_STAND
      : s.includes("4000") || s.includes("mayorista") || s.includes("bulk")
      ? CATALOG.LABELS_BULK_4000_BOX
      : s.includes("fnsku") || s.includes("circular")
      ? CATALOG.LABELS_FBA_FNSKU_ROUND
      : s.includes("en-rollo") && !s.includes("fan-fold")
      ? CATALOG.LABELS_ROLL_500_2PACK
      : CATALOG.LABELS_FANFOLD_500;
    return {
      sectionTitle:
        "Etiquetas Térmicas 4×6 y Portarrollos Compatibles (Rollo · MUNBYN · KNAON)",
      sectionSubtitle:
        "Consumibles BPA-Free resistentes al agua que reducen tu costo cada 100 paquetes a US$ 1.30–2.60.",
      products: [p1, CATALOG.LABEL_HOLDER_DUAL_STAND, CATALOG.ROLLO_WIRELESS_X1040],
    };
  }

  // 4. Suministros de embalaje, limpieza de cabezal y fallas
  if (
    pillar === "accesorios-y-suministros-de-embalaje" ||
    pillar === "calibracion-mantenimiento-y-fallas" ||
    s.includes("poly-mailer") ||
    s.includes("burbuja") ||
    s.includes("cinta") ||
    s.includes("cabezal") ||
    s.includes("lineas-blancas") ||
    s.includes("limpiar")
  ) {
    const p1 = s.includes("cabezal") || s.includes("limpi") || s.includes("lineas") || s.includes("honeycomb")
      ? CATALOG.PACKING_HONEYCOMB_CLEANING
      : s.includes("cinta") || s.includes("pistola") || s.includes("dispensador")
      ? CATALOG.PACKING_TAPE_GUN_SET
      : s.includes("burbuja") || s.includes("bubble") || s.includes("fragil")
      ? CATALOG.PACKING_BUBBLE_MAILERS_MIX
      : CATALOG.PACKING_POLY_MAILERS_10X13;
    return {
      sectionTitle: "Suministros de Embalaje y Mantenimiento Térmico en Amazon",
      sectionSubtitle:
        "Equipa tu mesa de empaque con sobres impermeables, cinta de alta adherencia y limpiadores IPA 99% para cabezales.",
      products: [p1, CATALOG.LABELS_FANFOLD_500, CATALOG.SCALE_ACCUTECK_110LB],
    };
  }

  // 5. Enfoque por marca o tipo de conexión
  if (s.includes("knaon")) {
    const p1 = s.includes("combo") || s.includes("soporte")
      ? CATALOG.KNAON_BUNDLE_HOLDER
      : CATALOG.KNAON_Y812BT_BLUETOOTH;
    return {
      sectionTitle: "Kit Recomendado KNAON 4×6 (Impresora + Etiquetas + Balanza)",
      sectionSubtitle:
        "Arranque económico Bluetooth/USB ideal para imprimir desde iPhone, Android, Mac y Windows.",
      products: [p1, CATALOG.LABELS_FANFOLD_500, CATALOG.SCALE_ACCUTECK_110LB],
    };
  }

  if (s.includes("rollo") && !s.includes("portarrollos") && !s.includes("en-rollo")) {
    const p1 = s.includes("x1038") || (s.includes("usb") && !s.includes("wifi"))
      ? CATALOG.ROLLO_USB_X1038
      : CATALOG.ROLLO_WIRELESS_X1040;
    return {
      sectionTitle:
        "Estación Rollo Completa en Amazon (Impresora + Portarrollos + Etiquetas)",
      sectionSubtitle:
        "Combina Rollo Wireless/USB con su soporte dual y etiquetas 4×6 libres de chip DRM.",
      products: [p1, CATALOG.LABEL_HOLDER_DUAL_STAND, CATALOG.LABELS_BULK_4000_BOX],
    };
  }

  if (s.includes("300-dpi") || s.includes("941p") || s.includes("fnsku")) {
    return {
      sectionTitle: "Pack Alta Resolución 300 DPI + Etiquetas FNSKU y 4×6",
      sectionSubtitle:
        "Impresión ultrafina para códigos densos Amazon FBA, QR pequeños y etiquetas de marca.",
      products: [
        CATALOG.MUNBYN_300DPI_ITPP941P,
        CATALOG.LABELS_FBA_FNSKU_ROUND,
        CATALOG.LABEL_HOLDER_DUAL_STAND,
      ],
    };
  }

  if (
    s.includes("celular") ||
    s.includes("iphone") ||
    s.includes("android") ||
    s.includes("bluetooth") ||
    s.includes("airprint") ||
    s.includes("wifi")
  ) {
    const p1 = s.includes("airprint") || s.includes("wifi")
      ? CATALOG.ROLLO_WIRELESS_X1040
      : CATALOG.MUNBYN_RW130B_BLUETOOTH;
    const p2 = s.includes("airprint") || s.includes("wifi")
      ? CATALOG.MUNBYN_RW401AP_WIFI
      : CATALOG.KNAON_Y812BT_BLUETOOTH;
    return {
      sectionTitle:
        "Mejores Impresoras 4×6 para Celular (Wi-Fi AirPrint y Bluetooth)",
      sectionSubtitle:
        "Imprime tus guías desde iPhone, Android o Mac sin cables y súmale etiquetas fan-fold listas para usar.",
      products: [p1, p2, CATALOG.LABELS_FANFOLD_500],
    };
  }

  if (s.includes("munbyn") || s.includes("itpp941") || s.includes("rw")) {
    const p1 = s.includes("129") || s.includes("interna")
      ? CATALOG.MUNBYN_ITPP129_INTERNAL
      : s.includes("bluetooth") || s.includes("130b") || s.includes("402b")
      ? CATALOG.MUNBYN_RW130B_BLUETOOTH
      : CATALOG.MUNBYN_ITPP941_USB;
    return {
      sectionTitle:
        "Ecosistema MUNBYN RealWriter + Etiquetas y Balanza en Amazon",
      sectionSubtitle:
        "Todo lo compatible con tu impresora MUNBYN para bajar el costo por cada 100 envíos.",
      products: [p1, CATALOG.LABELS_FANFOLD_500, CATALOG.SCALE_MUNBYN_66LB],
    };
  }

  if (s.includes("100-paquetes") || s.includes("costo") || s.includes("rentabilidad") || s.includes("tinta")) {
    return {
      sectionTitle:
        "Equipo Recomendado para Bajar el Costo cada 100 Paquetes (< US$ 2.50)",
      sectionSubtitle:
        "Deja atrás cartuchos de tinta, hojas carta y tijeras con una térmica 4×6 + caja mayorista de etiquetas.",
      products: [
        CATALOG.MUNBYN_ITPP941_USB,
        CATALOG.LABELS_BULK_4000_BOX,
        CATALOG.SCALE_ACCUTECK_110LB,
      ],
    };
  }

  // Default universal (Home, legales y guías generales de ecommerce)
  return {
    sectionTitle:
      "Top Impresoras Térmicas 4×6, Etiquetas y Balanzas en Amazon EE. UU.",
    sectionSubtitle:
      "Selección líder de Rollo, MUNBYN y KNAON con etiquetas sin DRM y balanza digital para despachar más rápido.",
    products: [
      CATALOG.ROLLO_WIRELESS_X1040,
      CATALOG.MUNBYN_RW130B_BLUETOOTH,
      CATALOG.LABELS_FANFOLD_500,
    ],
  };
}
