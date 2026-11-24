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
  title: "Aviso Legal y Condiciones de Uso | DespachoListo.com",
  description: `Información legal oficial de DespachoListo.com, titularidad de ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION} (${LEGAL_EMAIL}).`,
  alternates: { canonical: `${SITE_URL}/aviso-legal/` },
};

export default function AvisoLegalPage() {
  return (
    <SimplePage
      title="Aviso Legal y Condiciones de Uso"
      crumb="Aviso legal"
      href="/aviso-legal/"
      intro="Identificación oficial del titular del portal DespachoListo.com, condiciones generales de uso, propiedad intelectual y alcance técnico."
    >
      <h2>1. Datos identificativos del titular</h2>
      <p>
        En cumplimiento de las obligaciones legales de transparencia digital y
        comercio electrónico, se hace constar que el sitio web{" "}
        <strong>https://despacholisto.com</strong> (en adelante,{" "}
        <strong>DespachoListo.com</strong>) es propiedad y está operado por:
      </p>
      <ul>
        <li>
          <strong>Titular responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio legal:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico oficial de contacto:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>2. Objeto y naturaleza informativa del sitio web</h2>
      <p>
        DespachoListo.com es una guía especializada en español dirigida a
        emprendedores y tiendas online que buscan impresoras térmicas para
        imprimir etiquetas de envío de 4 × 6 pulgadas (comparando modelos de
        marcas como Rollo, MUNBYN y KNAON según el volumen de pedidos, el tipo
        de conexión y la facilidad para imprimir desde un celular o una
        computadora). Asimismo, detalla qué etiquetas en rollo o plegadas
        (fan-fold) acepta cada modelo, cuánto cuesta etiquetar 100 paquetes y
        recomienda portarrollos, balanzas digitales y accesorios de embalaje
        disponibles en Amazon Estados Unidos y Amazon España.
      </p>

      <h2>3. Propiedad intelectual y marcas registradas</h2>
      <p>
        Los textos, comparativas, infografías y estructura editorial de este
        sitio están protegidos por derechos de autor a favor de {LEGAL_OWNER}.
        Todas las marcas comerciales citadas con fines descriptivos y de
        compatibilidad (Amazon, Rollo, MUNBYN, KNAON, JADENS, NELKO, Brother,
        DYMO, Zebra, Shopify, Mercado Libre, USPS, UPS, FedEx y DHL) pertenecen
        a sus legítimos titulares.
      </p>

      <h2>4. Enlaces de afiliación a Amazon</h2>
      <p>
        DespachoListo.com participa en el Programa de Afiliados de Amazon.com
        Associates (ID de rastreo: <strong>{AMAZON_TAG_US}</strong>) y en el
        Programa de Afiliados de Amazon EU (ID de seguimiento:{" "}
        <strong>{AMAZON_TAG_ES}</strong>). Al hacer clic en enlaces hacia Amazon
        y realizar compras adscritas, el titular percibe una comisión
        publicitaria sin ningún incremento de precio para el usuario.
      </p>

      <h2>5. Verificación previa a la compra y compatibilidad</h2>
      <p>
        Los precios estimados por cada 100 paquetes, tarifas postales y stock
        pueden variar en tiempo real dentro de Amazon o los couriers locales.
        Verifica siempre en la ficha del fabricante la compatibilidad de ancho
        de etiqueta, drivers de sistema operativo y requerimientos eléctricos antes
        de operar tus equipos.
      </p>
    </SimplePage>
  );
}
