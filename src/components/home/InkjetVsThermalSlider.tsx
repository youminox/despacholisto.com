"use client";

import { useCallback, useRef, useState } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export default function InkjetVsThermalSlider() {
  const [v, setV] = useState(26);
  const [touched, setTouched] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const t = v / 100;
  const mid = clamp(1 - Math.abs(t - 0.5) * 2.4);
  const thermal = clamp((t - 0.45) / 0.45);
  const fullThermal = clamp((t - 0.55) / 0.4);

  const phase =
    t < 0.35
      ? "Método Tradicional · Impresora de Tinta + Hojas Carta + Tijeras + Cinta"
      : t < 0.68
      ? "Transición · Calculando Costo y Tiempo cada 100 Paquetes"
      : "Método DespachoListo · Impresora Térmica 4×6 Directa (Sin Tinta)";

  const costReading =
    t < 0.45
      ? "US$ 10–18 / 100 envíos · ~25 min"
      : "US$ 1.80 / 100 envíos · < 2 min";

  const fromPointer = useCallback((clientX: number) => {
    const el = scene.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setV(Math.round(clamp((clientX - r.left) / r.width) * 100));
    setTouched(true);
  }, []);

  return (
    <div className="daynight bg-[#090e1a] shadow-[0_40px_80px_-40px_rgba(15,23,42,0.75)]">
      <div
        ref={scene}
        className="relative aspect-[4/5] cursor-ew-resize select-none sm:aspect-[16/9]"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") e.preventDefault();
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1 || e.pointerType === "touch") {
            if (
              (e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)
            )
              fromPointer(e.clientX);
          }
        }}
      >
        <svg
          viewBox="0 0 800 450"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="wt-light" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e0f2fe" />
              <stop offset="1" stopColor="#f8fafc" />
            </linearGradient>
            <linearGradient id="wt-mid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0284c7" />
              <stop offset="0.55" stopColor="#ea580c" />
              <stop offset="1" stopColor="#ffedd5" />
            </linearGradient>
            <linearGradient id="wt-heavy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#090e1a" />
              <stop offset="0.7" stopColor="#1e293b" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="800" height="450" fill="url(#wt-light)" />
          <rect width="800" height="450" fill="url(#wt-mid)" opacity={mid} />
          <rect
            width="800"
            height="450"
            fill="url(#wt-heavy)"
            opacity={thermal}
          />

          <rect
            x="0"
            y="365"
            width="800"
            height="85"
            fill={thermal > 0.5 ? "#0b1322" : "#cbd5e1"}
          />

          {thermal < 0.5 ? (
            <g>
              <rect
                x="190"
                y="135"
                width="420"
                height="205"
                rx="18"
                fill="#ffffff"
                stroke="#0284c7"
                strokeWidth="4"
              />
              <text
                x="400"
                y="184"
                textAnchor="middle"
                fontFamily="Outfit, sans-serif"
                fontWeight="800"
                fontSize="17"
                fill="#0369a1"
              >
                ✂️ Impresora Inkjet/Láser + Hoja Carta + Cinta
              </text>
              <text
                x="400"
                y="222"
                textAnchor="middle"
                fontSize="13.5"
                fontWeight="700"
                fill="#0f172a"
              >
                ✗ Tinta o tóner costoso (~US$ 8 – $14 cada 100 guías)
              </text>
              <text
                x="400"
                y="252"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="#334155"
              >
                ✗ 15–25 minutos recortando papel y pegando cinta transparente
              </text>
              <text
                x="400"
                y="282"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="#dc2626"
              >
                ✗ La tinta se corre con lluvia y la cinta puede reflejar en escáner
              </text>
            </g>
          ) : (
            <g opacity={fullThermal}>
              <rect
                x="185"
                y="135"
                width="430"
                height="205"
                rx="18"
                fill="#0f172a"
                stroke="#f59e0b"
                strokeWidth="4"
              />
              <text
                x="400"
                y="184"
                textAnchor="middle"
                fontFamily="Outfit, sans-serif"
                fontWeight="800"
                fontSize="17"
                fill="#fde68a"
              >
                ⚡ Térmica Directa 4×6 (Rollo · MUNBYN · KNAON)
              </text>
              <text
                x="400"
                y="222"
                textAnchor="middle"
                fontSize="13.5"
                fontWeight="700"
                fill="#ffffff"
              >
                ✓ CERO cartuchos ni tóner: solo US$ 1.50 – $2.40 cada 100 envíos
              </text>
              <text
                x="400"
                y="252"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="#cbd5e1"
              >
                ✓ 150 mm/s: desprende la etiqueta autoadhesiva y pega en 2 segundos
              </text>
              <text
                x="400"
                y="282"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="#4ade80"
              >
                ✓ Resistente al agua/aceite · Impresión directa celular o PC
              </text>
            </g>
          )}

          <rect
            x="110"
            y="354"
            width="580"
            height="34"
            rx="10"
            fill="#090e1a"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <text
            x="400"
            y="375"
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="12"
            fill="#fef08a"
          >
            {thermal > 0.5
              ? "Ahorro estimado: hasta US$ 12 y 23 minutos libres por cada 100 paquetes despachados"
              : "Una impresora térmica 4×6 económica se paga sola antes de llegar a tus primeros 500 envíos"}
          </text>
        </svg>

        <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/30 bg-slate-950/65 px-4 py-2 text-white backdrop-blur-md sm:left-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white/75">
            {phase}
          </p>
          <p className="font-display text-xl sm:text-2xl font-extrabold tabular-nums text-amber-300">
            {costReading}
          </p>
        </div>
        {!touched && (
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 animate-pulse whitespace-nowrap rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-fxink shadow-lg sm:bottom-5 sm:px-4 sm:py-2 sm:text-sm">
            ← Arrastra: Hoja Carta + Tinta vs Térmica 4×6 sin Tinta →
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 bg-[#090e1a] px-5 py-4 text-white sm:px-7">
        <span className="text-xs font-bold whitespace-nowrap text-sky-300">
          ✂️ Inkjet + Tijeras
        </span>
        <label className="sr-only" htmlFor="wt-range">
          Comparador de costo y tiempo entre impresora de tinta y térmica 4x6
        </label>
        <input
          id="wt-range"
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => {
            setV(Number(e.target.value));
            setTouched(true);
          }}
          aria-valuetext={`${phase}, ${costReading}`}
        />
        <span className="text-xs font-bold whitespace-nowrap text-fxlime">
          ⚡ Térmica 4×6 Directa
        </span>
      </div>
    </div>
  );
}
