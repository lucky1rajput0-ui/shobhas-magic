import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useUi } from "@/lib/ui-store";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";

export function AccountDialog() {
  const panel = useUi((s) => s.panel);
  const close = useUi((s) => s.close);

  return (
    <Dialog.Root open={panel === "account"} onOpenChange={(o) => (o ? null : close())}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-fade" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-ivory p-6 shadow-[var(--shadow-lift)] focus:outline-none data-[state=open]:animate-rise">
          <div className="flex items-start justify-between gap-4">
            <Dialog.Title className="font-serif text-2xl">Order as a guest</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="flex size-11 items-center justify-center rounded-full hover:bg-cream"
              >
                <X className="size-5" />
              </button>
            </Dialog.Close>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            You don’t need an account to shop with {SITE.name}. Add sweets to your cart and
            confirm the order on WhatsApp — we’ll take the rest.
          </p>
          <Button variant="whatsapp" className="mt-6 w-full" asChild>
            <a href={waLink(`Hello ${SITE.name}! I have a question.`)}>Chat on WhatsApp</a>
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
