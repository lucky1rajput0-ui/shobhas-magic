import { SITE, formatINR } from "@/lib/site";
import type { ResolvedLine } from "@/lib/cart-store";

export type CustomerDetails = {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
};

export function waLink(text: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function cartOrderMessage(lines: ResolvedLine[], total: number, customer?: CustomerDetails) {
  const items = lines
    .map(
      (l) =>
        `${l.product.name} – ${l.variant.label} – Qty ${l.quantity} (${formatINR(l.lineTotal)})`,
    )
    .join("\n");

  const who = customer
    ? `\n\nName: ${customer.name}\nPhone: ${customer.phone}\nAddress: ${customer.address}\nCity: ${customer.city}\nPincode: ${customer.pincode}`
    : "";

  return `Hello Shobha's Magic! I would like to place an order:

${items}

Total: ${formatINR(total)}${who}

Please confirm availability and delivery details.`;
}

export function notifyMessage(productName: string) {
  return `Hello Shobha's Magic! Please notify me when ${productName} is available.`;
}

export function contactMessage(input: {
  name: string;
  phone: string;
  email?: string;
  message: string;
}) {
  return `Hello Shobha's Magic! 

Name: ${input.name}
Phone: ${input.phone}${input.email ? `\nEmail: ${input.email}` : ""}

${input.message}`;
}

export function customGiftMessage(input: {
  occasion: string;
  budget: string;
  boxes: string;
  assortment: string;
  note: string;
  date: string;
  corporate: boolean;
  name: string;
  phone: string;
}) {
  return `Hello Shobha's Magic! I would like to create a custom gift.

Name: ${input.name}
Phone: ${input.phone}
Occasion: ${input.occasion}
Budget: ${input.budget}
Number of boxes: ${input.boxes}
Assortment: ${input.assortment}
Delivery date: ${input.date || "Flexible"}
Corporate: ${input.corporate ? "Yes" : "No"}
Message: ${input.note || "—"}

Please help me compose this gift.`;
}

export function corporateQuoteMessage(input: {
  name: string;
  company: string;
  phone: string;
  email: string;
  boxes: string;
  budget: string;
  city: string;
  requirements: string;
}) {
  return `Hello Shobha's Magic! I would like a quote for a bulk / corporate order.

Name: ${input.name}
Company: ${input.company}
Phone: ${input.phone}
Email: ${input.email}
Number of boxes: ${input.boxes}
Approximate budget: ${input.budget}
Delivery city: ${input.city}

Requirements:
${input.requirements}`;
}

export function openWhatsApp(text: string) {
  const url = waLink(text);
  window.open(url, "_blank", "noopener,noreferrer");
}
