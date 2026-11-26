import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-sync-key",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const SITE = "https://despacholisto.com";
const ALLOWED_MODELS = ["gpt-4o-mini", "gpt-4o"];
const AMAZON_TAG_US = "despacholisto-20";
const AMAZON_TAG_ES = "despacholisto-21";

export interface ArticleRow {
  slug: string;
  title: string;
  category: string;
  category_name: string;
  excerpt: string | null;
  featured_image: string | null;
  read_time: string | null;
  search_text: string | null;
}

export interface ArticleCard {
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  url: string;
  image: string;
  readTime: string;
  excerpt: string;
}

export interface AmazonProductCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  rating: string;
  reviewsCount: string;
  urlUS: string;
  urlES: string;
}

const AMAZON_PRODUCTS: Record<string, AmazonProductCard> = {
  "rollo-wireless-x1040": {
    id: "rollo-wireless-x1040",
    badge: "🏆 #1 Mejor Impresora Wi-Fi & AirPrint para Tiendas Online",
    title:
      "Rollo Wireless Shipping Label Printer (X1040) — Wi-Fi AirPrint + USB 4×6",
    subtitle:
      "Imprime sin apps puente desde iPhone, iPad, Mac, Windows y Android vía AirPrint/Wi-Fi a 150 mm/s. Acepta etiquetas térmicas en rollo (con portarrollos externo) y plegadas fan-fold. Costo aprox.: US$ 1.80–2.40 cada 100 paquetes.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Rollo Wireless Shipping Label Printer Wi-Fi AirPrint X1040")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Rollo impresora etiquetas termica WiFi 4x6")}&tag=${AMAZON_TAG_ES}`,
  },
  "rollo-usb-x1038": {
    id: "rollo-usb-x1038",
    badge: "⚡ Impresora USB Industrial Más Vendida (Alto Volumen en PC/Mac)",
    title:
      "Rollo USB Commercial Grade Shipping Label Printer (X1038) — 4×6 Direct Thermal",
    subtitle:
      "Diseño robusto de oficina para despachar +100 paquetes/día desde Windows, Mac o Chromebook vía USB. Detección automática de etiquetas en rollo o fan-fold por ranura trasera.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Rollo USB Shipping Label Printer Commercial Grade X1038")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Rollo impresora termica USB etiquetas envio 100x150")}&tag=${AMAZON_TAG_ES}`,
  },
  "munbyn-rw941-usb": {
    id: "munbyn-rw941-usb",
    badge: "💵 Mejor Calidad-Precio USB en Amazon EE. UU. (ITPP941)",
    title:
      "MUNBYN RealWriter 941 (ITPP941) — Impresora Térmica 4×6 USB 203 DPI",
    subtitle:
      "La favorita de emprendedores con Mac o Windows: cabezal japonés ROHM de larga vida, compatible con Shopify, Amazon FBA, eBay y Etsy. Ideal con etiquetas fan-fold o rollo externo.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("MUNBYN RealWriter 941 Thermal Shipping Label Printer ITPP941 USB")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("MUNBYN ITPP941 impresora termica etiquetas envio 4x6 USB")}&tag=${AMAZON_TAG_ES}`,
  },
  "munbyn-rw130b-bluetooth": {
    id: "munbyn-rw130b-bluetooth",
    badge: "📱 Mejor Impresora Bluetooth para Celular iOS/Android + PC",
    title:
      "MUNBYN RealWriter 130B / RW402B — Impresora Térmica Bluetooth + USB 4×6",
    subtitle:
      "Conecta por Bluetooth a iPhone y Android con la app MUNBYN Print (o vía USB en Mac/Windows). Calibración automática con 1 botón para rollos o etiquetas plegadas.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("MUNBYN Bluetooth Thermal Label Printer RW130B RW402B 4x6")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("MUNBYN RW130B RW402B impresora termica bluetooth 100x150")}&tag=${AMAZON_TAG_ES}`,
  },
  "munbyn-300dpi-airprint": {
    id: "munbyn-300dpi-airprint",
    badge: "🔬 Alta Definición 300 DPI & AirPrint (FNSKU, QR y Logos Finos)",
    title:
      "MUNBYN RealWriter 941P (300 DPI) / RW401AP (Wi-Fi AirPrint) — Etiquetas 4×6 y FNSKU",
    subtitle:
      "Nitidez superior de 300 DPI para códigos de barras densos Amazon FBA, FNSKU pequeños, tipografía fina y logotipos de marca sin pixelado.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("MUNBYN 300 DPI ITPP941P RW401AP AirPrint Thermal Label Printer")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("MUNBYN 300 DPI impresora termica etiquetas WiFi")}&tag=${AMAZON_TAG_ES}`,
  },
  "knaon-bluetooth-y812bt": {
    id: "knaon-bluetooth-y812bt",
    badge: "🔥 #1 Más Económica Bluetooth + USB",
    title:
      "KNAON Bluetooth Thermal Shipping Label Printer (Y812BT / 4×6) — iPhone, Android, Mac y Windows",
    subtitle:
      "Arranque económico para tiendas nuevas (1 a 35 paquetes/día): imprime por Bluetooth desde celular o USB desde computadora usando etiquetas 4×6 estándar sin DRM.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("KNAON Bluetooth Thermal Shipping Label Printer 4x6 Y812BT")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("KNAON impresora termica bluetooth etiquetas 4x6")}&tag=${AMAZON_TAG_ES}`,
  },
  "thermal-labels-4x6-holder": {
    id: "thermal-labels-4x6-holder",
    badge: "🏷️ Pack Etiquetas 4×6 (Rollo y Fan-Fold) + Portarrollos 2-en-1",
    title:
      "Etiquetas Térmicas Directas 4×6\" (500 / 4,000 uds BPA-Free) + Portarrollos Universal Rollo/MUNBYN",
    subtitle:
      "Etiquetas impermeables y anti-aceite compatibles con Rollo, MUNBYN y KNAON, más soporte dual para rollos y pilas plegadas fan-fold.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("4x6 Thermal Shipping Labels Fanfold Roll Label Holder Rollo MUNBYN")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("etiquetas termicas 100x150 rollo fanfold soporte portarrollos")}&tag=${AMAZON_TAG_ES}`,
  },
  "digital-shipping-scale": {
    id: "digital-shipping-scale",
    badge: "⚖️ Balanza Postal Digital #1 en Amazon (Pantalla Externa 110 lb)",
    title:
      "Accuteck ShipPro W-8580 (110 lb) / MUNBYN Digital Shipping Scale con Pantalla LCD Externa",
    subtitle:
      "Evita recargos postales: mide desde 0.1 oz / 2 g hasta 50 kg con funciones Tare y Hold y visor extensible para cajas grandes que tapan la plataforma.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Accuteck ShipPro 110lbs Digital Shipping Scale MUNBYN Postal Scale")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("balanza digital paquetes envios pantalla externa 50kg")}&tag=${AMAZON_TAG_ES}`,
  },
  "packing-mailers-tape-kit": {
    id: "packing-mailers-tape-kit",
    badge: "📦 Kit de Embalaje Rápido (Sobres Poly Mailers + Pistola Cinta + Limpieza)",
    title:
      "Sobres Impermeables Poly Mailers 10×13\", Bubble Mailers, Pistola Dispensadora 2\" y Lápiz IPA",
    subtitle:
      "Todo el consumible de estación de despacho para empacar en segundos y mantener el cabezal térmico limpio sin líneas blancas.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("10x13 Poly Mailers Heavy Duty Tape Dispenser Gun Thermal Printhead Cleaning Pen")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("bolsas envio impermeables poly mailers dispensador cinta embalaje")}&tag=${AMAZON_TAG_ES}`,
  },
};

