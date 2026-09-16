import { createFileRoute } from "@tanstack/react-router";
import { productsInCollection } from "@/lib/catalog";
import { ProductGrid } from "@/components/product/product-card";
import { PageHero } from "@/components/page-hero";
import { pageTitle } from "@/lib/site";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { corporateQuoteMessage, openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/gifting/corporate")({
  component: CorporatePage,
  head: () => ({
    meta: [
      { title: pageTitle("Corporate Gifting") },
      {
        name: "description",
        content:
          "Premium Indian food hampers for clients, employees and partners. Bulk and corporate orders from Shobha's Magic, Kolkata.",
      },
    ],
  }),
});

function CorporatePage() {
  return (
    <main>
      <PageHero
        title="Corporate Gifting"
        subtitle="Premium food hampers designed for clients, employees and business partners."
        image="/images/corporate.jpg"
      />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <ProductGrid products={productsInCollection("corporate-gifting")} />
      </div>
      <section className="bg-cream/70 py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl">Bulk & Corporate Orders</h2>
          <p className="mt-2 text-muted">
            Consistent presentation, your message on the card, delivery to multiple cities.
          </p>
          <form
            className="mt-8 grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              openWhatsApp(
                corporateQuoteMessage({
                  name: String(fd.get("name") ?? ""),
                  company: String(fd.get("company") ?? ""),
                  phone: String(fd.get("phone") ?? ""),
                  email: String(fd.get("email") ?? ""),
                  boxes: String(fd.get("boxes") ?? ""),
                  budget: String(fd.get("budget") ?? ""),
                  city: String(fd.get("city") ?? ""),
                  requirements: String(fd.get("requirements") ?? ""),
                }),
              );
            }}
          >
            <Field name="name" label="Name" required />
            <Field name="company" label="Company" required />
            <Field name="phone" label="Phone" required />
            <Field name="email" label="Email" type="email" />
            <Field name="boxes" label="Number of boxes" />
            <Field name="budget" label="Approximate budget" />
            <div className="sm:col-span-2">
              <Field name="city" label="Delivery city" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea id="requirements" name="requirements" className="mt-1.5" />
            </div>
            <Button type="submit" size="lg" variant="whatsapp" className="sm:col-span-2">
              Request a Quote on WhatsApp
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required={required} className="mt-1.5" />
    </div>
  );
}
