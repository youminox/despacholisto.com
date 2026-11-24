import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Política Editorial y Metodología | DespachoListo.com",
  description: `Criterios técnicos que seguimos en DespachoListo.com (${LEGAL_OWNER}, ${LEGAL_LOCATION}) para evaluar impresoras térmicas 4×6, etiquetas, portarrollos y balanzas.`,
  alternates: { canonical: `${SITE_URL}/politica-editorial/` },
};

export default function PoliticaEditorialPage() {
  return (
    <SimplePage
      title="Política Editorial y Metodología Técnica"
      crumb="Política editorial"
      href="/politica-editorial/"
      intro="Los criterios operativos y de costos reales que aplicamos en cada análisis y comparativa de DespachoListo.com."
    >
      <h2>1. Dirección editorial responsable</h2>
      <p>
        La línea editorial de <strong>DespachoListo.com</strong> está bajo la
        dirección de <strong>{LEGAL_OWNER}</strong>, domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong> ·{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>

      <h2>2. Nuestros 5 ejes de evaluación de impresoras térmicas 4×6</h2>
      <ul>
        <li>
          <strong>1. Volumen diario de paquetes:</strong> distinguimos equipos
          de arranque (1–30 envíos/día) de estaciones de trabajo continuo (+100
          envíos/día) por velocidad real (`mm/s`) y disipación térmica del
          cabezal.
        </li>
        <li>
          <strong>2. Conectividad real desde celular o computadora:</strong>{" "}
          separamos USB clásico (estable para PC/Mac), Bluetooth con app puente
          (MUNBYN Print / FlashLabel) y Wi-Fi AirPrint nativo sin apps
          adicionales (Rollo X1040 / MUNBYN RW401AP).
        </li>
        <li>
          <strong>3. Formato de etiquetas aceptadas (Rollo vs Fan-Fold):</strong>{" "}
          verificamos si la impresora cuenta con bandeja interna o ranura trasera
          que requiera un portarrollos externo o espacio para pilas plegadas.
        </li>
        <li>
          <strong>4. Costo transparente por cada 100 paquetes:</strong>{" "}
          calculamos el gasto real por lote de 100 etiquetas 4×6 (sin tinta ni
          cinta para pegar el papel) frente a la impresión tradicional en hoja
          carta.
        </li>
        <li>
          <strong>5. Compatibilidad de estación completa:</strong> evaluamos
          portarrollos, balanzas postales con visor externo y suministros de
          embalaje para reducir cuellos de botella al despachar.
        </li>
      </ul>

      <h2>3. Actualizaciones y contacto editorial</h2>
      <p>
        Si deseas proponer la revisión de un nuevo modelo térmico o reportar un
        cambio en drivers o especificaciones, escríbenos a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
