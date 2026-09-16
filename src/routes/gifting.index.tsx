import { createFileRoute } from "@tanstack/react-router";
import { CustomGiftForm } from "@/components/gifting/custom-gift-form";
import { pageTitle } from "@/lib/site";
import { asset } from "@/lib/asset";

export const Route = createFileRoute("/gifting/")({
  component: GiftingHub,
  head: () => ({ meta: [{ title: pageTitle("Gifting") }] }),
});

function GiftingHub() {
  return (
    <main>
      <section className="relative isolate min-h-[52vh] overflow-hidden">
        <img
          src={asset("/images/gifting-hero.jpg")}
          alt="Festive Indian sweet gift boxes"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative mx-auto flex min-h-[52vh] max-w-3xl flex-col items-center justify-end px-6 py-16 text-center">
          <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Gifting</p>
          <h1 className="mt-3 font-serif text-5xl text-ivory">Make Every Celebration Sweeter</h1>
          <p className="mt-4 text-ivory/80">
            Occasion, budget, a note in the lid — we compose boxes for festivals, weddings, and
            the office.
          </p>
        </div>
      </section>
      <CustomGiftForm />
    </main>
  );
}
