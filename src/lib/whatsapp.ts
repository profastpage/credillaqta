/**
 * WhatsApp Conversion Utility
 * Centralized redirect logic for all WhatsApp CTAs across the site.
 * Phone: +51902495977 (Unión El Progreso - Grupo El Progreso Perú S.A.C.)
 */

export const WHATSAPP_PHONE = "51902495977";

type WhatsAppContext =
  | "home"
  | "prestamos-personales"
  | "garantia-vehicular"
  | "nosotros"
  | "contacto"
  | "vehicular-cotizacion"
  | "asesoria";

const WHATSAPP_MESSAGES: Record<WhatsAppContext, string> = {
  home:
    "Hola, vengo desde la página web y estoy interesado en un préstamo",
  "prestamos-personales":
    "Hola Unión El Progreso, me interesa conocer los requisitos para el préstamo personal al instante...",
  "garantia-vehicular":
    "Hola Unión El Progreso, deseo cotizar un préstamo usando mi auto como garantía sin dejar de usarlo...",
  nosotros:
    "Hola, vengo desde la sección Nosotros y deseo más información sobre sus servicios...",
  contacto:
    "Hola, vengo desde la página web y deseo comunicarme con un asesor...",
  "vehicular-cotizacion":
    "Hola, vengo desde la página web y estoy interesado en un préstamo vehicular",
  asesoria:
    "Hola, vengo desde la página web y necesito asesoría financiera.",
};

/**
 * Generates a WhatsApp API URL with pre-filled message.
 * Uses api.whatsapp.com for desktop and wa.me for mobile compatibility.
 */
export function getWhatsAppUrl(context: WhatsAppContext): string {
  const message = WHATSAPP_MESSAGES[context];
  const encoded = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encoded}`;
}

/**
 * Hook-compatible helper for imperative navigation.
 * Call this inside event handlers (onClick) for client components.
 */
export function redirectToWhatsApp(context: WhatsAppContext): void {
  const url = getWhatsAppUrl(context);
  window.open(url, "_blank", "noopener,noreferrer");
}
