import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import OpenChatButton from "@/components/OpenChatButton";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacto Oficial | DespachoListo.com",
  description: `Contacta con ${LEGAL_OWNER} (${LEGAL_LOCATION}) en ${LEGAL_EMAIL} o consulta gratis a nuestro Asesor de Despacho IA.`,
  alternates: { canonical: `${SITE_URL}/contacto/` },
};

export default function ContactoPage() {
  return (
    <SimplePage
      title="Contacto"
      crumb="Contacto"
      href="/contacto/"
      intro="¿Tienes dudas sobre impresoras térmicas 4×6, compatibilidad de etiquetas o sugerencias para DespachoListo.com? Escríbenos o consulta al Asesor IA."
    >
      <h2>1. Datos oficiales de contacto</h2>
      <ul>
        <li>
          <strong>Titular responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico oficial:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>2. Recomendación instantánea para tu estación de despacho</h2>
      <p>
        Si quieres saber hoy mismo si te conviene Rollo, MUNBYN o KNAON según tu
        cantidad de paquetes diarios, si imprimes desde iPhone/Android o PC, y
        qué etiquetas, portarrollos y balanza sumar en Amazon Estados Unidos,
        abre nuestro <strong>Asesor de Despacho IA</strong>:
      </p>
      <div className="my-6">
        <OpenChatButton
          label="Abrir Asesor de Despacho IA Ahora"
          className="btn btn-buy shine"
        />
      </div>
    </SimplePage>
  );
}
