export function HelpPage({ title, body }: { title: string; body: string[] }) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="text-[11px] tracking-[0.2em] text-saffron uppercase">Help</p>
      <h1 className="mt-2 font-serif text-4xl">{title}</h1>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-ink-soft">
        {body.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>
    </main>
  );
}
