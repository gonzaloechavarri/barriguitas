"use client";

import { FadingText } from "@/components/motion/fading-text";
import { pressTextControlClasses } from "@/components/motion/press-motion";
import type { CasaCareFeedback } from "@/lib/hooks/use-casa-care";

type CasaMarkDoneControlProps = {
  label: string;
  updatedLabel: string;
  feedback: CasaCareFeedback;
  onMarkDone: () => void;
};

export function CasaMarkDoneControl({
  label,
  updatedLabel,
  feedback,
  onMarkDone,
}: CasaMarkDoneControlProps) {
  return (
    <div className="mt-1 h-[1.0625rem]">
      {feedback === "updated" ? (
        <FadingText
          as="p"
          text={updatedLabel}
          className="text-sm font-light tracking-[-0.01em] text-white/35 motion-safe:animate-counter-enter"
        />
      ) : (
        <button
          type="button"
          onClick={onMarkDone}
          className={`inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-sm font-light tracking-[-0.01em] text-white/35 transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-white/45 touch-manipulation ${pressTextControlClasses}`}
        >
          <span aria-hidden>✓</span>
          {label}
        </button>
      )}
    </div>
  );
}
