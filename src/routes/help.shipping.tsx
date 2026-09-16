import { createFileRoute } from "@tanstack/react-router";
import { HelpPage } from "@/components/help-page";
import { pageTitle, SITE } from "@/lib/site";

export const Route = createFileRoute("/help/shipping")({
  component: () => (
    <HelpPage
      title="Shipping"
      body={[
        "We pack from Kolkata and currently confirm every dispatch on WhatsApp, so you know when a tin leaves the kitchen.",
        "Dry sweets such as Thekua, Tilkut and Khajur travel well across India. Milk sweets such as Peda prefer cooler months and shorter routes — we will advise before you confirm.",
        "Delivery timelines depend on city and season. Share your pincode at checkout and we will confirm.",
        `Questions: ${SITE.phoneDisplay}`,
      ]}
    />
  ),
  head: () => ({ meta: [{ title: pageTitle("Shipping") }] }),
});
