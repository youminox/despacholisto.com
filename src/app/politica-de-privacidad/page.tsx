import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de Privacidad | DespachoListo.com",
  description: `Política de privacidad y tratamiento de datos personales de DespachoListo.com, titularidad de ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION} (${LEGAL_EMAIL}).`,
  alternates: { canonical: `${SITE_URL}/politica-de-privacidad/` },
};

export default function PrivacidadPage() {
  return (
    <SimplePage
      title="Política de Privacidad"
      crumb="Política de privacidad"
      href="/politica-de-privacidad/"
      intro="Cómo protegemos y tratamos la información técnica y las consultas enviadas en DespachoListo.com."
    >
      <h2>1. Responsable del tratamiento de datos</h2>
      <ul>
        <li>
          <strong>Titular responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico para ejercicio de derechos:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>2. Qué datos recopilamos y con qué finalidad</h2>
      <p>
        En DespachoListo.com no exigimos registro de cuenta ni recopilamos datos
        bancarios. Únicamente se tratan los siguientes datos mínimos:
      </p>
      <ul>
        <li>
          <strong>Consultas en el Asesor de Despacho IA:</strong> los mensajes
          enviados voluntariamente al chat en línea, junto con un identificador
          anónimo de sesión y la URL de origen, se procesan para responder tus
          dudas sobre impresoras térmicas 4×6, conectividad, etiquetas y balanzas
          y mejorar nuestras guías. Evita compartir datos personales sensibles o
          direcciones reales de envío en el chat.
        </li>
        <li>
          <strong>Comunicaciones por correo electrónico:</strong> si escribes a{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>, trataremos tu
          correo exclusivamente para responder tu consulta.
        </li>
        <li>
          <strong>Métricas de atribución de afiliados:</strong> registro
          agregado de clics salientes hacia guías internas y productos en Amazon
          para medir la utilidad editorial del sitio.
        </li>
      </ul>

      <h2>3. Normativa aplicable y derechos del usuario</h2>
      <p>
        Respetamos los principios de la Ley N.º 29733 (Ley de Protección de
        Datos Personales del Perú), el RGPD europeo y la normativa CCPA/CPRA de
        Estados Unidos. Puedes ejercer tus derechos de acceso, rectificación,
        supresión u oposición escribiendo directamente a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
