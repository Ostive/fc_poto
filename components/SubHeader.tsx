export function SubHeader({
  label,
  kicker
}: {
  label: string;
  kicker?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink/15 pb-4">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/45">↳</span>
        <h3 className="font-display text-[clamp(1.25rem,2.2vw,1.875rem)] tracking-tighter2 leading-[1.1]">
          {label}
        </h3>
      </div>
      {kicker && (
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/45">
          {kicker}
        </p>
      )}
    </div>
  );
}
