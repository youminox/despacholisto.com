"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import OpenChatButton from "./OpenChatButton";

export const NAV = [
  { href: "/resenas-impresoras-termicas-4x6/", label: "Impresoras 4×6" },
  { href: "/comparativas-impresoras-de-etiquetas/", label: "Rollo vs MUNBYN vs KNAON" },
  { href: "/impresoras-por-volumen-y-conexion/", label: "Celular y Volumen" },
  { href: "/etiquetas-termicas-y-portarrollos/", label: "Etiquetas y Portarrollos" },
  { href: "/balanzas-digitales-para-envios/", label: "Balanzas" },
  { href: "/costos-y-rentabilidad-por-100-paquetes/", label: "Costo × 100 Paquetes" },
];

export default function Header({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const dark = variant === "dark" && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        dark
          ? "bg-transparent text-white"
          : "bg-white/92 text-fxink shadow-[0_8px_30px_-20px_rgba(15,23,42,0.35)] backdrop-blur-xl"
      }`}
    >
      <div className="wrap flex h-[68px] items-center justify-between gap-3">
        <Link href="/" aria-label="DespachoListo.com – inicio">
          <Logo dark={dark} />
        </Link>
        <nav
          className="hidden items-center gap-0.5 xl:flex"
          aria-label="Principal"
        >
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-full px-3 py-2 text-[0.82rem] font-semibold transition ${
                dark
                  ? "hover:bg-white/10"
                  : "hover:bg-fxsky hover:text-fxbluedeep"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <OpenChatButton
            label="Asesor IA"
            className="btn btn-buy shine !px-4 !py-2 text-xs sm:text-sm"
          />
          <button
            className="grid h-10 w-10 place-items-center rounded-full xl:hidden cursor-pointer"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav
          className="wrap grid gap-1 pb-5 xl:hidden bg-white text-fxink rounded-b-3xl shadow-xl"
          aria-label="Móvil"
          data-lenis-prevent
        >
          {[
            ...NAV,
            {
              href: "/accesorios-y-suministros-de-embalaje/",
              label: "Accesorios y Suministros de Embalaje",
            },
            {
              href: "/imprimir-etiquetas-desde-celular-y-pc/",
              label: "Imprimir desde Celular y Computadora",
            },
            {
              href: "/etiquetas-en-rollo-vs-plegadas-fanfold/",
              label: "Etiquetas en Rollo vs Plegadas (Fan-Fold)",
            },
            {
              href: "/configuracion-shopify-amazon-y-couriers/",
              label: "Configuración Shopify, Amazon FBA y Couriers",
            },
            {
              href: "/resolucion-dpi-codigos-de-barras-y-formatos/",
              label: "Resolución 203 vs 300 DPI y Códigos",
            },
            {
              href: "/calibracion-mantenimiento-y-fallas/",
              label: "Calibración, Cabezal y Solución de Fallas",
            },
            {
              href: "/pesaje-cubicaje-y-preparacion-de-pedidos/",
              label: "Pesaje, Cubicaje y Empaque",
            },
            {
              href: "/organizacion-estacion-de-despacho-y-amazon-usa/",
              label: "Estación de Despacho y Amazon EE. UU.",
            },
          ].map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 font-semibold hover:bg-fxsky"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
