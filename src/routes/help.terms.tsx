import { createFileRoute } from "@tanstack/react-router";
import { HelpPage } from "@/components/help-page";
import { pageTitle, SITE } from "@/lib/site";

export const Route = createFileRoute("/help/terms")({
  component: () => (
    <HelpPage
      title="Terms & Conditions"
      body={[
        `Orders placed through ${SITE.name} are confirmed only after we reply on WhatsApp. Prices are in Indian rupees and may change with season and ingredient costs.`,
        "Availability of perishable sweets is not guaranteed until we confirm. Custom and corporate orders may require an advance.",
        "By submitting an order you confirm that the delivery details are accurate.",
      ]}
    />
  ),
  head: () => ({ meta: [{ title: pageTitle("Terms & Conditions") }] }),
});
