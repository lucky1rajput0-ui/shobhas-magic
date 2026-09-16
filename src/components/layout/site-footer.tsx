import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5">
          <div>
            <p className="font-serif text-2xl tracking-[0.04em]">{SITE.nameCaps}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/70">{SITE.tagline}</p>
            <p className="mt-4 text-sm text-ivory/60">{SITE.city}</p>
            <p className="text-sm text-ivory/60">{SITE.phoneDisplay}</p>
          </div>
          <FooterCol title="Shop">
            <ProductLink slug="thekua">Thekua</ProductLink>
            <ProductLink slug="khajur">Khajur</ProductLink>
            <ProductLink slug="tilkut">Tilkut</ProductLink>
            <ProductLink slug="gujiya">Gujiya</ProductLink>
            <ProductLink slug="peda">Peda</ProductLink>
            <ProductLink slug="anarsa">Anarsa</ProductLink>
          </FooterCol>
          <FooterCol title="Gifting">
            <Link className={fl} to="/gifting/festive">
              Festive Boxes
            </Link>
            <ProductLink slug="chhath-gift-box">Chhath Boxes</ProductLink>
            <Link className={fl} to="/gifting/wedding">
              Wedding Gifting
            </Link>
            <Link className={fl} to="/gifting/corporate">
              Corporate Gifting
            </Link>
          </FooterCol>
          <FooterCol title="About">
            <Link className={fl} to="/our-story">
              Our Story
            </Link>
            <a className={fl} href="/our-story#heritage">
              Our Heritage
            </a>
            <Link className={fl} to="/contact">
              Contact
            </Link>
          </FooterCol>
          <FooterCol title="Help">
            <Link className={fl} to="/help/shipping">
              Shipping
            </Link>
            <Link className={fl} to="/help/returns">
              Returns
            </Link>
            <Link className={fl} to="/help/faqs">
              FAQs
            </Link>
            <Link className={fl} to="/help/privacy">
              Privacy Policy
            </Link>
            <Link className={fl} to="/help/terms">
              Terms & Conditions
            </Link>
          </FooterCol>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {SITE.name} — {SITE.tagline}
          </p>
          <p>{SITE.positioning}</p>
        </div>
      </div>
    </footer>
  );
}

const fl = "block text-sm text-ivory/80 transition-colors hover:text-ivory";

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.18em] text-gold uppercase">{title}</p>
      <div className="mt-4 space-y-2">{children}</div>
    </div>
  );
}

function ProductLink({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <Link className={fl} to="/product/$slug" params={{ slug }}>
      {children}
    </Link>
  );
}
