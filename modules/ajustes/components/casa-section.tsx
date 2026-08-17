"use client";

import type { SettingsCasaView } from "@/lib/services/settings.service";
import { registerCleaning } from "@/lib/services/settings.service";
import { SettingsButton } from "./settings-field";
import { SettingsSection } from "./settings-section";

type CasaSettingsSectionProps = {
  data: SettingsCasaView;
};

export function CasaSettingsSection({ data }: CasaSettingsSectionProps) {
  return (
    <SettingsSection
      icon="🏡"
      title="Villa Barriguita"
      summary={data.summary}
      delay={160}
    >
      <div className="flex flex-col gap-2">
        <p className="text-[0.9375rem] font-light tracking-[-0.01em] text-white/65">
          {data.itemLabel}
        </p>

        <p className="text-xs font-light tracking-[-0.01em] text-white/35">
          {data.copy.lastCleaning}
        </p>

        <p className="text-sm font-light tracking-[-0.01em] text-white/55">
          {data.lastCleaningLabel}
        </p>

        <p className="text-sm font-light tracking-[-0.01em] text-white/35">
          {data.daysElapsedLabel}
        </p>

        <div className="mt-4">
          <SettingsButton onClick={registerCleaning}>
            <span aria-hidden>✓</span>
            {data.markDoneLabel}
          </SettingsButton>
        </div>
      </div>
    </SettingsSection>
  );
}
