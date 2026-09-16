export const SITE = {
  name: "Shobha's Magic",
  nameCaps: "SHOBHA'S MAGIC",
  tagline: "30 Years of Tradition. Made for the World.",
  positioning: "Rooted in Bihar & Uttar Pradesh. Crafted in Kolkata. Made for everyone.",
  phoneDisplay: "+91 93116 73027",
  phoneTel: "+919311673027",
  whatsapp: "919311673027",
  city: "Kolkata, India",
  instagram: "https://instagram.com",
  description:
    "Premium Indian sweets and festive gifting from Kolkata. Family recipes inspired by the culinary traditions of Bihar and Uttar Pradesh — made for celebrations everywhere.",
} as const;

export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function pageTitle(title?: string) {
  return title ? `${title} | ${SITE.name}` : `${SITE.name} | ${SITE.tagline}`;
}
