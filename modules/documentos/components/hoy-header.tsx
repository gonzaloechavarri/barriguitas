import { HoyWeatherContext } from "./hoy-weather-context";

type HoyHeaderProps = {
  dateLabel: string;
  personalGreeting: string;
  weekContextLine: string;
};

export function HoyHeader({
  dateLabel,
  personalGreeting,
  weekContextLine,
}: HoyHeaderProps) {
  return (
    <header className="opacity-0 animate-content-enter">
      <h1 className="flex items-center gap-2.5 text-[1.625rem] font-normal tracking-[-0.02em] text-white/92 sm:text-[1.75rem]">
        <span aria-hidden>☀️</span>
        Hoy
      </h1>

      <p className="mt-3 text-[0.9375rem] font-light tracking-[-0.01em] text-white/55 sm:mt-3.5 sm:text-base">
        {personalGreeting}
      </p>

      <p className="mt-1.5 text-[0.8125rem] font-light tracking-[-0.01em] text-white/28 sm:text-sm">
        {weekContextLine}
      </p>

      <HoyWeatherContext />

      <p className="mt-3 text-[0.8125rem] font-light tracking-[-0.01em] text-white/32 sm:mt-3.5 sm:text-[0.9375rem]">
        {dateLabel}
      </p>
    </header>
  );
}
