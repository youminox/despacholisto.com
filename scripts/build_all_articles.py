#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador Maestro de las 1,514 Guías Editoriales de DespachoListo.com:
- 14 Hubs Pilares de Categoría (isPillar: true)
- 500 Artículos Transaccionales en 6 Silos de Productos Amazon (isTransactional: true)
- 1,000 Artículos SEO Informacionales en 8 Silos Técnicos y Operativos (isTransactional: false)

También genera:
- src/data/keyword_map.json (validando 0 canibalización)
- public/search-index.json
"""
import json
import pathlib
import re

from topics_catalog import PILLARS, generate_transactional_500, generate_seo_1000

ROOT = pathlib.Path(__file__).resolve().parent.parent
ART_DIR = ROOT / "src/content/articles"
ART_DIR.mkdir(parents=True, exist_ok=True)
DATA_DIR = ROOT / "src/data"
DATA_DIR.mkdir(parents=True, exist_ok=True)
PUB_DIR = ROOT / "public"
PUB_DIR.mkdir(parents=True, exist_ok=True)

PUBLISHED = "2026-11-24"

# Matriz Fotográfica Anti-Similitud (8 ángulos × 6 iluminaciones × 10 entornos = 480 combinaciones visuales únicas)
CAMERA_STYLES = [
    "Macro close-up shot with shallow depth of field (85mm f/2.8 lens)",
    "Three-quarter editorial product angle from slightly above on a packing desk (50mm lens)",
    "Overhead flat-lay knolling composition showcasing the thermal printer, 4x6 labels and packing accessories (35mm lens)",
    "Eye-level realistic e-commerce packing action photograph with authentic natural hands-on framing",
    "Side-profile studio shot highlighting rear label slot, feed alignment and sleek compact chassis",
    "Detailed close-up focusing on crisp geometric barcode lines printed cleanly on matte thermal paper",
    "Wide editorial interior view of a bright home office or boutique fulfillment corner",
    "Oblique shipping counter photography with soft background bokeh and crisp label textures",
]

LIGHTING_MOODS = [
    "crisp natural morning window daylight with soft realistic shadows",
    "warm golden-hour afternoon sunlight streaming into a modern studio",
    "bright neutral 4500K commercial LED desk lighting highlighting crisp white labels and cardboard",
    "soft diffused overcast daylight with clean color accuracy",
    "directional studio lamp illumination with authentic contrast",
    "inviting sunlit home office daylight creating an organized fulfillment atmosphere",
]

SURFACES_AND_PROPS = [
    "on a light oak packing bench beside self-seal poly mailers and a tape dispenser gun",
    "next to a stack of folded 4x6 fan-fold labels feeding cleanly from behind",
    "on a clean white fulfillment counter alongside an external dual roll label holder",
    "beside an Accuteck-style digital shipping scale with a coiled LCD screen and corrugated box",
    "on a dark slate desk mat next to a smartphone, laptop and neatly sealed parcels",
    "alongside kraft bubble mailers, honeycomb packing paper and isopropyl cleaning pens",
    "in a sunlit boutique clothing backroom with stacked folded mailers and shipping cartons",
    "beside a corrugated dispenser carton of 4x6 labels and ceramic safety box cutter",
    "in a compact apartment shipping workstation under 1.2 meters wide",
    "on a minimalist modern desk beside a tablet displaying a shipping label queue",
]


def build_diverse_prompt(subject: str, idx: int) -> str:
    cam = CAMERA_STYLES[idx % len(CAMERA_STYLES)]
    light = LIGHTING_MOODS[(idx * 3 + 1) % len(LIGHTING_MOODS)]
    surf = SURFACES_AND_PROPS[(idx * 7 + 2) % len(SURFACES_AND_PROPS)]
    return (
        f"Realistic editorial e-commerce fulfillment photography, {cam}: {subject}, {surf}, {light}. "
        "Clean geometric barcode stripes only, no readable letters, no brand logos, no watermarks."
    )


def clean_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9-]+", "-", s)
    return re.sub(r"-+", "-", s).strip("-")


def make_pillar_article(p: dict, child_items: list, idx: int) -> dict:
    cat_slug = p["slug"]
    path = f"/{cat_slug}/"
    related_paths = [f"/{cat_slug}/{clean_slug(c[0])}/" for c in child_items[:4]]
    table_rows = [
        [c[1], f"[Ver guía completa](/{cat_slug}/{clean_slug(c[0])}/)"]
        for c in child_items[:16]
    ]
    is_trans_pillar = cat_slug in {
        "resenas-impresoras-termicas-4x6",
        "comparativas-impresoras-de-etiquetas",
        "impresoras-por-volumen-y-conexion",
        "etiquetas-termicas-y-portarrollos",
        "balanzas-digitales-para-envios",
        "accesorios-y-suministros-de-embalaje",
    }
    blocks = [
        {
            "type": "p",
            "text": f"Bienvenido al hub especializado de **{p['title']}** en **DespachoListo.com**. Aquí reunimos nuestras **{len(child_items)} guías especializadas** sobre **{p['focus']}**, organizadas sin canibalización para ayudarte a equipar tu estación de envíos al mejor precio en **Amazon Estados Unidos (`amazon.com`)** o **Amazon España (`amazon.es`)**.",
        },
        {
            "type": "p",
            "text": "Tanto si quieres revisar la **[comparativa Rollo vs MUNBYN vs KNAON](/comparativas-impresoras-de-etiquetas/rollo-vs-munbyn-vs-knaon-cual-elegir-segun-volumen-y-conexion/)**, analizar la **[Rollo Wireless X1040 Wi-Fi AirPrint](/resenas-impresoras-termicas-4x6/rollo-wireless-x1040-impresora-termica-wifi-airprint-resena/)**, calcular **[cuánto cuesta etiquetar 100 paquetes](/costos-y-rentabilidad-por-100-paquetes/cuanto-cuesta-etiquetar-100-paquetes-termica-4x6-vs-tinta/)** o elegir **[etiquetas en rollo vs plegadas fan-fold](/etiquetas-en-rollo-vs-plegadas-fanfold/etiquetas-en-rollo-vs-plegadas-fanfold-que-acepta-cada-impresora/)**, cada guía incluye datos verificados de compatibilidad y ahorro.",
        },
        {"type": "h2", "text": f"Qué analizamos en {p['title'].split('(')[0].split(':')[0].strip()}"},
        {
            "type": "p",
            "text": f"En cada una de las **{len(child_items)} guías** de este silo detallamos los 4 pilares operativos de una estación de despacho rentable: **1) Volumen diario de paquetes** (1–15, 20–80 o +100/día); **2) Tipo de conexión** (USB, Bluetooth con app o Wi-Fi AirPrint nativo desde celular y PC); **3) Formato de etiquetas aceptadas** (rollo interno/externo o plegadas *fan-fold* con portarrollos); y **4) Costo exacto cada 100 paquetes** más balanzas y embalaje compatible.",
        },
        {
            "type": "table",
            "caption": f"Guías principales en {p['title'].split('(')[0].strip()}",
            "headers": ["Guía / Comparativa de Etiquetado y Despacho", "Enlace Directo"],
            "rows": table_rows,
        },
        {
            "type": "callout",
            "variant": "etiqueta",
            "title": "Regla Práctica Antes de Comprar Impresora Térmica 4×6 en Amazon",
            "text": "Evita modelos con chip propietario DRM que te obligan a pagar hasta US$ 7 cada 100 etiquetas. Tanto Rollo como MUNBYN y KNAON aceptan etiquetas térmicas estándar 4×6 (rollo o fan-fold), logrando un costo de US$ 1.30 a US$ 2.60 por cada 100 paquetes sin gastar un centavo en tinta.",
        },
        {"type": "h2", "text": "Cómo acertar con tu equipo en 3 pasos rápidos"},
        {
            "type": "ol",
            "items": [
                "**Ajusta la marca al volumen y dispositivos:** para 1–45 envíos/día con celular o PC destaca **[KNAON Y812BT](/resenas-impresoras-termicas-4x6/knaon-y812bt-bluetooth-impresora-termica-economica-resena/)**; de 10 a 150 envíos/día brillan **[MUNBYN 941 USB](/resenas-impresoras-termicas-4x6/munbyn-realwriter-941-itpp941-impresora-termica-usb-resena/)** y **[RW130B Bluetooth](/resenas-impresoras-termicas-4x6/munbyn-rw130b-bluetooth-impresora-termica-resena/)**; y para imprimir directo por AirPrint o alto volumen continuo lidera **[Rollo Wireless X1040](/resenas-impresoras-termicas-4x6/rollo-wireless-x1040-impresora-termica-wifi-airprint-resena/)**.",
                "**Elige etiquetas plegadas (fan-fold) o añade portarrollos:** recuerda que Rollo, MUNBYN 941/130B y KNAON cargan las etiquetas por atrás; si usas rollos, añade un **[portarrollos externo dual 2-en-1](/etiquetas-termicas-y-portarrollos/mejores-portarrollos-externos-para-rollo-munbyn-y-knaon/)**.",
                "**Completa tu estación con balanza y sobres ligeros:** evita ajustes postales pesando cajas grandes con la **[Accuteck ShipPro W-8580](/balanzas-digitales-para-envios/accuteck-shippro-w8580-balanza-digital-110-lb-resena/)** de pantalla externa.",
            ],
        },
        {
            "type": "cta",
            "text": "¿No sabes si elegir Rollo, MUNBYN o KNAON para tu tienda? Pregúntale ahora mismo a nuestro Asesor de Despacho IA.",
        },
    ]
    faqs = [
        {
            "q": f"¿Qué marcas comparamos en {p['title'].split('(')[0].strip()}?",
            "a": "Evaluamos principalmente Rollo (X1038 USB y X1040 Wireless AirPrint), MUNBYN (RealWriter 941 USB, RW130B/RW402B Bluetooth, 941P 300 DPI, RW401AP Wi-Fi y 129B bandeja interna) y KNAON (Y812BT/Y813BT), contrastadas frente a JADENS, NELKO, Brother QL-1110NWB, DYMO 5XL y Zebra.",
        },
        {
            "q": "¿Cuánto cuesta realmente etiquetar 100 paquetes con impresora térmica 4×6?",
            "a": "Entre US$ 2.10 y US$ 2.60 por cada 100 envíos usando paquetes de 500 etiquetas y entre US$ 1.30 y US$ 1.70 en cajas de 4,000 etiquetas fan-fold. Como imprimen por calor directo, no utilizan cartuchos de tinta ni tóner.",
        },
        {
            "q": "¿Las fuentes de poder de Amazon EE. UU. funcionan en Perú y Latinoamérica (220V)?",
            "a": "Sí: la gran mayoría de impresoras térmicas de escritorio Rollo, MUNBYN y KNAON incluyen adaptadores universales multivoltaje (100–240V 50/60 Hz). Solo revisa el formato de enchufe o añade un adaptador plano de clavija.",
        },
    ]
    return {
        "slug": cat_slug,
        "pillar": cat_slug,
        "path": path,
        "isPillar": True,
        "isTransactional": is_trans_pillar,
        "primaryKeyword": p["kw"],
        "title": p["title"],
        "seoTitle": f"{p['title']} | DespachoListo.com",
        "metaDescription": f"Guía completa sobre {p['focus']}. Compara Rollo, MUNBYN y KNAON por volumen, conexión y costo cada 100 paquetes en Amazon EE. UU.",
        "excerpt": f"Explora las {len(child_items)} guías sobre {p['focus']} con comparativas, etiquetas compatibles y accesorios.",
        "quickAnswer": f"En esta sección reunimos {len(child_items)} guías especializadas sobre {p['focus']}. Comparamos equipos de Rollo, MUNBYN y KNAON según pedidos diarios, conexión desde celular o computadora, etiquetas en rollo o plegadas y costo por 100 paquetes en Amazon EE. UU.",
        "readingMinutes": 8,
        "image": {
            "prompt": build_diverse_prompt(p["subject"], idx),
            "alt": p["title"],
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "Amazon.com Best Sellers in Label Printers & Shipping Supplies", "url": "https://www.amazon.com/Best-Sellers-Office-Products-Label-Printers/zgbs/office-products/1069546"},
            {"label": "USPS Domestic Mail Manual — Barcode & Label Placement Guidelines", "url": "https://pe.usps.com/"},
        ],
        "related": related_paths,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
        "imageUrl": f"/img/ambiente/cat-{cat_slug}.webp",
    }


def make_transactional_article(item: tuple, sibling_paths: list, idx: int) -> dict:
    slug, title, pillar, kw, vol, conn, lbl, c100, picks, subj = item
    slug = clean_slug(slug)
    path = f"/{pillar}/{slug}/"
    rel = [p for p in sibling_paths if p != path][:3]
    rel.insert(0, f"/{pillar}/")

    blocks = [
        {
            "type": "p",
            "text": f"Analizar en detalle **{title}** te permite elegir la configuración exacta para despachar pedidos sin pérdidas de tiempo ni sobrecostos. En esta guía para **Amazon Estados Unidos (`amazon.com`)** evaluamos su **capacidad por volumen diario ({vol})**, la **conectividad desde celular o PC ({conn})**, el **formato de etiquetas aceptadas ({lbl})** y el **costo operativo real por cada 100 paquetes ({c100})**.",
        },
        {
            "type": "h2",
            "text": "Evaluación por volumen diario, celular/PC y formato de etiquetas",
        },
        {
            "type": "p",
            "text": f"Al revisar **{picks}**, lo que separa una estación de despacho fluida de una llena de atascos es cómo combina **{conn.lower()}** con la alimentación **{lbl.lower()}**. Con una capacidad recomendada de **{vol.lower()}**, mantienes códigos de barras nítidos aceptados por Shopify, Amazon FBA, Mercado Envíos, USPS, UPS y DHL con un costo aproximado de **{c100}**.",
        },
        {
            "type": "callout",
            "variant": "etiqueta",
            "title": f"Ficha Técnica Operativa: {picks.split(',')[0].strip()}",
            "text": f"• Volumen diario recomendado: {vol}.\n• Conexión y dispositivos: {conn}.\n• Etiquetas en rollo o plegadas aceptadas: {lbl}.\n• Costo estimado por 100 paquetes: {c100}.",
        },
        {
            "type": "h2",
            "text": f"Comparativa directa en Amazon EE. UU.: {title}",
        },
        {
            "type": "p",
            "text": "Contrasta esta selección frente a los equipos y accesorios líderes del mercado en Amazon Estados Unidos:",
        },
        {
            "type": "table",
            "caption": f"Tabla comparativa de desempeño 4×6 para {title}",
            "headers": [
                "Equipo / Opción en Amazon",
                "Volumen y Conexión Celular/PC",
                "Etiquetas Aceptadas (Rollo / Fan-Fold)",
                "Costo / 100 Paquetes",
            ],
            "rows": [
                [
                    f"**Selección Principal: {picks.split(',')[0].strip()}**",
                    f"{vol} · {conn}",
                    lbl,
                    c100,
                ],
                [
                    "**Inalámbrica AirPrint: [Rollo Wireless X1040](/resenas-impresoras-termicas-4x6/rollo-wireless-x1040-impresora-termica-wifi-airprint-resena/)**",
                    "30 a +300/día · Wi-Fi AirPrint nativo + USB",
                    "Fan-Fold trasero y rollo externo (sin DRM)",
                    "US$ 1.50 – US$ 2.40",
                ],
                [
                    "**Bluetooth Versátil: [MUNBYN RW130B](/resenas-impresoras-termicas-4x6/munbyn-rw130b-bluetooth-impresora-termica-resena/) / [941 USB](/resenas-impresoras-termicas-4x6/munbyn-realwriter-941-itpp941-impresora-termica-usb-resena/)**",
                    "10 a 150/día · Bluetooth App + USB PC/Mac",
                    "Fan-Fold y rollo externo (1\" con soporte)",
                    "US$ 1.60 – US$ 2.50",
                ],
                [
                    "**Inicio Económico: [KNAON Y812BT Bluetooth](/resenas-impresoras-termicas-4x6/knaon-y812bt-bluetooth-impresora-termica-economica-resena/)**",
                    "1 a 45/día · Bluetooth móvil + USB/USB-C",
                    "Fan-Fold trasero y rollo con portarrollos",
                    "US$ 1.60 – US$ 2.50",
                ],
            ],
        },
        {
            "type": "h2",
            "text": "Qué portarrollos, etiquetas, balanza y embalaje combinar",
        },
        {
            "type": "ul",
            "items": [
                "**Etiquetas 4×6 sin chip propietario:** combina tu impresora con pilas plegadas **[Fan-Fold de 500 o 4,000 unidades](/etiquetas-termicas-y-portarrollos/mejores-etiquetas-termicas-4x6-rollo-y-fanfold-amazon/)**; si prefieres usar rollos sobre la mesa, añade un **[portarrollos externo 2-en-1](/etiquetas-termicas-y-portarrollos/mejores-portarrollos-externos-para-rollo-munbyn-y-knaon/)**.",
                "**Balanza digital con visor externo:** pesa tus sobres y cajas grandes con la **[Accuteck ShipPro W-8580 (110 lb)](/balanzas-digitales-para-envios/accuteck-shippro-w8580-balanza-digital-110-lb-resena/)** usando Tara y Hold.",
                "**Regla de conservación térmica:** nunca pegues cinta transparente encima de una etiqueta térmica 4×6 porque el adhesivo acrílico acelera el desvanecimiento de la tinta química térmica.",
            ],
        },
        {
            "type": "h2",
            "text": "3 pasos para armar tu estación lista en Amazon EE. UU.",
        },
        {
            "type": "steps",
            "items": [
                {
                    "name": "Confirma cómo generarás la mayoría de guías (Celular vs PC)",
                    "text": "Si despachas desde iPhone/Mac sin abrir apps intermedias, prioriza AirPrint Wi-Fi; si manejas app móvil o presupuesto ajustado, elige Bluetooth + USB.",
                },
                {
                    "name": "Añade etiquetas 4×6 y portarrollos en el mismo carrito",
                    "text": "Asegura al menos un pack de 500 etiquetas fan-fold o rollo de 1\" y un portarrollos si tu mesa no tiene espacio trasero amplio.",
                },
                {
                    "name": "Calibra el salto de etiqueta antes de tu primer lote",
                    "text": "Carga la primera etiqueta térmica mirando hacia arriba, presiona el botón Feed durante 3 segundos hasta que avance sola y fija el formato 4×6\" en Shopify, Amazon o tu courier.",
                },
            ],
        },
        {
            "type": "callout",
            "variant": "aviso",
            "title": "Tip de ahorro real cada 100 paquetes",
            "text": "Al pasar de impresora de tinta y hojas carta (US$ 10–18 cada 100 envíos + tijeras y cinta) a etiquetas térmicas 4×6 directas (US$ 1.50–2.50 cada 100 envíos), el equipo suele pagarse solo antes de completar tus primeros 500 despachos.",
        },
        {
            "type": "cta",
            "text": "¿Quieres confirmar si este modelo se integra con tu celular, Mac/Windows o tipo de etiquetas? Pregunta ahora a nuestro Asesor de Despacho IA.",
        },
    ]

    faqs = [
        {
            "q": f"¿Qué volumen de pedidos soporta bien {title.split(':')[0]}?",
            "a": f"El rango óptimo se ubica en {vol}, manteniendo nitidez uniforme para escáneres de USPS, UPS, FedEx, DHL y Mercado Envíos.",
        },
        {
            "q": "¿Qué etiquetas en rollo o plegadas acepta y cuánto cuesta imprimir 100 paquetes?",
            "a": f"Acepta {lbl}, con un costo operativo estimado de {c100} sin gastar cartuchos de tinta ni cinta para pegar papel.",
        },
        {
            "q": "¿Puedo imprimir fácilmente desde mi celular además de la computadora?",
            "a": f"La conectividad corresponde a: {conn}. Revisa arriba si utiliza AirPrint nativo o app Bluetooth gratuita junto a conexión USB.",
        },
        {
            "q": "¿Los botones de esta página enlazan a productos verificados en Amazon?",
            "a": "Sí. Nuestras tarjetas dirigen a listados en Amazon Estados Unidos (tag despacholisto-20) e incluyen selector manual para Amazon España (tag despacholisto-21).",
        },
    ]

    quick_answer = (
        f"En nuestro análisis de {title}, destaca para un volumen de {vol.lower()} mediante conexión {conn.lower()}. "
        f"Admite {lbl.lower()} con un costo aproximado de {c100.lower()} cada 100 paquetes, recomendando {picks}."
    )

    return {
        "slug": slug,
        "pillar": pillar,
        "path": path,
        "isPillar": False,
        "isTransactional": True,
        "primaryKeyword": kw,
        "title": title,
        "seoTitle": f"{title} | DespachoListo.com",
        "metaDescription": f"Análisis de {title} en Amazon EE. UU.: volumen ({vol}), conexión ({conn}), etiquetas ({lbl}) y costo cada 100 paquetes ({c100}).",
        "excerpt": f"Guía completa de {title}: volumen recomendado, conexión móvil/PC, compatibilidad rollo vs fan-fold y costo cada 100 envíos.",
        "quickAnswer": quick_answer,
        "readingMinutes": 7,
        "image": {
            "prompt": build_diverse_prompt(subj, idx),
            "alt": title,
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "Amazon.com Best Sellers in Thermal Shipping Label Printers", "url": "https://www.amazon.com/Best-Sellers-Office-Products-Label-Printers/zgbs/office-products/1069546"},
            {"label": "USPS Shipping Label Specifications (4x6 Standard)", "url": "https://pe.usps.com/"},
        ],
        "related": rel,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
        "imageUrl": None,
    }


def make_seo_article(item: tuple, sibling_paths: list, idx: int) -> dict:
    slug, title, pillar, kw, focus_summary, subj = item
    slug = clean_slug(slug)
    path = f"/{pillar}/{slug}/"
    rel = [p for p in sibling_paths if p != path][:3]
    rel.insert(0, f"/{pillar}/")

    blocks = [
        {
            "type": "p",
            "text": f"Dominar **{title}** evita retrasos en paquetería, códigos ilegibles, atascos de etiquetas y gastos innecesarios por envío. En **DespachoListo.com** elaboramos esta **{focus_summary}** aplicada a impresoras térmicas **Rollo, MUNBYN y KNAON**, etiquetas **4×6**, portarrollos y balanzas digitales disponibles en **Amazon Estados Unidos**.",
        },
        {
            "type": "h2",
            "text": f"Claves operativas: {title}",
        },
        {
            "type": "p",
            "text": f"En un flujo de e-commerce real, aplicar correctamente esta **{focus_summary}** impacta tanto en tu velocidad de empaque (minutos ahorrados por cada 100 envíos) como en la tasa de lectura a la primera por los lectores láser de USPS, UPS, FedEx, DHL y Mercado Envíos.",
        },
        {
            "type": "callout",
            "variant": "tip",
            "title": "Regla de estación de despacho antes de imprimir en lote",
            "text": "Configura siempre el tamaño de página exacto en 4 × 6 pulgadas (101.6 × 152.4 mm), verifica que el papel térmico tenga el recubrimiento mirando hacia el cabezal y realiza una prueba de 1 etiqueta antes de mandar 50 guías seguidas.",
        },
        {
            "type": "h2",
            "text": "Cómo aplica en Rollo, MUNBYN y KNAON (y costo × 100 paquetes)",
        },
        {
            "type": "table",
            "caption": f"Matriz técnica aplicada a {title}",
            "headers": [
                "Marca y Modelo",
                "Volumen y Conexión Celular / PC",
                "Etiquetas Aceptadas (Rollo / Fan-Fold)",
                "Costo / 100 Paquetes",
            ],
            "rows": [
                [
                    "**Rollo ([X1040 Wireless](/resenas-impresoras-termicas-4x6/rollo-wireless-x1040-impresora-termica-wifi-airprint-resena/) / X1038 USB)**",
                    "30 a +400/día · Wi-Fi AirPrint nativo o USB estable",
                    "Ranura trasera abierta: Fan-Fold o rollos con portarrollos externo",
                    "US$ 1.50 – US$ 2.40",
                ],
                [
                    "**MUNBYN ([941 USB](/resenas-impresoras-termicas-4x6/munbyn-realwriter-941-itpp941-impresora-termica-usb-resena/) / [RW130B BT](/resenas-impresoras-termicas-4x6/munbyn-rw130b-bluetooth-impresora-termica-resena/) / 941P)**",
                    "10 a 150/día · Bluetooth App móvil + USB (203 / 300 DPI)",
                    "Fan-Fold y rollo externo (bandeja interna en ITPP129)",
                    "US$ 1.60 – US$ 2.50",
                ],
                [
                    "**KNAON ([Y812BT Bluetooth](/resenas-impresoras-termicas-4x6/knaon-y812bt-bluetooth-impresora-termica-economica-resena/))**",
                    "1 a 45/día · Bluetooth (App) + USB/USB-C económico",
                    "Fan-Fold trasero y rollo externo con soporte universal",
                    "US$ 1.60 – US$ 2.50",
                ],
                [
                    "**Comparativa vs Hoja Carta Inkjet/Láser**",
                    "Requiere recortar, alinear y sellar con cinta encima",
                    "Hojas 8.5×11\" + cartuchos de tinta o tóner",
                    "US$ 10.00 – US$ 18.00",
                ],
            ],
        },
        {
            "type": "h2",
            "text": f"Procedimiento paso a paso: {title}",
        },
        {
            "type": "steps",
            "items": [
                {
                    "name": "Revisa tu modelo de impresora, conexión y formato de etiqueta",
                    "text": "Confirma si tu equipo conecta por USB, Bluetooth (mediante app puente) o Wi-Fi AirPrint nativo, y si alimentas desde pila plegada fan-fold o desde un portarrollos externo.",
                },
                {
                    "name": "Aplica el ajuste técnico recomendado sin forzar el hardware",
                    "text": f"Implementa paso a paso esta {focus_summary}, verificando escala al 100 % (sin 'Ajustar a página' si el PDF ya es 4×6\") y contraste de código de barras.",
                },
                {
                    "name": "Valida pesaje, pegado y escaneo antes de entregar al courier",
                    "text": "Pesa el paquete sellado con Tara/Hold, pega la etiqueta térmica en zona plana (sin doblar las barras por la esquina ni cubrirlas con cinta transparente) y escanea un código de prueba con la cámara del celular.",
                },
            ],
        },
        {
            "type": "h2",
            "text": "Errores frecuentes al etiquetar y despachar que debes evitar",
        },
        {
            "type": "ul",
            "items": [
                "**Cubrir la etiqueta térmica con cinta adhesiva:** la reacción del pegamento con el papel térmico borra el código de barras en pocos días; utiliza etiquetas impermeables y pégalas directamente limpiando el cabezal según nuestra **[guía de limpieza IPA](/calibracion-mantenimiento-y-fallas/como-limpiar-el-cabezal-de-impresora-termica-lineas-blancas/)**.",
                "**Imprimir guías de Shopify o Mercado Libre en formato carta sin recortar:** activa siempre la salida `4×6` nativa revisando la **[guía de configuración en plataformas](/configuracion-shopify-amazon-y-couriers/configurar-etiquetas-4x6-en-shopify-amazon-y-mercado-envios/)**.",
                "**Dejar el rollo suelto rodando sobre la mesa:** evita jalones y etiquetas torcidas utilizando pilas fan-fold o un **[portarrollos dual 2-en-1](/etiquetas-termicas-y-portarrollos/mejores-portarrollos-externos-para-rollo-munbyn-y-knaon/)**.",
            ],
        },
        {
            "type": "cta",
            "text": "¿Necesitas elegir impresora 4×6, etiquetas, portarrollos o balanza para tu tienda hoy? Pregúntale gratis a nuestro Asesor IA.",
        },
    ]

    faqs = [
        {
            "q": f"¿Esta guía de {title} sirve igual para Rollo, MUNBYN y KNAON?",
            "a": "Sí. Aunque varíe la app Bluetooth o el driver USB de cada fabricante, las impresoras térmicas directas 4×6 comparten principios estándar de calibración, contraste, tamaño 101.6 × 152.4 mm y alimentación trasera sin DRM.",
        },
        {
            "q": "¿Cuántas etiquetas rinde un paquete de 500 o caja de 4,000 y cuánto cuesta cada 100 paquetes?",
            "a": "Un paquete de 500 cubre 500 envíos (unos US$ 2.10–2.60 cada 100 paquetes) y una caja de 4,000 baja el costo a US$ 1.30–1.70 cada 100 paquetes, ahorrando hasta un 85 % frente a impresoras de tinta.",
        },
        {
            "q": "¿Dónde consultar precios de equipos y accesorios relacionados en Amazon?",
            "a": "En las tarjetas de producto integradas en esta página puedes consultar disponibilidad y precio actualizado en Amazon Estados Unidos (amazon.com) y Amazon España (amazon.es).",
        },
    ]

    quick_answer = (
        f"Para aplicar correctamente {title}, verifica tu formato de salida exacto (4×6 pulgadas / 100×150 mm), "
        f"elige el método de conexión adecuado (USB, Bluetooth o Wi-Fi AirPrint) y utiliza etiquetas fan-fold o en rollo sin DRM. "
        f"Esta {focus_summary} optimiza Rollo, MUNBYN y KNAON bajando el costo por cada 100 envíos a ~US$ 1.80."
    )

    return {
        "slug": slug,
        "pillar": pillar,
        "path": path,
        "isPillar": False,
        "isTransactional": False,
        "primaryKeyword": kw,
        "title": title,
        "seoTitle": f"{title} | DespachoListo.com",
        "metaDescription": f"Guía operativa sobre {title}. Pasos prácticos para Rollo, MUNBYN, KNAON, etiquetas 4×6, balanzas y despacho e-commerce.",
        "excerpt": f"Tutorial práctico sobre {title}: {focus_summary}.",
        "quickAnswer": quick_answer,
        "readingMinutes": 6,
        "image": {
            "prompt": build_diverse_prompt(subj, idx),
            "alt": title,
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "USPS Packaging & Label Placement Standards", "url": "https://pe.usps.com/"},
        ],
        "related": rel,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
        "imageUrl": None,
    }


def main():
    for old in ART_DIR.glob("*.json"):
        old.unlink()

    trans_items = generate_transactional_500()
    seo_items = generate_seo_1000()

    by_pillar: dict[str, list] = {p["slug"]: [] for p in PILLARS}
    for it in trans_items:
        by_pillar[it[2]].append(it)
    for it in seo_items:
        by_pillar[it[2]].append(it)

    all_articles = []
    seen_slugs = set()
    seen_kws = set()
    seen_titles = set()
    idx = 0

    # 1. Generar los 14 Hubs Pilares
    for p in PILLARS:
        art = make_pillar_article(p, by_pillar[p["slug"]], idx)
        idx += 1
        assert art["slug"] not in seen_slugs, f"Duplicate slug: {art['slug']}"
        assert art["primaryKeyword"] not in seen_kws, f"Duplicate kw: {art['primaryKeyword']}"
        assert art["title"] not in seen_titles, f"Duplicate title: {art['title']}"
        seen_slugs.add(art["slug"])
        seen_kws.add(art["primaryKeyword"])
        seen_titles.add(art["title"])
        all_articles.append(art)

    pillar_paths = {
        p_slug: [f"/{p_slug}/{clean_slug(c[0])}/" for c in c_list]
        for p_slug, c_list in by_pillar.items()
    }

    # 2. Generar los 500 Artículos Transaccionales
    for i, it in enumerate(trans_items):
        p_slug = it[2]
        sibs = pillar_paths[p_slug]
        rot_sibs = sibs[(i + 1) % len(sibs):] + sibs[: (i + 1) % len(sibs)]
        art = make_transactional_article(it, rot_sibs, idx)
        idx += 1
        assert art["slug"] not in seen_slugs, f"Duplicate slug: {art['slug']}"
        assert art["primaryKeyword"] not in seen_kws, f"Duplicate kw: {art['primaryKeyword']}"
        assert art["title"] not in seen_titles, f"Duplicate title: {art['title']}"
        seen_slugs.add(art["slug"])
        seen_kws.add(art["primaryKeyword"])
        seen_titles.add(art["title"])
        all_articles.append(art)

    # 3. Generar los 1,000 Artículos SEO Informacionales
    for i, it in enumerate(seo_items):
        p_slug = it[2]
        sibs = pillar_paths[p_slug]
        rot_sibs = sibs[(i + 1) % len(sibs):] + sibs[: (i + 1) % len(sibs)]
        art = make_seo_article(it, rot_sibs, idx)
        idx += 1
        assert art["slug"] not in seen_slugs, f"Duplicate slug: {art['slug']}"
        assert art["primaryKeyword"] not in seen_kws, f"Duplicate kw: {art['primaryKeyword']}"
        assert art["title"] not in seen_titles, f"Duplicate title: {art['title']}"
        seen_slugs.add(art["slug"])
        seen_kws.add(art["primaryKeyword"])
        seen_titles.add(art["title"])
        all_articles.append(art)

    for art in all_articles:
        (ART_DIR / f"{art['slug']}.json").write_text(
            json.dumps(art, ensure_ascii=False, indent=2), encoding="utf-8"
        )

    kw_map = [
        {
            "slug": a["slug"],
            "pillar": a["pillar"],
            "path": a["path"],
            "isPillar": a["isPillar"],
            "isTransactional": a["isTransactional"],
            "primaryKeyword": a["primaryKeyword"],
            "title": a["title"],
        }
        for a in all_articles
    ]
    (DATA_DIR / "keyword_map.json").write_text(
        json.dumps(kw_map, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    cat_names = {
        p["slug"]: p["title"].split(":")[0].split("(")[0].strip()
        for p in PILLARS
    }
    search_index = [
        {
            "t": a["title"],
            "p": a["path"],
            "n": cat_names.get(a["pillar"], a["pillar"]),
            "r": a["readingMinutes"],
        }
        for a in all_articles
    ]
    (PUB_DIR / "search-index.json").write_text(
        json.dumps(search_index, ensure_ascii=False), encoding="utf-8"
    )

    print(
        f"OK: Generados {len(all_articles)} artículos únicos "
        f"({len(PILLARS)} Pilares + {len(trans_items)} Transaccionales Amazon + {len(seo_items)} SEO Informacionales). "
        f"0% Canibalización verificada."
    )


if __name__ == "__main__":
    main()
