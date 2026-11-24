import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre Nosotros | DespachoListo.com",
  description: `Conoce DespachoListo.com, portal creado por ${LEGAL_OWNER} (${LEGAL_LOCATION}) para ayudar a tiendas online a elegir impresoras térmicas 4×6, etiquetas y embalaje.`,
  alternates: { canonical: `${SITE_URL}/sobre-nosotros/` },
};

export default function SobreNosotrosPage() {
  return (
    <SimplePage
      title="Sobre DespachoListo.com"
      crumb="Sobre nosotros"
      href="/sobre-nosotros/"
      intro="La guía en español creada para que emprendedores y tiendas online elijan sin errores su impresora térmica 4×6, etiquetas, portarrollos y balanza de envíos."
    >
      <h2>¿Por qué creamos DespachoListo.com?</h2>
      <p>
        Todo vendedor online pasa por el mismo cuello de botella al crecer:
        recortar guías de envío impresas en hojas carta con impresora de tinta,
        pegar cinta adhesiva transparente encima y perder minutos preciosos por
        cada pedido. Al buscar una impresora térmica <code>4 × 6</code>{" "}
        pulgadas en Amazon Estados Unidos aparecen dudas inmediatas: ¿Rollo,
        MUNBYN o KNAON? ¿Bluetooth con app o Wi-Fi AirPrint? ¿Acepta rollo
        interno o necesita portarrollos trasero? ¿Cuánto cuesta realmente
        etiquetar 100 paquetes?
      </p>
      <p>
        En <strong>DespachoListo.com</strong> reunimos más de{" "}
        <strong>1,500 guías especializadas en español</strong> para responder
        cada una de esas preguntas sin tecnicismos confusos y con datos reales de
        compatibilidad y costos.
      </p>

      <h2>Titular responsable del proyecto</h2>
      <p>
        <strong>DespachoListo.com</strong> es propiedad y está dirigido por{" "}
        <strong>{LEGAL_OWNER}</strong>, domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong>.
      </p>
      <ul>
        <li>
          <strong>Titular y Director Editorial:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico oficial:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>
    </SimplePage>
  );
}
