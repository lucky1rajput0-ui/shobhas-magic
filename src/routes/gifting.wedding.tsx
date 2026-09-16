import { createFileRoute, Link } from "@tanstack/react-router";
import { productsInCollection } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/product-card";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { pageTitle } from "@/lib/site";
import { CustomGiftForm } from "@/components/gifting/custom-gift-form";

export const Route = createFileRoute("/gifting/wedding")({
  component: WeddingPage,
  head: () => ({
    meta: [
      { title: pageTitle("Wedding Gifting") },
      {
        name: "description",
        content:
          "Elegant Indian wedding sweets and hampers from Shobha's Magic — guest boxes, family hampers and ceremonial crates.",
      },
    ],
  }),
});

function WeddingPage() {
  return (
    <main>
      <PageHero
        title="Wedding Gifting"
        subtitle="Elegant Indian sweets and curated hampers for weddings and family celebrations."
        image="/images/wedding.jpg"
      />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <ProductGrid products={productsInCollection("wedding-gifting")} />
        <div className="mt-10 flex justify-center gap-3">
          <Button asChild>
            <Link to="/gifting">Create a Custom Gift</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">Talk to Us</Link>
          </Button>
        </div>
      </div>
      <CustomGiftForm />
    </main>
  );
}
