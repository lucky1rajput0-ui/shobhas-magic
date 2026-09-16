import * as Dialog from "@radix-ui/react-dialog";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { searchProducts } from "@/lib/catalog";
import { useUi } from "@/lib/ui-store";
import { formatINR } from "@/lib/site";
import { minPrice } from "@/lib/catalog";
import { Input } from "@/components/ui/input";
import { asset } from "@/lib/asset";

export function SearchDialog() {
  const panel = useUi((s) => s.panel);
  const close = useUi((s) => s.close);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const results = useMemo(() => (q.trim() ? searchProducts(q).slice(0, 8) : []), [q]);

  function go(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    close();
    if (query) navigate({ to: "/search", search: { q: query } });
    else navigate({ to: "/shop" });
  }

  return (
    <Dialog.Root
      open={panel === "search"}
      onOpenChange={(o) => {
        if (!o) {
          close();
          setQ("");
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-fade" />
        <Dialog.Content className="fixed top-[12vh] right-4 left-4 z-50 mx-auto max-w-xl rounded-xl bg-ivory p-4 shadow-[var(--shadow-lift)] focus:outline-none data-[state=open]:animate-rise sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <Dialog.Title className="font-serif text-2xl">Search the kitchen</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close search"
                className="flex size-11 items-center justify-center rounded-full hover:bg-cream"
              >
                <X className="size-5" />
              </button>
            </Dialog.Close>
          </div>
          <form onSubmit={go} className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
            <Input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Thekua, Diwali box, wedding…"
              className="pl-10"
            />
          </form>
          <ul className="mt-3 max-h-[50vh] overflow-y-auto">
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  onClick={close}
                  className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-cream"
                >
                  <img src={asset(p.images[0])} alt="" className="size-12 rounded object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{p.name}</p>
                    <p className="truncate text-xs text-muted">{p.tagline}</p>
                  </div>
                  <span className="text-xs tabular-nums text-muted">
                    {p.status === "coming-soon" ? "Soon" : formatINR(minPrice(p))}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {q.trim() && !results.length ? (
            <p className="py-6 text-center text-sm text-muted">No matches. Try “thekua” or “gift”.</p>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
