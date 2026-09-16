import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/site";

const FAQS = [
  {
    q: "Do I need an account to order?",
    a: "No. Add items to your cart and confirm on WhatsApp. We take name, phone and address at checkout.",
  },
  {
    q: "Are you only a Bihari sweets shop?",
    a: "No. We began with the culinary traditions of Bihar and Uttar Pradesh, and we are building a modern Indian food brand inspired by those roots — made in Kolkata, for tables everywhere.",
  },
  {
    q: "Do you ship outside India?",
    a: "We regularly pack gifts for Dubai, London, Singapore and other cities. Customs rules for food vary — ask us on WhatsApp with a destination and we will advise.",
  },
  {
    q: "Can I order a custom wedding or corporate box?",
    a: "Yes. Use the gifting pages or the custom gift form. We compose by occasion, budget and headcount.",
  },
  {
    q: "How should I store the sweets?",
    a: "Dry sweets in an airtight tin, cool and dry. Peda refrigerated, then brought to room temperature before serving. Each product page lists shelf life.",
  },
];

export const Route = createFileRoute("/help/faqs")({
  component: FaqsPage,
  head: () => ({ meta: [{ title: pageTitle("FAQs") }] }),
});

function FaqsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="text-[11px] tracking-[0.2em] text-saffron uppercase">Help</p>
      <h1 className="mt-2 font-serif text-4xl">FAQs</h1>
      <dl className="mt-10 space-y-8">
        {FAQS.map((f) => (
          <div key={f.q}>
            <dt className="font-serif text-2xl">{f.q}</dt>
            <dd className="mt-2 text-ink-soft">{f.a}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
