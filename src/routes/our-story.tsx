import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { pageTitle, SITE } from "@/lib/site";
import { asset } from "@/lib/asset";

export const Route = createFileRoute("/our-story")({
  component: StoryPage,
  head: () => ({
    meta: [
      { title: pageTitle("Our Story") },
      {
        name: "description",
        content:
          "Shobha's Magic is a Kolkata food brand with thirty years of family recipes, inspired by the culinary traditions of Bihar and Uttar Pradesh.",
      },
    ],
  }),
});

function StoryPage() {
  return (
    <main>
      <PageHero
        title="Born From 30 Years of Love for Indian Food"
        subtitle={SITE.positioning}
        image="/images/story-hands.jpg"
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="font-serif text-2xl leading-snug text-ink">
          For three decades, our kitchen has been a place where recipes are preserved, perfected
          and passed down.
        </p>
        <p className="mt-6 text-base leading-relaxed text-ink-soft">
          Shobha’s Magic began with a simple belief — that the most memorable food doesn’t need to
          be complicated. It needs patience, quality ingredients and a recipe made with love.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Based in Kolkata, we bring the flavours of Bihar, Uttar Pradesh and India’s rich culinary
          traditions to a modern audience, while staying true to the recipes that started it all.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          We began with the culinary traditions of Bihar and Uttar Pradesh, and we’re building a
          modern Indian food brand inspired by those roots — sweets today, and in time, makhana,
          sattu, namkeen, spices and the wider pantry.
        </p>
      </article>
      <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:grid-cols-2 sm:px-6">
        <img src={asset("/images/story-kitchen.jpg")} alt="Finishing peda with pistachio" className="rounded-xl object-cover" />
        <img src={asset("/images/insta-mise.jpg")} alt="Ingredients laid out in a Kolkata kitchen" className="rounded-xl object-cover" />
      </div>
      <section id="heritage" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <SectionHeading
          align="left"
          eyebrow="Heritage"
          title="Rooted in Tradition. Open to the World."
        />
        <p className="mt-6 text-base leading-relaxed text-ink-soft">
          Our roots are deeply Indian, our inspiration is regional, and our vision is global. From
          family kitchens in Bihar and Uttar Pradesh to modern tables around the world, Shobha’s
          Magic celebrates the foods and flavours that connect generations.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          You do not need to already know Thekua to feel at home here. And if you grew up with it,
          you will recognise the craft.
        </p>
        <Button className="mt-8" asChild>
          <Link to="/shop">Shop the collection</Link>
        </Button>
      </section>
    </main>
  );
}
