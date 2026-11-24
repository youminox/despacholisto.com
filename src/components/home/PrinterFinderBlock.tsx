"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CATALOG,
  buildAmazonUrl,
  detectUserAmazonRegion,
  type AmazonStoreRegion,
  type AmazonProductRecommendation,
} from "@/lib/amazon";
import { trackClick } from "@/lib/client-constants";
import OpenChatButton from "@/components/OpenChatButton";

export type PrinterTier = {
  key: string;
  label: string;
  volumeSpec: string;
  connectionCompat: string;
  labelCompat: string;
  img: string;
  alt: string;
  idealFor: string;
  reviewHref: string;
  productKey: keyof typeof CATALOG;
};

export default function PrinterFinderBlock({
  options,
}: {
  options: PrinterTier[];
}) {
  const [k, setK] = useState(options[0].key);
  const [monthlyPackages, setMonthlyPackages] = useState(300);
  const [region, setRegion] = useState<AmazonStoreRegion>("US");

  useEffect(() => {
    setRegion(detectUserAmazonRegion());
  }, []);

  const p = options.find((o) => o.key === k) || options[0];
  const amzProd: AmazonProductRecommendation =
    CATALOG[p.productKey] || CATALOG.ROLLO_WIRELESS_X1040;
  const amzUrl = buildAmazonUrl(amzProd, region);
  const storeName = region === "US" ? "Amazon.com" : "Amazon.es";

  const thermalCost = (monthlyPackages / 100) * 1.95;
  const inkjetCost = (monthlyPackages / 100) * 13.5;
  const monthlySavings = Math.max(0, inkjetCost - thermalCost);
  const hoursSaved = Math.round(((monthlyPackages / 100) * 23) / 60 * 10) / 10;

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_1fr]">
      <div className="card card-static spot relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fxblue/10 blur-3xl" />
        <div className="relative">
          <div
            className="inline-flex flex-wrap rounded-full bg-fxsky p-1 gap-1"
            role="tablist"
            aria-label="Selector de impresora térmica 4x6 por volumen y conexión"
          >
            {options.map((o) => (
              <button
                key={o.key}
                role="tab"
                type="button"
                aria-selected={o.key === k}
                onClick={() => setK(o.key)}
                className={`rounded-full px-3.5 py-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                  o.key === k
                    ? "bg-fxink text-amber-300 shadow"
                    : "text-[var(--muted)] hover:text-fxink"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid items-center gap-6 sm:grid-cols-[1fr_1.2fr]">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[240px] overflow-hidden rounded-2xl border border-[var(--line)] shadow-sm">
              <Image
                key={p.img}
                src={p.img}
                alt={p.alt}
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-950">
                {amzProd.badge}
              </span>
              <p className="mt-1.5 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-fxink leading-snug">
                {amzProd.title.split("—")[0].trim()}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">
                <strong className="text-fxink">Ideal si envías:</strong>{" "}
                {p.idealFor}
              </p>
              <div className="mt-2.5 rounded-xl bg-fxsky p-2.5 text-xs space-y-1">
                <p className="font-bold text-fxbluedeep">
                  📦 Volumen diario: {p.volumeSpec}
                </p>
                <p className="font-semibold text-sky-900">
                  📱 Conexión: {p.connectionCompat}
                </p>
                <p className="font-semibold text-emerald-900">
                  🏷️ Etiquetas: {p.labelCompat}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={amzUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() =>
                trackClick(`finder-amazon-${p.key}`, {
                  article_slug: amzProd.id,
                  article_title: amzProd.title,
                  category: "amazon",
                  target_url: amzUrl,
                })
              }
              className="btn btn-buy shine flex-1 text-sm"
              data-magnetic
            >
              📦 Ver disponibilidad en {storeName} ↗
            </a>
            <Link href={p.reviewHref} className="btn btn-ghost text-sm">
              Leer reseña completa →
            </Link>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#090e1a] via-[#0f172a] to-[#1e293b] p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-fxlime/15 blur-3xl" />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-fxlime">
          Calculadora Real · Costo cada 100 Paquetes
        </p>
        <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          ¿Cuánto ahorras frente a tinta + tijeras + cinta?
        </h3>
        <p className="mt-2 text-sm text-white/75">
          Ajusta cuántos paquetes despachas al mes para calcular el gasto en
          etiquetas térmicas 4×6 (~US$ 1.95 cada 100 envíos) frente a imprimir
          hojas carta (~US$ 13.50 cada 100 envíos).
        </p>
        <label
          htmlFor="pkg-slider"
          className="mt-6 flex items-center justify-between text-sm font-semibold"
        >
          <span>Paquetes enviados por mes</span>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-display text-lg text-fxlime">
            {monthlyPackages} paquetes
          </span>
        </label>
        <input
          id="pkg-slider"
          type="range"
          min={100}
          max={3000}
          step={100}
          value={monthlyPackages}
          onChange={(e) => setMonthlyPackages(Number(e.target.value))}
          className="mt-3 w-full accent-[#F59E0B]"
        />
        <div className="mt-1 flex justify-between text-[0.7rem] text-white/50">
          <span>100/mes</span>
          <span>500/mes</span>
          <span>1,500/mes</span>
          <span>3,000/mes</span>
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            ["Costo Térmica 4×6", `US$ ${thermalCost.toFixed(1)}`],
            ["Ahorro Mensual", `US$ ${monthlySavings.toFixed(0)}/mes`],
            ["Tiempo Libre", `${hoursSaved} h/mes`],
          ].map(([l, val], i) => (
            <div
              key={l}
              className={`glass flex flex-col-reverse p-3 ${
                i === 1 ? "border-fxlime/50 bg-fxlime/10" : ""
              }`}
            >
              <dt className="mt-1 text-[0.7rem] leading-tight text-white/65">
                {l}
              </dt>
              <dd
                className={`font-display font-extrabold ${
                  i === 1
                    ? "text-sm text-fxlime sm:text-base"
                    : "text-xs sm:text-base"
                }`}
              >
                {val}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <OpenChatButton
            label="Preguntar qué impresora y etiquetas comprar"
            prompt={`Envío unos ${monthlyPackages} paquetes al mes. ¿Qué impresora térmica 4×6 (Rollo, MUNBYN o KNAON), qué etiquetas fan-fold o en rollo y qué balanza me recomiendas en Amazon?`}
            className="btn btn-lime shine w-full text-xs sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
