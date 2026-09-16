import { createFileRoute, Link } from "@tanstack/react-router";
import { Gift, HeartHandshake, Landmark, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/page-hero";
import { ProductGrid } from "@/components/product/product-card";
import {
  featuredCollections,
  getFeaturedProducts,
  collectionsByGroup,
  collectionGroups,
} from "@/lib/catalog";
import { SITE, pageTitle } from "@/lib/site";
import { asset } from "@/lib/asset";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: pageTitle() },
      { name: "description", content: SITE.description },
    ],
  }),
});

const INSTAGRAM = [
  asset("/images/thekua.jpg"),
  asset("/images/tilkut.jpg"),
  asset("/images/gujiya.jpg"),
  asset("/images/peda.jpg"),
  asset("/images/insta-fry.jpg"),
  asset("/images/insta-table.jpg"),
  asset("/images/insta-sesame.jpg"),
  asset("/images/hampers.jpg"),
];

const TESTIMONIALS = [
  {
    quote:
      "The Diwali box we sent to London arrived looking as considered as anything from a luxury store. The thekua tasted like home.",
    name: "Ananya M.",
    place: "Mumbai",
  },
  {
    quote:
      "We ordered wedding hampers for out-of-town family. Quiet packaging, generous sweets, and a note that felt personal.",
    name: "Rohit S.",
    place: "Delhi",
  },
  {
    quote:
      "I had never heard of tilkut. Now it’s the tin I keep on my desk in Singapore. Crisp, not cloying.",
    name: "Priya K.",
    place: "Singapore",
  },
  {
    quote:
      "Corporate gifts that didn’t look corporate. Our clients in Dubai actually wrote back.",
    name: "Farhan A.",
    place: "Kolkata",
  },
];

