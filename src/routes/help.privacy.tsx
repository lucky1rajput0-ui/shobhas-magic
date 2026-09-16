import { createFileRoute } from "@tanstack/react-router";
import { HelpPage } from "@/components/help-page";
import { pageTitle } from "@/lib/site";

export const Route = createFileRoute("/help/privacy")({
  component: () => (
    <HelpPage
      title="Privacy Policy"
      body={[
        "We collect only what we need to fulfil an order: name, phone, address, and the contents of your cart. This lives on your device until you send it to us on WhatsApp.",
        "We do not sell personal information. WhatsApp is operated by Meta — their terms apply once a chat is opened.",
        "Wishlist and cart are stored locally in your browser.",
      ]}
    />
  ),
  head: () => ({ meta: [{ title: pageTitle("Privacy Policy") }] }),
});
