"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    n: "01",
    t: "Define tu volumen diario de pedidos (1–15, 20–80 o +100 paquetes)",
    d: "Si empiezas con 1 a 35 envíos al día, una KNAON Y812BT o MUNBYN RW130B cubre todo sin gastar de más. Para 50 a +300 paquetes diarios en mesa continua, Rollo X1038 / X1040 o MUNBYN RW401AP mantienen velocidad de 150 mm/s sin recalentarse.",
  },
  {
    n: "02",
    t: "Elige conexión según dónde imprimes: Celular (BT/AirPrint) o PC (USB)",
    d: "Para imprimir directo desde iPhone o Mac sin instalar apps puente, busca Wi-Fi AirPrint nativo (Rollo Wireless X1040 o MUNBYN RW401AP). Si prefieres usar app móvil en Android/iOS, el Bluetooth (MUNBYN 130B / KNAON) es ideal; en escritorio fijo, USB es cero caídas.",
  },
  {
    n: "03",
    t: "Combina etiquetas en rollo o plegadas (fan-fold) con su portarrollos",
    d: "Casi todas las impresoras 4×6 (Rollo, MUNBYN 941/130B, KNAON) alimentan por ranura trasera: acepta pilas plegadas fan-fold sobre la mesa o rollos de 1\" usando un portarrollos externo dual. Solo modelos como MUNBYN 129B llevan compartimento interno.",
  },
  {
    n: "04",
    t: "Pesa con precisión, pega tu guía y baja el costo cada 100 paquetes",
    d: "Una etiqueta térmica 4×6 sale en ~US$ 1.80–2.40 cada 100 envíos frente a US$ 10–18 de tinta, hojas carta y cinta. Suma una balanza digital con pantalla externa para evitar multas de courier.",
  },
];

