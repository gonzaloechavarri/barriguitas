import type { ReactNode } from "react";
import { cardMotionClasses } from "@/components/motion/card-motion";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function GlassCard({ children, className = "", delay = 0 }: GlassCardProps) {
  return (
    <article
      className={`rounded-3xl border border-white/[0.06] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.2)] backdrop-blur-md backdrop-saturate-150 ${cardMotionClasses} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </article>
  );
}

type CardTitleProps = {
  icon: string;
  children: ReactNode;
};

export function CardTitle({ icon, children }: CardTitleProps) {
  return (
    <h2 className="flex items-center gap-2.5 text-sm font-medium tracking-[-0.01em] text-white/55">
      <span role="img" aria-hidden>
        {icon}
      </span>
      {children}
    </h2>
  );
}
