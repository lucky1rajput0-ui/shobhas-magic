import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-saffron">404</p>
      <h1 className="mt-4 font-serif text-4xl text-ink">This page has wandered off</h1>
      <p className="mt-4 text-muted">
        The tin you were looking for isn’t here. Try the shop, or write to us on WhatsApp.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Return home</Link>
      </Button>
    </main>
  );
}
