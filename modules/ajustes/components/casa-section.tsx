"use client";

import { useState } from "react";
import type { SettingsCasaView } from "@/lib/services/settings.service";
import {
  updateHomeNextStep,
  updateHomePhase,
} from "@/lib/services/settings.service";
import { pressTextControlClasses } from "@/components/motion/press-motion";
import { SettingsField, SettingsInput } from "./settings-field";
import { SettingsSection } from "./settings-section";

type CasaSettingsSectionProps = {
  data: SettingsCasaView;
};

function CasaNextStepField({
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
    <SettingsField label="Siguiente paso">
      <SettingsInput
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
        }}
      />
    </SettingsField>
  );
}

export function CasaSettingsSection({ data }: CasaSettingsSectionProps) {
  return (
    <SettingsSection
      icon="🏡"
      title="Casa"
      summary={`${data.phaseLabel} · ${data.nextStep}`}
      delay={160}
    >
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-xs font-light tracking-[-0.01em] text-white/35">
            Fase
          </p>
          <div
            role="radiogroup"
            aria-label="Fase del proyecto"
            className="mt-3 flex flex-wrap gap-x-5 gap-y-2"
          >
            {data.phases.map((item) => {
              const selected = item.id === data.phase;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => updateHomePhase(item.id)}
                  className={`border-0 bg-transparent p-0 text-left text-sm font-light tracking-[-0.01em] transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] touch-manipulation ${pressTextControlClasses} ${
                    selected ? "text-white/75" : "text-white/28 hover:text-white/45"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <CasaNextStepField
          key={data.nextStep}
          nextStep={data.nextStep}
          onCommit={updateHomeNextStep}
        />
      </div>
    </SettingsSection>
  );
}
