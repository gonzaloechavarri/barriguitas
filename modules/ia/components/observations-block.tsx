import type { CopilotObservation } from "@/lib/data/types";
import { cardMotionClasses } from "@/components/motion/card-motion";

type ObservationsBlockProps = {
  observations: CopilotObservation[];
};

export function ObservationsBlock({ observations }: ObservationsBlockProps) {
  if (observations.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-col gap-3 sm:mt-5">
      {observations.map((observation, index) => (
        <article
          key={`${observation.priority}-${observation.text}`}
          className={`rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.2)] backdrop-blur-md backdrop-saturate-150 sm:p-5 ${cardMotionClasses} ${
            observation.tier === "secondary" ? "opacity-90" : ""
          }`}
          style={{ animationDelay: `${160 + index * 60}ms` }}
        >
          <p
            className={`text-[0.9375rem] font-light leading-snug tracking-[-0.01em] ${
              observation.tier === "secondary"
                ? "text-white/45"
                : "text-white/65"
            }`}
          >
            <span className="mr-2" role="img" aria-hidden>
              {observation.icon}
            </span>
            {observation.text}
          </p>
        </article>
      ))}
    </div>
  );
}
