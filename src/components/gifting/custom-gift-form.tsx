import { Link } from "@tanstack/react-router";
import { customGiftMessage, openWhatsApp } from "@/lib/whatsapp";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CustomGiftForm() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h2 className="font-serif text-3xl">Create a Custom Gift</h2>
      <p className="mt-2 text-muted">
        Tell us the occasion. We’ll reply on WhatsApp with a composition and a quote.
      </p>
      <form
        className="mt-8 grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          openWhatsApp(
            customGiftMessage({
              name: String(fd.get("name") ?? ""),
              phone: String(fd.get("phone") ?? ""),
              occasion: String(fd.get("occasion") ?? ""),
              budget: String(fd.get("budget") ?? ""),
              boxes: String(fd.get("boxes") ?? ""),
              assortment: String(fd.get("assortment") ?? ""),
              note: String(fd.get("note") ?? ""),
              date: String(fd.get("date") ?? ""),
              corporate: fd.get("corporate") === "on",
            }),
          );
        }}
      >
        <Field name="name" label="Your name" required />
        <Field name="phone" label="Phone" required />
        <div>
          <Label htmlFor="occasion">Occasion</Label>
          <select
            id="occasion"
            name="occasion"
            className="mt-1.5 h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
            defaultValue="Diwali"
          >
            {["Diwali", "Chhath", "Holi", "Raksha Bandhan", "Wedding", "Corporate", "Personal"].map(
              (o) => (
                <option key={o}>{o}</option>
              ),
            )}
          </select>
        </div>
        <Field name="budget" label="Budget" placeholder="e.g. ₹2,500 per box" />
        <Field name="boxes" label="Number of boxes" type="number" />
        <Field name="date" label="Delivery date" type="date" />
        <div className="sm:col-span-2">
          <Field name="assortment" label="Product assortment" placeholder="Thekua, peda, mixed box…" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="note">Custom message</Label>
          <Textarea id="note" name="note" className="mt-1.5" />
        </div>
        <label className="flex min-h-11 items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" name="corporate" className="size-4 accent-forest" />
          Corporate requirements
        </label>
        <Button type="submit" className="sm:col-span-2" size="lg">
          Create a Custom Gift
        </Button>
      </form>
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        <GiftLink to="/gifting/festive" title="Festive" img="/images/diwali.jpg" />
        <GiftLink to="/gifting/wedding" title="Wedding" img="/images/wedding.jpg" />
        <GiftLink to="/gifting/corporate" title="Corporate" img="/images/corporate.jpg" />
      </div>
      <p className="mt-8 text-sm text-muted">
        Need a Custom Gift Box?{" "}
        <Link to="/contact" className="underline-offset-4 hover:underline">
          Talk to Us
        </Link>
      </p>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5"
      />
    </div>
  );
}

function GiftLink({
  to,
  title,
  img,
}: {
  to: "/gifting/festive" | "/gifting/wedding" | "/gifting/corporate";
  title: string;
  img: string;
}) {
  return (
    <Link to={to} className="group overflow-hidden rounded-xl">
      <img
        src={img}
        alt=""
        className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <p className="mt-2 font-serif text-xl">{title}</p>
    </Link>
  );
}
