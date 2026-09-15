/** The one human contact channel for workspace access: a WhatsApp number answered by a person, not a bot. */
export const WHATSAPP_NUMBER = '+91-8409878900';
export const WHATSAPP_DISPLAY = '+91 84098 78900';
export const WHATSAPP_DIGITS = WHATSAPP_NUMBER.replace(/\D/g, '');
export const whatsappHref = (text: string) => `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(text)}`;
export const WHATSAPP_ACCESS_MESSAGE = 'Hi exekova, I would like access to the workspace.';
export const WHATSAPP_PAGE_MESSAGE = 'Hi exekova, I have a question about exekova.';
