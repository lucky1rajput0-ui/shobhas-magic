import { createFileRoute, Link } from "@tanstack/react-router";
import { productsInCollection } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/product-card";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { pageTitle } from "@/lib/site";
import { CustomGiftForm } from "@/components/gifting/custom-gift-form";

export const Route = createFileRoute("/gifting/festive")({
  component: FestivePage,
  head: () => ({
    meta: [
      { title: pageTitle("Festive Gifting") },
      {
        name: "description",
        content:
          "Diwali, Chhath, Holi and Raksha Bandhan gift boxes of traditional Indian sweets from Shobha's Magic, Kolkata.",
      },
    ],
  }),
});

function FestivePage() {
  const products = [
    ...productsInCollection("diwali"),
    ...productsInCollection("chhath"),
    ...productsInCollection("holi"),
    ...productsInCollection("raksha-bandhan"),
    ...productsInCollection("festive-hampers"),
  ].filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i);

  return (
    <main>
      <PageHero
        title="Festive Gifting"
        subtitle="Beautifully curated assortments for festivals and celebrations."
        image="/images/gifting-hero.jpg"
      />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <ProductGrid products={products} />
        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link to="/contact">Need a Custom Gift Box? → Talk to Us</Link>
          </Button>
        </div>
      </div>
      <CustomGiftForm />
    </main>
  );
}
