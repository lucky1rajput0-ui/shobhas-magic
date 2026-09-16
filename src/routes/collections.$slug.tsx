import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  getCollectionBySlug,
  productsForCollectionSlug,
} from "@/lib/catalog";
import { PageHero } from "@/components/page-hero";
import { ProductGrid } from "@/components/product/product-card";
import { pageTitle } from "@/lib/site";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = getCollectionBySlug(params.slug);
    if (!collection) throw notFound();
    return {
      collection,
      products: productsForCollectionSlug(params.slug),
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: pageTitle(loaderData?.collection.name) },
      { name: "description", content: loaderData?.collection.description },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const { collection, products } = Route.useLoaderData();
  return (
    <main>
      <PageHero
        title={collection.name}
        subtitle={collection.description}
        image={collection.image}
      />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
