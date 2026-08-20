type HoyHeaderProps = {
  dateLabel: string;
};

export function HoyHeader({ dateLabel }: HoyHeaderProps) {
  return (
    <header className="opacity-0 animate-content-enter">
      <h1 className="flex items-center gap-2 text-2xl font-normal tracking-[-0.02em] text-white/90 sm:text-[1.625rem]">
        <span aria-hidden>☀️</span>
        Hoy
      </h1>

      <p className="mt-3 text-base font-light tracking-[-0.01em] text-white/45 sm:text-lg">
        {dateLabel}
      </p>
    </header>
  );
}
