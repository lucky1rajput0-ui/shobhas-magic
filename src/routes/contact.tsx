import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { pageTitle, SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { contactMessage, openWhatsApp, waLink } from "@/lib/whatsapp";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: pageTitle("Contact") },
      {
        name: "description",
        content: `Write to Shobha's Magic in Kolkata. WhatsApp ${SITE.phoneDisplay}.`,
      },
    ],
  }),
});

function ContactPage() {
  return (
    <main>
      <PageHero
        title="Let’s Make Something Delicious"
        subtitle="Orders, gifting, and questions — we answer on WhatsApp."
        image="/images/insta-table.jpg"
      />
      <div className="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="font-serif text-3xl">{SITE.name}</p>
          <p className="mt-2 text-muted">Based in {SITE.city}</p>
          <p className="mt-4 text-lg">
            WhatsApp / Phone:{" "}
            <a href={`tel:${SITE.phoneTel}`} className="underline-offset-4 hover:underline">
              {SITE.phoneDisplay}
            </a>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="whatsapp" asChild>
              <a href={waLink(`Hello ${SITE.name}!`)}>Chat on WhatsApp</a>
            </Button>
            <Button variant="outline" asChild>
              <a href={`tel:${SITE.phoneTel}`}>
                <Phone className="size-4" />
                Call Us
              </a>
            </Button>
          </div>
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            openWhatsApp(
              contactMessage({
                name: String(fd.get("name") ?? ""),
                phone: String(fd.get("phone") ?? ""),
                email: String(fd.get("email") ?? ""),
                message: String(fd.get("message") ?? ""),
              }),
            );
          }}
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" required className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" required className="mt-1.5" />
          </div>
          <Button type="submit" variant="whatsapp" size="lg" className="w-full">
            Send on WhatsApp
          </Button>
        </form>
      </div>
    </main>
  );
}
