type HoyHeaderProps = {
  dateLabel: string;
};

export function HoyHeader({ dateLabel }: HoyHeaderProps) {
  return (
    <header className="opacity-0 animate-content-enter">
      <h1 className="flex items-center gap-2.5 text-[1.625rem] font-normal tracking-[-0.02em] text-white/92 sm:text-[1.75rem]">
        <span aria-hidden>☀️</span>
        Hoy
      </h1>

      <p className="mt-2.5 text-[0.9375rem] font-light tracking-[-0.01em] text-white/42 sm:mt-3 sm:text-base">
        {dateLabel}
      </p>
    </header>
  );
}
