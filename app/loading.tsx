export default function Loading() {
  return (
    <section className="mx-auto max-w-[1480px] px-6 lg:px-10 py-24 min-h-[60vh] flex items-center">
      <div className="grid grid-cols-12 gap-6 w-full items-end">
        <div className="col-span-12 lg:col-span-8">
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-ocre animate-pulseDot" />
            Échauffement
          </span>
          <h1 className="mt-6 font-display leading-[0.88] tracking-tighter2 text-[clamp(3rem,9vw,8rem)] text-ink/30">
            <span className="block">Chargement</span>
            <span className="block italic">en cours…</span>
          </h1>
          <div className="mt-10 grid gap-3 max-w-md">
            <div className="h-3 rounded-full bg-ink/10 animate-pulse" />
            <div className="h-3 w-2/3 rounded-full bg-ink/10 animate-pulse" />
            <div className="h-3 w-1/2 rounded-full bg-ink/10 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
