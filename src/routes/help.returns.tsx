import { createFileRoute } from "@tanstack/react-router";
import { HelpPage } from "@/components/help-page";
import { pageTitle, SITE } from "@/lib/site";

export const Route = createFileRoute("/help/returns")({
  component: () => (
    <HelpPage
      title="Returns"
      body={[
        "Because our sweets are perishable and packed to order, we cannot accept returns of opened tins.",
        "If a parcel arrives damaged or incomplete, write to us on WhatsApp within 24 hours with photographs. We will replace or refund the affected items.",
        `WhatsApp ${SITE.phoneDisplay}`,
      ]}
    />
  ),
  head: () => ({ meta: [{ title: pageTitle("Returns") }] }),
});
