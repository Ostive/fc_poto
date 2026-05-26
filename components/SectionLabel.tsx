export function SectionLabel({
  index,
  title,
  kicker
}: {
  index: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-6 border-b border-ink/20 pb-6">
      <div className="flex items-baseline gap-6">
        <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/50 section-index">
          §{index}
        </span>
        <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.02] tracking-tighter2">
          {title}
        </h2>
      </div>
      {kicker && (
        <p className="hidden md:block font-mono text-[11px] tracking-[0.18em] uppercase text-ink/50 max-w-[260px] text-right">
          {kicker}
        </p>
      )}
    </div>
  );
}
