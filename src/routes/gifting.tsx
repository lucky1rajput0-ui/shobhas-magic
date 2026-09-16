import { createFileRoute, Outlet } from "@tanstack/react-router";
import { pageTitle } from "@/lib/site";

export const Route = createFileRoute("/gifting")({
  component: () => <Outlet />,
  head: () => ({
    meta: [
      { title: pageTitle("Gifting") },
      {
        name: "description",
        content:
          "Festive, wedding and corporate gifting from Shobha's Magic — premium Indian sweets, packed in Kolkata.",
      },
    ],
  }),
});
