import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de Cookies | DespachoListo.com",
  description: `Información transparente sobre almacenamiento local y cookies en DespachoListo.com (${LEGAL_OWNER}, ${LEGAL_LOCATION}, ${LEGAL_EMAIL}).`,
  alternates: { canonical: `${SITE_URL}/politica-de-cookies/` },
};

export default function CookiesPage() {
  return (
    <SimplePage
      title="Política de Cookies"
      crumb="Política de cookies"
      href="/politica-de-cookies/"
      intro="Detalle sobre el uso de almacenamiento técnico local y cookies de atribución en DespachoListo.com."
    >
      <h2>1. Titular del portal</h2>
      <p>
        <strong>DespachoListo.com</strong> es un sitio web de{" "}
        <strong>{LEGAL_OWNER}</strong>, domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong> · Correo electrónico:{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>

      <h2>2. Almacenamiento técnico en tu navegador</h2>
      <p>
        DespachoListo.com utiliza claves ligeras en{" "}
        <code>localStorage</code> y <code>sessionStorage</code> únicamente para
        recordar tu tienda Amazon seleccionada (<code>dl_amazon_region</code>:
        Amazon.com EE. UU. o Amazon.es España) y conservar el historial de tu
        conversación con el Asesor de Despacho IA (
        <code>dl_chat_session</code> y <code>dl_chat_messages</code>).
      </p>

      <h2>3. Cookies de atribución de Amazon Associates</h2>
      <p>
        Cuando haces clic voluntariamente en un enlace hacia{" "}
        <code>amazon.com</code> o <code>amazon.es</code>, Amazon puede
        establecer cookies en su propio dominio conforme a su política de
        privacidad para atribuir las compras adscritas durante la ventana
        reglamentaria del programa.
      </p>

      <h2>4. Gestión o eliminación de cookies</h2>
      <p>
        Puedes borrar el almacenamiento local y deshabilitar cookies en la
        configuración de tu navegador en cualquier momento. Para dudas,
        escríbenos a <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
