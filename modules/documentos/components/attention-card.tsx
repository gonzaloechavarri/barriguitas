import { cardMotionClasses } from "@/components/motion/card-motion";

type AttentionCardProps = {
  icon: string;
  title: string;
  subtitle: string;
  delay?: number;
};

export function AttentionCard({
  icon,
  title,
  subtitle,
  delay = 0,
}: AttentionCardProps) {
  return (
    <article
      className={`rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.2)] backdrop-blur-md backdrop-saturate-150 sm:p-5 ${cardMotionClasses}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <h2 className="flex items-center gap-2 text-sm font-medium tracking-[-0.01em] text-white/55">
        <span role="img" aria-hidden>
          {icon}
        </span>
        {title}
      </h2>

      <p className="mt-2 text-[0.9375rem] font-light leading-snug tracking-[-0.01em] text-white/65">
        {subtitle}
      </p>
    </article>
  );
}
