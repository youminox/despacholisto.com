import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OpenChatButton from "@/components/OpenChatButton";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-[68px]">
        <section className="wrap py-24 text-center max-w-2xl">
          <span className="eyebrow">Página no encontrada (404)</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
            No encontramos esa guía de impresoras 4×6
          </h1>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Vuelve al inicio para explorar nuestras 1,514 guías sobre Rollo,
            MUNBYN, KNAON, etiquetas en rollo o plegadas, portarrollos y balanzas
            o consulta en vivo a nuestro Asesor IA.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-buy shine">
              Ir al inicio de DespachoListo.com
            </Link>
            <OpenChatButton
              label="Preguntar al Asesor IA"
              className="btn btn-ghost"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
