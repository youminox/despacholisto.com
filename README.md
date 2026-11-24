# DespachoListo.com

Guía especializada en español para emprendedores y tiendas online sobre **impresoras térmicas de etiquetas de envío 4 × 6 pulgadas** (**Rollo**, **MUNBYN**, **KNAON** y alternativas), etiquetas en rollo vs plegadas (*fan-fold*), cálculo de costos cada 100 paquetes, portarrollos, balanzas digitales y suministros de embalaje en Amazon Estados Unidos (`despacholisto-20`) y Amazon España (`despacholisto-21`).

- **Arquitectura:** Next.js 16 App Router (100 % SSG estático)
- **Páginas totales:** 1,522 URLs (`/` + 14 Hubs Pilares + 1,000 artículos SEO + 500 artículos transaccionales Amazon + 7 páginas legales)
- **Imágenes:** WebP optimizadas < 100 KB (`1200×675`) vía ChatGPT Image API (`quality: "medium"`) en Supabase Edge Function `despacholisto-images`
- **Asesor Online IA:** Edge Function `despacholisto-chat` (`gpt-4o-mini` predeterminado) integrado en el dashboard admin de `charlielingan.com`
- **Titular:** CARLOS LINGAN BORJA — Lima, Perú — `info@charlielingan.com`
