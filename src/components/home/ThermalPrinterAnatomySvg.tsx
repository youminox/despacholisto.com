/** Diagrama técnico SVG animado: explica el sistema térmico directo 4×6 (cero tinta), ranura trasera vs portarrollos externo y diferencia entre 203 DPI y 300 DPI. */
export default function ThermalPrinterAnatomySvg() {
  const strands = Array.from({ length: 8 }).map((_, i) => {
    const a = (i / 8) * Math.PI * 2 + 0.25;
    const x1 = 200 + Math.cos(a) * 38;
    const y1 = 210 + Math.sin(a) * 38;
    const x2 = 200 + Math.cos(a) * 128;
    const y2 = 210 + Math.sin(a) * 128;
    const mx = 200 + Math.cos(a + 0.4) * 84;
    const my = 210 + Math.sin(a + 0.4) * 84;
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  });

  return (
    <div className="gel-scene relative mx-auto aspect-square w-full max-w-[460px]">
      <svg
        viewBox="0 0 400 420"
        className="h-full w-full"
        role="img"
        aria-label="Diagrama técnico de anatomía de impresora térmica 4x6: cabezal térmico directo, sensor de hueco gap, alimentación trasera para rollo o fan-fold y conectividad"
      >
        <defs>
          <radialGradient id="tc-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ea580c" stopOpacity="0.35" />
            <stop offset="0.6" stopColor="#0284c7" stopOpacity="0.18" />
            <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="tc-core" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fde68a" />
            <stop offset="0.5" stopColor="#ea580c" />
            <stop offset="1" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="210" r="188" fill="url(#tc-halo)" />
        <circle
          cx="200"
          cy="210"
          r="148"
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeDasharray="4 7"
        />
        <circle
          cx="200"
          cy="210"
          r="102"
          fill="none"
          stroke="rgba(245,158,11,0.45)"
          strokeDasharray="6 5"
        />

        {strands.map((d, i) => (
          <path
            key={i}
            d={d}
            className="fiber-strand"
            fill="none"
            stroke={i % 2 === 0 ? "#f59e0b" : "#38bdf8"}
            strokeOpacity="0.8"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}

        {/* Núcleo central: Cabezal Térmico */}
        <circle
          cx="200"
          cy="210"
          r="54"
          fill="#0f172a"
          stroke="url(#tc-core)"
          strokeWidth="4"
        />
        <text
          x="200"
          y="204"
          textAnchor="middle"
          fontFamily="Outfit, sans-serif"
          fontWeight="800"
          fontSize="12.5"
          fill="#fef08a"
        >
          TÉRMICA 4×6&quot;
        </text>
        <text
          x="200"
          y="222"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="10.5"
          fill="#38bdf8"
        >
          203 / 300 DPI · SIN TINTA
        </text>

        {/* Etiquetas técnicas */}
        <g fontFamily="Inter, sans-serif" fontSize="10.5" fontWeight="700">
          <g transform="translate(12 34)">
            <rect
              width="178"
              height="28"
              rx="14"
              fill="rgba(234,88,12,0.22)"
              stroke="rgba(245,158,11,0.65)"
            />
            <text x="89" y="18" textAnchor="middle" fill="#fef08a">
              🔥 Cabezal térmico: Cero cartuchos
            </text>
          </g>
          <g transform="translate(206 48)">
            <rect
              width="182"
              height="28"
              rx="14"
              fill="rgba(22,163,74,0.24)"
              stroke="rgba(74,222,128,0.65)"
            />
            <text x="91" y="18" textAnchor="middle" fill="#bbf7d0">
              🏷️ Rollo externo y Fan-Fold trasero
            </text>
          </g>
          <g transform="translate(14 336)">
            <rect
              width="182"
              height="28"
              rx="14"
              fill="rgba(2,132,199,0.28)"
              stroke="rgba(56,189,248,0.65)"
            />
            <text x="91" y="18" textAnchor="middle" fill="#bae6fd">
              📱 AirPrint Wi-Fi · Bluetooth · USB
            </text>
          </g>
          <g transform="translate(204 366)">
            <rect
              width="184"
              height="28"
              rx="14"
              fill="rgba(245,158,11,0.25)"
              stroke="rgba(251,191,36,0.65)"
            />
            <text x="92" y="18" textAnchor="middle" fill="#fde68a">
              💵 ~$1.80 por cada 100 paquetes
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
