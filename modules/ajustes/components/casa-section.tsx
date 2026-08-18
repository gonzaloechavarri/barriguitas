"use client";

import { useCallback, useState } from "react";
import { FadingText } from "@/components/motion/fading-text";
import type { SettingsCasaView } from "@/lib/services/settings.service";
import { registerCleaning } from "@/lib/services/settings.service";
import { SettingsButton } from "./settings-field";
import { SettingsSection } from "./settings-section";

const UPDATED_FEEDBACK_MS = 1000;

type CasaSettingsSectionProps = {
  data: SettingsCasaView;
};

export function CasaSettingsSection({ data }: CasaSettingsSectionProps) {
  const [saved, setSaved] = useState(false);

  const handleRegisterCleaning = useCallback(() => {
    registerCleaning();
    setSaved(true);
    window.setTimeout(() => setSaved(false), UPDATED_FEEDBACK_MS);
  }, []);

  return (
    <SettingsSection
      icon="🏡"
      title="Villa Barriguita"
      summary={`${data.itemLabel} · ${data.lastCleaningLabel}`}
      delay={160}
    >
      <div className="flex flex-col gap-2">
        <p className="text-[0.9375rem] font-light tracking-[-0.01em] text-white/65">
          {data.itemLabel}
        </p>

        <p className="text-xs font-light tracking-[-0.01em] text-white/35">
          Última limpieza
        </p>

        <p className="text-sm font-light tracking-[-0.01em] text-white/55">
          {data.lastCleaningLabel}
        </p>

        <p className="text-sm font-light tracking-[-0.01em] text-white/35">
          {data.daysElapsedLabel}
        </p>

        <div className="mt-4 h-[1.875rem]">
          {saved ? (
            <FadingText
              as="p"
              text={data.markDoneLabel}
              className="text-xs font-light tracking-[-0.01em] text-white/35 motion-safe:animate-counter-enter"
            />
          ) : (
            <SettingsButton onClick={handleRegisterCleaning}>
              <span aria-hidden>✓</span>
              {data.markDoneLabel}
            </SettingsButton>
          )}
        </div>
      </div>
    </SettingsSection>
  );
}
