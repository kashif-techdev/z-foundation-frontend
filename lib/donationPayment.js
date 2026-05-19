/**
 * Manual donation details (EasyPaisa). No card gateway until formal registration.
 * WhatsApp matches site-wide contact for payment notifications.
 */
export const MANUAL_DONATION = {
  easypaisaMobile: "03330202415",
  accountTitle: "Muhammad Kashif",
  channel: "EasyPaisa",
  /** Same wallet as site WhatsApp for optional payment notifications */
  whatsappNumberIntl: "923330202415",
};

export function getDonationWhatsappUrl(customNote = "") {
  const text = [
    "Assalamualaikum.",
    "I have sent a donation to Z-Foundation via EasyPaisa.",
    customNote.trim() ? `Note: ${customNote.trim()}` : null,
    "Please confirm receipt when possible. JazakAllah Khair.",
  ]
    .filter(Boolean)
    .join(" ");
  return `https://wa.me/${MANUAL_DONATION.whatsappNumberIntl}?text=${encodeURIComponent(text)}`;
}
