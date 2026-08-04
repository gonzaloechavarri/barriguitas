type FeatureCardProps = {
  icon: string;
  title: string;
  delay: number;
};

export function FeatureCard({ icon, title, delay }: FeatureCardProps) {
  return (
    <article
      className="group flex flex-col rounded-3xl border border-white/[0.06] bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.2)] backdrop-blur-md backdrop-saturate-150 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] animate-fade-up hover:-translate-y-1 hover:border-white/[0.1] hover:bg-white/[0.05] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.35)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span
        className="text-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        role="img"
        aria-hidden
      >
        {icon}
      </span>

      <h2 className="mt-3 text-sm font-medium tracking-tight text-white/75 transition-colors duration-500 group-hover:text-white/95">
        {title}
      </h2>

      <div
        aria-hidden
        className="mt-5 h-px w-full bg-gradient-to-r from-white/[0.08] to-transparent transition-opacity duration-500 group-hover:from-white/[0.12]"
      />
    </article>
  );
}