function calculateCostUsd(
  model: string,
  promptTokens: number,
  completionTokens: number
): number {
  if (model.includes("mini")) {
    return Number(
      (promptTokens * 0.00000015 + completionTokens * 0.0000006).toFixed(6)
    );
  }
  return Number(
    (promptTokens * 0.0000025 + completionTokens * 0.00001).toFixed(6)
  );
}

const norm = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STOPWORDS = new Set([
  "como",
  "cual",
  "cuales",
  "que",
  "quien",
  "donde",
  "cuando",
  "por",
  "para",
  "con",
  "sin",
  "una",
  "uno",
  "los",
  "las",
  "del",
  "al",
  "hola",
  "quiero",
  "puedo",
  "recomienda",
  "mejor",
  "mejores",
  "sobre",
  "mas",
  "muy",
  "tiene",
  "tengo",
  "impresora",
  "etiqueta",
  "etiquetas",
  "paquetes",
]);

function extractTokens(text: string): string[] {
  return norm(text)
    .split(" ")
    .filter((w) => w.length >= 2 && !STOPWORDS.has(w));
}

let catalogCache: {
  at: number;
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
} | null = null;

async function loadCatalog(): Promise<{
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
}> {
  if (
    catalogCache &&
    Date.now() - catalogCache.at < 10 * 60 * 1000 &&
    catalogCache.rows.length > 0
  ) {
    return catalogCache;
  }
  const [batch1, batch2] = await Promise.all([
    supabase
      .from("despacholisto_articles")
      .select(
        "slug, title, category, category_name, excerpt, featured_image, read_time, search_text"
      )
      .eq("active", true)
      .range(0, 999),
    supabase
      .from("despacholisto_articles")
      .select(
        "slug, title, category, category_name, excerpt, featured_image, read_time, search_text"
      )
      .eq("active", true)
      .range(1000, 1999),
  ]);

  const rows: ArticleRow[] = [];
  const bySlug = new Map<string, ArticleRow>();
  for (const data of [batch1.data, batch2.data]) {
    if (Array.isArray(data)) {
      for (const r of data as ArticleRow[]) {
        if (!bySlug.has(r.slug)) {
          bySlug.set(r.slug, r);
          rows.push(r);
        }
      }
    }
  }
  catalogCache = { at: Date.now(), rows, bySlug };
  return catalogCache;
}

