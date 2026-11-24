#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador y optimizador de imágenes reales con ChatGPT Image API (vía Supabase Edge Function
`despacholisto-images` en quality="medium") para despacholisto.com.
Características:
1. 51 escenas únicas de ambiente (`public/img/ambiente/`) + artículos estrella (`public/img/articulos/`).
2. Prompts heterogéneos (ángulos, superficies e iluminación distintos) + auditoría perceptual dHash.
3. Compresión WebP responsiva estricta < 100 KB:
   - 1200×675 <= 68 KB
   - 800×450  <= 42 KB
   - 400×225  <= 18 KB
"""
import concurrent.futures as cf
import io
import json
import pathlib
import sys
import time
import urllib.error
import urllib.request
from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
CACHE_DIR = ROOT / "scripts/.cache"
CACHE_DIR.mkdir(parents=True, exist_ok=True)

ENDPOINT = "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/despacholisto-images"
TOKEN = "despacholisto-img-2026"

HOME_PROMPTS = {
    # 9 escenas principales Home & OG
    "home-hero-impresoras": "Wide editorial daylight photograph of a modern online store fulfillment counter on warm light oak wood, featuring a sleek matte black Wi-Fi 4x6 direct thermal printer actively outputting a crisp parcel label from a rear stack of folded labels beside sealed brown corrugated shipping boxes and a compact digital postal scale, shallow depth of field, warm sunlight from a side window",
    "og-default": "Clean overhead isometric studio composition on bright slate gray felt mat showing three direct thermal 4x6 label printers in white, black and silver-gray arranged beside a digital postal scale, colorful self-seal poly mailers and folded thermal shipping labels",
    "home-imprimir-celular": "Close-up natural window light photo of an entrepreneur hand holding a smartphone sending a wireless AirPrint parcel label directly to a compact rounded white Bluetooth 4x6 thermal printer over a walnut desk with opaque mailing envelopes",
    "home-rollo-fanfold": "Crisp three-quarter rear side profile photo on a brushed concrete studio bench highlighting both feeding modes: a thick 1-inch core thermal label roll mounted on a black external dual holder beside a flat accordion-folded stack of 4x6 fan-fold labels entering a thermal printer rear slot",
    "home-costo-100-paquetes": "Overhead flat-lay studio photograph on clean white surface displaying a neat matrix of sealed poly mailers and kraft bubble envelopes topped with crisp thermal shipping stickers next to an open bulk carton of 4,000 labels and a minimalist desk calculator",
    "home-impresora-wifi": "Three-quarter front studio view inside a bright modern loft workspace showing a wireless dual-band Wi-Fi thermal label unit synced with a glowing router LED, silver laptop and iPad preparing multiple e-commerce courier orders simultaneously",
    "home-shopify-despacho": "Editorial lifestyle shot from behind a modern ultra-thin laptop showing an order fulfillment dashboard connected via USB-C to a matte charcoal desktop 4x6 label printer sitting next to taped parcels ready for pickup",
    "home-balanza-envios": "Sharp eye-level commercial photograph of a brushed stainless steel digital shipping scale weighing a medium corrugated parcel while its coiled external LCD readout display rests clearly in the foreground beside packing tape",
    "home-embalaje-mailers": "Bright high-angle arrangement of an organized e-commerce packing supply rack holding teal and white opaque waterproof poly mailers, honeycombed protective kraft paper rolls, padded kraft bubble envelopes and a heavy-duty metallic 2-inch tape gun",

    # 14 escenas de Hubs Pilares (cat-*)
    "cat-resenas-impresoras-termicas-4x6": "Editorial product lineup of four distinct compact 4x6 direct thermal shipping label printers arranged diagonally on warm oak plank table with natural morning sidelight and sample blank parcel stickers",
    "cat-comparativas-impresoras-de-etiquetas": "Controlled studio comparison table with soft overhead diffused light showing two rival thermal 4x6 desktop label machines angled slightly toward center beside a fan-fold tray and a roll holder stand",
    "cat-impresoras-por-volumen-y-conexion": "Graduated workflow photography across a long warehouse packing workbench moving left-to-right from a mini pocket-sized Bluetooth labeler for five daily parcels up to an Ethernet workstation printer feeding a huge 4,000-label carton",
    "cat-etiquetas-termicas-y-portarrollos": "Top-down macro studio display of different thermal label consumables: accordion fan-fold stacks, 1-inch core 500-label rolls mounted on a metal collapsible dual stand, narrow 2.25x1.25 FNSKU barcodes and circular boutique stickers",
    "cat-balanzas-digitales-para-envios": "Commercial warehouse weighing corner showing both a compact 110-lb desktop ABS postal scale with fold-up envelope wings and a heavy 440-lb stainless steel floor platform beside stacked outbound parcels",
    "cat-accesorios-y-suministros-de-embalaje": "Neatly compartmentalized shipping prep bench photographed in crisp daylight with acrylic envelope divider rack, ceramic box cutter, 2-inch ergonomic tape gun, bubble cushioning roll and clear packing-list pouches",
    "cat-imprimir-etiquetas-desde-celular-y-pc": "Cozy home studio setup illuminated by soft desk lamp showing an iPhone, an Android handset, a MacBook laptop and a Windows tablet neatly positioned around one USB and Wi-Fi thermal 4x6 printer",
    "cat-etiquetas-en-rollo-vs-plegadas-fanfold": "Clean cutaway side-angle architectural view demonstrating an open clam-shell internal roll bay holding a 250-label roll contrasted against a sleek low-profile thermal unit drawing fan-fold paper smoothly through the back slot",
    "cat-costos-y-rentabilidad-por-100-paquetes": "Crisp top-down financial efficiency scene comparing two clean tall stacks of pre-labeled cardboard boxes and self-seal mailers beside an unused inkjet cartridge crossed off visually next to inkless white thermal sheets",
    "cat-configuracion-shopify-amazon-y-couriers": "Wide horizontal shot of a multi-channel seller desk featuring dual widescreen monitors displaying shipping queue grids wired to a high-speed thermal label printer ejecting batch 4x6 courier slips",
    "cat-resolucion-dpi-codigos-de-barras-y-formatos": "Extreme macro lens close-up over matte adhesive label stock contrasting razor-sharp tiny 300 DPI QR matrices and fine horizontal micro-bars against bold standard 203 DPI shipping stripes under crisp studio rim lighting",
    "cat-calibracion-mantenimiento-y-fallas": "Hands wearing clean blue nitrile workshop gloves gently wiping the golden ceramic resistor line of an open thermal printhead using an isopropyl alcohol cleaning pen beside a lint-free microfiber cloth",
    "cat-pesaje-cubicaje-y-preparacion-de-pedidos": "Precision logistics station photograph of an operator wrapping fragile ceramic jars in expanded honeycomb kraft paper beside a digital shipping scale displaying tare weight and a ruler measuring cardboard box dimensions",
    "cat-organizacion-estacion-de-despacho-y-amazon-usa": "Architectural wide shot of an ultra-efficient apartment packing nook under four feet wide combining wall-mounted pegboard shelves for mailers, hidden under-desk USB cable tray, compact thermal labeler and postal scale",

    # 28 escenas variantes por silo (scene-*-2 y scene-*-3)
    "scene-resenas-2": "Low-angle dramatic desk shot looking up at a matte black high-speed USB shipping printer ejecting crisp labels into a catching tray under warm studio backlight",
    "scene-resenas-3": "Minimalist Scandinavian shelf studio scene highlighting a compact white clamshell Bluetooth 4x6 label printer next to small pastel courier pouches and ceramic planter",
    "scene-comparativas-2": "Isometric top-three-quarter studio view comparing cable ports, cooling vents and manual rear label guides across two contrasting direct thermal machines on gray slate",
    "scene-comparativas-3": "Lifestyle boutique storefront counter showing an iPad AirPrint wireless unit printing briskly alongside a USB fixed station during evening fulfillment rush",
    "scene-volumen-2": "Busy seasonal rush scene with two operators filling courier tote bins simultaneously on an eight-foot steel fulfillment table lined with labeled boxes",
    "scene-volumen-3": "Calm early-morning bedroom office starter setup with a fold-up portable laptop stand, five bubble mailers and an ultra-compact entry-level USB-C thermal label maker",
    "scene-etiquetas-2": "Close-up macro texture view focusing on clean perforated tear lines between matte waterproof thermal shipping sheets gleaming subtly under soft diffused light",
    "scene-etiquetas-3": "Rear hardware detail showing a rigid black external dual roll-and-fanfold bracket holding a heavy jumbo shipping roll taut without curling behind a desk printer",
    "scene-balanzas-2": "Wall-mounted detached backlit digital scale screen bolted cleanly above eye level while a bulky oversized carton sits squarely on the low-profile stainless steel pad below",
    "scene-balanzas-3": "Compact shipping envelope resting vertically inside the flip-up side support wings of a black digital postal scale beside a tiny jewelry gram scale",
    "scene-embalaje-2": "Action closeup of hands smoothly dispensing brown water-activated kraft paper tape across the center seam of a double-wall corrugated fulfillment carton",
    "scene-embalaje-3": "Protective glassware wrapping station featuring die-cut honeycomb paper expanding horizontally beside padded kraft bubble sleeves and fragile warning labels",
    "scene-celular-2": "Handheld tablet point-of-sale counter in a pop-up market booth syncing live customer order stickers wirelessly via Bluetooth to a portable battery thermal unit",
    "scene-celular-3": "Clean Apple Silicon laptop workspace featuring a single braided USB-C OTG adapter connecting straight to a fast commercial thermal unit without hub clutter",
    "scene-fanfold-2": "Overhead warehouse carton perspective looking straight down into an open dispenser box of 4,000 crisp stacked fan-fold sheets feeding vertically onto a desk",
    "scene-fanfold-3": "Macro detail of clean adjustable teal sliding paper width guides hugging a narrow 1-inch core thermal roll inside an open clamshell thermal housing",
    "scene-costos-2": "Clean architectural flat-lay illustrating bulk scale economics: five neat bundles of 100 labeled parcels arranged beside one compact cardboard thermal brick",
    "scene-costos-3": "Entrepreneur seated at a bright sunlit wooden table peeling a crisp self-adhesive thermal shipping badge effortlessly without scissors, glue or plastic outer tape",
    "scene-plataformas-2": "Laptop connected in a cozy boutique studio trimming an 8.5x11 courier PDF cleanly onto a 4x6 screen preview before hitting silent instant thermal print",
    "scene-plataformas-3": "Warehouse dispatch screen displaying automated batch labels queueing seamlessly over local Ethernet cable to a rugged gray industrial thermal unit",
    "scene-dpi-2": "Laser barcode scanner casting a thin crisp red reading beam cleanly across dark high-contrast matte thermal lines affixed flat on a white poly mailer",
    "scene-dpi-3": "Water droplets beading cleanly over an untouched matte waterproof direct thermal parcel tag during simulated rainy outdoor courier handling",
    "scene-calibracion-2": "Close-up finger lightly pressing the illuminated glowing green calibration feed button on top of a sleek thermal housing to realign blank gap sensors",
    "scene-calibracion-3": "Detailed macro inside an opened thermal print mechanism showing a spotless black rubber platen roller free of adhesive buildup beside cleaning swab tools",
    "scene-pesaje-2": "Hands pressing a thermal courier sticker cleanly across the flat upper face of a white shipping mailer, carefully avoiding seams and curved flaps",
    "scene-pesaje-3": "Precision cubic dimension measuring workflow using an aluminum L-square ruler alongside a taped 12x9x6 parcel atop a black postal shipping scale",
    "scene-estacion-2": "Rear under-table cable management view showing neatly strapped black power bricks with universal 100-240V AC cords and velcro-routed USB lines",
    "scene-estacion-3": "End-of-day courier pickup staging mat near a doorway stocked with uniform barcoded boxes and colorful weatherproof poly pouches awaiting collection",
}

TOP_ARTICLE_SLUGS = [
    "rollo-wireless-x1040-impresora-termica-wifi-airprint-resena",
    "munbyn-realwriter-941-itpp941-impresora-termica-usb-resena",
    "munbyn-rw130b-bluetooth-impresora-termica-resena",
    "knaon-y812bt-bluetooth-impresora-termica-economica-resena",
    "munbyn-941p-itpp941p-300-dpi-impresora-termica-resena",
    "rollo-vs-munbyn-vs-knaon-cual-elegir-segun-volumen-y-conexion",
    "rollo-wireless-x1040-vs-munbyn-rw401ap-airprint",
    "munbyn-rw130b-vs-knaon-y812bt-bluetooth",
    "rollo-usb-x1038-vs-dymo-labelwriter-5xl-costo",
    "mejores-impresoras-termicas-4x6-por-volumen-pedidos-amazon",
    "mejores-impresoras-etiquetas-4x6-para-celular-iphone-android",
    "mejores-portarrollos-externos-para-rollo-munbyn-y-knaon",
    "mejores-etiquetas-termicas-4x6-rollo-y-fanfold-amazon",
    "etiquetas-mayoristas-4000-fanfold-ahorro-por-100-envios",
    "accuteck-shippro-w8580-balanza-digital-110-lb-resena",
    "mejores-sobres-poly-mailers-y-embalaje-para-tiendas-online",
    "como-imprimir-etiquetas-4x6-desde-iphone-y-android",
    "etiquetas-en-rollo-vs-plegadas-fanfold-que-acepta-cada-impresora",
    "cuanto-cuesta-etiquetar-100-paquetes-termica-4x6-vs-tinta",
    "como-limpiar-el-cabezal-de-impresora-termica-lineas-blancas",
]


def call_gen(slug: str, prompt: str) -> bytes:
    cache_file = CACHE_DIR / f"{slug}.webp"
    if cache_file.exists() and cache_file.stat().st_size > 1500:
        return cache_file.read_bytes()

    payload = json.dumps({"slug": slug, "prompt": prompt}).encode("utf-8")
    last_err = ""
    for attempt in range(4):
        req = urllib.request.Request(
            ENDPOINT,
            data=payload,
            headers={
                "Content-Type": "application/json",
                "x-despacholisto-token": TOKEN,
            },
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=140) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            if not data.get("ok") or not data.get("url"):
                raise RuntimeError(str(data))
            with urllib.request.urlopen(data["url"], timeout=60) as img_resp:
                raw = img_resp.read()
            cache_file.write_bytes(raw)
            return raw
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="ignore")
            last_err = f"HTTP {e.code}: {body[:220]}"
            if "insufficient_quota" in body or "billing_hard_limit_reached" in body:
                raise RuntimeError(f"OPENAI_QUOTA_ERROR: {body}")
            time.sleep(2.5 * (attempt + 1))
        except Exception as exc:
            last_err = str(exc)
            if "insufficient_quota" in last_err or "billing_hard_limit_reached" in last_err:
                raise RuntimeError(last_err)
            time.sleep(2.5 * (attempt + 1))
    raise RuntimeError(f"Failed generating {slug}: {last_err}")


def compute_dhash(im: Image.Image) -> int:
    gray = im.convert("L").resize((9, 8), Image.Resampling.LANCZOS)
    px = list(gray.getdata())
    bits = 0
    for y in range(8):
        row = y * 9
        for x in range(8):
            if px[row + x] > px[row + x + 1]:
                bits |= 1 << (y * 8 + x)
    return bits


def encode_webp_under(im: Image.Image, target_w: int, target_h: int, max_bytes: int) -> bytes:
    resized = ImageOps.fit(im, (target_w, target_h), method=Image.Resampling.LANCZOS)
    for q in (80, 72, 64, 56, 48, 40, 34, 28, 22):
        buf = io.BytesIO()
        resized.save(buf, format="WEBP", quality=q, method=6)
        b = buf.getvalue()
        if len(b) <= max_bytes:
            return b
    # Último recurso ligero
    buf = io.BytesIO()
    resized.save(buf, format="WEBP", quality=18, method=6)
    return buf.getvalue()


def save_variants(slug: str, raw_bytes: bytes, outdir: pathlib.Path):
    outdir.mkdir(parents=True, exist_ok=True)
    im = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
    dh = compute_dhash(im)

    specs = [
        ("", 1200, 675, 68_000),
        ("-800", 800, 450, 42_000),
        ("-400", 400, 225, 18_000),
    ]
    sizes = {}
    for suffix, w, h, max_b in specs:
        out_path = outdir / f"{slug}{suffix}.webp"
        b = encode_webp_under(im, w, h, max_b)
        out_path.write_bytes(b)
        sizes[suffix] = len(b)
    return sizes, dh


def job(slug: str, prompt: str, outdir: pathlib.Path):
    main_path = outdir / f"{slug}.webp"
    p800 = outdir / f"{slug}-800.webp"
    p400 = outdir / f"{slug}-400.webp"
    if (
        main_path.exists()
        and p800.exists()
        and p400.exists()
        and 1000 < main_path.stat().st_size < 100_000
    ):
        with Image.open(main_path) as im:
            return slug, f"skip {main_path.stat().st_size // 1024}KB", compute_dhash(im)

    raw = call_gen(slug, prompt)
    sizes, dhash = save_variants(slug, raw, outdir)
    return slug, f"ok {sizes[''] // 1024}KB", dhash


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "home"
    tasks = []
    if mode == "home":
        for s, p in HOME_PROMPTS.items():
            tasks.append((s, p, ROOT / "public/img/ambiente"))
        art_dir = ROOT / "src/content/articles"
        for slug in TOP_ARTICLE_SLUGS:
            f = art_dir / f"{slug}.json"
            if f.exists():
                a = json.loads(f.read_text(encoding="utf-8"))
                tasks.append(
                    (a["slug"], a["image"]["prompt"], ROOT / "public/img/articulos")
                )
            else:
                raise RuntimeError(f"Missing top article JSON: {slug}")
    elif mode == "articles":
        for f in sorted((ROOT / "src/content/articles").glob("*.json")):
            a = json.loads(f.read_text(encoding="utf-8"))
            if a.get("isPillar"):
                continue
            tasks.append(
                (a["slug"], a["image"]["prompt"], ROOT / "public/img/articulos")
            )
    elif mode == "one":
        tasks.append((sys.argv[2], sys.argv[3], ROOT / "public/img/ambiente"))

    hashes = []
    with cf.ThreadPoolExecutor(max_workers=6) as ex:
        for slug, status, dh in ex.map(lambda t: job(*t), tasks):
            if dh:
                hashes.append((slug, dh))
            print(slug, status, flush=True)

    near_dups = []
    for i in range(len(hashes)):
        for j in range(i + 1, len(hashes)):
            dist = bin(hashes[i][1] ^ hashes[j][1]).count("1")
            if dist <= 4:
                near_dups.append((hashes[i][0], hashes[j][0], dist))
    print(
        f"Auditoría visual dHash completada sobre {len(hashes)} imágenes "
        f"(duplicados cercanos: {len(near_dups)}).",
        flush=True,
    )
    for a, b, d in near_dups:
        print(f"  near-dup dist={d}: {a} <-> {b}", flush=True)


if __name__ == "__main__":
    main()
