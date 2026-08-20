"use client";

import { pressTextControlClasses } from "@/components/motion/press-motion";
import type { CopilotObservation } from "@/lib/data/types";
import {
  COPILOT_QUICK_QUESTIONS,
  type CopilotBrief,
  type CopilotQuickQuestion,
} from "@/lib/services/copilot/context.service";
import {
  CardTitle,
  GlassCard,
} from "@/modules/nosotros/components/glass-card";
import { ObservationsBlock } from "./components/observations-block";

type IaViewProps = {
  brief: CopilotBrief;
  observations: CopilotObservation[];
  response: string | null;
  activeQuestion: CopilotQuickQuestion | null;
  onSelectQuestion: (question: CopilotQuickQuestion) => void;
};

export function IaView({
  brief,
  observations,
  response,
  activeQuestion,
  onSelectQuestion,
}: IaViewProps) {
  return (
    <div className="mx-auto w-full max-w-xl px-5 pb-8 pt-2 sm:px-10 sm:pb-10 sm:pt-4">
      <GlassCard className="rounded-[1.375rem] p-8 sm:rounded-3xl sm:p-10" delay={80}>
        <CardTitle icon="🤖">Copiloto</CardTitle>

        <div className="mt-10 space-y-4 sm:mt-12">
          <p className="text-lg font-light tracking-[-0.01em] text-white/80 sm:text-xl">
            {brief.greeting}
          </p>

          <p className="text-[0.9375rem] font-light leading-relaxed tracking-[-0.01em] text-white/60">
            {brief.summary}
          </p>
        </div>

        <ObservationsBlock observations={observations} />
      </GlassCard>

      <div className="mt-6 flex flex-col gap-2.5">
        {COPILOT_QUICK_QUESTIONS.map((question) => {
          const isActive = activeQuestion === question.id;

          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onSelectQuestion(question.id)}
              aria-pressed={isActive}
              className={`rounded-2xl border px-4 py-3.5 text-left text-sm font-light tracking-[-0.01em] touch-manipulation motion-safe:transition-[background-color,border-color,color] motion-safe:duration-200 ${
                isActive
                  ? "border-white/[0.12] bg-white/[0.06] text-white/75"
                  : "border-white/[0.06] bg-white/[0.02] text-white/45"
              } ${pressTextControlClasses}`}
            >
              {question.label}
            </button>
          );
        })}
      </div>

      {response ? (
        <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
          <p className="whitespace-pre-line text-[0.9375rem] font-light leading-relaxed tracking-[-0.01em] text-white/65">
            {response}
          </p>
        </div>
      ) : null}
    </div>
  );
}
