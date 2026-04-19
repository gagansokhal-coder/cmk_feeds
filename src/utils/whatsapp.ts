/**
 * WhatsApp Utility for CMK Feed
 * Handles generation of wa.me links for different business contexts.
 */

const WHATSAPP_NUMBERS = {
  ORDER: '919216796805',
  INQUIRY: '919799762014',
};

export type ProductData = {
  name: string;
  desc: string;
  protein: string;
  energy: string;
  badge?: string;
  badgeClass?: string;
};

/**
 * Generates a pre-filled WhatsApp message link
 */
export function getWhatsAppUrl(
  type: 'ORDER' | 'INQUIRY',
  product: ProductData,
  customMessage?: string
): string {
  const number = WHATSAPP_NUMBERS[type];
  
  let body = '';
  
  if (type === 'ORDER') {
    body = `Hello CMK Feed! 👋\n\nI would like to place an order for:\n\n*Product:* ${product.name}\n*Protein:* ${product.protein}\n*Energy:* ${product.energy}\n\nPlease let me know the pricing and delivery process.`;
  } else {
    body = `Hello! I have an inquiry regarding:\n\n*Product:* ${product.name}\n*Details:* ${product.desc}\n\n*My Message:* ${customMessage || 'I would like to learn more about this product.'}`;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(body)}`;
}
