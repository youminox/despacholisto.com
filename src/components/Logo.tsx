import { useId } from "react";

/** Logotipo de DespachoListo.com: Impresora Térmica + Etiqueta de Envío 4×6 con Código de Barras */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0F172A" />
          <stop offset="0.55" stopColor="#1E293B" />
          <stop offset="1" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id={`${id}amber`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FEF08A" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${id}bg)`} />
      <rect x="14" y="24" width="36" height="22" rx="6" fill={`url(#${id}amber)`} />
      <rect x="20" y="10" width="24" height="16" rx="2" fill="#FFFFFF" />
      <line
        x1="24"
        y1="15"
        x2="40"
        y2="15"
        stroke="#0F172A"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="20"
        x2="35"
        y2="20"
        stroke="#0284C7"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect x="20" y="34" width="24" height="18" rx="3" fill="#F8FAFC" />
      <path
        d="M24 39v9M28 39v9M31 39v9M35 39v9M39 39v9"
        stroke="#0F172A"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight">
      <LogoMark />
      <span>
        Despacho<span className={dark ? "text-fxlime" : "text-fxblue"}>Listo</span>
        <span
          className={`ml-1.5 hidden text-[10px] font-bold uppercase tracking-[0.18em] sm:inline ${
            dark ? "text-white/60" : "text-[var(--muted)]"
          }`}
        >
          .com
        </span>
      </span>
    </span>
  );
}