export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    let io: IntersectionObserver | null = null;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        if (reduce) {
          gsap.set(q(".step"), { opacity: 1 });
          gsap.set(q(".bar"), { scaleX: 1 });
          gsap.set(q(".phone-alert, .night, .sound-wave"), { opacity: 1 });
          return;
        }
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=2200",
            scrub: 0.7,
            pin: q(".pin")[0],
            anticipatePin: 1,
          },
        });
        tl.to(q(".step-0"), { opacity: 1, duration: 0.2 }, 0)
          .to(
            q(".step-0 .dot"),
            { backgroundColor: "#EA580C", color: "#fff", duration: 0.2 },
            0
          )
          .fromTo(
            q(".label-eject"),
            { y: 26 },
            { y: 0, duration: 0.6 },
            0.1
          )
          .to(q(".step-0"), { opacity: 0.75, duration: 0.2 }, 1)
          .to(q(".step-1"), { opacity: 1, duration: 0.2 }, 1)
          .to(
            q(".step-1 .dot"),
            { backgroundColor: "#0284C7", color: "#fff", duration: 0.2 },
            1
          )
          .to(
            q(".conn-badge"),
            { scale: 1.06, svgOrigin: "200 72", duration: 0.5 },
            1.15
          )
          .to(q(".step-1"), { opacity: 0.75, duration: 0.2 }, 2)
          .to(q(".step-2"), { opacity: 1, duration: 0.2 }, 2)
          .to(
            q(".step-2 .dot"),
            { backgroundColor: "#16A34A", color: "#fff", duration: 0.2 },
            2
          )
          .fromTo(
            q(".fanfold-stack"),
            { y: 18 },
            { y: 0, duration: 0.7 },
            2.05
          )
          .to(q(".sound-wave"), { opacity: 1, scaleX: 1, duration: 0.5 }, 2.1)
          .to(q(".step-2"), { opacity: 0.75, duration: 0.2 }, 3.1)
          .to(q(".step-3"), { opacity: 1, duration: 0.2 }, 3.1)
          .to(
            q(".step-3 .dot"),
            { backgroundColor: "#0F172A", color: "#FDE68A", duration: 0.2 },
            3.1
          )
          .to(q(".night"), { opacity: 1, duration: 0.6 }, 3.1)
          .to(q(".phone-alert"), { opacity: 1, y: 0, duration: 0.5 }, 3.3)
          .to(q(".bar"), { scaleX: 1, duration: 3.8 }, 0);
      }, el);
    };

    io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io?.disconnect();
          init();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io?.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="ruta-despacho"
      ref={root}
      className="relative bg-gradient-to-b from-white via-fxsky to-white"
    >
      <div className="pin flex min-h-[100svh] items-center overflow-hidden py-10 lg:py-14">
        <div className="wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="eyebrow">Método de Despacho Sin Cuellos de Botella</span>
            <h2 className="section-title mt-3">
              Cuatro decisiones.{" "}
              <span className="text-prune">
                De recortar hojas carta a despachar 100 paquetes en minutos.
              </span>
            </h2>
            <div className="mt-4 h-1.5 w-full max-w-sm overflow-hidden rounded bg-[var(--line)]">
              <div className="bar h-full origin-left scale-x-0 bg-gradient-to-r from-fxblue via-drinklight to-prune" />
            </div>
            <ol className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className={`step step-${i} flex gap-4`}
                  style={{ opacity: 0.8 }}
                >
                  <span className="dot grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white font-display font-extrabold text-fxink shadow-md">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold sm:text-xl">
                      {s.t}
                    </p>
                    <p className="text-sm text-[var(--muted)] sm:text-base">
                      {s.d}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mx-auto w-full max-w-[270px] sm:max-w-[360px] lg:max-w-[420px]">
            <svg
              viewBox="0 0 400 440"
              className="relative w-full drop-shadow-[0_30px_50px_rgba(15,23,42,0.22)]"
              role="img"
              aria-label="Esquema animado de impresora térmica 4x6 imprimiendo etiqueta autoadhesiva desde alimentación trasera fan-fold"
            >
              <defs>
                <linearGradient id="ss-light" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#f8fafc" />
                  <stop offset="1" stopColor="#e2e8f0" />
                </linearGradient>
                <linearGradient id="ss-dark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#090e1a" />
                  <stop offset="0.65" stopColor="#0f172a" />
                  <stop offset="1" stopColor="#1e293b" />
                </linearGradient>
                <clipPath id="ss-panel">
                  <rect x="0" y="0" width="400" height="440" rx="36" />
                </clipPath>
              </defs>
              <g clipPath="url(#ss-panel)">
                <rect width="400" height="440" fill="url(#ss-light)" />
                <rect
                  className="night"
                  width="400"
                  height="440"
                  fill="url(#ss-dark)"
                  opacity="0"
                />

                <g className="conn-badge">
                  <rect
                    x="55"
                    y="54"
                    width="290"
                    height="36"
                    rx="10"
                    fill="#0f172a"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                  <text
                    x="200"
                    y="76"
                    textAnchor="middle"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="11"
                    fill="#fde68a"
                  >
                    WI-FI AIRPRINT · BLUETOOTH · USB · 150 MM/S
                  </text>
                </g>

                {/* Etiqueta 4x6 saliendo */}
                <g className="label-eject">
                  <rect
                    x="130"
                    y="112"
                    width="140"
                    height="104"
                    rx="6"
                    fill="#ffffff"
                    stroke="#cbd5e1"
                    strokeWidth="2.5"
                  />
                  <rect x="144" y="124" width="60" height="10" rx="2" fill="#0f172a" />
                  <rect x="144" y="140" width="112" height="4" rx="2" fill="#94a3b8" />
                  <rect x="144" y="149" width="88" height="4" rx="2" fill="#94a3b8" />
                  <path
                    d="M148 164v28M154 164v28M158 164v28M165 164v28M170 164v28M177 164v28M183 164v28M188 164v28M196 164v28M203 164v28M210 164v28M218 164v28M226 164v28M234 164v28M244 164v28"
                    stroke="#0f172a"
                    strokeWidth="2.4"
                  />
                </g>

                {/* Cuerpo de impresora térmica 4x6 */}
                <rect
                  x="76"
                  y="196"
                  width="248"
                  height="98"
                  rx="20"
                  fill="#1e293b"
                  stroke="#ea580c"
                  strokeWidth="4"
                />
                <rect x="116" y="196" width="168" height="10" rx="3" fill="#0f172a" />
                <circle cx="294" cy="230" r="9" fill="#16a34a" />
                <rect x="102" y="224" width="108" height="14" rx="4" fill="#334155" />
                <text
                  x="200"
                  y="272"
                  textAnchor="middle"
                  fontFamily="Outfit, sans-serif"
                  fontWeight="800"
                  fontSize="12"
                  fill="#fef08a"
                >
                  TÉRMICA DIRECTA 4×6 · CERO TINTA
                </text>

                {/* Pila Fan-Fold o Rollo alimentando */}
                <g className="fanfold-stack">
                  <rect
                    x="110"
                    y="314"
                    width="180"
                    height="56"
                    rx="10"
                    fill="#ffffff"
                    stroke="#0284c7"
                    strokeWidth="3"
                  />
                  <line x1="122" y1="328" x2="278" y2="328" stroke="#cbd5e1" strokeWidth="2" />
                  <line x1="122" y1="340" x2="278" y2="340" stroke="#cbd5e1" strokeWidth="2" />
                  <text
                    x="200"
                    y="359"
                    textAnchor="middle"
                    fontSize="10.5"
                    fontWeight="800"
                    fill="#0f172a"
                  >
                    ETIQUETAS FAN-FOLD / ROLLO 4×6
                  </text>
                </g>

                <line
                  className="sound-wave"
                  x1="54"
                  y1="392"
                  x2="346"
                  y2="392"
                  stroke="#f59e0b"
                  strokeWidth="3.5"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  opacity="0.45"
                />

                <g className="phone-alert" transform="translate(0 8)" opacity="0">
                  <rect
                    x="74"
                    y="398"
                    width="252"
                    height="28"
                    rx="14"
                    fill="#16a34a"
                  />
                  <text
                    x="200"
                    y="416"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="800"
                    fill="#ffffff"
                  >
                    ✓ 100 PAQUETES ≈ US$ 1.80 SIN TINTA
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
