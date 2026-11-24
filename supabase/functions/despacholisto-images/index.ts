import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// despacholisto-images — genera imágenes fotorrealistas y diversas para despacholisto.com
// con la API de imágenes de OpenAI (ChatGPT Image API) en calidad media (quality: "medium") y formato WebP.

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-despacholisto-token",
};

const STYLE =
  "Realistic editorial e-commerce fulfillment and shipping station photography featuring modern direct thermal 4x6 label printers, fan-fold and roll shipping labels, external label holders, digital postal scales, corrugated shipping boxes, poly mailers, packing tape dispensers, smartphones and laptops, natural studio or home office lighting. Use clean geometric barcode lines and minimalist layout blocks only on labels without any readable letters, numbers, gibberish text, brand logos, or watermarks, and no deformed hands or objects.";

function b64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiKey) throw new Error("OPENAI_API_KEY not set");
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const token = req.headers.get("x-despacholisto-token") || "";
    if (token !== "despacholisto-img-2026") {
      return json({ ok: false, error: "unauthorized" }, 401);
    }

    const { slug, prompt, size } = await req.json();
    if (!slug || !prompt || !/^[a-z0-9-]+$/.test(slug)) {
      throw new Error("slug (a-z0-9-) and prompt are required");
    }
    const fullPrompt = `${prompt}. ${STYLE}`;
    const imgSize = size === "square" ? "1024x1024" : "1536x1024";

    let bytes: Uint8Array | null = null;
    let modelUsed = "";
    const errors: string[] = [];
    for (const model of ["gpt-image-1", "gpt-image-1-mini"]) {
      const r = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          prompt: fullPrompt,
          size: imgSize,
          quality: "medium",
          output_format: "webp",
          output_compression: 82,
          n: 1,
        }),
      });
      const j = await r.json();
      const b64 = j?.data?.[0]?.b64_json;
      if (b64) {
        bytes = b64ToBytes(b64);
        modelUsed = model;
        break;
      }
      errors.push(`${model}: ${j?.error?.message || r.status}`);
    }
    if (!bytes) throw new Error(errors.join(" | "));

    const objectPath = `despacholisto/${slug}.webp`;
    const { error: upErr } = await supabase.storage
      .from("content-images")
      .upload(objectPath, bytes, {
        contentType: "image/webp",
        upsert: true,
      });
    if (upErr) throw new Error(`upload: ${upErr.message}`);
    const { data } = supabase.storage
      .from("content-images")
      .getPublicUrl(objectPath);

    await supabase.from("token_usage").insert({
      source: "despacholisto.com",
      content_type: "ai_image",
      model: modelUsed,
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0,
      images_generated: 1,
      estimated_cost_usd: modelUsed === "gpt-image-1" ? 0.063 : 0.015,
      slug,
    });

    return json({ ok: true, url: data.publicUrl, model: modelUsed });
  } catch (e) {
    return json({ ok: false, error: String((e as Error).message || e) }, 500);
  }
});
