import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { searchProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/product-card";
import { pageTitle } from "@/lib/site";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";

const searchSchema = z.object({
  q: z.string().optional().catch(""),
});

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: pageTitle("Search") }] }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const navigate = useNavigate();
  const results = searchProducts(q);

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-4xl">Search</h1>
      <form
        className="mt-6 max-w-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const next = String(fd.get("q") ?? "");
          navigate({ to: "/search", search: { q: next } });
        }}
      >
        <Input name="q" defaultValue={q} placeholder="Search sweets, gifts, festivals…" />
      </form>
      <p className="mt-6 text-sm text-muted">
        {q ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q}”` : "Try Thekua, Diwali, wedding…"}
      </p>
      <div className="mt-8">
        <ProductGrid products={results} />
      </div>
    </main>
  );
}
