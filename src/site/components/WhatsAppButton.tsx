import { WHATSAPP_DISPLAY, WHATSAPP_PAGE_MESSAGE, whatsappHref } from '../whatsapp';

/** A fixed link on every page that opens a WhatsApp chat with the team. A person answers; nothing is automated. */
export default function WhatsAppButton() {
  return <a className="site-whatsapp" href={whatsappHref(WHATSAPP_PAGE_MESSAGE)} target="_blank" rel="noopener noreferrer" aria-label={`Message exekova on WhatsApp, ${WHATSAPP_DISPLAY}`} title="Message exekova on WhatsApp">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/brand/integrations/whatsapp.webp" alt="" width={34} height={34} loading="lazy" decoding="async"/>
    <span>WhatsApp</span>
  </a>;
}