function Home() {
  const featured = getFeaturedProducts();
  const cats = featuredCollections();

  return (
    <main>
      <Hero />
      <TrustStrip />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="The collection"
          title="Discover Shobha’s Magic"
          subtitle="Traditional favourites, festive indulgences and thoughtfully crafted gifts."
        />
        <div className="mt-12">
          <ProductGrid products={featured} />
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link to="/shop">View all products</Link>
          </Button>
        </div>
      </section>

      <section className="bg-cream/60 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="The pantry, growing"
            title="From Our Kitchen to Your Table"
            subtitle="Sweets today. Makhana, sattu, namkeen and spices as we grow into a wider Indian food brand."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cats.map((c) => (
              <Link
                key={c.id}
                to="/collections/$slug"
                params={{ slug: c.slug }}
                className="group relative isolate overflow-hidden rounded-xl"
              >
                <img
                  src={asset(c.image)}
                  alt=""
                  className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-serif text-2xl text-ivory">{c.name}</p>
                  <p className="mt-1 text-sm text-ivory/80">{c.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <KitchenLegend />
        </div>
      </section>

      <StoryBand />
      <Heritage />
      <GiftingBand />
      <Why />
      <Testimonials />
      <Instagram />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden">
      <img
        src={asset("/images/hero.jpg")}
        alt="Assortment of Indian sweets and festive gift boxes"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-ink/75 via-ink/40 to-ink/15" />
      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-4 py-16 sm:px-6 sm:py-24 lg:justify-center">
        <p className="animate-rise text-[11px] tracking-[0.24em] text-gold uppercase">
          Kolkata · Since a family kitchen
        </p>
        <h1 className="animate-rise mt-4 max-w-xl font-serif text-4xl leading-[1.08] text-ivory sm:text-5xl md:text-6xl lg:text-7xl">
          The Magic of Indian Tradition, Made to Be Shared.
        </h1>
        <p className="animate-rise mt-5 max-w-lg text-base leading-relaxed text-ivory/85 sm:text-lg">
          Three decades of family recipes, handcrafted with care in Kolkata — bringing the flavours
          of Bihar, Uttar Pradesh and India to tables everywhere.
        </p>
        <div className="animate-rise mt-8 flex flex-wrap gap-3">
          <Button size="lg" variant="inverse" asChild>
            <Link to="/shop">Shop Collection</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-ivory/40 text-ivory hover:bg-ivory/10"
            asChild
          >
            <Link to="/gifting">Explore Gifting</Link>
          </Button>
        </div>
        <p className="animate-rise mt-8 text-xs tracking-[0.2em] text-ivory/70 uppercase">
          30 Years of Culinary Tradition
        </p>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    "30 Years of Culinary Tradition",
    "Handcrafted in Kolkata",
    "Festive & Wedding Gifting",
    "Ships across India",
  ];
  return (
    <div className="border-b border-line bg-paper">
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-4 text-[11px] tracking-[0.16em] text-muted uppercase">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

function KitchenLegend() {
  return (
    <div className="mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-5">
      {collectionGroups.map((g) => {
        const extra =
          g.id === "kitchen"
            ? ["Thekua", "Khajur", "Tilkut", "Gujiya", "Peda", "Anarsa"]
            : g.id === "coming-soon"
              ? ["Makhana", "Sattu", "Namkeen", "Spices", "Indian Snacks", "Pantry Essentials"]
              : collectionsByGroup(g.id)
                  .filter((c) => !c.featured)
                  .map((c) => c.name);
        return (
          <div key={g.id}>
            <p className="font-serif text-xl text-ink">{g.title}</p>
            <ul className="mt-3 space-y-1 text-sm text-muted">
              {extra.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function StoryBand() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
      <div className="grid grid-cols-2 gap-3">
        <img
          src={asset("/images/story-hands.jpg")}
          alt="Hands pressing a wooden mould into sweet dough"
          className="aspect-3/4 rounded-xl object-cover"
        />
        <img
          src={asset("/images/story-kitchen.jpg")}
          alt="Hands finishing milk peda with pistachio"
          className="mt-8 aspect-3/4 rounded-xl object-cover"
        />
      </div>
      <div>
        <SectionHeading
          align="left"
          eyebrow="Our story"
          title="Born From 30 Years of Love for Indian Food"
          subtitle="For three decades, our kitchen has been a place where recipes are preserved, perfected and passed down."
        />
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
          Shobha’s Magic began with a simple belief — that the most memorable food doesn’t need to
          be complicated. It needs patience, quality ingredients and a recipe made with love.
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          Based in Kolkata, we bring the flavours of Bihar, Uttar Pradesh and India’s rich culinary
          traditions to a modern audience, while staying true to the recipes that started it all.
        </p>
        <Button className="mt-8" asChild>
          <Link to="/our-story">Discover Our Story</Link>
        </Button>
      </div>
    </section>
  );
}

function Heritage() {
  return (
    <section className="relative isolate overflow-hidden">
      <img src={asset("/images/heritage.jpg")} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-ink/70" />
      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <div className="mithila-rule mx-auto mb-8 h-8 w-40" />
        <SectionHeading
          light
          eyebrow="Heritage"
          title="Rooted in Tradition. Open to the World."
          subtitle="Our roots are deeply Indian, our inspiration is regional, and our vision is global."
        />
        <p className="mt-6 text-base leading-relaxed text-ivory/80">
          From family kitchens in Bihar and Uttar Pradesh to modern tables around the world,
          Shobha’s Magic celebrates the foods and flavours that connect generations — without
          asking anyone to already know the names.
        </p>
      </div>
    </section>
  );
}

function GiftingBand() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Gifting"
          title="Make Every Celebration Sweeter"
          subtitle="Elegant gift boxes of assorted Indian sweets, composed in Kolkata."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <GiftTile
            title="Festive Boxes"
            text="Beautifully curated assortments for festivals and celebrations."
            img={asset("/images/gifting-hero.jpg")}
            to="/gifting/festive"
          />
          <Link
            to="/product/$slug"
            params={{ slug: "chhath-gift-box" }}
            className="group relative isolate min-h-64 overflow-hidden rounded-xl"
          >
            <img
              src={asset("/images/chhath.jpg")}
              alt=""
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-ink/45" />
            <div className="relative flex h-full min-h-64 flex-col justify-end p-6">
              <h3 className="font-serif text-3xl text-ivory">Chhath Boxes</h3>
              <p className="mt-2 max-w-md text-sm text-ivory/80">
                Thoughtfully prepared collections inspired by the traditions of Chhath.
              </p>
            </div>
          </Link>
          <GiftTile
            title="Wedding Gifting"
            text="Elegant Indian sweets and curated hampers for weddings and family celebrations."
            img={asset("/images/wedding.jpg")}
            to="/gifting/wedding"
          />
          <GiftTile
            title="Corporate Gifting"
            text="Premium food hampers designed for clients, employees and business partners."
            img={asset("/images/corporate.jpg")}
            to="/gifting/corporate"
          />
        </div>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link to="/gifting">Explore Gifting</Link>
          </Button>
          <Link to="/contact" className="text-sm text-ink-soft underline-offset-4 hover:underline">
            Need a Custom Gift Box? → Talk to Us
          </Link>
        </div>
      </div>
    </section>
  );
}

function GiftTile({
  title,
  text,
  img,
  to,
}: {
  title: string;
  text: string;
  img: string;
  to: "/gifting/festive" | "/gifting/wedding" | "/gifting/corporate";
}) {
  return (
    <Link to={to} className="group relative isolate min-h-64 overflow-hidden rounded-xl">
      <img
        src={img}
        alt=""
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-ink/45" />
      <div className="relative flex h-full min-h-64 flex-col justify-end p-6">
        <h3 className="font-serif text-3xl text-ivory">{title}</h3>
        <p className="mt-2 max-w-md text-sm text-ivory/80">{text}</p>
      </div>
    </Link>
  );
}

function Why() {
  const items = [
    {
      icon: Landmark,
      title: "30 Years of Experience",
      text: "Three decades of cooking traditional Indian food.",
    },
    {
      icon: HeartHandshake,
      title: "Family Recipes",
      text: "Recipes developed and preserved across generations.",
    },
    {
      icon: MapPinned,
      title: "Made in Kolkata",
      text: "Our kitchen and brand are proudly based in Kolkata.",
    },
    {
      icon: Gift,
      title: "Made for Every Celebration",
      text: "From everyday indulgence to weddings, festivals and corporate gifting.",
    },
  ];
  return (
    <section className="bg-forest-deep py-20 text-ivory sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading light eyebrow="Why us" title="Why Shobha’s Magic" />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.title} className="rounded-xl border border-ivory/10 bg-ivory/5 p-6">
              <it.icon className="size-6 text-gold" strokeWidth={1.4} />
              <h3 className="mt-4 font-serif text-2xl">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/70">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionHeading
        eyebrow="From tables we know"
        title="Loved at Home. Shared With Everyone."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {TESTIMONIALS.map((t) => (
          <blockquote key={t.name} className="rounded-xl bg-card p-6 ring-1 ring-line">
            <p className="font-serif text-xl leading-snug text-ink">“{t.quote}”</p>
            <footer className="mt-5 text-sm text-muted">
              {t.name} · {t.place}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function Instagram() {
  return (
    <section className="pb-20 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Social"
          title="Follow the Magic"
          subtitle="A glimpse of the kitchen, the boxes, and the table."
        />
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {INSTAGRAM.map((src) => (
            <a
              key={src}
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="overflow-hidden rounded-lg"
            >
              <img src={src} alt="" className="aspect-square w-full object-cover" />
            </a>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <a href={SITE.instagram} target="_blank" rel="noreferrer">
              Follow Us on Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
