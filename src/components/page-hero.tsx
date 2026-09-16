import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl")}>
      {eyebrow ? (
        <p
          className={cn(
            "text-[11px] tracking-[0.22em] uppercase",
            light ? "text-gold" : "text-saffron",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-3 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl",
          light ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={cn("mt-4 text-base leading-relaxed", light ? "text-ivory/75" : "text-muted")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function PageHero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      {image ? (
        <img
          src={asset(image)}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-forest-deep" />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/45 to-ink/25" />
      <div className="relative mx-auto flex min-h-[42vh] max-w-4xl flex-col items-center justify-end px-6 py-16 text-center sm:min-h-[48vh] sm:py-20">
        <h1 className="font-serif text-4xl text-ivory sm:text-5xl md:text-6xl">{title}</h1>
        {subtitle ? (
          <p className="mt-4 max-w-xl text-base text-ivory/80">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
