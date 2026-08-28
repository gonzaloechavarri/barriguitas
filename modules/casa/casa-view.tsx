"use client";

import { useState } from "react";
import type { HomePhaseId } from "@/data/house";
import { pressTextControlClasses } from "@/components/motion/press-motion";
import { CasaBlockCard } from "./components/casa-block-card";

type CasaPhase = {
  id: HomePhaseId;
  label: string;
};

type CasaViewProps = {
  city: string;
  phases: readonly CasaPhase[];
  phase: HomePhaseId;
  nextStep: string;
  onPhaseChange: (phase: HomePhaseId) => void;
  onNextStepChange: (nextStep: string) => void;
};

function NextStepInput({
  nextStep,
  onCommit,
}: {
  nextStep: string;
  onCommit: (nextStep: string) => void;
}) {
  const [draft, setDraft] = useState(nextStep);

  function commit() {
    const trimmed = draft.trim();
    if (!trimmed) {
      setDraft(nextStep);
      return;
    }

    if (trimmed !== nextStep) {
      onCommit(trimmed);
    }
  }

  return (
    <div>
      <label
        htmlFor="casa-next-step"
        className="text-xs font-light tracking-[-0.01em] text-white/32"
      >
        Siguiente paso
      </label>
      <input
        id="casa-next-step"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
        }}
        className="mt-3 w-full border-0 bg-transparent p-0 text-[0.9375rem] font-light leading-relaxed tracking-[-0.01em] text-white/65 outline-none placeholder:text-white/25"
      />
    </div>
  );
}

export function CasaView({
  city,
  phases,
  phase,
  nextStep,
  onPhaseChange,
  onNextStepChange,
}: CasaViewProps) {
  return (
    <div className="mx-auto w-full max-w-xl px-5 pb-8 pt-2 sm:px-10 sm:pb-10 sm:pt-4">
      <header className="mb-8 opacity-0 animate-content-enter sm:mb-10">
        <h1 className="flex items-center gap-2.5 text-[1.625rem] font-normal tracking-[-0.02em] text-white/92 sm:text-[1.75rem]">
          <span aria-hidden>🏡</span>
          Casa
        </h1>
        <p className="mt-2.5 text-[0.9375rem] font-light tracking-[-0.01em] text-white/38 sm:mt-3">
          Nuestro futuro hogar en {city}
        </p>
      </header>

      <CasaBlockCard icon="🏡" title="El proyecto" delay={80}>
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-xs font-light tracking-[-0.01em] text-white/32">
              Fase
            </p>
            <div
              role="radiogroup"
              aria-label="Fase del proyecto"
              className="mt-3 flex flex-wrap gap-x-5 gap-y-2"
            >
              {phases.map((item) => {
                const selected = item.id === phase;

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onPhaseChange(item.id)}
                    className={`border-0 bg-transparent p-0 text-left text-[0.9375rem] font-light tracking-[-0.01em] transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] touch-manipulation ${pressTextControlClasses} ${
                      selected ? "text-white/80" : "text-white/28 hover:text-white/45"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <NextStepInput
            key={nextStep}
            nextStep={nextStep}
            onCommit={onNextStepChange}
          />
        </div>
      </CasaBlockCard>
    </div>
  );
}
