import fs from "node:fs";
import path from "node:path";
import categories from "@/data/categories.json";
import keywordMap from "@/data/keyword_map.json";

export const SITE_URL = "https://despacholisto.com";
export const SITE_NAME = "DespachoListo.com";
export const LEGAL_OWNER = "CARLOS LINGAN BORJA";
export const LEGAL_LOCATION = "Lima, Perú";
export const LEGAL_EMAIL = "info@charlielingan.com";
export const LEGAL_LINE =
  "Titular del sitio web: CARLOS LINGAN BORJA, domiciliado en Lima, Perú · Correo electrónico: info@charlielingan.com";
export const SHIPPING_DISCLAIMER =
  "las marcas comerciales mencionadas (Amazon, Rollo, MUNBYN, KNAON, JADENS, NELKO, Brother, DYMO, Zebra, Shopify, Mercado Libre, USPS, UPS, FedEx, DHL, entre otras) pertenecen a sus respectivos propietarios; este portal realiza comparativas técnicas independientes de impresoras térmicas de etiquetas 4×6, consumibles, balanzas postales y embalaje en español, y participa en el Programa de Afiliados de Amazon";
export const PUBLISHED = "2026-11-24";
export const VERIFIED_LABEL = "24/11/2026";
export const CHAT_ENDPOINT =
  "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/despacholisto-chat";

export type Block =
  | { type: "p" | "h2" | "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | {
      type: "callout";
      variant: "etiqueta" | "fabricante" | "aviso" | "tip";
      title?: string;
      text: string;
    }
  | { type: "steps"; items: { name: string; text: string }[] }
  | { type: "cta"; text: string };

export type Article = {
  slug: string;
  pillar: string;
  path: string;
  isPillar: boolean;
  isTransactional?: boolean;
  primaryKeyword: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  quickAnswer: string;
  readingMinutes: number;
  image: { prompt: string; alt: string };
  blocks: Block[];
  faqs: { q: string; a: string }[];
  sources?: { label: string; url: string }[];
  related: string[];
  datePublished: string;
  dateModified: string;
  imageUrl: string | null;
};

export type Category = (typeof categories)[number];

const DIR = path.join(process.cwd(), "src/content/articles");
const PUBLIC = path.join(process.cwd(), "public");
let cache: Article[] | null = null;

function isValidArticle(a: Partial<Article>): a is Article {
  return Boolean(
    a && a.slug && a.pillar && a.path && a.title && Array.isArray(a.blocks)
  );
}

const PILLAR_SCENE_POOLS: Record<string, string[]> = {
  "resenas-impresoras-termicas-4x6": [
    "cat-resenas-impresoras-termicas-4x6",
    "scene-resenas-2",
    "scene-resenas-3",
    "home-hero-impresoras",
    "home-impresora-wifi",
  ],
  "comparativas-impresoras-de-etiquetas": [
    "cat-comparativas-impresoras-de-etiquetas",
    "scene-comparativas-2",
    "scene-comparativas-3",
    "og-default",
  ],
  "impresoras-por-volumen-y-conexion": [
    "cat-impresoras-por-volumen-y-conexion",
    "scene-volumen-2",
    "scene-volumen-3",
    "home-impresora-wifi",
    "home-imprimir-celular",
  ],
  "etiquetas-termicas-y-portarrollos": [
    "cat-etiquetas-termicas-y-portarrollos",
    "scene-etiquetas-2",
    "scene-etiquetas-3",
    "home-rollo-fanfold",
  ],
  "balanzas-digitales-para-envios": [
    "cat-balanzas-digitales-para-envios",
    "scene-balanzas-2",
    "scene-balanzas-3",
    "home-balanza-envios",
  ],
  "accesorios-y-suministros-de-embalaje": [
    "cat-accesorios-y-suministros-de-embalaje",
    "scene-embalaje-2",
    "scene-embalaje-3",
    "home-embalaje-mailers",
  ],
  "imprimir-etiquetas-desde-celular-y-pc": [
    "cat-imprimir-etiquetas-desde-celular-y-pc",
    "scene-celular-2",
    "scene-celular-3",
    "home-imprimir-celular",
  ],
  "etiquetas-en-rollo-vs-plegadas-fanfold": [
    "cat-etiquetas-en-rollo-vs-plegadas-fanfold",
    "scene-fanfold-2",
    "scene-fanfold-3",
    "home-rollo-fanfold",
  ],
  "costos-y-rentabilidad-por-100-paquetes": [
    "cat-costos-y-rentabilidad-por-100-paquetes",
    "scene-costos-2",
    "scene-costos-3",
    "home-costo-100-paquetes",
  ],
  "configuracion-shopify-amazon-y-couriers": [
    "cat-configuracion-shopify-amazon-y-couriers",
    "scene-plataformas-2",
    "scene-plataformas-3",
    "home-shopify-despacho",
  ],
  "resolucion-dpi-codigos-de-barras-y-formatos": [
    "cat-resolucion-dpi-codigos-de-barras-y-formatos",
    "scene-dpi-2",
    "scene-dpi-3",
  ],
  "calibracion-mantenimiento-y-fallas": [
    "cat-calibracion-mantenimiento-y-fallas",
    "scene-calibracion-2",
    "scene-calibracion-3",
  ],
  "pesaje-cubicaje-y-preparacion-de-pedidos": [
    "cat-pesaje-cubicaje-y-preparacion-de-pedidos",
    "scene-pesaje-2",
    "scene-pesaje-3",
    "home-balanza-envios",
  ],
  "organizacion-estacion-de-despacho-y-amazon-usa": [
    "cat-organizacion-estacion-de-despacho-y-amazon-usa",
    "scene-estacion-2",
    "scene-estacion-3",
    "home-embalaje-mailers",
  ],
};

