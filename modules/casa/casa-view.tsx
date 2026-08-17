"use client";

import { FadingText } from "@/components/motion/fading-text";
import { formatRelativeTimeSince } from "@/lib/data/utils/relative-time";
import type { CasaCareFeedback } from "@/lib/hooks/use-casa-care";
import { CasaBlockCard } from "./components/casa-block-card";
import { CasaMarkDoneControl } from "./components/casa-mark-done-control";

type CasaViewProps = {
  cuidado: {
    icon: string;
    title: string;
    itemLabel: string;
    markDoneLabel: string;
    updatedLabel: string;
  };
  nuevoHogar: {
    icon: string;
    title: string;
    statusLines: readonly string[];
  };
  mantenimiento: {
    icon: string;
    title: string;
    statusLines: readonly string[];
  };
  limpiezaExteriorCompletedAt: Date;
  feedback: CasaCareFeedback;
  onMarkLimpiezaExteriorDone: () => void;
};

export function CasaView({
  cuidado,
  nuevoHogar,
  mantenimiento,
  limpiezaExteriorCompletedAt,
  feedback,
  onMarkLimpiezaExteriorDone,
}: CasaViewProps) {
  const limpiezaStatus = formatRelativeTimeSince(limpiezaExteriorCompletedAt);
  const showAgePulse = feedback === "updated";

  return (
    <div className="mx-auto w-full max-w-2xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-4">
      <div className="flex flex-col gap-4 sm:gap-5">
        <CasaBlockCard icon={cuidado.icon} title={cuidado.title} delay={80}>
          <div className="flex flex-col gap-1">
            <p className="text-[0.9375rem] font-light tracking-[-0.01em] text-white/65">
              {cuidado.itemLabel}
            </p>
            <div className="flex flex-col">
              <FadingText
                as="p"
                text={limpiezaStatus}
                className={`text-sm font-light tracking-[-0.01em] text-white/35 ${
                  showAgePulse ? "motion-safe:animate-counter-enter" : ""
                }`}
              />
              <CasaMarkDoneControl
                label={cuidado.markDoneLabel}
                updatedLabel={cuidado.updatedLabel}
                feedback={feedback}
                onMarkDone={onMarkLimpiezaExteriorDone}
              />
            </div>
          </div>
        </CasaBlockCard>

        <CasaBlockCard icon={nuevoHogar.icon} title={nuevoHogar.title} delay={160}>
          <div className="flex flex-col gap-1">
            {nuevoHogar.statusLines.map((line) => (
              <p
                key={line}
                className="text-sm font-light tracking-[-0.01em] text-white/35"
              >
                {line}
              </p>
            ))}
          </div>
        </CasaBlockCard>

        <CasaBlockCard
          icon={mantenimiento.icon}
          title={mantenimiento.title}
          delay={240}
        >
          <div className="flex flex-col gap-1">
            {mantenimiento.statusLines.map((line) => (
              <p
                key={line}
                className="text-sm font-light tracking-[-0.01em] text-white/35"
              >
                {line}
              </p>
            ))}
          </div>
        </CasaBlockCard>
      </div>
    </div>
  );
}
