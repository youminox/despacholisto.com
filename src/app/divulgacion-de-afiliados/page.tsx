import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";
import { AMAZON_TAG_US, AMAZON_TAG_ES } from "@/lib/amazon";

export const metadata: Metadata = {
  title: "Divulgación de Afiliados de Amazon | DespachoListo.com",
  description: `Declaración de participación de DespachoListo.com (${LEGAL_OWNER}, ${LEGAL_LOCATION}) en el Programa de Afiliados de Amazon (${AMAZON_TAG_US} y ${AMAZON_TAG_ES}).`,
  alternates: { canonical: `${SITE_URL}/divulgacion-de-afiliados/` },
};

export default function DivulgacionAfiliadosPage() {
  return (
    <SimplePage
      title="Divulgación de Afiliados de Amazon"
      crumb="Divulgación de afiliados"
      href="/divulgacion-de-afiliados/"
      intro="Transparencia total sobre cómo financiamos nuestras más de 1,500 guías gratuitas sobre impresoras térmicas 4×6, etiquetas y balanzas."
    >
      <h2>1. Participación oficial en Amazon Associates</h2>
      <p>
        <strong>DespachoListo.com</strong>, sitio web titularidad de{" "}
        <strong>{LEGAL_OWNER}</strong> (domiciliado en {LEGAL_LOCATION} · email:{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>), participa en el
        Programa de Afiliados de <strong>Amazon.com Services LLC</strong>{" "}
        (Estados Unidos, ID de seguimiento: <code>{AMAZON_TAG_US}</code>) y en
        el Programa de Afiliados de <strong>Amazon EU</strong> (España, ID de
        seguimiento: <code>{AMAZON_TAG_ES}</code>).
      </p>
      <p>
        <em>
          &ldquo;En calidad de Afiliado de Amazon, DespachoListo.com obtiene
          ingresos por las compras adscritas que cumplen los requisitos
          aplicables.&rdquo;
        </em>
      </p>

      <h2>2. ¿Paga el comprador un precio mayor?</h2>
      <p>
        <strong>No, nunca pagas más.</strong> El precio y las promociones en
        Amazon Estados Unidos o Amazon España son idénticos a los de una visita
        directa. La comisión publicitaria que recibimos proviene de Amazon y
        financia el mantenimiento del portal, la actualización de guías y nuestro
        Asesor de Despacho IA.
      </p>

      <h2>3. Independencia editorial en nuestras recomendaciones</h2>
      <p>
        Ni Rollo, ni MUNBYN, ni KNAON ni ningún fabricante de etiquetas o
        balanzas influye en nuestras conclusiones. Señalamos abiertamente cuándo
        una impresora económica de Bluetooth basta para empezar frente a cuándo
        conviene invertir en Wi-Fi AirPrint o 300 DPI.
      </p>
    </SimplePage>
  );
}