function resolveArticleImage(
  a: Article,
  pillarCountMap: Map<string, number>
): string {
  const imgArt = path.join(PUBLIC, "img/articulos", `${a.slug}.webp`);
  if (fs.existsSync(imgArt)) {
    return `/img/articulos/${a.slug}.webp`;
  }
  if (a.isPillar) {
    const imgCat = path.join(PUBLIC, "img/ambiente", `cat-${a.pillar}.webp`);
    if (fs.existsSync(imgCat)) return `/img/ambiente/cat-${a.pillar}.webp`;
  }
  const idx = pillarCountMap.get(a.pillar) || 0;
  pillarCountMap.set(a.pillar, idx + 1);
  const pool = PILLAR_SCENE_POOLS[a.pillar] || ["home-hero-impresoras"];
  const candidate = pool[idx % pool.length];
  const candidatePath = path.join(PUBLIC, "img/ambiente", `${candidate}.webp`);
  if (fs.existsSync(candidatePath)) {
    return `/img/ambiente/${candidate}.webp`;
  }
  const imgAmb = path.join(PUBLIC, "img/ambiente", `cat-${a.pillar}.webp`);
  return fs.existsSync(imgAmb)
    ? `/img/ambiente/cat-${a.pillar}.webp`
    : `/img/ambiente/home-hero-impresoras.webp`;
}

export function getAllContent(): Article[] {
  if (cache) return cache;
  const order = (keywordMap as { path: string }[]).map((k) => k.path);
  const files = fs.existsSync(DIR)
    ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))
    : [];
  const list: Article[] = [];
  const seen = new Set<string>();
  const pillarCountMap = new Map<string, number>();
  for (const f of files) {
    try {
      const a = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
      if (!isValidArticle(a) || seen.has(a.path)) continue;
      seen.add(a.path);
      const imageUrl = resolveArticleImage(a, pillarCountMap);
      list.push({
        ...a,
        isPillar: Boolean(a.isPillar),
        isTransactional: Boolean(a.isTransactional),
        image:
          a.image && a.image.alt ? a.image : { prompt: "", alt: a.title },
        faqs: Array.isArray(a.faqs) ? a.faqs : [],
        related: Array.isArray(a.related) ? a.related : [],
        quickAnswer: a.quickAnswer || a.excerpt || "",
        excerpt: a.excerpt || a.metaDescription || "",
        seoTitle: a.seoTitle || a.title,
        metaDescription: a.metaDescription || a.excerpt || "",
        datePublished: a.datePublished || PUBLISHED,
        dateModified: a.dateModified || PUBLISHED,
        imageUrl,
      });
    } catch {
      // ignore invalid json during generation
    }
  }
  list.sort((x, y) => {
    const ix = order.indexOf(x.path);
    const iy = order.indexOf(y.path);
    if (ix === -1 && iy === -1) return x.path.localeCompare(y.path);
    if (ix === -1) return 1;
    if (iy === -1) return -1;
    return ix - iy;
  });
  cache = list;
  return list;
}

export const getCategories = (): Category[] => categories;
export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
export const getPillar = (slug: string) =>
  getAllContent().find((a) => a.isPillar && a.pillar === slug);
export const getArticle = (pillar: string, slug: string) =>
  getAllContent().find(
    (a) => !a.isPillar && a.pillar === pillar && a.slug === slug
  );
export const getArticlesIn = (pillar: string) =>
  getAllContent().filter((a) => !a.isPillar && a.pillar === pillar);
export const getByPath = (p: string) =>
  getAllContent().find((a) => a.path === p);

export function safeHref(p: string): string {
  if (getByPath(p)) return p;
  const pillar = p.split("/").filter(Boolean)[0];
  if (pillar && getCategory(pillar)) return `/${pillar}/`;
  return "/";
}

export function ambient(
  name: string,
  fallback = "/img/ambiente/home-hero-impresoras.webp"
): string {
  const rel = `/img/ambiente/${name}.webp`;
  return fs.existsSync(path.join(PUBLIC, rel)) ? rel : fallback;
}

export const hasAmbient = (name: string) =>
  fs.existsSync(path.join(PUBLIC, `/img/ambiente/${name}.webp`));

export const OG_DEFAULT = () =>
  ambient("og-default", "/img/ambiente/home-hero-impresoras.webp");

export function absolute(url: string) {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

export function trimTitle(t: string) {
  return t.replace(/\s*\|\s*DespachoListo(?:\.com)?\s*$/i, "");
}

export const organizationLd = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon.svg`,
  founder: { "@id": `${SITE_URL}/#carlos` },
  email: LEGAL_EMAIL,
  description:
    "Guía en español para emprendedores y tiendas online que buscan impresoras térmicas de etiquetas 4×6 (Rollo, MUNBYN, KNAON), etiquetas en rollo y plegadas fan-fold, portarrollos, balanzas y suministros de embalaje en Amazon Estados Unidos.",
};

export const personLd = {
  "@type": "Person",
  "@id": `${SITE_URL}/#carlos`,
  name: LEGAL_OWNER,
  email: LEGAL_EMAIL,
  jobTitle: "Fundador & Editor Jefe de DespachoListo.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lima",
    addressCountry: "PE",
  },
  url: `${SITE_URL}/sobre-nosotros/`,
};