function toArticleCard(r: ArticleRow): ArticleCard {
  const img = r.featured_image || "/img/ambiente/home-hero-impresoras.webp";
  const url =
    r.slug === r.category
      ? `${SITE}/${r.category}/`
      : `${SITE}/${r.category}/${r.slug}/`;
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    categoryName: r.category_name,
    url,
    image: img.startsWith("http") ? img : `${SITE}${img}`,
    readTime: r.read_time || "7 min",
    excerpt: (r.excerpt || "").slice(0, 145),
  };
}

function searchArticles(
  rows: ArticleRow[],
  userMessage: string,
  historyText: string,
  limit = 14
): ArticleRow[] {
  const primaryTokens = extractTokens(userMessage);
  const contextTokens = extractTokens(historyText).filter(
    (t) => !primaryTokens.includes(t)
  );
  const fullPhrase = norm(userMessage);

  const starterSlugs = [
    "rollo-vs-munbyn-vs-knaon-cual-elegir-segun-volumen-y-conexion",
    "rollo-wireless-x1040-impresora-termica-wifi-airprint-resena",
    "munbyn-realwriter-941-itpp941-impresora-termica-usb-resena",
    "knaon-y812bt-bluetooth-impresora-termica-economica-resena",
    "cuanto-cuesta-etiquetar-100-paquetes-termica-4x6-vs-tinta",
    "etiquetas-en-rollo-vs-plegadas-fanfold-que-acepta-cada-impresora",
  ];

  if (primaryTokens.length === 0 && contextTokens.length === 0) {
    const picked: ArticleRow[] = [];
    for (const s of starterSlugs) {
      const f = rows.find((r) => r.slug === s);
      if (f) picked.push(f);
    }
    return picked.length > 0 ? picked : rows.slice(0, 8);
  }

  const scored: Array<{ r: ArticleRow; score: number }> = [];
  for (const r of rows) {
    const titleNorm = norm(r.title);
    const catNorm = norm(`${r.category_name} ${r.category}`);
    const bodyNorm =
      r.search_text || `${titleNorm} ${catNorm} ${norm(r.excerpt || "")}`;

    let score = 0;
    if (fullPhrase.length >= 5 && titleNorm.includes(fullPhrase)) score += 45;

    let matchedPrimary = 0;
    for (const tok of primaryTokens) {
      if (titleNorm.includes(tok)) {
        score += 16;
        matchedPrimary++;
      } else if (catNorm.includes(tok)) {
        score += 9;
        matchedPrimary++;
      } else if (bodyNorm.includes(tok)) {
        score += 5;
        matchedPrimary++;
      }
    }
    if (matchedPrimary >= 2) score += matchedPrimary * 8;
    if (starterSlugs.includes(r.slug)) score += 5;

    for (const cTok of contextTokens.slice(-5)) {
      if (titleNorm.includes(cTok)) score += 3;
    }

    if (score > 0) scored.push({ r, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.r);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (b: unknown, status = 200) =>
    new Response(JSON.stringify(b), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const body =
      req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const mode = body.mode || (req.method === "GET" ? "config" : "chat");

    // 0. Seed / Sync articles endpoint
    if (mode === "seed_articles") {
      const syncKey = req.headers.get("x-sync-key") || "";
      if (syncKey !== "despacholisto-sync-2026") {
        return json({ error: "No autorizado" }, 401);
      }
      const rows = Array.isArray(body.articles) ? body.articles : [];
      if (rows.length === 0) return json({ error: "Sin artículos" }, 400);
      const { error } = await supabase
        .from("despacholisto_articles")
        .upsert(rows, { onConflict: "slug" });
      if (error) return json({ error: error.message }, 500);
      catalogCache = null;
      return json({ success: true, count: rows.length });
    }

    // 1. Load live config (Default: gpt-4o-mini)
    const { data: configRow } = await supabase
      .from("despacholisto_chat_config")
      .select("*")
      .eq("id", "default")
      .maybeSingle();

    const config = configRow || {
      is_enabled: true,
      ai_model: "gpt-4o-mini",
      temperature: 0.35,
      max_messages_per_session: 30,
      daily_budget_usd: 5.0,
      welcome_message:
        "¡Hola! 📦🏷️ Soy tu Asesor de Etiquetado y Despacho IA de DespachoListo.com (modelo mini rápido). Cuéntame cuántos pedidos envías al día, si quieres imprimir etiquetas 4×6 desde tu celular o computadora, o qué marca miras (Rollo, MUNBYN o KNAON), y te recomendaré la impresora térmica, etiquetas, portarrollos o balanza ideal en Amazon Estados Unidos.",
      custom_instructions: "",
    };

    const activeModel = ALLOWED_MODELS.includes(config.ai_model)
      ? config.ai_model
      : "gpt-4o-mini";

    if (mode === "config" || req.method === "GET") {
      return json({
        is_enabled: config.is_enabled,
        welcome_message: config.welcome_message,
        ai_model: activeModel,
        max_messages_per_session: config.max_messages_per_session,
      });
    }

    // 2. Track click on an article or Amazon product
    if (mode === "track_click" || mode === "click") {
      const {
        session_id,
        visitor_id,
        article_slug,
        article_title,
        category,
        target_url,
        page_url,
      } = body;
      if (target_url) {
        await supabase.from("despacholisto_chat_clicks").insert({
          session_id: session_id || null,
          visitor_id: String(visitor_id || "anon").slice(0, 80),
          article_slug: article_slug ? String(article_slug).slice(0, 180) : null,
          article_title: article_title
            ? String(article_title).slice(0, 240)
            : null,
          category: category ? String(category).slice(0, 80) : null,
          target_url: String(target_url).slice(0, 500),
          page_url: page_url ? String(page_url).slice(0, 500) : null,
        });

        if (session_id) {
          const { data: sess } = await supabase
            .from("despacholisto_chat_sessions")
            .select("clicks_count, clicked_urls")
            .eq("id", session_id)
            .maybeSingle();
          if (sess) {
            const urls = Array.isArray(sess.clicked_urls)
              ? sess.clicked_urls
              : [];
            if (!urls.includes(target_url)) urls.push(target_url);
            await supabase
              .from("despacholisto_chat_sessions")
              .update({
                clicks_count: (sess.clicks_count || 0) + 1,
                clicked_urls: urls,
              })
              .eq("id", session_id);
          }
        }
      }
      return json({ success: true });
    }

    // 3. Chat Completion
    if (!config.is_enabled) {
      return json({
        reply: `En este momento el Asesor de Etiquetado y Despacho IA está en mantenimiento breve. Puedes explorar nuestras comparativas de Rollo, MUNBYN y KNAON en [DespachoListo.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: [
          "Rollo vs MUNBYN vs KNAON para etiquetas 4×6",
          "Cuánto cuesta etiquetar 100 paquetes",
        ],
        disabled: true,
      });
    }

    const userMessage = String(body.message || "").trim().slice(0, 1000);
    if (!userMessage) return json({ error: "Mensaje vacío" }, 400);

    const visitorId = String(
      body.visitor_id || "dl-" + crypto.randomUUID().slice(0, 8)
    ).slice(0, 80);
    const region = body.region === "ES" ? "ES" : "US";
    const storeName = region === "ES" ? "Amazon.es" : "Amazon.com";
    const pageUrl = String(body.page_url || SITE + "/").slice(0, 500);
    const userAgent = String(
      body.user_agent || req.headers.get("user-agent") || ""
    ).slice(0, 300);
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    let sessionId: string | null = body.session_id || null;

    let existingSession: any = null;
    if (sessionId) {
      const { data: s } = await supabase
        .from("despacholisto_chat_sessions")
        .select("*")
        .eq("id", sessionId)
        .maybeSingle();
      existingSession = s;
    }

    if (!existingSession) {
      const { data: created, error: createErr } = await supabase
        .from("despacholisto_chat_sessions")
        .insert({
          visitor_id: visitorId,
          page_url: pageUrl,
          user_agent: userAgent,
          first_user_message: userMessage.slice(0, 250),
          last_user_message: userMessage.slice(0, 250),
          messages_count: 1,
          model_used: activeModel,
        })
        .select("*")
        .single();

      if (!createErr && created) {
        existingSession = created;
        sessionId = created.id;
      }
    }

    if (sessionId) {
      await supabase.from("despacholisto_chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: userMessage,
      });
    }

    const catalog = await loadCatalog();
    const recentHistoryText = history
      .slice(-3)
      .map((h: any) => h?.content || "")
      .join(" ");
    const candidateRows = searchArticles(
      catalog.rows,
      userMessage,
      recentHistoryText,
      14
    );

    const candidatesPrompt =
      candidateRows.length > 0
        ? candidateRows
            .map((r) => {
              const u =
                r.slug === r.category
                  ? `${SITE}/${r.category}/`
                  : `${SITE}/${r.category}/${r.slug}/`;
              return `- SLUG: "${r.slug}" | TÍTULO: "${r.title}" | CATEGORÍA: ${r.category_name} | URL: ${u} | RESUMEN: ${(r.excerpt || "").slice(0, 140)}`;
            })
            .join("\n")
        : "No se encontraron artículos exactos con esos términos.";

    const amazonCatalogPrompt = Object.values(AMAZON_PRODUCTS)
      .map(
        (p) =>
          `- PRODUCT_ID: "${p.id}" | ${p.badge} | NOMBRE: "${p.title}" | DETALLE: ${p.subtitle} | URL_${region}: ${region === "ES" ? p.urlES : p.urlUS}`
      )
      .join("\n");

    const extraInstructions = config.custom_instructions
      ? `\nINSTRUCCIONES ADICIONALES DEL ADMINISTRADOR:\n${config.custom_instructions}\n`
      : "";

    const systemPrompt = `Eres el Asesor Oficial de Impresoras Térmicas 4×6 y Despacho IA de DespachoListo.com (${SITE}), la guía líder en español con más de 1,500 artículos especializados para emprendedores y tiendas online (fundado por Carlos Lingan Borja, info@charlielingan.com).

Tu doble misión es:
1. RESPONDER TODAS LAS DUDAS DEL USUARIO con rigor técnico y datos prácticos:
   - VOLUMEN, CONEXIÓN Y CELULAR/PC: Compara Rollo (USB X1038 y Wireless Wi-Fi/AirPrint X1040), MUNBYN (RealWriter 941 USB ITPP941, RW130B / RW402B Bluetooth, ITPP941P 300 DPI, RW401AP AirPrint) y KNAON (Y812BT Bluetooth + USB económico) según pedidos diarios (1–15, 20–80 o +100 paquetes/día), tipo de conexión (USB directo en PC/Mac, Bluetooth desde iPhone/Android con app puente, o Wi-Fi AirPrint nativo sin apps) y compatibilidad con Shopify, Amazon FBA, Mercado Libre, eBay, Etsy y couriers.
   - ETIQUETAS EN ROLLO VS PLEGADAS (FAN-FOLD) Y COSTO POR 100 PAQUETES: Explica siempre si el modelo tiene bandeja interna o ranura trasera (Rollo X1038/X1040, MUNBYN ITPP941/RW130B y KNAON Y812BT alimentan por atrás: aceptan pilas fan-fold directo sobre la mesa o rollos de 1" usando un portarrollos externo). Calcula el costo real por 100 paquetes: ~$1.40–$2.60 USD con etiquetas térmicas 4×6 (sin tinta ni tóner) frente a ~$10–$18 USD usando hojas carta + tinta + tijeras + cinta.
   - ACCESORIOS: Recomienda portarrollos 2-en-1, balanzas digitales con pantalla externa (Accuteck ShipPro 110 lb / MUNBYN) y suministros de embalaje (poly mailers, bubble mailers, pistola de cinta y lápices limpiadores IPA 99%).
   - Enlaza en tu respuesta entre 1 y 3 guías de nuestro listado inferior usando Markdown exacto: [Título](${SITE}/categoria/slug/) e incluye sus slugs en "recommended_slugs".
2. AYUDAR ACTIVAMENTE A QUE COMPREN EN AMAZON (${storeName}):
   - Recomienda siempre 1 o 2 productos exactos de nuestro CATÁLOGO AMAZON OFICIAL (por ejemplo, la impresora térmica 4×6 ideal + sus etiquetas/portarrollos o balanza digital).
   - Incluye en tu texto un enlace Markdown directo al producto en ${storeName} usando su URL_${region} exacta y añade entre 1 y 2 IDs en "recommended_product_ids".${extraInstructions}

CATÁLOGO AMAZON OFICIAL (${storeName}):
${amazonCatalogPrompt}

ARTÍCULOS ENCONTRADOS EN DESPACHOLISTO.COM:
${candidatesPrompt}

Responde ÚNICAMENTE con un objeto JSON válido con estas 4 llaves exactas:
{
  "reply": "Tu respuesta experta y práctica en español comparando volumen, conexión celular/PC, etiquetas rollo vs fan-fold y costo cada 100 paquetes, con enlaces Markdown a nuestras guías y al producto en ${storeName}",
  "recommended_slugs": ["slug-1", "slug-2"],
  "recommended_product_ids": ["munbyn-rw130b-bluetooth", "thermal-labels-4x6-holder"],
  "suggested_options": ["Opción 1", "Opción 2", "Opción 3"]
}`;

    const chatMessages: any[] = [{ role: "system", content: systemPrompt }];
    for (const h of history) {
      if (
        h &&
        (h.role === "user" || h.role === "assistant") &&
        typeof h.content === "string"
      ) {
        chatMessages.push({ role: h.role, content: h.content.slice(0, 1200) });
      }
    }
    chatMessages.push({ role: "user", content: userMessage });

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: activeModel,
          messages: chatMessages,
          temperature: Number(config.temperature) || 0.35,
          max_tokens: 900,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!openaiRes.ok) {
      throw new Error("OpenAI status " + openaiRes.status);
    }

    const openaiData = await openaiRes.json();
    const rawContent = openaiData.choices?.[0]?.message?.content || "{}";
    let parsed: any = {};
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      parsed = {
        reply: rawContent,
        recommended_slugs: candidateRows.slice(0, 2).map((r) => r.slug),
        recommended_product_ids: ["munbyn-rw130b-bluetooth"],
        suggested_options: [
          "¿Rollo Wireless, MUNBYN o KNAON para imprimir desde iPhone?",
          "¿Etiquetas en rollo o plegadas fan-fold? Costo por 100 envíos",
          "Mejor balanza digital para pesar paquetes grandes",
        ],
      };
    }

    const slugs: string[] = Array.isArray(parsed.recommended_slugs)
      ? parsed.recommended_slugs.slice(0, 3)
      : [];
    const recommendedArticles: ArticleCard[] = slugs
      .map((s) => catalog.bySlug.get(s))
      .filter((r): r is ArticleRow => Boolean(r))
      .map(toArticleCard);

    const productIds: string[] = Array.isArray(parsed.recommended_product_ids)
      ? parsed.recommended_product_ids.slice(0, 2)
      : ["munbyn-rw130b-bluetooth"];
    const recommendedProducts: AmazonProductCard[] = productIds
      .map((id) => AMAZON_PRODUCTS[id])
      .filter((p): p is AmazonProductCard => Boolean(p));

    const suggestedOptions: string[] = Array.isArray(parsed.suggested_options)
      ? parsed.suggested_options
          .slice(0, 3)
          .map((s: unknown) => String(s).slice(0, 72))
      : [];

    const replyText: string =
      parsed.reply ||
      `Te recomiendo revisar nuestra comparativa de [Rollo vs MUNBYN vs KNAON según Volumen y Conexión](${SITE}/comparativas-impresoras-de-etiquetas/rollo-vs-munbyn-vs-knaon-cual-elegir-segun-volumen-y-conexion/).`;

    const promptTokens = openaiData.usage?.prompt_tokens || 0;
    const completionTokens = openaiData.usage?.completion_tokens || 0;
    const totalTokens =
      openaiData.usage?.total_tokens || promptTokens + completionTokens;
    const costUsd = calculateCostUsd(
      activeModel,
      promptTokens,
      completionTokens
    );

    if (sessionId && existingSession) {
      await supabase.from("despacholisto_chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: replyText,
        recommended_articles: recommendedArticles,
        suggested_options: suggestedOptions,
        model: activeModel,
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
        cost_usd: costUsd,
      });

      const prevRecs: string[] = Array.isArray(
        existingSession.recommended_articles
      )
        ? existingSession.recommended_articles
        : [];
      for (const ra of recommendedArticles) {
        if (!prevRecs.includes(ra.title)) prevRecs.push(ra.title);
      }
      for (const rp of recommendedProducts) {
        const label = `[Amazon] ${rp.title}`;
        if (!prevRecs.includes(label)) prevRecs.push(label);
      }

      await supabase
        .from("despacholisto_chat_sessions")
        .update({
          last_user_message: userMessage.slice(0, 250),
          messages_count: (existingSession.messages_count || 1) + 2,
          recommended_articles: prevRecs.slice(0, 30),
          prompt_tokens: (existingSession.prompt_tokens || 0) + promptTokens,
          completion_tokens:
            (existingSession.completion_tokens || 0) + completionTokens,
          total_tokens: (existingSession.total_tokens || 0) + totalTokens,
          estimated_cost_usd: Number(
            (Number(existingSession.estimated_cost_usd || 0) + costUsd).toFixed(
              6
            )
          ),
          model_used: activeModel,
          last_message_at: new Date().toISOString(),
        })
        .eq("id", sessionId);
    }

    await supabase.from("token_usage").insert({
      source: "despacholisto.com",
      content_type: "ai_chat",
      model: activeModel,
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
      images_generated: 0,
      estimated_cost_usd: costUsd,
      slug: sessionId || visitorId,
    });

    return json({
      session_id: sessionId,
      reply: replyText,
      recommended_articles: recommendedArticles,
      recommended_products: recommendedProducts,
      suggested_options: suggestedOptions,
      model: activeModel,
    });
  } catch (err: any) {
    return json(
      {
        error: err.message || "Error interno",
        reply: `Puedes explorar nuestras más de 1,500 guías sobre impresoras térmicas 4×6 (Rollo, MUNBYN, KNAON), etiquetas y embalaje en [DespachoListo.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: ["Intentar de nuevo"],
      },
      500
    );
  }
});
