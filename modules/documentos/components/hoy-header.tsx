type HoyHeaderProps = {
  greeting: string;
  attentionIntro: string;
};

export function HoyHeader({ greeting, attentionIntro }: HoyHeaderProps) {
  return (
    <header
      className="opacity-0 animate-fade-up"
      style={{ animationDelay: "0ms" }}
    >
      <h1 className="text-2xl font-normal tracking-[-0.02em] text-white/90 sm:text-[1.625rem]">
        {greeting}
      </h1>

      <p className="mt-4 text-sm font-light leading-relaxed tracking-[-0.01em] text-white/40 sm:text-[0.9375rem]">
        {attentionIntro}
      </p>
    </header>
  );
}
