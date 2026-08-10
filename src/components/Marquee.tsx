const ITEMS = [
  "ESTÉTICA FACIAL",
  "ESTÉTICA CORPORAL",
  "TERAPIAS INTEGRATIVAS",
  "SAÚDE",
  "BEM ESTAR",
  "ESTÉTICA AVANÇADA",
];

function Sequence() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center gap-6 px-6 py-4 font-display text-xs font-semibold tracking-[0.28em] text-primary-foreground/90 sm:text-sm"
        >
          {item}
          <span aria-hidden className="text-accent">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section
      aria-label="Especialidades da clínica"
      className="marquee-paused overflow-hidden border-y border-border/40 bg-rose-taupe"
    >
      <div className="marquee-track">
        <Sequence />
        <div aria-hidden>
          <Sequence />
        </div>
      </div>
    </section>
  );
}
