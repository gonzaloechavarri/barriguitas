"use client";

import type { ReactNode } from "react";
import { CardTitle, GlassCard } from "@/modules/nosotros/components/glass-card";

type CasaBlockCardProps = {
  icon: string;
  title: string;
  delay?: number;
  children: ReactNode;
};

export function CasaBlockCard({
  icon,
  title,
  delay = 0,
  children,
}: CasaBlockCardProps) {
  return (
    <GlassCard className="p-4 sm:p-5" delay={delay}>
      <CardTitle icon={icon}>{title}</CardTitle>
      <div className="mt-5">{children}</div>
    </GlassCard>
  );
}
