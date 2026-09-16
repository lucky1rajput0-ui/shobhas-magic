import { createFileRoute, Link } from "@tanstack/react-router";
import { getAvailableProducts, collections, products } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/product-card";
import { PageHero } from "@/components/page-hero";
import { pageTitle } from "@/lib/site";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
  head: () => ({
    meta: [
      { title: pageTitle("Shop") },
      {
        name: "description",
        content:
          "Shop traditional Indian sweets and festive gifts from Shobha's Magic — Thekua, Tilkut, Gujiya, Peda, Anarsa and curated boxes, made in Kolkata.",
      },
    ],
  }),
});

function ShopPage() {
  const available = getAvailableProducts();
  const soon = products.filter((p) => p.status === "coming-soon");
  const filters = collections.filter((c) =>
    ["traditional-sweets", "festive-collections", "gifting", "regional-favourites", "coming-soon"].includes(
      c.id,
    ),
  );

  return (
    <main>
      <PageHero
        title="The Shop"
        subtitle="Traditional sweets, festive boxes and gifts — a kitchen built to grow."
        image="/images/assortment.jpg"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((c) => (
            <Link
              key={c.id}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className="rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink-soft hover:border-ink hover:text-ink"
            >
              {c.name}
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <ProductGrid products={available} />
        </div>
        <h2 className="mt-20 font-serif text-3xl">Coming soon</h2>
        <p className="mt-2 max-w-xl text-muted">
          Makhana, sattu, namkeen, spices and pantry essentials — Shobha’s Magic is growing
          beyond sweets.
        </p>
        <div className="mt-8">
          <ProductGrid products={soon} />
        </div>
      </div>
    </main>
  );
}
